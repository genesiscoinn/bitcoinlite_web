window.addEventListener('load', async () => {
    var account;
    var newContractAddress = "0xfAf812D9cA583566527d36D52A0916f600f47DF7";
    var oldContractAddress = "0xf65bd4282a797a8fe135361bffd14e90ea496708";
    var icoContractAddress = "0x9009B9714B52E7515b08561E4257AB2071AC6189";
    var newContract;
    var oldContract;
    var icoContract;

    var oldAbi = [
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "name_",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "symbol_",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "supply_",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "maxTxPercent_",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "maxWalletPercent_",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "liquidityThresholdPercentage_",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "liquidityFee_",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "marketingFee_",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "dividendRewardsFee_",
					"type": "uint256"
				},
				{
					"internalType": "address[3]",
					"name": "addresses_",
					"type": "address[3]"
				},
				{
					"internalType": "address",
					"name": "v2Router_",
					"type": "address"
				}
			],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "owner",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "spender",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "Approval",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "account",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "bool",
					"name": "isExcluded",
					"type": "bool"
				}
			],
			"name": "ExcludeFromFees",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address[]",
					"name": "accounts",
					"type": "address[]"
				},
				{
					"indexed": false,
					"internalType": "bool",
					"name": "isExcluded",
					"type": "bool"
				}
			],
			"name": "ExcludeMultipleAccountsFromFees",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "uint256",
					"name": "newValue",
					"type": "uint256"
				},
				{
					"indexed": true,
					"internalType": "uint256",
					"name": "oldValue",
					"type": "uint256"
				}
			],
			"name": "GasForProcessingUpdated",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "newLiquidityWallet",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "oldLiquidityWallet",
					"type": "address"
				}
			],
			"name": "LiquidityWalletUpdated",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "minTokensBeforeSwap",
					"type": "uint256"
				}
			],
			"name": "MinTokensBeforeSwapUpdated",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "iterations",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "claims",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "lastProcessedIndex",
					"type": "uint256"
				},
				{
					"indexed": true,
					"internalType": "bool",
					"name": "automatic",
					"type": "bool"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "gas",
					"type": "uint256"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "processor",
					"type": "address"
				}
			],
			"name": "ProcessedDividendTracker",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				},
				{
					"indexed": true,
					"internalType": "bytes32",
					"name": "previousAdminRole",
					"type": "bytes32"
				},
				{
					"indexed": true,
					"internalType": "bytes32",
					"name": "newAdminRole",
					"type": "bytes32"
				}
			],
			"name": "RoleAdminChanged",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "account",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "sender",
					"type": "address"
				}
			],
			"name": "RoleGranted",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "account",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "sender",
					"type": "address"
				}
			],
			"name": "RoleRevoked",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "tokensSwapped",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "SendDividends",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "pair",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "bool",
					"name": "value",
					"type": "bool"
				}
			],
			"name": "SetAutomatedMarketMakerPair",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "sniperAddress",
					"type": "address"
				}
			],
			"name": "SniperCaught",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "half",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "newBalance",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "otherHalf",
					"type": "uint256"
				}
			],
			"name": "SwapAndLiquify",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "bool",
					"name": "enabled",
					"type": "bool"
				}
			],
			"name": "SwapAndLiquifyEnabledUpdated",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "from",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "Transfer",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "newAddress",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "oldAddress",
					"type": "address"
				}
			],
			"name": "UpdateDividendTracker",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "newAddress",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "oldAddress",
					"type": "address"
				}
			],
			"name": "UpdateUniswapV2Router",
			"type": "event"
		},
		{
			"inputs": [],
			"name": "DEFAULT_ADMIN_ROLE",
			"outputs": [
				{
					"internalType": "bytes32",
					"name": "",
					"type": "bytes32"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "_dividendRewardToken",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "_dividendRewardsFee",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "_isBnbReward",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "_liquidityFee",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "_marketingFee",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_routerAddress",
					"type": "address"
				}
			],
			"name": "_setupPancakeswap",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "_totalFee",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "addBotToList",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "owner",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "spender",
					"type": "address"
				}
			],
			"name": "allowance",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "spender",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "approve",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"name": "automatedMarketMakerPairs",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "balanceOf",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "burnAddress",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "liquidityFee",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "marketingFee",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "dividendFee",
					"type": "uint256"
				}
			],
			"name": "changeFees",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "claim",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "decimals",
			"outputs": [
				{
					"internalType": "uint8",
					"name": "",
					"type": "uint8"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "spender",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "subtractedValue",
					"type": "uint256"
				}
			],
			"name": "decreaseAllowance",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "dividendRewardTokenBalanceOf",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "dividendTracker",
			"outputs": [
				{
					"internalType": "contract DividendTracker",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "enableTrading",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "exclude",
					"type": "address"
				}
			],
			"name": "excludeFromDividends",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "excludeFromFee",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "excludeFromMaxTx",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "excludeFromMaxWallet",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "gasForProcessing",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "getAccountDividendsInfo",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				},
				{
					"internalType": "int256",
					"name": "",
					"type": "int256"
				},
				{
					"internalType": "int256",
					"name": "",
					"type": "int256"
				},
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "index",
					"type": "uint256"
				}
			],
			"name": "getAccountDividendsInfoAtIndex",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				},
				{
					"internalType": "int256",
					"name": "",
					"type": "int256"
				},
				{
					"internalType": "int256",
					"name": "",
					"type": "int256"
				},
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getClaimWait",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getLastProcessedIndex",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getNumberOfDividendTokenHolders",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				}
			],
			"name": "getRoleAdmin",
			"outputs": [
				{
					"internalType": "bytes32",
					"name": "",
					"type": "bytes32"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				},
				{
					"internalType": "uint256",
					"name": "index",
					"type": "uint256"
				}
			],
			"name": "getRoleMember",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				}
			],
			"name": "getRoleMemberCount",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getTotalDividendsDistributed",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				},
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "grantRole",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				},
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "hasRole",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "includeInFee",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "includeInMaxTx",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "includeInMaxWallet",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "spender",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "addedValue",
					"type": "uint256"
				}
			],
			"name": "increaseAllowance",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "isExcludedFromFee",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "isExcludedFromMaxTx",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "isExcludedFromMaxWallet",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "isSniper",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "maxTxAmountUI",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "maxWalletEnabled",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "maxWalletUI",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "name",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "pancakeswapV2Pair",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "pancakeswapV2Router",
			"outputs": [
				{
					"internalType": "contract IPancakeRouter02",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "gas",
					"type": "uint256"
				}
			],
			"name": "processDividendTracker",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "removeSniper",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				},
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "renounceRole",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				},
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "revokeRole",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "pair",
					"type": "address"
				},
				{
					"internalType": "bool",
					"name": "value",
					"type": "bool"
				}
			],
			"name": "setAutomatedMarketMakerPair",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "setBnbAsReward",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "dxRouter",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "presaleRouter",
					"type": "address"
				}
			],
			"name": "setDxSaleAddress",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address payable",
					"name": "newWallet",
					"type": "address"
				}
			],
			"name": "setLiquidityWallet",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address payable",
					"name": "newWallet",
					"type": "address"
				}
			],
			"name": "setMarketingWallet",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "maxTxPercent_",
					"type": "uint256"
				}
			],
			"name": "setMaxTxPercent",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "maxWalletPercent_",
					"type": "uint256"
				}
			],
			"name": "setMaxWalletPercent",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "liquidityThresholdPercentage_",
					"type": "uint256"
				}
			],
			"name": "setNTSAL",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bool",
					"name": "enabled",
					"type": "bool"
				}
			],
			"name": "setSniperProtectionEnabled",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bool",
					"name": "_enabled",
					"type": "bool"
				}
			],
			"name": "setSwapAndLiquifyEnabled",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "snipersCaught",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes4",
					"name": "interfaceId",
					"type": "bytes4"
				}
			],
			"name": "supportsInterface",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "swapAndLiquifyEnabled",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "symbol",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "totalSupply",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "recipient",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "transfer",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "sender",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "recipient",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "transferFrom",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "claimWait",
					"type": "uint256"
				}
			],
			"name": "updateClaimWait",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "dividendTokenAddress",
					"type": "address"
				}
			],
			"name": "updateDividendRewardToken",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "newAddress",
					"type": "address"
				}
			],
			"name": "updateDividendTracker",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "recipient",
					"type": "address"
				}
			],
			"name": "withdrawLockedETH",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "recipient",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "_token",
					"type": "address"
				}
			],
			"name": "withdrawLockedTokens",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "withdrawableDividendOf",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"stateMutability": "payable",
			"type": "receive"
		}
	];
    
	var newAbi =  [
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "name_",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "symbol_",
					"type": "string"
				},
				{
					"internalType": "uint8",
					"name": "decimals_",
					"type": "uint8"
				},
				{
					"internalType": "address",
					"name": "charityWallet_",
					"type": "address"
				},
				{
					"internalType": "contract IUniswapV2Router02",
					"name": "router_",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "taxFee_",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "liquidityFee_",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "burnFee_",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "charityFee_",
					"type": "uint256"
				}
			],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "owner",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "spender",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "Approval",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "minTokensBeforeSwap",
					"type": "uint256"
				}
			],
			"name": "MinTokensBeforeSwapUpdated",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "previousOwner",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "newOwner",
					"type": "address"
				}
			],
			"name": "OwnershipTransferred",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "tokensSwapped",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "ethReceived",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "tokensIntoLiqudity",
					"type": "uint256"
				}
			],
			"name": "SwapAndLiquify",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "bool",
					"name": "enabled",
					"type": "bool"
				}
			],
			"name": "SwapAndLiquifyEnabledUpdated",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "from",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "Transfer",
			"type": "event"
		},
		{
			"inputs": [],
			"name": "_burnFee",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "_liquidityFee",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "_taxFee",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "owner",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "spender",
					"type": "address"
				}
			],
			"name": "allowance",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "spender",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "approve",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "balanceOf",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "taxFee_",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "liquidityFee_",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "burnFee_",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "charityFee_",
					"type": "uint256"
				}
			],
			"name": "changeFees",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "decimals",
			"outputs": [
				{
					"internalType": "uint8",
					"name": "",
					"type": "uint8"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "spender",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "subtractedValue",
					"type": "uint256"
				}
			],
			"name": "decreaseAllowance",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "tAmount",
					"type": "uint256"
				}
			],
			"name": "deliver",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "excludeFromFee",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "excludeFromReward",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "geUnlockTime",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "includeInFee",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "includeInReward",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "spender",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "addedValue",
					"type": "uint256"
				}
			],
			"name": "increaseAllowance",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "isExcludedFromFee",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "isExcludedFromReward",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "time",
					"type": "uint256"
				}
			],
			"name": "lock",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "name",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "numTokensSellToAddToLiquidity",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "owner",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "tAmount",
					"type": "uint256"
				},
				{
					"internalType": "bool",
					"name": "deductTransferFee",
					"type": "bool"
				}
			],
			"name": "reflectionFromToken",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "removeAllFee",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "renounceOwnership",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "restoreAllFee",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "amount_",
					"type": "uint256"
				}
			],
			"name": "setNumOfTokenSellToAddLq",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "newRouter",
					"type": "address"
				}
			],
			"name": "setRouterAddress",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bool",
					"name": "_enabled",
					"type": "bool"
				}
			],
			"name": "setSwapAndLiquifyEnabled",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "newWallet",
					"type": "address"
				}
			],
			"name": "setcharityWallet",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "swapAndLiquifyEnabled",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "symbol",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "rAmount",
					"type": "uint256"
				}
			],
			"name": "tokenFromReflection",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "totalFees",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "totalSupply",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "recipient",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "transfer",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "sender",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "recipient",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "transferFrom",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "newOwner",
					"type": "address"
				}
			],
			"name": "transferOwnership",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "uniswapV2Pair",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "uniswapV2Router",
			"outputs": [
				{
					"internalType": "contract IUniswapV2Router02",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "unlock",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"stateMutability": "payable",
			"type": "receive"
		}
	];

    var icoAbi = [
		{
			"inputs": [
				{
					"internalType": "contract IERC20",
					"name": "token_",
					"type": "address"
				},
				{
					"internalType": "contract IERC20",
					"name": "tokenToMigrate_",
					"type": "address"
				},
				{
					"internalType": "uint8",
					"name": "private_rate_",
					"type": "uint8"
				},
				{
					"internalType": "uint8",
					"name": "public_rate_",
					"type": "uint8"
				},
				{
					"internalType": "uint8",
					"name": "tokenDecimal_",
					"type": "uint8"
				},
				{
					"internalType": "uint8",
					"name": "tokenMigrateDecimal_",
					"type": "uint8"
				},
				{
					"internalType": "uint32",
					"name": "multiplier_",
					"type": "uint32"
				},
				{
					"internalType": "uint256",
					"name": "minLimit_",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "maxLimit_",
					"type": "uint256"
				}
			],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "purchaser",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "beneficiary",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "TokensPurchased",
			"type": "event"
		},
		{
			"inputs": [],
			"name": "_isMigrationPhase",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "_multiplier",
			"outputs": [
				{
					"internalType": "uint32",
					"name": "",
					"type": "uint32"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "_tokenDecimal",
			"outputs": [
				{
					"internalType": "uint8",
					"name": "",
					"type": "uint8"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "_tokenMigrateDecimal",
			"outputs": [
				{
					"internalType": "uint8",
					"name": "",
					"type": "uint8"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "_whitelistPhase",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "_whitelisted",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"name": "_whitelists",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "beneficiary",
					"type": "address"
				}
			],
			"name": "buyTokens",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "endTime",
					"type": "uint256"
				}
			],
			"name": "changeEndTime",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bool",
					"name": "migrationPhase_",
					"type": "bool"
				},
				{
					"internalType": "bool",
					"name": "whiteListPhase_",
					"type": "bool"
				}
			],
			"name": "changePhases",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint8",
					"name": "private_rate_",
					"type": "uint8"
				},
				{
					"internalType": "uint8",
					"name": "public_rate_",
					"type": "uint8"
				}
			],
			"name": "changeRate",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "disableWhitelisting",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "endPresale",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "isPresaleOpen",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "migrate",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "openPresale",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "owner",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "pausePresale",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "contract IERC20",
					"name": "token_",
					"type": "address"
				},
				{
					"internalType": "contract IERC20",
					"name": "tokenToMigrate_",
					"type": "address"
				},
				{
					"internalType": "uint8",
					"name": "tokenDecimal_",
					"type": "uint8"
				},
				{
					"internalType": "uint8",
					"name": "tokenMigrateDecimal_",
					"type": "uint8"
				},
				{
					"internalType": "uint32",
					"name": "multiplier_",
					"type": "uint32"
				}
			],
			"name": "prepareMigration",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "presaleEndTime",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "rate",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "wallet_",
					"type": "address"
				}
			],
			"name": "removeWhitelist",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "minLimit_",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "maxLimit_",
					"type": "uint256"
				}
			],
			"name": "setBuyLimit",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "token",
			"outputs": [
				{
					"internalType": "contract IERC20",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "weiRaised",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "whiteListCount",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "whitelist",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "withdrawToken",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"stateMutability": "payable",
			"type": "receive"
		}
	];
	
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
        // activate();
    } else {
        toastr.error("No provider found! Consider using metamask.")
    }
  
    async function setAccount(){
      var accounts = await web3.eth.getAccounts();
      account = accounts[0];
      if(account){
		if(account == await icoContract.methods.owner().call()){
			$('#icolist').show();
		} else {
			$('#icolist').hide();
		}

		if((await oldContract.methods.balanceOf(account).call()) > 0){
			$('#migratelist').show();
		} else {
			$('#migratelist').hide();
		}

		if(await icoContract.methods.isPresaleOpen().call()){
			$('#opensale').removeAttr('hidden');
			$('#buy').html('Buy');
			$('#towhitelist').attr('hidden', true);
			await icoContract.methods._whitelists(account).call().then(function(state){
				if(!state || state == 'false'){
					$('#whitelist-error').removeAttr('hidden');
					$('#opensale').attr('hidden', true);
				}
			})
		} else {
			$('#whitelist-error').attr('hidden', true);
			$('#opensale').attr('hidden', true);
			$('#buy').html('Whitelist');
			$('#towhitelist').removeAttr('hidden');
		}

		if(await icoContract.methods._whitelists(account).call()){
			$('#whitelist-btn').attr('disabled', true).html('Your wallet is whitelisted.')
		} else {
			$('#whitelist-btn').removeAttr('disabled').html('Whitelist Your Wallet')
		}
      }
    }
  
    async function activate(){
      if(!account || account == 'undefined'){
        window.ethereum.enable();
		await web3.eth.net.getId().then( async function(id){
			if(id == 56){
				newContract = await new web3.eth.Contract(newAbi, newContractAddress);
				oldContract = await new web3.eth.Contract(oldAbi, oldContractAddress);
				icoContract = await new web3.eth.Contract(icoAbi, icoContractAddress);
				setAccount()
			} else {
				toastr.error('Incorrect Network. Connect to BSC Network.')
			}
		})
       
      } else {
		  setAccount();
	  }
    }
    $('#connector').on('click', function(e){
      e.preventDefault();
      activate();
    })

	window.ethereum.on('chainChanged', async (chainId) => {
		//bsc (0x38) bsc test (0x61)
		activate();
	})

    window.ethereum.on('accountsChanged', async () => {
      setAccount();
    });

    // Migration process

    $('#migrate').on('click', async function(e){
        e.preventDefault();
        if(!account){
			activate();
            return;
        }
        var balanceOld = await oldContract.methods.balanceOf(account).call();
        if(balanceOld <= 0 || balanceOld == 'undefined' || !balanceOld){
			toastr.error("No balance to migrate.");
            return;
        }
		
		dappLoader();
		var allowance = await oldContract.methods.allowance(account, icoContractAddress).call();
		if(allowance >= balanceOld){
			await icoContract.methods.migrate().send({from: account}).on('error', function(error){
				toastr.error(error.message);
			}).then(function(receipt){
				toastr.success("Migration successful");
				dappLoader(false);
			})
		} else {
			await oldContract.methods.approve(icoContractAddress, balanceOld).send({from: account}).on('error', function(error){
				toastr.error("Approve rejected");
				dappLoader(false);
			}).then(async function(receipt){
				toastr.success("Approved to spend GC.");
				await icoContract.methods.migrate().send({from: account}).then(function(receipt){
					toastr.success("Migration successful");
					dappLoader(false);
				})
			});
		}
    })

	$('#endico').on('click', async function(e){
		e.preventDefault();
		if(!account){
			activate();
			return;
		}
		dappLoader();
		await icoContract.methods.endPresale().send({from: account}).on('error', function(error){
			dappLoader(false);
		}).then(function(r){
			toastr.success("Presale Ended.");
			dappLoader(false);
		})
	})

	$('#input-value').on('change', async function(e){
		$('#rate').html('Calculating....');
		var rate = await icoContract.methods.rate().call();
		var finalValue = rate * e.target.value;
		if(finalValue && finalValue != 'undefined' && finalValue > 0){
			$('#rate').html(`<span class="badge badge-success">${finalValue}B BTCL</span>`);
			$('#swap').removeAttr('disabled');
		} else {
			$('#swap').attr('disabled', true);
			$('#rate').html('');
		}
	})
	
	$(document).on('click', "#swap", async function(){
		var inputVal = $('#input-value').val();
		if(!inputVal || inputVal == 'undefined' || inputVal <=0){
			toastr.error('Unacceptable BNB value.');
			return;
		}
		dappLoader();
		var value = await web3.utils.toWei(inputVal, 'ether');
		await web3.eth.sendTransaction({from: account, to: icoContractAddress, value: value}).on('error', function(error){
			toastr.error(error.message);
			dappLoader(false);
			$('#input-value').val('');
			$('#rate').html('');
			$('#swap').attr('disabled', true);
		}).then(function(){
			dappLoader(false);
			$('#input-value').val('');
			$('#rate').html('');
			$('#swap').attr('disabled', true);
			toastr.success(`Successful. ${finalValue}B BTCL has been sent to your wallet.`);
		})
	})

	$('#whitelist-btn').on('click', async function(){
		if(await icoContract.methods._whitelists(account).call()){
			toastr.success("Your wallet is alredy whitelisted.");
			return;
		}
		await icoContract.methods.whitelist().send({from: account}).on('error', function(error){
			toastr.error(error.message);
		}).then(function(receipt){
			toastr.success("You are whitelisted.");
			setAccount();
		})
	})
	

	function dappLoader(bool = true){
		if(bool){
			$("#dapp-loader").show();
		} else {
			$('#dapp-loader').hide();
		}
	}

  });
  