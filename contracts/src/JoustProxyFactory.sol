// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.29;

import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

/**
 * @title JoustProxyFactory
 * @author Joust Protocol
 * @notice Factory contract for deploying ERC1967 upgradeable proxies for JoustArena contracts
 * @dev This factory provides a gas-efficient way to deploy multiple proxy contracts that point
 *      to the same implementation. Each proxy is automatically configured with proper ownership
 *      transfer to the deployer.
 */
contract JoustProxyFactory {
    /**
     * @notice Emitted when a new proxy is deployed through the factory
     * @param proxy The address of the newly deployed proxy contract
     * @param implementation The address of the implementation contract the proxy points to
     */
    event ProxyDeployed(address indexed proxy, address indexed implementation);

    /**
     * @notice Deploys a new ERC1967Proxy with the specified implementation and initialization data
     * @dev The proxy will be configured to use the provided implementation contract and will
     *      execute the initialization data upon deployment. Ownership of the proxy will be
     *      transferred to the caller (msg.sender).
     * @param implementation The address of the implementation contract to proxy to
     * @param data The initialization data to be executed on the proxy after deployment
     * @return The address of the newly deployed proxy contract
     * @custom:security-note Ensure the implementation contract has proper access controls
     */
    function deployProxy(address implementation, bytes memory data) external returns (address) {
        // Deploy new ERC1967Proxy with specified implementation and initialization data
        ERC1967Proxy proxy = new ERC1967Proxy(implementation, data);

        // Transfer ownership of the proxy to the caller for proper access control
        (bool success,) = address(proxy).call(abi.encodeWithSignature("transferOwnership(address)", msg.sender));
        require(success, "Failed to transfer ownership");

        // Emit event for tracking and indexing purposes
        emit ProxyDeployed(address(proxy), implementation);

        return address(proxy);
    }
}
