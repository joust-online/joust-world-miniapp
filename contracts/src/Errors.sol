// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.29;

/// @title Errors
/// @author dd0sxx
/// @notice This contract is used to define custom error messages for the Joust contract.
contract Errors {
    /// @dev Thrown on certain functions when the contract is paused.
    error ContractPaused();

    /// @dev Thrown when the pool ID is not zero during creation.
    error PoolIDMustBeZero(uint256 poolID);

    /// @dev Thrown when the arbiter address is zero.
    error ArbiterAddressZero();

    /// @dev Thrown when the arbiter has already accepted the pool.
    error ArbiterAlreadyAccepted();

    /// @dev Thrown when the pool end time is in the past.
    error EndTimeInPast(uint256 endTime);

    /// @dev Thrown when the minimum joust amount is zero.
    error MinJoustAmountZero();

    /// @dev Thrown when the arbiter fee exceeds allowed maximum.
    error ArbiterFeeTooHigh();

    /// @dev Thrown when total amount is not zero at pool creation.
    error TotalAmountMustBeZero(uint256 totalAmount);

    /// @dev Thrown when a pool does not exist for the provided pool ID.
    error PoolDoesNotExist(uint256 poolID);

    /// @dev Thrown when a non-arbiter tries to accept the pool.
    error OnlyArbiter(address sender);

    /// @dev Thrown when the pool is already closed.
    error PoolAlreadyClosed();

    /// @dev Thrown when an unauthorized address tries to perform an action.
    error OnlyAuthorized(address sender);

    /// @dev Thrown when the pool is closed without arbiter acceptance.
    error ArbiterMustAcceptBeforeClosing();

    /// @dev Thrown when the pool is not yet expired.
    error PoolNotExpired(uint256 currentTime, uint256 endTime);

    /// @dev Thrown when the pool has already been settled.
    error PoolAlreadySettled();

    /// @dev Thrown when trying to settle before arbiter acceptance.
    error ArbiterMustAcceptBeforeSettling();

    /// @dev Thrown when the total cut exceeds the payout.
    error CutExceedsPayout(uint256 cut, uint256 payout);

    /// @dev Thrown when the calculated net payout is zero.
    error NetPayoutZero();

    /// @dev Thrown when a non-player attempts to perform a player-only action.
    error OnlyPlayerCanJoust(address sender, address player);

    /// @dev Thrown when the joust amount is less than the minimum required.
    error AmountBelowMinimum(uint256 amount, uint256 minJoustAmount);

    /// @dev Thrown when an invalid joust type is used.
    error InvalidJoustType();

    /// @dev Thrown when the arbiter must accept the pool before a joust.
    error ArbiterMustAcceptBeforeJousting();

    /// @dev Thrown when the pool has expired.
    error PoolExpired(uint256 currentTime, uint256 endTime);

    /// @dev Thrown when the sent ETH amount does not match the expected value.
    error IncorrectETHAmount(uint256 sent, uint256 expected);

    /// @dev Thrown when ETH is sent with a token-based pool.
    error ETHSentWithToken();

    /// @dev Thrown when there is insufficient allowance for a token transfer.
    error InsufficientAllowance();

    /// @dev Thrown when an ETH payout transfer fails.
    error FailedETHPayout();

    /// @dev Thrown when a token transfer fails.
    error TokenTransferFailed();

    /// @dev Thrown when a pool is created with a collateral type that is not supported.
    error CollateralNotSupported(address collateral);

    /// @dev Thrown when a joust type is not supported, 0 or 255 due to reserved values.
    error NonSupportedJoustTypes();

    /// @dev Error for duplicate claim attempt
    error AlreadyClaimed(address user, uint256 poolId);

    /// @dev Error for attempting to claim a pool that has not been settled
    error PoolNotSettled(uint256 poolId);

    /// @dev Thrown when a player tries to claim a payout but has no payout available.
    error NoPayoutForPlayer();

    /// @dev Thrown when the owner tries to rescue a pool but adds an amount greater than the total
    error AmountExceedsPoolTotal(uint256 amount, uint256 totalAmount);

    /// @dev Thrown when a payout is attempted for a pool that is not eligible for payout (rescued or refunded)
    error PayoutNotEligible(uint256 poolId);

    error IncorrectWinningJoustType(uint256 winningJoustType);
}
