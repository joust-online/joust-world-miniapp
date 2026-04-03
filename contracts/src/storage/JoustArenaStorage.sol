// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.29;

import "@solmate/tokens/ERC20.sol";

/*
 ╔══════════════════════════════════════════════════════════════════════════════════════════════════╗
 ║                                   UPGRADEABLE STORAGE PATTERN                                   ║
 ║                                                                                                  ║
 ║  This contract protects your storage layout during upgrades. Here's how to use it:              ║
 ║                                                                                                  ║
 ║  🔒 NEVER MODIFY V1 - It's locked forever to prevent storage corruption                         ║
 ║                                                                                                  ║
 ║  📋 TO ADD NEW FEATURES:                                                                         ║
 ║                                                                                                  ║
 ║  1. Add new storage to JoustArenaStorageV2:                                                     ║
 ║     mapping(address => uint256) public userTotalStaked;  // Uses V1 gap[0]                     ║
 ║     uint256[44] private __gap_v2;  // V1 had 45, we used 1, so 44 remain                       ║
 ║                                                                                                  ║
 ║  2. Change JoustArena inheritance:                                                               ║
 ║     contract JoustArena is ..., JoustArenaStorageV2, ... {                                      ║
 ║                                                                                                  ║
 ║  3. Add your functions:                                                                          ║
 ║     function getUserTotalStaked(address user) external view returns (uint256) {                ║
 ║         return userTotalStaked[user];                                                            ║
 ║     }                                                                                            ║
 ║                                                                                                  ║
 ║  4. Deploy new implementation and upgrade:                                                       ║
 ║     forge create src/JoustArena.sol:JoustArena --private-key $KEY --rpc-url $RPC               ║
 ║     cast send $PROXY_ADDRESS "upgradeToAndCall(address,bytes)" $NEW_IMPL 0x --private-key $KEY ║
 ║                                                                                                  ║
 ║  🔄 FOR FUTURE UPGRADES (V3, V4, etc):                                                          ║
 ║     - Create JoustArenaStorageV3 inheriting from V2                                             ║
 ║     - Add new storage variables to V3                                                            ║
 ║     - Change contract to inherit from V3                                                         ║
 ║     - Deploy and upgrade                                                                         ║
 ║                                                                                                  ║
 ║  ⚠️  CRITICAL RULES:                                                                             ║
 ║     - Never modify existing structs (Pool, Joust) - use separate mappings instead              ║
 ║     - Never reorder or remove existing storage variables                                         ║
 ║     - Always inherit from the previous version (V2 extends V1, V3 extends V2)                  ║
 ║     - Always reduce __gap size when adding new variables                                         ║
 ║                                                                                                  ║
 ╚══════════════════════════════════════════════════════════════════════════════════════════════════╝
*/

/// @title JoustArenaStorageV1
/// @notice Defines the base storage layout for JoustArena contracts
/// @dev CRITICAL: Never change the order of existing variables. Only add new ones in new versions.
/// @dev This contract locks in the storage layout to prevent corruption during upgrades
abstract contract JoustArenaStorageV1 {
    /// @dev Struct used to store joust information
    /// WARNING: Do NOT modify this struct. Use separate mappings for new fields.
    struct Joust {
        uint256 id; // The ID of the pool
        uint256 amount; // The amount of collateral they are betting
        address player; // The address of the player
        uint8 joustType; // 0 = null, 1 = no, 2 = yes, 3+ = optional additional joust types
    }

    /// @dev Struct used to store pool information
    /// WARNING: Do NOT modify this struct. Use separate mappings for new fields.
    struct Pool {
        uint256 id; // The ID of the pool
        address arbiter; // The address of the arbiter
        uint16 arbiterFee; // The fee taken by the arbiter
        bool arbiterAccepted; // Whether the arbiter has accepted the pool
        bool isClosed; // Whether the pool is closed for jousting (not the same as settled)
        bool isSettledAndPaid; // Whether the pool has been settled
        ERC20 collateral; // The address of the collateral token, if 0 then it is ETH
        mapping(uint8 joustType => uint256 joustCount) joustsMadeWithType;
        mapping(uint8 joustType => uint256 totalAmount) amountSumForType;
        mapping(address => bool) claimed; // Mapping to track if a user has claimed their payout
        uint256 minJoustAmount; // The minimum amount of tokens required to joust
        uint256 totalAmount; // The sum of all jousts in a pool
        uint8 supportedJoustTypes; // The number of supported joust types (0 = null, 1 = no, 2 = yes, 3+ = optional additional joust types)
        uint8 winningJoustType; // The winning joust type (1 = no, 2 = yes, 3+ = optional additional joust types)
        uint32 endTime; // The expiration date of the pool
    }

    // ============================================
    // STORAGE LAYOUT - DO NOT REORDER OR REMOVE
    // ============================================

    /// @dev Storage slot 0: incremental pool ID counter
    uint256 public poolCounter;

    /// @dev Storage slot 1: mapping of pool ID to pool details
    mapping(uint256 => Pool) public pools;

    /// @dev Storage slot 2: mapping of pool ID to list of jousts
    mapping(uint256 => Joust[]) public jousts;

    /// @dev Storage slot 3: mapping to track if a collateral token is supported
    mapping(ERC20 => bool) public isCollateralSupported;

    /// @dev Storage slot 4: paused state of the contract
    bool internal paused;

    /// @dev Storage slot 5: house fee in basis points (e.g., 399 = 3.99%)
    uint256 public houseFee;

    // ============================================
    // STORAGE GAP FOR FUTURE UPGRADES
    // ============================================

    /// @dev Reserved storage slots for future contract upgrades
    /// @notice These slots can be consumed by adding new storage variables in V2, V3, etc.
    /// @notice Each consumed slot should reduce this array size by 1
    /// @notice Total slots reserved: 44 (consumed 1 for houseFee)
    uint256[44] private __gap;
}

/// @title JoustArenaStorageV2
/// @notice Storage additions for future upgrades
/// @dev Add new storage variables here when needed. Always inherit from V1.
abstract contract JoustArenaStorageV2 is JoustArenaStorageV1 {
    // ============================================
    // FUTURE STORAGE ADDITIONS
    // ============================================

    // When you need new features, add mappings here:
    // Example: mapping(address => uint256) public userTotalStaked;
    // Example: mapping(uint256 => uint256) public poolCreationTime;

    // ============================================
    // V2 STORAGE GAP
    // ============================================

    /// @dev Reserved storage slots for future upgrades
    /// @notice Consume these slots when adding new storage variables
    uint256[50] private __gap_v2;
}
