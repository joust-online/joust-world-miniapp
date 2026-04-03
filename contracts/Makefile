.PHONY: update build size inspect test snap clean lint
build			:; forge soldeer update; forge build
size 			:; forge build --sizes
test 			:; forge test -vv
traces		 	:; forge test -vvvv
snap 			:; forge coverage --report lcov; forge snapshot
clean 			:; forge clean
lint 			:; forge fmt
fmt 			:; forge fmt
add		    	:; forge soldeer install ${dependency}
remove			:; forge soldeer uninstall ${dependency}
deploy-mainnet 	:; source .env && forge script script/DeployJoustArena.s.sol:DeployJoustArena --private-key $$DEPLOYER_PRIVATE_KEY --rpc-url $$WORLD_CHAIN_RPC --chain 480 --broadcast
