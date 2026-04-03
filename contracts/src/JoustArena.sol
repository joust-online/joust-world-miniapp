// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.29;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";

import "@solmate/tokens/ERC20.sol";
import "@solmate/utils/FixedPointMathLib.sol";

import "@solady/src/utils/SafeTransferLib.sol";

import "./Errors.sol";
import "./storage/JoustArenaStorage.sol";

/// @title JoustArena
/// @author dd0sxx
/// @notice This contract keeps track, creates, and manages Joust pools, jousts, and payouts
contract JoustArena is
    Initializable,
    UUPSUpgradeable,
    OwnableUpgradeable,
    ReentrancyGuardUpgradeable,
    JoustArenaStorageV1,
    Errors
{
    using FixedPointMathLib for uint256;

    struct GetPool {
        uint256 id; // The ID of the pool
        address arbiter; // The address of the arbiter
        uint16 arbiterFee; // The fee taken by the arbiter
        bool arbiterAccepted; // Whether the arbiter has accepted the pool
        bool isClosed; // Whether the pool is closed for jousting (not the same as settled)
        ERC20 collateral; // The address of the collateral token, if 0 then it is ETH
        uint256 minJoustAmount; // The minimum amount of tokens required to joust
        uint256 totalAmount; // The sum of all jousts in a pool
        uint8 supportedJoustTypes; // The number of supported joust types (0 = null, 1 = no, 2 = yes, 3+ = optional additional joust types)
        uint8 winningJoustType; // The winning joust type (1 = no, 2 = yes, 3+ = optional additional joust types)
        uint32 endTime; // The expiration date of the pool
    }

    struct CreatePoolParams {
        address arbiter; // The address of the arbiter
        uint16 arbiterFee; // The fee taken by the arbiter
        ERC20 collateral; // The address of the collateral token, if 0 then it is ETH
        uint256 minJoustAmount; // The minimum amount of tokens required to joust
        uint8 supportedJoustTypes; // The number of supported joust types (0 = null, 1 = no, 2 = yes, 3+ = optional additional joust types)
        uint32 endTime; // The expiration date of the pool
    }

    /// @dev Struct used to store payout information
    struct Payout {
        uint256 amount; // The amount to be paid out
        address player; // The address of the player
        bool isWinner; // Whether the player is a winner or not
    }

    /// @dev Used only for view function only, to aid integration
    struct PayoutDetail {
        bytes32 uuid; // Unique identifier for this payout, useful for off-chain tracking
        address player; // The address of the player
        uint256 stake; // The amount that was jousted
        uint8 joustType; // The type of the joust (0 = null, 1 = no, 2 = yes, 3+ = optional additional joust types)
        uint256 grossPayout; // Before any fees
        uint256 houseFee; // House fee for this payout
        uint256 arbiterFee; // Arbiter fee for this payout
        uint256 netPayout; // Actual amount sent to player
        bool isWinner; // Whether this player won or lost
    }

    /// @dev Used for view function only, to aid integration
    struct SettlementSummary {
        PayoutDetail[] payouts; // Individual payout breakdown
        uint256 totalHouseFee; // Total house fee for entire pool
        uint256 totalArbiterFee; // Total arbiter fee for entire pool
    }

    /// @dev Verbose payout info for off-chain accounting/analytics.
    /// @notice Heavy view; do NOT call on-chain in production flows.
    struct InternalPayoutBreakdown {
        address player;
        bool isWinner;
        uint8 joustType; // The type of the joust (0 = null, 1 = no, 2 = yes, 3+ = optional additional joust types)
        uint256 stake; // Original amount staked
        uint256 grossPayout; // Before any fees attributed to this player
        uint256 netPayout; // What they actually receive
        uint256 winningsComponent; // Winners: share of losers' pot (capped by 2x rule); 0 for losers
        uint256 loserRefundComponent; // Losers: share of leftover (excess) refunded; 0 for winners
        uint256 houseFeeShare; // Portion of house fee attributed to this player (proportional)
        uint256 arbiterFeeShare; // Portion of arbiter fee attributed to this player (proportional)
    }

    /// @dev Emitted when a new pool is created
    /// @param id The ID of the pool
    /// @param arbiter The address of the arbiter
    /// @param collateral The address of the collateral token, if 0 then it is ETH
    /// @param minJoustAmount The minimum amount of tokens required to joust
    /// @param endTime The expiration date of the pool
    event PoolCreated(
        uint256 indexed id, address indexed arbiter, address indexed collateral, uint256 minJoustAmount, uint32 endTime
    );

    /// @dev Emitted when a pool is created and the arbiter has not yet accepted it
    /// @param id The ID of the pool
    /// @param arbiter The address of the arbiter
    /// @param collateral The address of the collateral token, if 0 then it is ETH
    event PoolCreationPending(
        uint256 indexed id, address indexed arbiter, address indexed collateral, uint256 minJoustAmount, uint32 endTime
    );

    /// @dev Emitted when a pool is closed
    /// @param id The ID of the pool
    /// @param closer The address of the person that closed the pool
    event PoolClosed(uint256 indexed id, address indexed closer);

    /// @dev Emitted when a pool is settled
    /// @param id The pool id
    /// @param settler The address that settled the pool
    /// @param winningJoustType The winning joust type
    /// @param totalAmount The sum of all pools in a pool
    /// @param collateral The address of the collateral token (if 0 then it is ETH)
    event PoolSettled(
        uint256 indexed id,
        address indexed settler,
        uint8 indexed winningJoustType,
        uint256 totalAmount,
        address collateral
    );

    /// @dev Emitted when a pool is refunded
    /// @param id The ID of the pool
    /// @param refunder The address of the arbiter
    /// @param collateral The address of the collateral token, if 0 then it is ETH
    /// @param totalAmount The sum of all pools in a pool
    event PoolRefunded(uint256 indexed id, address indexed refunder, address indexed collateral, uint256 totalAmount);

    /// @dev Emitted when a new joust is created
    /// @param poolId The ID of the pool the joust is in
    /// @param player The address of the player that created the joust
    /// @param amount The amount of collateral the player is betting
    /// @param joustType The type of the joust (0 = null, 1 = no, 2 = yes, 3+ = optional additional joust types)
    event NewJoust(uint256 indexed poolId, address indexed player, uint256 indexed amount, uint8 joustType);

    /// @dev Emitted when a new collateral token is added
    /// @param collateral The address of the collateral token that was added
    event CollateralUpdate(address indexed collateral, bool indexed isSupported);

    /// @dev Emitted when the contract is paused or unpaused
    /// @param isPaused The new paused state of the contract
    event Paused(bool indexed isPaused);

    /// @dev Emitted when the house fee is updated
    /// @param oldHouseFee The previous house fee in basis points
    /// @param newHouseFee The new house fee in basis points
    event HouseFeeUpdated(uint256 indexed oldHouseFee, uint256 indexed newHouseFee);

    /// @dev Constants for joust arena functionality
    uint8 constant UNSETTLED = 0;
    uint8 constant REFUNDED = type(uint8).max;
    uint8 constant RESCUED = type(uint8).max - 1;
    uint256 constant PUBLIC_REFUND_DELAY = 1 days;
    uint256 constant ONE_HUNDRED_BPS = 10000;
    uint256 constant TWO_BPS = 200;

    // Storage variables are now inherited from JoustArenaStorageV1

    modifier notPaused() {
        require(!paused, ContractPaused());
        _;
    }

    /// @dev Initialize the contract, setting the owner and initializing UUPS upgradeability
    function initialize() external initializer {
        __Ownable_init(msg.sender); // Initialize ownership to the deployer
        __UUPSUpgradeable_init(); // Initialize UUPS upgradeability
        __ReentrancyGuard_init(); // Initialize reentrancy guard
        houseFee = 399; // Initialize house fee to 3.99% (399 basis points)
        addSupportedCollateral(ERC20(address(0))); // Support ETH as collateral
    }

    // Ensure that only the owner can upgrade the contract
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

    /// @notice Create a new pool
    /// @param newPool The pool to create
    function createPool(CreatePoolParams calldata newPool) external notPaused returns (uint256 newPoolId) {
        require(
            newPool.collateral == ERC20(address(0)) || isCollateralSupported[newPool.collateral],
            CollateralNotSupported(address(newPool.collateral))
        );
        require(newPool.arbiter != address(0), ArbiterAddressZero());
        require(block.timestamp < newPool.endTime, EndTimeInPast(block.timestamp));
        require(newPool.minJoustAmount > 0, MinJoustAmountZero());
        require(newPool.arbiterFee <= TWO_BPS, ArbiterFeeTooHigh());
        require(newPool.supportedJoustTypes > 0 && newPool.supportedJoustTypes < RESCUED, NonSupportedJoustTypes());

        uint256 poolId = poolCounter;

        Pool storage poolStorage = pools[poolId];
        poolStorage.id = poolCounter;
        poolStorage.arbiter = newPool.arbiter;
        poolStorage.collateral = newPool.collateral;
        poolStorage.minJoustAmount = newPool.minJoustAmount;
        poolStorage.supportedJoustTypes = newPool.supportedJoustTypes;
        poolStorage.endTime = newPool.endTime;
        poolStorage.arbiterFee = newPool.arbiterFee; // Set the arbiter fee

        if (newPool.arbiter == msg.sender) {
            pools[poolId].arbiterAccepted = true;
            emit PoolCreated(
                poolId, newPool.arbiter, address(newPool.collateral), newPool.minJoustAmount, newPool.endTime
            );
        } else {
            emit PoolCreationPending(
                poolId, newPool.arbiter, address(newPool.collateral), newPool.minJoustAmount, newPool.endTime
            );
        }
        poolCounter += 1;
        return poolId;
    }

    function acceptArbiterDelegation(uint256 poolId) external notPaused {
        Pool storage pool = pools[poolId];
        require(pool.arbiter == msg.sender, OnlyArbiter(msg.sender));
        require(!pool.arbiterAccepted, ArbiterAlreadyAccepted());

        pool.arbiterAccepted = true;

        emit PoolCreated(poolId, msg.sender, address(pool.collateral), pool.minJoustAmount, pool.endTime);
    }

    /// @notice Close a pool so no more jousts can be made
    /// @notice not the same as settling a pool
    /// @dev can only be called by the arbiter or the owner
    /// @param poolId The ID of the pool to close
    function closePool(uint256 poolId) external notPaused {
        Pool storage pool = pools[poolId];
        address arbiter = pool.arbiter;
        require(pool.id == poolId, PoolDoesNotExist(poolId));
        require(pool.isClosed == false, PoolAlreadyClosed());
        require(pool.arbiterAccepted || msg.sender == owner(), ArbiterMustAcceptBeforeClosing());
        require(msg.sender == arbiter || msg.sender == owner(), OnlyAuthorized(msg.sender));
        if (msg.sender == arbiter) {
            require(pool.arbiterAccepted, ArbiterMustAcceptBeforeClosing());
        }

        pool.isClosed = true;

        emit PoolClosed(poolId, msg.sender);
    }

    function settlePool(uint256 poolId, uint8 winningJoustType) public notPaused nonReentrant {
        Pool storage pool = pools[poolId];
        _settlePool(pool, winningJoustType);

        // Cache storage variables to avoid multiple reads
        uint256 totalAmount = pool.totalAmount;
        address arbiterAddress = pool.arbiter;

        uint256 houseCut = totalAmount.mulWadDown(houseFee.divWadDown(ONE_HUNDRED_BPS));
        uint256 arbiterCut = totalAmount.mulWadDown(uint256(pool.arbiterFee).divWadDown(ONE_HUNDRED_BPS));

        __payOut(owner(), houseCut, pool.collateral);
        __payOut(arbiterAddress, arbiterCut, pool.collateral);
    }

    /// @notice Settle a pool, can only be called by the arbiter or the owner
    /// @param poolId The poolId to settle
    /// @param winningJoustType The winning joust type
    /// @dev The payouts array MUST be sorted with losers first and winners last
    function settlePoolAndPayout(uint256 poolId, uint8 winningJoustType) external notPaused nonReentrant {
        Pool storage pool = pools[poolId];
        _settlePool(pool, winningJoustType);
        pool.isSettledAndPaid = true;

        Payout[] memory payouts = __getPayouts(pool.id, winningJoustType);

        if (payouts.length == 0) {
            return;
        }

        uint256 houseCut = pool.totalAmount.mulWadDown(houseFee.divWadDown(ONE_HUNDRED_BPS));
        uint256 arbiterCut = pool.totalAmount.mulWadDown(uint256(pool.arbiterFee).divWadDown(ONE_HUNDRED_BPS));

        for (uint256 i = 0; i < payouts.length; i++) {
            __payOut(payouts[i].player, payouts[i].amount, pool.collateral);
        }

        if (houseCut > 0) {
            __payOut(owner(), houseCut, pool.collateral);
        }
        if (arbiterCut > 0) {
            __payOut(pool.arbiter, arbiterCut, pool.collateral);
        }
    }

    function claimPayout(uint256 poolId, address to) external notPaused nonReentrant {
        Pool storage pool = pools[poolId];
        uint8 winningJoustType = pool.winningJoustType;

        require(winningJoustType != UNSETTLED, PoolNotSettled(poolId));
        require(winningJoustType != REFUNDED && winningJoustType != RESCUED, PayoutNotEligible(poolId));
        require(!pool.isSettledAndPaid, PoolAlreadySettled());
        require(!pool.claimed[msg.sender], AlreadyClaimed(msg.sender, poolId));

        Payout[] memory payouts = __getPayouts(pool.id, winningJoustType);

        uint256 totalDue;
        for (uint256 i = 0; i < payouts.length;) {
            if (payouts[i].player == msg.sender) {
                totalDue += payouts[i].amount;
            }
            unchecked {
                ++i;
            }
        }
        require(totalDue > 0, NoPayoutForPlayer());

        pool.claimed[msg.sender] = true;

        __payOut(to, totalDue, pool.collateral);
    }

    /// @notice Refund a pool, can only be called by the arbiter or the owner
    /// @notice Can be called by anyone 1 day after the pool has expired and is not settled
    /// @param poolId The ID of the pool to refund
    /// @dev This function will refund all players in the pool
    function refundPool(uint256 poolId) external nonReentrant {
        Pool storage pool = pools[poolId];
        require(pool.id == poolId, PoolDoesNotExist(poolId));
        require(pool.winningJoustType == UNSETTLED, PoolAlreadySettled());
        address refunder = msg.sender;
        require(
            (pool.endTime + PUBLIC_REFUND_DELAY < block.timestamp) || (refunder == pool.arbiter || refunder == owner()),
            OnlyAuthorized(msg.sender)
        );

        pool.winningJoustType = REFUNDED;

        emit PoolRefunded(pool.id, refunder, address(pool.collateral), pool.totalAmount);

        if (pool.totalAmount > 0) {
            __refundPool(pool);
        }
    }

    /// @notice place a joust in a pool
    /// @param joust The joust to place
    /// @dev This contract must be approved to spend the collateral token
    function createJoust(Joust calldata joust) external payable notPaused nonReentrant {
        Pool storage pool = pools[joust.id];
        require(joust.player == msg.sender, OnlyPlayerCanJoust(msg.sender, joust.player));
        require(joust.amount >= pool.minJoustAmount, AmountBelowMinimum(joust.amount, pool.minJoustAmount));
        require(joust.joustType > 0 && joust.joustType <= pool.supportedJoustTypes, InvalidJoustType());
        require(pool.arbiterAccepted, ArbiterMustAcceptBeforeJousting());
        require(pool.endTime > block.timestamp, PoolExpired(block.timestamp, pool.endTime));
        require(pool.isClosed == false, PoolAlreadyClosed());
        require(pool.winningJoustType == UNSETTLED, PoolAlreadySettled());

        pool.totalAmount += joust.amount;
        pool.joustsMadeWithType[joust.joustType] += 1;
        pool.amountSumForType[joust.joustType] += joust.amount;

        jousts[pool.id].push(joust);

        emit NewJoust(joust.id, msg.sender, joust.amount, joust.joustType);

        // Transfer the collateral to this contract
        if (address(pool.collateral) == address(0)) {
            require(msg.value == joust.amount, IncorrectETHAmount(msg.value, joust.amount));
        } else {
            require(msg.value == 0, ETHSentWithToken());
            require(pool.collateral.allowance(msg.sender, address(this)) >= joust.amount, InsufficientAllowance());
            SafeTransferLib.safeTransferFrom(address(pool.collateral), msg.sender, address(this), joust.amount);
        }
    }

    /// @notice Add a new collateral token to the list of supported collaterals
    /// @dev DO NOT ADD TOKENS WITH TRANSFER TAXES OR FEES
    /// @param collateral The address of the ERC20 token to add as collateral
    function addSupportedCollateral(ERC20 collateral) public onlyOwner {
        isCollateralSupported[collateral] = true;
        emit CollateralUpdate(address(collateral), true);
    }

    /// @notice removes collateral from supported whitelist
    /// @param collateral the type of collateral to remove from the list
    function removeSupportedCollateral(ERC20 collateral) external onlyOwner {
        isCollateralSupported[collateral] = false;
        emit CollateralUpdate(address(collateral), false);
    }

    /// @notice pauses all contract functionality for users
    /// @param state false to unpause, true to pause
    function pause(bool state) external onlyOwner {
        paused = state;
        emit Paused(state);
    }

    /// @notice Updates the house fee
    /// @param newHouseFee The new house fee in basis points (e.g., 399 = 3.99%)
    /// @dev Maximum house fee is 10% (1000 basis points) to prevent excessive fees
    function setHouseFee(uint256 newHouseFee) external onlyOwner {
        require(newHouseFee <= 1000, "House fee cannot exceed 10%");
        uint256 oldHouseFee = houseFee;
        houseFee = newHouseFee;
        emit HouseFeeUpdated(oldHouseFee, newHouseFee);
    }

    /// @notice USE WITH EXTREME CAUTION, must calculate correctly how many funds need saving or it could affect other pools
    /// @param poolId the poolId to rescue
    /// @param amount the amount of funds to rescue
    function rescuePool(uint256 poolId, uint256 amount) external onlyOwner {
        Pool storage pool = pools[poolId];
        require(amount <= pool.totalAmount, AmountExceedsPoolTotal(amount, pool.totalAmount));
        require(pool.winningJoustType == UNSETTLED, PoolAlreadySettled());
        pool.winningJoustType = RESCUED; // Mark the pool as rescued
        __payOut(owner(), amount, pool.collateral);
    }

    function getPool(uint256 poolId) external view returns (GetPool memory) {
        GetPool memory pool = GetPool({
            id: pools[poolId].id,
            arbiter: pools[poolId].arbiter,
            arbiterFee: pools[poolId].arbiterFee,
            arbiterAccepted: pools[poolId].arbiterAccepted,
            isClosed: pools[poolId].isClosed,
            collateral: pools[poolId].collateral,
            minJoustAmount: pools[poolId].minJoustAmount,
            totalAmount: pools[poolId].totalAmount,
            supportedJoustTypes: pools[poolId].supportedJoustTypes,
            winningJoustType: pools[poolId].winningJoustType,
            endTime: pools[poolId].endTime
        });
        return pool;
    }

    function getJoustsMadeWithType(uint256 poolId, uint8 joustType) external view returns (uint256, uint256) {
        Pool storage pool = pools[poolId];
        require(joustType > 0 && joustType <= pool.supportedJoustTypes, InvalidJoustType());
        return (pool.joustsMadeWithType[joustType], pool.amountSumForType[joustType]);
    }

    function getJousts(uint256 poolId) external view returns (Joust[] memory) {
        return jousts[poolId];
    }

    function getPayouts(uint256 poolId, uint8 winningJoustType) external view returns (Payout[] memory) {
        return __getPayouts(poolId, winningJoustType);
    }

    /// @notice Get a summary of payouts for a pool, including individual payout details
    /// @param poolId The ID of the pool to summarize
    /// @param winningJoustType The winning joust type
    /// @return SettlementSummary containing payout details, total fees, and a UUID for tracking
    /// @dev This function is useful for off-chain tracking and integration
    function getSettlementSummary(uint256 poolId, uint8 winningJoustType)
        external
        view
        returns (SettlementSummary memory)
    {
        Pool storage pool = pools[poolId];

        // Sanity checks
        require(pool.id == poolId, PoolDoesNotExist(poolId));
        require(winningJoustType != UNSETTLED, IncorrectWinningJoustType(winningJoustType));
        require(winningJoustType != REFUNDED, IncorrectWinningJoustType(winningJoustType));
        require(winningJoustType != RESCUED, IncorrectWinningJoustType(winningJoustType));

        // Use the verbose helper so we can surface fee attribution + gross/net, etc.
        (
            InternalPayoutBreakdown[] memory verbose,
            ,
            ,
            uint256 totalHouseFee,
            uint256 totalArbiterFee,
            /* totalNetPaid */
        ) = __getPayoutsVerbose(poolId, winningJoustType);

        // Build PayoutDetail[] expected by SettlementSummary
        PayoutDetail[] memory details = new PayoutDetail[](verbose.length);
        for (uint256 i = 0; i < verbose.length; i++) {
            InternalPayoutBreakdown memory v = verbose[i];
            bytes32 uuid = keccak256(
                abi.encode(
                    poolId,
                    i,
                    v.player,
                    v.stake,
                    v.joustType,
                    v.grossPayout,
                    v.houseFeeShare,
                    v.arbiterFeeShare,
                    v.netPayout,
                    v.isWinner
                )
            );
            details[i] = PayoutDetail({
                uuid: uuid,
                player: v.player,
                stake: v.stake,
                joustType: v.joustType,
                grossPayout: v.grossPayout,
                houseFee: v.houseFeeShare,
                arbiterFee: v.arbiterFeeShare,
                netPayout: v.netPayout,
                isWinner: v.isWinner
            });
        }

        return SettlementSummary({payouts: details, totalHouseFee: totalHouseFee, totalArbiterFee: totalArbiterFee});
    }

    function _settlePool(Pool storage pool, uint8 winningJoustType) private {
        address settler = msg.sender;
        require(settler == pool.arbiter || settler == owner(), OnlyAuthorized(settler));
        require(pool.winningJoustType == UNSETTLED, PoolAlreadySettled());
        require(pool.isSettledAndPaid == false, PoolAlreadySettled());

        if (pool.arbiter != settler) {
            require(pool.arbiterAccepted, ArbiterMustAcceptBeforeSettling());
        }
        require(winningJoustType > UNSETTLED && winningJoustType <= pool.supportedJoustTypes, InvalidJoustType());

        pool.winningJoustType = winningJoustType;
        emit PoolSettled(pool.id, settler, winningJoustType, pool.totalAmount, address(pool.collateral));
    }

    /// @dev Internal function to pay out a player, either in ETH or ERC20 tokens
    function __payOut(address player, uint256 amount, ERC20 collateral) private {
        if (collateral == ERC20(address(0))) {
            SafeTransferLib.safeTransferETH(player, amount);
        } else {
            SafeTransferLib.safeTransfer(address(collateral), player, amount);
        }
    }

    /// @dev Internal function to refund a pool, paying out all players their full original stakes
    /// @dev No fees are charged on refunds - players get their full original joust amount back
    function __refundPool(Pool storage pool) private {
        Joust[] memory poolJousts = jousts[pool.id];
        uint256 len = poolJousts.length;
        if (len == 0) {
            return;
        }

        // Refund full amounts to all players - no fees charged on refunds
        for (uint256 i = 0; i < len; i++) {
            Joust memory joust = poolJousts[i];
            __payOut(joust.player, joust.amount, pool.collateral);
        }
    }

    /// @dev Internal function to calculate payouts for a pool based on the winning joust type
    function __getPayouts(uint256 poolId, uint8 winningJoustType) private view returns (Payout[] memory payouts) {
        Pool storage pool = pools[poolId];
        uint256 len = jousts[poolId].length;
        if (len == 0) {
            return payouts;
        }

        uint256 totalWinningAmount = pool.amountSumForType[winningJoustType];
        uint256 totalAmount = pool.totalAmount;
        uint256 totalLosingAmount = 0;
        for (uint8 t = 1; t <= pool.supportedJoustTypes; t++) {
            if (t != winningJoustType) {
                totalLosingAmount += pool.amountSumForType[t];
            }
        }

        uint256 houseFeeAmount = totalAmount.mulWadDown(houseFee.divWadDown(ONE_HUNDRED_BPS));
        uint256 arbiterFee = totalAmount.mulWadDown(uint256(pool.arbiterFee).divWadDown(ONE_HUNDRED_BPS));
        uint256 totalFee = houseFeeAmount + arbiterFee;

        // If no winners or no losers, refund stakes minus fees on full pool
        if (totalWinningAmount == 0 || totalLosingAmount == 0) {
            // Compute rake on the entire pool

            payouts = new Payout[](len);
            for (uint256 i = 0; i < len; i++) {
                Joust memory j = jousts[poolId][i];
                // Proportional fee for this player's stake
                uint256 feeForPlayer = FixedPointMathLib.mulDivDown(j.amount, totalFee, totalAmount);
                uint256 netAmount = j.amount > feeForPlayer ? j.amount - feeForPlayer : 0;
                payouts[i] = Payout({player: j.player, amount: netAmount, isWinner: (j.joustType == winningJoustType)});
            }
            return payouts;
        }

        // Cap winners at 2x
        uint256 totalCappedWinningPayout = totalWinningAmount.mulDivDown(2, 1);
        uint256 effectiveWinningPayout = totalAmount > totalCappedWinningPayout ? totalCappedWinningPayout : totalAmount;
        uint256 leftoverAmount = totalAmount - effectiveWinningPayout;

        // Take fees from leftover (losers' excess) first
        uint256 feesCoveredFromLeftover = leftoverAmount >= totalFee ? totalFee : leftoverAmount;
        leftoverAmount = leftoverAmount >= totalFee ? leftoverAmount - totalFee : 0;
        uint256 remainingFeesFromWinners = totalFee > feesCoveredFromLeftover ? totalFee - feesCoveredFromLeftover : 0;

        // Prepare payout array: only winners and losers with leftover refunds get payouts
        // First, count number of payouts needed
        uint256 payoutsCount = 0;
        for (uint256 i = 0; i < len; i++) {
            Joust memory j = jousts[poolId][i];
            if (j.joustType == winningJoustType) {
                payoutsCount++;
            }
        }
        if (leftoverAmount > 0) {
            for (uint256 i = 0; i < len; i++) {
                Joust memory j = jousts[poolId][i];
                if (j.joustType != winningJoustType) {
                    payoutsCount++;
                }
            }
        }
        payouts = new Payout[](payoutsCount);
        uint256 payoutIdx = 0;

        uint256 totalWinningsOnly = effectiveWinningPayout - totalWinningAmount;

        // Winner payouts (already fee-adjusted)
        for (uint256 i = 0; i < len; i++) {
            Joust memory j = jousts[poolId][i];
            if (j.joustType == winningJoustType) {
                uint256 proportionalWinnings =
                    FixedPointMathLib.mulDivDown(totalWinningsOnly, j.amount, totalWinningAmount);
                uint256 winnerFeeDeduction = remainingFeesFromWinners > 0
                    ? FixedPointMathLib.mulDivDown(remainingFeesFromWinners, j.amount, totalWinningAmount)
                    : 0;
                uint256 totalPayout = j.amount + proportionalWinnings - winnerFeeDeduction;
                payouts[payoutIdx++] = Payout({player: j.player, amount: totalPayout, isWinner: true});
            }
        }

        // Loser refunds (leftover only)
        if (leftoverAmount > 0) {
            for (uint256 i = 0; i < len; i++) {
                Joust memory j = jousts[poolId][i];
                if (j.joustType != winningJoustType) {
                    uint256 proportionalRefund =
                        FixedPointMathLib.mulDivDown(leftoverAmount, j.amount, totalLosingAmount);
                    payouts[payoutIdx++] = Payout({player: j.player, amount: proportionalRefund, isWinner: false});
                }
            }
        }

        return payouts;
    }

    /// @notice Full verbose settlement math. Mirrors __getPayouts but exposes internals for analytics.
    /// @dev Internal view. Consider exposing via external view wrapper if needed off-chain.
    /// @param poolId Pool id
    /// @param winningJoustType Winning type
    /// @return breakdown Array of InternalPayoutBreakdown
    /// @return totalWinningAmount Total staked on the winning side
    /// @return totalLosingAmount Total staked on all losing sides
    /// @return totalHouseFee Total house fee in the pool
    /// @return totalArbiterFee Total arbiter fee in the pool
    /// @return totalNetPaid Sum of all netPayout values returned
    function __getPayoutsVerbose(uint256 poolId, uint8 winningJoustType)
        internal
        view
        returns (
            InternalPayoutBreakdown[] memory breakdown,
            uint256 totalWinningAmount,
            uint256 totalLosingAmount,
            uint256 totalHouseFee,
            uint256 totalArbiterFee,
            uint256 totalNetPaid
        )
    {
        Pool storage pool = pools[poolId];
        uint256 len = jousts[poolId].length;
        if (len == 0) {
            return (breakdown, 0, 0, 0, 0, 0);
        }

        totalWinningAmount = pool.amountSumForType[winningJoustType];
        for (uint8 t = 1; t <= pool.supportedJoustTypes; t++) {
            if (t != winningJoustType) {
                totalLosingAmount += pool.amountSumForType[t];
            }
        }

        uint256 totalAmount = pool.totalAmount;

        totalHouseFee = totalAmount.mulWadDown(houseFee.divWadDown(ONE_HUNDRED_BPS));
        totalArbiterFee = totalAmount.mulWadDown(uint256(pool.arbiterFee).divWadDown(ONE_HUNDRED_BPS));
        uint256 totalFee = totalHouseFee + totalArbiterFee;

        breakdown = new InternalPayoutBreakdown[](len);

        // Case: no winners or no losers => proportional fee on full pool, refund stakes
        if (totalWinningAmount == 0 || totalLosingAmount == 0) {
            for (uint256 i = 0; i < len; i++) {
                Joust memory j = jousts[poolId][i];
                uint256 feeForPlayer = FixedPointMathLib.mulDivDown(j.amount, totalFee, totalAmount);
                uint256 net = j.amount > feeForPlayer ? j.amount - feeForPlayer : 0;

                breakdown[i] = InternalPayoutBreakdown({
                    player: j.player,
                    isWinner: (j.joustType == winningJoustType),
                    joustType: j.joustType,
                    stake: j.amount,
                    grossPayout: j.amount,
                    netPayout: net,
                    winningsComponent: 0,
                    loserRefundComponent: 0,
                    houseFeeShare: FixedPointMathLib.mulDivDown(totalHouseFee, j.amount, totalAmount),
                    arbiterFeeShare: FixedPointMathLib.mulDivDown(totalArbiterFee, j.amount, totalAmount)
                });

                totalNetPaid += net;
            }
            return (breakdown, totalWinningAmount, totalLosingAmount, totalHouseFee, totalArbiterFee, totalNetPaid);
        }

        // Winners capped at 2x
        uint256 totalCappedWinningPayout = totalWinningAmount.mulDivDown(2, 1);
        uint256 effectiveWinningPayout = totalAmount > totalCappedWinningPayout ? totalCappedWinningPayout : totalAmount;
        uint256 leftoverAmount = totalAmount - effectiveWinningPayout;

        // Fees taken from leftover first
        uint256 feesCoveredFromLeftover = leftoverAmount >= totalFee ? totalFee : leftoverAmount;
        leftoverAmount = leftoverAmount >= totalFee ? leftoverAmount - totalFee : 0;
        uint256 remainingFeesFromWinners = totalFee > feesCoveredFromLeftover ? (totalFee - feesCoveredFromLeftover) : 0;

        uint256 winningsOnly = effectiveWinningPayout - totalWinningAmount;

        for (uint256 i = 0; i < len; i++) {
            Joust memory j = jousts[poolId][i];
            bool isWinner = (j.joustType == winningJoustType);

            uint256 winningsComp = 0;
            uint256 loserRefundComp = 0;
            uint256 feeHouse = 0;
            uint256 feeArbiter = 0;
            uint256 net;
            uint256 gross;

            if (isWinner) {
                uint256 propWinnings = FixedPointMathLib.mulDivDown(winningsOnly, j.amount, totalWinningAmount);
                uint256 winnerFeeCut = remainingFeesFromWinners > 0
                    ? FixedPointMathLib.mulDivDown(remainingFeesFromWinners, j.amount, totalWinningAmount)
                    : 0;

                winningsComp = propWinnings;
                net = j.amount + propWinnings - winnerFeeCut;
                gross = j.amount + propWinnings;

                if (totalFee > 0 && winnerFeeCut > 0) {
                    feeHouse = FixedPointMathLib.mulDivDown(totalHouseFee, winnerFeeCut, totalFee);
                    feeArbiter = winnerFeeCut - feeHouse;
                }
            } else {
                if (leftoverAmount > 0) {
                    loserRefundComp = FixedPointMathLib.mulDivDown(leftoverAmount, j.amount, totalLosingAmount);
                }
                net = loserRefundComp;
                gross = loserRefundComp;

                uint256 loserFeeTotal = totalFee - remainingFeesFromWinners; // portion taken from losers' side
                if (loserFeeTotal > 0) {
                    uint256 loserFeeAttributed =
                        FixedPointMathLib.mulDivDown(loserFeeTotal, j.amount, totalLosingAmount);
                    feeHouse = FixedPointMathLib.mulDivDown(totalHouseFee, loserFeeAttributed, totalFee);
                    feeArbiter = loserFeeAttributed - feeHouse;
                }
            }

            breakdown[i] = InternalPayoutBreakdown({
                player: j.player,
                isWinner: isWinner,
                joustType: j.joustType,
                stake: j.amount,
                grossPayout: gross,
                netPayout: net,
                winningsComponent: winningsComp,
                loserRefundComponent: loserRefundComp,
                houseFeeShare: feeHouse,
                arbiterFeeShare: feeArbiter
            });

            totalNetPaid += net;
        }

        return (breakdown, totalWinningAmount, totalLosingAmount, totalHouseFee, totalArbiterFee, totalNetPaid);
    }
}
