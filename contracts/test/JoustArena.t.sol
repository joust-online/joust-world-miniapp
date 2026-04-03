// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.29;

import "@forge-std/Test.sol";
import "@solmate/tokens/ERC20.sol";
import "@solmate/auth/Auth.sol";

import "../src/Errors.sol";
import "../src/JoustArena.sol";
import "../src/storage/JoustArenaStorage.sol";

// Mock ERC20 token for testing
contract MockERC20 is ERC20 {
    constructor() ERC20("Mock Token", "MTK", 18) {}

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}

contract JoustArenaTest is Test {
    uint256 constant ONE_HUNDRED_BPS = 10000;
    uint256 constant TWO_BPS = 200;
    JoustArena public joustContract;
    MockERC20 public token;
    // addresses must be greater than 65536 for zksync
    address public owner = address(1111111);

    Authority public authority = Authority(address(2222222));

    address public arbiter = address(3333333);
    address public participant1 = address(4444444);
    address public participant2 = address(5555555);
    address public participant3 = address(6666666);

    uint256 constant HOUSE_FEE = 399; // 3.99%
    uint16 constant ARBITER_FEE = 100; // 1%

    uint256 constant MAX_NUM_OF_JOUSTS_PUSH_PAYMENT = 3_800;
    uint256 constant STARTING_RANDOM_ADDRESS_NUMBER = 1_000_000;

    function setUp() public {
        token = new MockERC20();

        vm.startPrank(owner);
        joustContract = new JoustArena();
        joustContract.initialize();
        joustContract.addSupportedCollateral(token);
        vm.stopPrank();

        // Mint tokens
        // deal(token, owner, 100**18e);
        // deal(token, arbiter, 100**18e);
        token.mint(participant1, 20e18);
        token.mint(participant2, 30e18);
        token.mint(participant3, 50e18);

        // Approve the clearing house for transfers
        vm.prank(participant1);
        token.approve(address(joustContract), type(uint256).max);

        vm.prank(participant2);
        token.approve(address(joustContract), type(uint256).max);

        vm.prank(participant3);
        token.approve(address(joustContract), type(uint256).max);
    }

    function test_createPool() public {
        JoustArena.CreatePoolParams memory newPool = JoustArena.CreatePoolParams({
            arbiter: arbiter,
            arbiterFee: ARBITER_FEE,
            collateral: token,
            minJoustAmount: 1e18,
            supportedJoustTypes: 3,
            endTime: uint32(block.timestamp + 1 days)
        });

        joustContract.createPool(newPool);

        JoustArena.GetPool memory pool = createPool(newPool);

        assertEq(pool.id, joustContract.poolCounter() - 1);
        assertEq(pool.arbiter, arbiter);
        assertEq(pool.arbiterFee, ARBITER_FEE);
        assertEq(address(pool.collateral), address(token));
        assertEq(pool.endTime, newPool.endTime);
    }

    function test_poolIdIncrements() public {
        JoustArena.CreatePoolParams memory createPool1 = JoustArena.CreatePoolParams({
            arbiter: arbiter,
            arbiterFee: ARBITER_FEE,
            collateral: token,
            minJoustAmount: 1e18,
            supportedJoustTypes: 3,
            endTime: uint32(block.timestamp + 1 days)
        });

        JoustArena.CreatePoolParams memory createPool2 = JoustArena.CreatePoolParams({
            arbiter: arbiter,
            arbiterFee: ARBITER_FEE,
            collateral: token,
            minJoustAmount: 2e18,
            supportedJoustTypes: 3,
            endTime: uint32(block.timestamp + 2 days)
        });

        JoustArena.GetPool memory pool1 = createPool(createPool1);
        JoustArena.GetPool memory pool2 = createPool(createPool2);

        assertEq(pool1.id, 0);
        assertEq(pool2.id, 1);

        pool1 = joustContract.getPool(0);
        pool2 = joustContract.getPool(1);
        assertEq(pool1.id, 0);
        assertEq(pool2.id, 1);
    }

    function test___fuzz_createPool(uint16 _arbiterFee, uint256 _minJoustAmount, uint256 _endTime) public {
        vm.assume(_arbiterFee <= TWO_BPS);
        vm.assume(_minJoustAmount >= 1e18);
        vm.assume(_endTime > block.timestamp && _endTime <= block.timestamp + 365 days);

        JoustArena.CreatePoolParams memory newPool = JoustArena.CreatePoolParams({
            arbiter: arbiter,
            arbiterFee: _arbiterFee,
            collateral: token,
            minJoustAmount: _minJoustAmount,
            supportedJoustTypes: 3,
            endTime: uint32(_endTime)
        });

        createPool(newPool);
        (
            /*uint256 id*/
            ,
            address arbiterStored,
            uint16 arbiterFeeStored,
            /*arbiterAccepted*/
            ,
            /*bool isClosed*/
            ,
            ,
            ERC20 collateralStored,
            uint256 minJoustAmountStored,
            ,
            ,
            ,
            uint256 endTimeStored
        ) = joustContract.pools(0);

        assertEq(arbiterStored, arbiter);
        assertEq(arbiterFeeStored, _arbiterFee);
        assertEq(_minJoustAmount, minJoustAmountStored);
        assertEq(address(collateralStored), address(token));
        assertEq(endTimeStored, _endTime);
    }

    function test_createPool_revertsIfCollateralNotSupported(address randomToken) public {
        vm.assume(randomToken != address(token) && randomToken > address(65535));
        JoustArena.CreatePoolParams memory newPool = JoustArena.CreatePoolParams({
            arbiter: arbiter,
            arbiterFee: ARBITER_FEE,
            collateral: ERC20(randomToken), // Unsupported collateral
            minJoustAmount: 1e18,
            supportedJoustTypes: 3,
            endTime: uint32(block.timestamp + 1 days)
        });

        vm.expectRevert(abi.encodeWithSelector(Errors.CollateralNotSupported.selector, address(newPool.collateral)));
        createPool(newPool);
    }

    function test_settleJoust() public {
        // Arrange: Create a bet and move forward in time
        JoustArena.CreatePoolParams memory createPoolParmas = JoustArena.CreatePoolParams({
            arbiter: arbiter,
            collateral: token,
            minJoustAmount: 1e18,
            supportedJoustTypes: 3,
            endTime: uint32(block.timestamp + 1 days),
            arbiterFee: ARBITER_FEE
        });
        JoustArena.GetPool memory newPool = createPool(createPoolParmas);

        JoustArenaStorageV1.Joust memory joust1 =
            JoustArenaStorageV1.Joust({id: newPool.id, amount: 2e18, /*amount1*/ player: participant1, joustType: 1});
        JoustArenaStorageV1.Joust memory joust2 =
            JoustArenaStorageV1.Joust({id: newPool.id, amount: 3e18, /*amount2*/ player: participant2, joustType: 2});
        JoustArenaStorageV1.Joust memory joust3 =
            JoustArenaStorageV1.Joust({id: newPool.id, amount: 5e18, /*amount3*/ player: participant3, joustType: 3});

        vm.prank(participant1);
        joustContract.createJoust(joust1); // Loser
        vm.prank(participant2);
        joustContract.createJoust(joust2); // Loser
        vm.prank(participant3);
        joustContract.createJoust(joust3); // Winner

        uint8 winningJoustType = 3; // Winning type

        // Forward time to allow settlement
        vm.warp(block.timestamp + 2 days);

        vm.startPrank(owner);

        uint256 ownerBalBefore = token.balanceOf(owner);
        uint256 arbiterBalBefore = token.balanceOf(arbiter);
        uint256 winnerBalBefore = token.balanceOf(participant3);

        JoustArena.GetPool memory pool = joustContract.getPool(newPool.id);

        vm.expectEmit(true, true, true, true);
        emit JoustArena.PoolSettled(pool.id, owner, winningJoustType, pool.totalAmount, address(token));

        joustContract.settlePoolAndPayout(pool.id, winningJoustType);

        uint256 houseCut = (pool.totalAmount * HOUSE_FEE) / ONE_HUNDRED_BPS; // = 0.10 ETH
        uint256 arbiterCut = (pool.totalAmount * ARBITER_FEE) / ONE_HUNDRED_BPS; // = 0.05 ETH
        uint256 expectedPayout = pool.totalAmount - houseCut - arbiterCut;

        assertEq(token.balanceOf(owner), ownerBalBefore + houseCut);
        assertEq(token.balanceOf(arbiter), arbiterBalBefore + arbiterCut);
        assertEq(token.balanceOf(participant3), winnerBalBefore + expectedPayout);

        vm.stopPrank();
    }

    function test_settlePoolAndPayout_withEthCollateral() public {
        // Give participants some ETH
        vm.deal(participant1, 5 ether);
        vm.deal(participant2, 5 ether);
        vm.deal(participant3, 5 ether);

        // Create a new pool with ETH as collateral
        JoustArena.CreatePoolParams memory ethPool = JoustArena.CreatePoolParams({
            arbiter: arbiter,
            arbiterFee: ARBITER_FEE,
            collateral: ERC20(address(0)), // ETH
            minJoustAmount: 1 ether,
            supportedJoustTypes: 3,
            endTime: uint32(block.timestamp + 1 days)
        });

        createPool(ethPool);

        // Create jousts using ETH
        vm.prank(participant1);
        joustContract.createJoust{value: 2 ether}(
            JoustArenaStorageV1.Joust({id: 0, amount: 2 ether, player: participant1, joustType: 1})
        );

        vm.prank(participant2);
        joustContract.createJoust{value: 3 ether}(
            JoustArenaStorageV1.Joust({id: 0, amount: 3 ether, player: participant2, joustType: 2})
        );

        vm.prank(participant3);
        joustContract.createJoust{value: 5 ether}(
            JoustArenaStorageV1.Joust({id: 0, amount: 5 ether, player: participant3, joustType: 3})
        );

        // Forward time
        vm.warp(block.timestamp + 2 days);

        uint256 ownerBalBefore = owner.balance;
        uint256 arbiterBalBefore = arbiter.balance;
        uint256 winnerBalBefore = participant3.balance;

        vm.expectEmit(true, true, true, true);
        emit JoustArena.PoolSettled(0, owner, 3, 10 ether, address(0));

        vm.startPrank(owner);
        joustContract.settlePoolAndPayout(joustContract.getPool(0).id, 3);
        vm.stopPrank();

        uint256 houseCut = (10 ether * HOUSE_FEE) / ONE_HUNDRED_BPS;
        uint256 arbiterCut = (10 ether * uint256(ARBITER_FEE)) / ONE_HUNDRED_BPS;
        uint256 expectedPayout = 10 ether - houseCut - arbiterCut;

        assertEq(owner.balance, ownerBalBefore + houseCut);
        assertEq(arbiter.balance, arbiterBalBefore + arbiterCut);
        assertEq(participant3.balance, winnerBalBefore + expectedPayout);
    }

    function test_settlePoolAndPayout_userMultipleJousts() public {
        // Give ETH to participants
        vm.deal(participant1, 10 ether);
        vm.deal(participant2, 3 ether);
        vm.deal(participant3, 3 ether);

        // Create a pool with ETH as collateral
        JoustArena.CreatePoolParams memory ethPool = JoustArena.CreatePoolParams({
            arbiter: arbiter,
            arbiterFee: ARBITER_FEE,
            collateral: ERC20(address(0)),
            minJoustAmount: 1 ether,
            supportedJoustTypes: 3,
            endTime: uint32(block.timestamp + 1 days)
        });

        createPool(ethPool);

        // Participant1 jousts three times
        vm.prank(participant1);
        joustContract.createJoust{value: 2 ether}(
            JoustArenaStorageV1.Joust({id: 0, amount: 2 ether, player: participant1, joustType: 2})
        );

        vm.prank(participant1);
        joustContract.createJoust{value: 1 ether}(
            JoustArenaStorageV1.Joust({id: 0, amount: 1 ether, player: participant1, joustType: 2})
        );

        vm.prank(participant1);
        joustContract.createJoust{value: 2 ether}(
            JoustArenaStorageV1.Joust({id: 0, amount: 2 ether, player: participant1, joustType: 1})
        );

        // Participant2 jousts on type 3
        vm.prank(participant2);
        joustContract.createJoust{value: 2 ether}(
            JoustArenaStorageV1.Joust({id: 0, amount: 2 ether, player: participant2, joustType: 3})
        );

        // Participant3 jousts on type 1
        vm.prank(participant3);
        joustContract.createJoust{value: 1 ether}(
            JoustArenaStorageV1.Joust({id: 0, amount: 1 ether, player: participant3, joustType: 1})
        );

        // Forward time to allow settlement
        vm.warp(block.timestamp + 2 days);

        uint256 ownerBalBefore = owner.balance;
        uint256 arbiterBalBefore = arbiter.balance;
        uint256 winnerBalBefore = participant1.balance;

        // Settle with winning type 2
        vm.expectEmit(true, true, true, true);
        emit JoustArena.PoolSettled(0, arbiter, 2, 8 ether, address(0));

        vm.startPrank(arbiter);
        joustContract.settlePoolAndPayout(joustContract.getPool(0).id, 2);

        (, uint256 sumWinningBets) = joustContract.getJoustsMadeWithType(0, 2);
        uint256 totalPool = 8 ether;
        uint256 totalLosses = 5 ether;
        uint256 grossPayout = sumWinningBets * 2;

        uint256 houseCut = (totalPool * HOUSE_FEE) / ONE_HUNDRED_BPS;
        uint256 arbiterCut = (totalPool * ARBITER_FEE) / ONE_HUNDRED_BPS;

        uint256 leftoverAfterFees = (totalPool - grossPayout) - houseCut - arbiterCut;
        uint256 participant1LossRefund = (leftoverAfterFees * 2 ether) / totalLosses; // losing refund shared amongst all losers proportionately

        assertEq(owner.balance, ownerBalBefore + houseCut);
        assertEq(arbiter.balance, arbiterBalBefore + arbiterCut);
        assertEq(participant1.balance, winnerBalBefore + grossPayout + participant1LossRefund);
    }

    function test_closePool() public {
        JoustArena.CreatePoolParams memory newPool = JoustArena.CreatePoolParams({
            arbiter: arbiter,
            arbiterFee: ARBITER_FEE,
            collateral: token,
            minJoustAmount: 1e18,
            supportedJoustTypes: 3,
            endTime: uint32(block.timestamp + 1 days)
        });

        JoustArena.GetPool memory pool = createPool(newPool);
        // Allow joust before closing
        JoustArenaStorageV1.Joust memory joust1 =
            JoustArenaStorageV1.Joust({id: pool.id, amount: 2e18, player: participant1, joustType: 1});

        vm.prank(participant1);
        joustContract.createJoust(joust1);

        // Expect PoolClosed event
        vm.expectEmit(true, true, false, false);
        emit JoustArena.PoolClosed(pool.id, arbiter);

        vm.prank(arbiter);
        joustContract.closePool(pool.id);

        // Assert pool is closed
        (,,,, bool isClosed,,,,,,,) = joustContract.pools(0);
        assertTrue(isClosed);

        // Try jousting after closing
        JoustArenaStorageV1.Joust memory joust2 =
            JoustArenaStorageV1.Joust({id: 0, amount: 2e18, player: participant2, joustType: 1});
        vm.prank(participant2);
        vm.expectRevert(abi.encodeWithSelector(Errors.PoolAlreadyClosed.selector));
        joustContract.createJoust(joust2);

        // Forward time and settle
        vm.warp(block.timestamp + 2 days);
        vm.startPrank(owner);
        joustContract.settlePoolAndPayout(pool.id, 1);
        vm.stopPrank();
    }

    function test__fuzz_closePool(address randomCaller, uint256 warpTime) public {
        uint32 endTime = uint32(block.timestamp + 1 days);
        JoustArena.CreatePoolParams memory newPool = JoustArena.CreatePoolParams({
            arbiter: arbiter,
            arbiterFee: 100,
            collateral: token,
            minJoustAmount: 1e18,
            supportedJoustTypes: 3,
            endTime: endTime
        });
        JoustArena.GetPool memory pool = createPool(newPool);

        // Warp to random time before expiry
        warpTime = warpTime % 1 days;
        vm.warp(block.timestamp + warpTime);

        // Expect revert if called by random address not authorized
        vm.prank(randomCaller);
        if (randomCaller != arbiter && randomCaller != owner && randomCaller != address(authority)) {
            vm.expectRevert(abi.encodeWithSelector(Errors.OnlyAuthorized.selector, randomCaller));
            joustContract.closePool(pool.id);
        }
        vm.stopPrank();

        // Valid call from arbiter should succeed
        vm.prank(arbiter);
        vm.expectEmit(true, true, false, false);
        emit JoustArena.PoolClosed(pool.id, arbiter);
        joustContract.closePool(pool.id);

        // Ensure pool is marked closed
        (,,,, bool isClosed,,,,,,,) = joustContract.pools(pool.id);
        assertTrue(isClosed);
    }

    function test_refundPool() public {
        JoustArena.CreatePoolParams memory newPool = JoustArena.CreatePoolParams({
            arbiter: arbiter,
            arbiterFee: ARBITER_FEE,
            collateral: token,
            minJoustAmount: 1e18,
            supportedJoustTypes: 3,
            endTime: uint32(block.timestamp + 1 days)
        });

        createPool(newPool);

        // Add multiple jousts
        JoustArenaStorageV1.Joust memory joust1 =
            JoustArenaStorageV1.Joust({id: 0, amount: 5e18, player: participant1, joustType: 1});
        JoustArenaStorageV1.Joust memory joust2 =
            JoustArenaStorageV1.Joust({id: 0, amount: 3e18, player: participant2, joustType: 2});

        vm.prank(participant1);
        joustContract.createJoust(joust1);
        vm.prank(participant2);
        joustContract.createJoust(joust2);

        // Fast-forward time
        vm.warp(block.timestamp + 3 days);

        // Expect PoolRefunded event
        vm.expectEmit(true, true, true, false);
        emit JoustArena.PoolRefunded(0, owner, address(token), 8e18);

        vm.prank(owner);
        joustContract.refundPool(0);

        // Assert balances restored (minus house cut)
        assertGt(token.balanceOf(participant1), 0);
        assertGt(token.balanceOf(participant2), 0);
    }

    function test_fuzz_refundPool(uint8 numberOfJousts, uint256 warpTime) public {
        vm.assume(numberOfJousts > 0 && numberOfJousts <= 10);

        // Create pool
        JoustArena.CreatePoolParams memory newPool = JoustArena.CreatePoolParams({
            arbiter: arbiter,
            arbiterFee: ARBITER_FEE,
            collateral: token,
            minJoustAmount: 1e18,
            supportedJoustTypes: 3,
            endTime: uint32(block.timestamp + 1 days)
        });

        JoustArena.GetPool memory pool = createPool(newPool);

        address[3] memory participants = [participant1, participant2, participant3];
        uint256 totalAmount = 0;

        // Track initial balances and individual joust amounts per participant
        uint256[3] memory initialBalances;
        uint256[3] memory totalJoustAmounts;
        for (uint8 i = 0; i < 3; i++) {
            initialBalances[i] = token.balanceOf(participants[i]);
        }

        // Create jousts
        for (uint8 i = 0; i < numberOfJousts; i++) {
            address p = participants[i % 3];
            uint256 amount = (i + 1) * 1e18;
            token.mint(p, amount);

            // Track total joust amount per participant
            totalJoustAmounts[i % 3] += amount;

            vm.prank(p);
            joustContract.createJoust(
                JoustArenaStorageV1.Joust({id: pool.id, amount: amount, player: p, joustType: (i % 3) + 1})
            );
            vm.stopPrank();
            totalAmount += amount;
        }

        // Note: Balances after jousting not needed for this test since we track initial + joust amounts

        // Record owner and arbiter balances before refund
        uint256 ownerBalanceBefore = token.balanceOf(owner);
        uint256 arbiterBalanceBefore = token.balanceOf(arbiter);

        // Warp past end time
        warpTime = warpTime % 3 days;
        vm.warp(block.timestamp + 1 days + warpTime);

        // Expect refund event
        vm.expectEmit(true, true, true, false);
        emit JoustArena.PoolRefunded(pool.id, owner, address(token), totalAmount);

        // Refund pool
        vm.prank(owner);
        joustContract.refundPool(pool.id);

        // Verify each participant received their exact joust amounts back (no fees charged)
        for (uint8 i = 0; i < 3; i++) {
            uint256 expectedBalance = initialBalances[i] + totalJoustAmounts[i];
            uint256 actualBalance = token.balanceOf(participants[i]);
            assertEq(
                actualBalance,
                expectedBalance,
                string(abi.encodePacked("Participant ", vm.toString(i), " should receive full refund"))
            );
        }

        // Verify no fees were charged to owner or arbiter during refund
        assertEq(token.balanceOf(owner), ownerBalanceBefore, "Owner should not receive fees on refund");
        assertEq(token.balanceOf(arbiter), arbiterBalanceBefore, "Arbiter should not receive fees on refund");
    }

    function test_getPoolAndGetJousts() public {
        JoustArena.CreatePoolParams memory newPool = JoustArena.CreatePoolParams({
            arbiter: arbiter,
            arbiterFee: ARBITER_FEE,
            collateral: token,
            minJoustAmount: 1e18,
            supportedJoustTypes: 3,
            endTime: uint32(block.timestamp + 1 days)
        });

        JoustArena.GetPool memory pool = createPool(newPool);

        JoustArenaStorageV1.Joust memory joust1 =
            JoustArenaStorageV1.Joust({id: pool.id, amount: 5e18, player: participant1, joustType: 1});

        vm.prank(participant1);
        joustContract.createJoust(joust1);

        JoustArena.GetPool memory retrievedPool = joustContract.getPool(0);
        assertEq(retrievedPool.arbiter, arbiter);
        assertEq(retrievedPool.minJoustAmount, 1e18);

        JoustArenaStorageV1.Joust[] memory retrievedJousts = joustContract.getJousts(0);
        assertEq(retrievedJousts.length, 1);
        assertEq(retrievedJousts[0].player, participant1);
        assertEq(retrievedJousts[0].amount, 5e18);
    }

    function test_acceptArbiterDelegation() public {
        JoustArena.CreatePoolParams memory newPool = JoustArena.CreatePoolParams({
            arbiter: address(participant1),
            arbiterFee: ARBITER_FEE,
            collateral: token,
            minJoustAmount: 1e18,
            supportedJoustTypes: 3,
            endTime: uint32(block.timestamp + 1 days)
        });

        createPool(newPool);

        vm.prank(participant2);
        vm.expectRevert(abi.encodeWithSelector(Errors.ArbiterMustAcceptBeforeJousting.selector));
        joustContract.createJoust(JoustArenaStorageV1.Joust({id: 0, amount: 1e18, player: participant2, joustType: 1}));
        // Assert: Pool is not accepted yet
        (,,,, bool arbiterAccepted,,,,,,,) = joustContract.pools(0);
        assertFalse(arbiterAccepted);

        // Act: Accept delegation
        vm.prank(participant1);
        joustContract.acceptArbiterDelegation(0);

        // Assert: Check that the pool's arbiterAccepted is true
        (,,, arbiterAccepted,,,,,,,,) = joustContract.pools(0);
        assertTrue(arbiterAccepted);

        // Now participant2 can create a joust
        vm.prank(participant2);
        joustContract.createJoust(JoustArenaStorageV1.Joust({id: 0, amount: 1e18, player: participant2, joustType: 1}));
        // Check that the joust was created successfully
        JoustArenaStorageV1.Joust[] memory jousts = joustContract.getJousts(0);
        assertEq(jousts.length, 1);
        assertEq(jousts[0].player, participant2);
    }

    // auditor tests:

    function test_joustPostEarlyRefund() public {
        // Give participants some ETH
        vm.deal(participant1, 5 ether);
        vm.deal(participant2, 5 ether);

        // Create a new pool with ETH as collateral
        JoustArena.CreatePoolParams memory ethPool = JoustArena.CreatePoolParams({
            arbiter: arbiter,
            arbiterFee: ARBITER_FEE,
            collateral: ERC20(address(0)), // ETH
            minJoustAmount: 1 ether,
            supportedJoustTypes: 3,
            endTime: uint32(block.timestamp + 1 days)
        });

        createPool(ethPool);

        // Create jousts using ETH
        vm.prank(participant1);
        joustContract.createJoust{value: 2 ether}(
            JoustArenaStorageV1.Joust({id: 0, amount: 2 ether, player: participant1, joustType: 1})
        );

        // refund pool before expiration
        vm.prank(owner);
        joustContract.refundPool(0);

        // see can still joust after pool is refunded
        vm.prank(participant2);
        vm.expectRevert();
        joustContract.createJoust{value: 1 ether}(
            JoustArenaStorageV1.Joust({id: 0, amount: 1 ether, player: participant2, joustType: 1})
        );
    }

    function test_joustPostEarlySettle() public {
        // Give participants some ETH
        vm.deal(participant1, 5 ether);
        vm.deal(participant2, 5 ether);

        // Create a new pool with ETH as collateral
        JoustArena.CreatePoolParams memory ethPool = JoustArena.CreatePoolParams({
            arbiter: arbiter,
            arbiterFee: ARBITER_FEE,
            collateral: ERC20(address(0)), // ETH
            minJoustAmount: 1 ether,
            supportedJoustTypes: 3,
            endTime: uint32(block.timestamp + 1 days)
        });

        JoustArena.GetPool memory pool = createPool(ethPool);

        // Create jousts using ETH
        vm.prank(participant1);
        joustContract.createJoust{value: 2 ether}(
            JoustArenaStorageV1.Joust({id: 0, amount: 2 ether, player: participant1, joustType: 1})
        );

        // settle pool before expiration
        vm.startPrank(owner);
        joustContract.settlePoolAndPayout(pool.id, 3);
        vm.stopPrank();

        // see can still joust after pool is settled
        vm.prank(participant2);
        vm.expectRevert();
        joustContract.createJoust{value: 1 ether}(
            JoustArenaStorageV1.Joust({id: 0, amount: 1 ether, player: participant2, joustType: 1})
        );
    }

    function test_howManyJoustsIsTooMany() public {
        vm.pauseGasMetering();
        JoustArena.CreatePoolParams memory newPool = JoustArena.CreatePoolParams({
            arbiter: arbiter,
            arbiterFee: ARBITER_FEE,
            collateral: token,
            minJoustAmount: 1e18,
            supportedJoustTypes: 3,
            endTime: uint32(block.timestamp + 1 days)
        });
        JoustArena.GetPool memory pool = createPool(newPool);

        uint256 numOfIterations = STARTING_RANDOM_ADDRESS_NUMBER + MAX_NUM_OF_JOUSTS_PUSH_PAYMENT;
        for (uint256 i = STARTING_RANDOM_ADDRESS_NUMBER; i < numOfIterations; i++) {
            token.mint(address(uint160(i + numOfIterations)), 1e18);
            vm.prank(address(uint160(i + numOfIterations)));
            token.approve(address(joustContract), type(uint256).max);

            JoustArenaStorageV1.Joust memory joust = JoustArenaStorageV1.Joust({
                id: pool.id,
                amount: 1e18,
                player: address(uint160(i + numOfIterations)), // Ensure unique addresses
                joustType: uint8(i % 3) + 1 // Cycle through types 1, 2, 3
            });

            vm.prank(address(uint160(i + numOfIterations)));
            joustContract.createJoust(joust);
        }

        uint8 winningJoustType = 3; // Winning type

        // Forward time to allow settlement
        vm.warp(block.timestamp + 2 days);

        vm.startPrank(owner);

        // vm.expectEmit(true, true, true, true);
        // emit JoustArena.PoolSettled(pool.id, owner, winningJoustType, pool.totalAmount, address(token));

        vm.resumeGasMetering();
        joustContract.settlePoolAndPayout(pool.id, winningJoustType);

        vm.stopPrank();
    }

    function test_usersCanClaimWhenSettleAndPayoutFails() public {
        vm.pauseGasMetering();
        JoustArena.CreatePoolParams memory newPool = JoustArena.CreatePoolParams({
            arbiter: arbiter,
            arbiterFee: ARBITER_FEE,
            collateral: token,
            minJoustAmount: 1e18,
            supportedJoustTypes: 3,
            endTime: uint32(block.timestamp + 1 days)
        });
        JoustArena.GetPool memory pool = createPool(newPool);

        // Declare two sample addresses
        address sampleWinner;
        address sampleLoser;

        // we add 1000 to push the number of jousts over the limit
        uint256 numOfIterations = STARTING_RANDOM_ADDRESS_NUMBER + MAX_NUM_OF_JOUSTS_PUSH_PAYMENT + 100;
        uint8 winningJoustType = 3; // Winning type
        for (uint256 i = STARTING_RANDOM_ADDRESS_NUMBER; i < numOfIterations; i++) {
            address tempAddress = address(uint160(i + numOfIterations));
            token.mint(tempAddress, 1e18);
            vm.prank(tempAddress);
            token.approve(address(joustContract), type(uint256).max);

            JoustArenaStorageV1.Joust memory joust = JoustArenaStorageV1.Joust({
                id: pool.id,
                amount: 1e18,
                player: tempAddress, // Ensure unique addresses
                joustType: uint8(i % 3) + 1 // Cycle through types 1, 2, 3
            });

            vm.prank(tempAddress);
            joustContract.createJoust(joust);

            // Capture one winner and one loser
            if (sampleLoser == address(0) && joust.joustType != winningJoustType) {
                sampleLoser = tempAddress;
            }
            if (sampleWinner == address(0) && joust.joustType == winningJoustType) {
                sampleWinner = tempAddress;
            }
        }

        // Forward time to allow settlement
        vm.warp(block.timestamp + 2 days);

        vm.startPrank(owner);
        vm.expectRevert();
        joustContract.settlePoolAndPayout(pool.id, winningJoustType);
        vm.stopPrank();

        vm.startPrank(arbiter);
        joustContract.settlePool(pool.id, winningJoustType);
        vm.stopPrank();

        // Focused assertions for winner and loser
        uint256 winnerBefore = token.balanceOf(sampleWinner);
        uint256 loserBefore = token.balanceOf(sampleLoser);

        // Winner claim
        vm.prank(sampleWinner);
        joustContract.claimPayout(pool.id, sampleWinner);
        uint256 winnerAfter = token.balanceOf(sampleWinner);
        // Winner staked 1 ETH, capped payout doubles stake: 1e18 stake + 1e18 payout = 2e18 return
        assertEq(winnerAfter, winnerBefore + 2e18);

        uint256 totalAmount = 3900e18; // Total amount in the pool
        uint256 houseCut = (totalAmount * HOUSE_FEE) / ONE_HUNDRED_BPS; // 4 800 × 2% = 96 ETH
        uint256 arbiterCut = (totalAmount * ARBITER_FEE) / ONE_HUNDRED_BPS; // 4 800 * 1% = 48 ETH
        uint256 totalFee = houseCut + arbiterCut; // = 144 ETH
        uint256 feePerLoser = totalFee / 2600;

        // Loser claim
        vm.prank(sampleLoser);
        joustContract.claimPayout(pool.id, sampleLoser);
        uint256 loserAfter = token.balanceOf(sampleLoser);
        // losers get half stake back with fees: 1e18
        assertEq(loserAfter, loserBefore + 5e17 - feePerLoser); // 0.5e18 stake - feePerLoser

        vm.resumeGasMetering();
    }

    function test_UsersCanClaimEarningsAfterSettlement() public {
        // 1. Create a pool with ERC20 collateral
        JoustArena.CreatePoolParams memory createPoolParams = JoustArena.CreatePoolParams({
            arbiter: arbiter,
            arbiterFee: ARBITER_FEE,
            collateral: token,
            minJoustAmount: 1e18,
            supportedJoustTypes: 3,
            endTime: uint32(block.timestamp + 1 days)
        });
        JoustArena.GetPool memory pool = createPool(createPoolParams);

        // 2. Three participants make jousts where participant3 wins
        JoustArenaStorageV1.Joust memory joust1 =
            JoustArenaStorageV1.Joust({id: pool.id, amount: 2e18, player: participant1, joustType: 1});
        JoustArenaStorageV1.Joust memory joust2 =
            JoustArenaStorageV1.Joust({id: pool.id, amount: 3e18, player: participant2, joustType: 2});
        JoustArenaStorageV1.Joust memory joust3 =
            JoustArenaStorageV1.Joust({id: pool.id, amount: 5e18, player: participant3, joustType: 3});

        vm.prank(participant1);
        joustContract.createJoust(joust1); // Loser
        vm.prank(participant2);
        joustContract.createJoust(joust2); // Loser
        vm.prank(participant3);
        joustContract.createJoust(joust3); // Winner

        // 3. Warp past end time
        vm.warp(block.timestamp + 2 days);

        // 4. Settle the pool without paying out as owner
        vm.startPrank(owner);
        joustContract.settlePool(pool.id, 3); // joustType 3 wins
        vm.stopPrank();

        // 5. First claimPayout call by participant3 succeeds (no revert)
        vm.prank(participant3);
        joustContract.claimPayout(pool.id, participant3);

        // 6. Second claimPayout call by participant3 reverts with AlreadyClaimed error
        vm.prank(participant3);
        vm.expectRevert(abi.encodeWithSelector(Errors.AlreadyClaimed.selector, participant3, pool.id));
        joustContract.claimPayout(pool.id, participant3);

        vm.prank(participant1);
        vm.expectRevert(abi.encodeWithSelector(Errors.NoPayoutForPlayer.selector));
        joustContract.claimPayout(pool.id, participant1);

        // initial 50e18 minted, minus 5e18 deposit, plus 9.7e18 payout
        uint256 initial = 50e18;
        uint256 deposit = 5e18;
        uint256 houseCut = (10e18 * HOUSE_FEE) / ONE_HUNDRED_BPS; // 0.2e18
        uint256 arbiterCut = (10e18 * uint256(ARBITER_FEE)) / ONE_HUNDRED_BPS; // 0.1e18
        uint256 payout = 10e18 - houseCut - arbiterCut; // 9.7e18

        assertEq(token.balanceOf(participant3), initial - deposit + payout);

        vm.prank(arbiter);
        vm.expectRevert(abi.encodeWithSelector(Errors.PoolAlreadySettled.selector));
        joustContract.settlePoolAndPayout(pool.id, 3);
    }

    function test_anyoneCanRefundOneDayAfterExpiration() public {
        JoustArena.CreatePoolParams memory newPool = JoustArena.CreatePoolParams({
            arbiter: arbiter,
            arbiterFee: ARBITER_FEE,
            collateral: token,
            minJoustAmount: 1e18,
            supportedJoustTypes: 3,
            endTime: uint32(block.timestamp + 1 days)
        });

        JoustArena.GetPool memory pool = createPool(newPool);

        // Add a joust so pool has funds
        JoustArenaStorageV1.Joust memory joust =
            JoustArenaStorageV1.Joust({id: pool.id, amount: 5e18, player: participant1, joustType: 1});

        vm.prank(participant1);
        joustContract.createJoust(joust);

        // Warp to 1 day + 1 second after expiration
        vm.warp(pool.endTime + 1 days + 1);

        // Expect refund event from anyone (here: participant2)
        vm.expectEmit(true, true, true, false);
        emit JoustArena.PoolRefunded(pool.id, participant2, address(token), 5e18);

        vm.prank(participant2);
        joustContract.refundPool(pool.id);
    }

    function test_losersRefundedWhenLosingAmountExceedsMaxWinningPayout() public {
        // Setup participants with ETH
        vm.deal(participant1, 10 ether);
        vm.deal(participant2, 10 ether);
        vm.deal(participant3, 10 ether);

        // Create pool with ETH collateral
        JoustArena.CreatePoolParams memory ethPool = JoustArena.CreatePoolParams({
            arbiter: arbiter,
            arbiterFee: ARBITER_FEE,
            collateral: ERC20(address(0)),
            minJoustAmount: 1 ether,
            supportedJoustTypes: 2,
            endTime: uint32(block.timestamp + 1 days)
        });

        createPool(ethPool);

        // Participant 1 & 2 joust on type 1 (losers)
        vm.prank(participant1);
        joustContract.createJoust{value: 4 ether}(
            JoustArenaStorageV1.Joust({id: 0, amount: 4 ether, player: participant1, joustType: 1})
        );

        vm.prank(participant2);
        joustContract.createJoust{value: 4 ether}(
            JoustArenaStorageV1.Joust({id: 0, amount: 4 ether, player: participant2, joustType: 1})
        );

        // Participant 3 jousts on type 2 (winner)
        vm.prank(participant3);
        joustContract.createJoust{value: 1 ether}(
            JoustArenaStorageV1.Joust({id: 0, amount: 1 ether, player: participant3, joustType: 2})
        );

        // Warp past end time to settle
        vm.warp(block.timestamp + 2 days);

        uint256 participant1BalBefore = participant1.balance;
        uint256 participant2BalBefore = participant2.balance;
        uint256 participant3BalBefore = participant3.balance;

        uint256 ownerBalBefore = owner.balance;
        uint256 arbiterBalBefore = arbiter.balance;

        vm.startPrank(owner);

        // Settle with winning joust type 2
        joustContract.settlePoolAndPayout(0, 2);

        uint256 houseCut = (9 ether * uint256(HOUSE_FEE)) / ONE_HUNDRED_BPS;
        uint256 arbiterCut = (9 ether * uint256(ARBITER_FEE)) / ONE_HUNDRED_BPS;

        uint256 totalFee = houseCut + arbiterCut;

        assertEq(participant3.balance, participant3BalBefore + 2 ether);
        assertEq(participant1.balance, participant1BalBefore + 3.5 ether - (totalFee / 2));
        assertEq(participant2.balance, participant2BalBefore + 3.5 ether - (totalFee / 2));

        // Check house and arbiter got their cuts
        assertEq(owner.balance, ownerBalBefore + houseCut);
        assertEq(arbiter.balance, arbiterBalBefore + arbiterCut);

        vm.stopPrank();
    }

    function test_winnerPaysAllFeesIfNoLosers() public {
        // 1) Give participant1 some ETH and create pool
        vm.deal(participant1, 10 ether);
        JoustArena.CreatePoolParams memory params = JoustArena.CreatePoolParams({
            arbiter: arbiter,
            arbiterFee: ARBITER_FEE,
            collateral: ERC20(address(0)), // ETH
            minJoustAmount: 1 ether,
            supportedJoustTypes: 2,
            endTime: uint32(block.timestamp + 1 days)
        });
        createPool(params);

        // 2) Only participant1 jousts on type 1
        vm.prank(participant1);
        joustContract.createJoust{value: 5 ether}(
            JoustArenaStorageV1.Joust({id: 0, amount: 5 ether, player: participant1, joustType: 1})
        );

        // Add a loser who bets 1 ETH on a different outcome
        vm.deal(participant2, 1 ether);
        vm.prank(participant2);
        joustContract.createJoust{value: 1 ether}(
            JoustArenaStorageV1.Joust({id: 0, amount: 1 ether, player: participant2, joustType: 2})
        );

        // 3) Warp to expiration
        vm.warp(block.timestamp + 2 days);

        // 4) Record balances
        uint256 winnerBefore = participant1.balance;
        uint256 ownerBefore = owner.balance;
        uint256 arbBefore = arbiter.balance;

        // 5) Settle and pay out
        vm.startPrank(owner);
        joustContract.settlePoolAndPayout(0, 1);
        vm.stopPrank();

        // 6) Compute expected fees on full pool (5 ETH)
        uint256 houseFee = (6 ether * HOUSE_FEE) / ONE_HUNDRED_BPS; // 0.10 ETH
        uint256 arbFee = (6 ether * uint256(ARBITER_FEE)) / ONE_HUNDRED_BPS; // 0.05 ETH
        uint256 totalFee = houseFee + arbFee; // 0.15 ETH

        // 7) Winner gets stake minus totalFee
        assertEq(participant1.balance, winnerBefore + 6 ether - totalFee, "winner net after paying full pool fees");

        // 8) Owner and arbiter get their cuts
        assertEq(owner.balance, ownerBefore + houseFee, "house cut");
        assertEq(arbiter.balance, arbBefore + arbFee, "arbiter cut");
    }

    function test_getSettlementSummary_consistencyAndCorrectness() public {
        // Setup: simple ERC20 pool with one winner and two losers (same numbers as test_settleJoust)
        JoustArena.CreatePoolParams memory params = JoustArena.CreatePoolParams({
            arbiter: arbiter,
            arbiterFee: ARBITER_FEE,
            collateral: token,
            minJoustAmount: 1e18,
            supportedJoustTypes: 3,
            endTime: uint32(block.timestamp + 1 days)
        });
        JoustArena.GetPool memory pool = createPool(params);

        // Jousts: p1=2, p2=3 lose; p3=5 win on type 3
        vm.prank(participant1);
        joustContract.createJoust(
            JoustArenaStorageV1.Joust({id: pool.id, amount: 2e18, player: participant1, joustType: 1})
        );
        vm.prank(participant2);
        joustContract.createJoust(
            JoustArenaStorageV1.Joust({id: pool.id, amount: 3e18, player: participant2, joustType: 2})
        );
        vm.prank(participant3);
        joustContract.createJoust(
            JoustArenaStorageV1.Joust({id: pool.id, amount: 5e18, player: participant3, joustType: 3})
        );

        // Snapshot balances before settlement
        uint256 ownerBefore = token.balanceOf(owner);
        uint256 arbiterBefore = token.balanceOf(arbiter);
        uint256 p1Before = token.balanceOf(participant1);
        uint256 p2Before = token.balanceOf(participant2);
        uint256 p3Before = token.balanceOf(participant3);

        // Call getSettlementSummary after balance snapshot but before settlement
        JoustArena.SettlementSummary memory first = joustContract.getSettlementSummary(pool.id, 3);

        // warp & settle
        vm.warp(block.timestamp + 2 days);
        vm.startPrank(owner);
        joustContract.settlePoolAndPayout(pool.id, 3);
        vm.stopPrank();

        // Compute expected fees and payouts
        uint256 totalPool = 10e18;
        uint256 expectedHouse = (totalPool * HOUSE_FEE) / ONE_HUNDRED_BPS; // 2% of 10e18 = 0.2e18
        uint256 expectedArb = (totalPool * ARBITER_FEE) / ONE_HUNDRED_BPS; // 1% of 10e18 = 0.1e18
        uint256 expectedWinnerNet = totalPool - expectedHouse - expectedArb; // 9.7e18

        // Assert balances after settlement
        uint256 ownerAfter = token.balanceOf(owner);
        uint256 arbiterAfter = token.balanceOf(arbiter);
        uint256 p1After = token.balanceOf(participant1);
        uint256 p2After = token.balanceOf(participant2);
        uint256 p3After = token.balanceOf(participant3);

        // Check fee transfers
        assertEq(ownerAfter, ownerBefore + expectedHouse, "owner fee incorrect");
        assertEq(arbiterAfter, arbiterBefore + expectedArb, "arbiter fee incorrect");

        // p1Before/p2Before were recorded AFTER their stakes were already transferred to the contract, so they should be unchanged.
        assertEq(p1After, p1Before, "p1 final bal mismatch");
        assertEq(p2After, p2Before, "p2 final bal mismatch");

        // p3Before already reflected the 5e18 stake transfer, so just add the net payout.
        assertEq(p3After, p3Before + expectedWinnerNet, "p3 final bal mismatch");

        // Call view twice (before and after claims) to ensure it doesn't change
        JoustArena.SettlementSummary memory second = joustContract.getSettlementSummary(pool.id, 3);

        // 2. Check fee totals
        assertEq(first.totalHouseFee, expectedHouse, "house fee mismatch");
        assertEq(first.totalArbiterFee, expectedArb, "arb fee mismatch");

        // 3. Find each participant and validate net/gross payouts
        // Winner gets totalPool - fees = 9.7e18 (since losers' total < 2x cap, no loser refund)
        bool sawP1;
        bool sawP2;
        bool sawP3;
        for (uint256 i = 0; i < first.payouts.length; i++) {
            JoustArena.PayoutDetail memory p = first.payouts[i];

            if (p.player == participant3) {
                sawP3 = true;
                assertTrue(p.isWinner, "p3 should be winner");
                assertEq(p.netPayout, expectedWinnerNet, "winner net");
                // gross = net + fee shares
                assertEq(p.grossPayout, p.netPayout + p.houseFee + p.arbiterFee, "p3 gross mismatch");
            } else if (p.player == participant1) {
                sawP1 = true;
                assertFalse(p.isWinner, "p1 loser");
                // losers get zero in this scenario
                assertEq(p.netPayout, 0, "p1 net should be 0");
                assertEq(p.grossPayout, 0, "p1 gross should be 0");
            } else if (p.player == participant2) {
                sawP2 = true;
                assertFalse(p.isWinner, "p2 loser");
                assertEq(p.netPayout, 0, "p2 net should be 0");
                assertEq(p.grossPayout, 0, "p2 gross should be 0");
            }
        }

        assertTrue(sawP1 && sawP2 && sawP3, "did not see all participants in summary");

        // 4. Ensure second call matches first exactly (length and each element)
        assertEq(first.payouts.length, second.payouts.length, "length mismatch");
        for (uint256 i = 0; i < first.payouts.length; i++) {
            JoustArena.PayoutDetail memory a = first.payouts[i];
            JoustArena.PayoutDetail memory b = second.payouts[i];
            assertEq(a.player, b.player, "player mismatch");
            assertEq(a.netPayout, b.netPayout, "net mismatch");
            assertEq(a.grossPayout, b.grossPayout, "gross mismatch");
            assertEq(a.houseFee, b.houseFee, "house fee mismatch");
            assertEq(a.arbiterFee, b.arbiterFee, "arb fee mismatch");
            assertEq(a.isWinner, b.isWinner, "winner flag mismatch");
        }
    }

    // Tests for house fee configuration
    function test_setHouseFee_onlyOwner() public {
        uint256 newHouseFee = 500; // 5%

        vm.prank(owner);
        joustContract.setHouseFee(newHouseFee);

        assertEq(joustContract.houseFee(), newHouseFee, "House fee should be updated");
    }

    function test_setHouseFee_nonOwnerFails() public {
        uint256 newHouseFee = 500; // 5%

        vm.prank(participant1);
        vm.expectRevert(abi.encodeWithSignature("OwnableUnauthorizedAccount(address)", participant1));
        joustContract.setHouseFee(newHouseFee);
    }

    function test_setHouseFee_maxLimitEnforced() public {
        uint256 maxHouseFee = 1000; // 10%
        uint256 tooHighHouseFee = 1001; // 10.01%

        // Setting to max should work
        vm.prank(owner);
        joustContract.setHouseFee(maxHouseFee);
        assertEq(joustContract.houseFee(), maxHouseFee, "Max house fee should be allowed");

        // Setting above max should fail
        vm.prank(owner);
        vm.expectRevert("House fee cannot exceed 10%");
        joustContract.setHouseFee(tooHighHouseFee);
    }

    function test_setHouseFee_emitsEvent() public {
        uint256 oldHouseFee = joustContract.houseFee();
        uint256 newHouseFee = 500; // 5%

        vm.prank(owner);
        vm.expectEmit(true, true, false, true);
        emit JoustArena.HouseFeeUpdated(oldHouseFee, newHouseFee);
        joustContract.setHouseFee(newHouseFee);
    }

    function test_setHouseFee_usedInSettlement() public {
        // Create a pool and set custom house fee
        uint256 customHouseFee = 500; // 5%
        vm.prank(owner);
        joustContract.setHouseFee(customHouseFee);

        JoustArena.CreatePoolParams memory params = JoustArena.CreatePoolParams({
            arbiter: arbiter,
            arbiterFee: ARBITER_FEE,
            collateral: token,
            minJoustAmount: 1e18,
            supportedJoustTypes: 3,
            endTime: uint32(block.timestamp + 1 days)
        });
        JoustArena.GetPool memory pool = createPool(params);

        // Create jousts
        vm.prank(participant1);
        joustContract.createJoust(
            JoustArenaStorageV1.Joust({id: pool.id, amount: 10e18, player: participant1, joustType: 1})
        );

        // Get settlement summary to check house fee calculation
        JoustArena.SettlementSummary memory summary = joustContract.getSettlementSummary(pool.id, 1);

        uint256 expectedHouseFee = (10e18 * customHouseFee) / ONE_HUNDRED_BPS; // 5% of 10e18 = 0.5e18
        assertEq(summary.totalHouseFee, expectedHouseFee, "House fee should use updated rate");
    }

    function test_refundPool_noFeesCharged() public {
        // Create a pool
        JoustArena.CreatePoolParams memory params = JoustArena.CreatePoolParams({
            arbiter: arbiter,
            arbiterFee: ARBITER_FEE,
            collateral: token,
            minJoustAmount: 1e18,
            supportedJoustTypes: 3,
            endTime: uint32(block.timestamp + 1 days)
        });
        JoustArena.GetPool memory pool = createPool(params);

        // Record initial balances
        uint256 p1Initial = token.balanceOf(participant1);
        uint256 p2Initial = token.balanceOf(participant2);
        uint256 ownerInitial = token.balanceOf(owner);
        uint256 arbiterInitial = token.balanceOf(arbiter);

        // Create jousts
        vm.prank(participant1);
        joustContract.createJoust(
            JoustArenaStorageV1.Joust({id: pool.id, amount: 5e18, player: participant1, joustType: 1})
        );

        vm.prank(participant2);
        joustContract.createJoust(
            JoustArenaStorageV1.Joust({id: pool.id, amount: 3e18, player: participant2, joustType: 2})
        );

        // Note: Balances after jousting not needed since we verify against initial balances

        // Refund the pool
        vm.prank(owner);
        joustContract.refundPool(pool.id);

        // Check that players got their full amounts back (no fees charged)
        assertEq(token.balanceOf(participant1), p1Initial, "P1 should get full refund");
        assertEq(token.balanceOf(participant2), p2Initial, "P2 should get full refund");

        // Check that owner and arbiter received no fees
        assertEq(token.balanceOf(owner), ownerInitial, "Owner should receive no fees on refund");
        assertEq(token.balanceOf(arbiter), arbiterInitial, "Arbiter should receive no fees on refund");
    }

    function test_houseFee_initializedCorrectly() public {
        // Deploy a new contract to test initialization
        vm.startPrank(owner);
        JoustArena newContract = new JoustArena();
        newContract.initialize();
        vm.stopPrank();

        // Check that house fee is initialized to the original value (399 = 3.99%)
        assertEq(newContract.houseFee(), 399, "House fee should be initialized to 399 basis points");
    }

    function createPool(JoustArena.CreatePoolParams memory newPool) internal returns (JoustArena.GetPool memory) {
        vm.prank(arbiter);
        uint256 poolId = joustContract.createPool(newPool);
        vm.stopPrank();
        return joustContract.getPool(poolId);
    }
}
