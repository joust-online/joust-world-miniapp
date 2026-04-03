// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.29;

import {Script, console} from "@forge-std/Script.sol";
import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import "@solmate/tokens/ERC20.sol";
import {JoustArena} from "../src/JoustArena.sol";

contract DeployJoustArena is Script {
    JoustArena public joustArena;
    ERC1967Proxy public proxy;

    address public USDC_WORLD_CHAIN = 0x79A02482A880bCE3F13e09Da970dC34db4CD24d1;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        // Deploy implementation contract
        joustArena = new JoustArena();
        console.log("Implementation deployed at:", address(joustArena));

        // Deploy proxy with initialization
        bytes memory initData = abi.encodeWithSelector(JoustArena.initialize.selector);
        proxy = new ERC1967Proxy(address(joustArena), initData);
        console.log("Proxy deployed at:", address(proxy));

        // Get the JoustArena interface through the proxy
        JoustArena joustArenaProxy = JoustArena(address(proxy));

        // Add supported collaterals
        joustArenaProxy.addSupportedCollateral(__getUSDC());
        joustArenaProxy.addSupportedCollateral(ERC20(address(0))); // ETH

        console.log("=== DEPLOYMENT SUMMARY ===");
        console.log("Implementation:", address(joustArena));
        console.log("Proxy (USE THIS ADDRESS):", address(proxy));
        console.log("Owner:", joustArenaProxy.owner());
        console.log("Pool counter:", joustArenaProxy.poolCounter());

        // Log supported collaterals
        console.log("Supported collaterals:");
        console.log("- ETH:", joustArenaProxy.isCollateralSupported(ERC20(address(0))));
        if (address(__getUSDC()) != address(0)) {
            console.log("- USDC:", joustArenaProxy.isCollateralSupported(__getUSDC()));
        }

        vm.stopBroadcast();
    }

    function __getUSDC() private view returns (ERC20 token) {
        if (block.chainid == 480) {
            // World Chain Mainnet
            return ERC20(USDC_WORLD_CHAIN);
        }
    }
}
