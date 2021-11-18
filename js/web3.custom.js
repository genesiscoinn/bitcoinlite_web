window.addEventListener('load', async () => {
    var account;
    var newContractAddress = "0x4d27F506CCF598eDC1f4B10747De22dCD672eA76";
    var oldContractAddress = "0xF9B350DE20feb176ad055c79Ce4Fd6be6Fb04D69";
    var icoContractAddress = "0x0E6Fd16878672962FCDb48Aa9E409e9C6EFC9309";
    var newContract;
    var oldContract;
    var icoContract;

    var oldAbi = [
		{
			"inputs": [],
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
		}
	];
    
	var newAbi = [
		{
			"inputs": [],
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
					"internalType": "uint256",
					"name": "private_rate_",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "public_rate_",
					"type": "uint256"
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
					"internalType": "uint8",
					"name": "multiplier_",
					"type": "uint8"
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
			"name": "changePases",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "private_rate_",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "public_rate_",
					"type": "uint256"
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
			"stateMutability": "payable",
			"type": "receive"
		}
	];

    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
        activate();
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
		} else {
			$('#opensale').attr('hidden', true);
			$('#buy').html('Whitelist');
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
			if(id == 97){
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
  