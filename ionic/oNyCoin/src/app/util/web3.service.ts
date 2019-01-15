import {Injectable} from '@angular/core';
import * as contract from 'truffle-contract';
import {Observable, Subject} from 'rxjs';
import {map} from "rxjs/operators";

const Tx = require('ethereumjs-tx')

declare let require: any;
const Web3 = require('web3');

let tokenAbi = [
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "spender",
                "type": "address"
            },
            {
                "name": "tokens",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "from",
                "type": "address"
            },
            {
                "name": "to",
                "type": "address"
            },
            {
                "name": "tokens",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "_totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "tokenOwner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "acceptOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "a",
                "type": "uint256"
            },
            {
                "name": "b",
                "type": "uint256"
            }
        ],
        "name": "safeSub",
        "outputs": [
            {
                "name": "c",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "to",
                "type": "address"
            },
            {
                "name": "tokens",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "a",
                "type": "uint256"
            },
            {
                "name": "b",
                "type": "uint256"
            }
        ],
        "name": "safeDiv",
        "outputs": [
            {
                "name": "c",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "spender",
                "type": "address"
            },
            {
                "name": "tokens",
                "type": "uint256"
            },
            {
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "approveAndCall",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "a",
                "type": "uint256"
            },
            {
                "name": "b",
                "type": "uint256"
            }
        ],
        "name": "safeMul",
        "outputs": [
            {
                "name": "c",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "newOwner",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "tokenAddress",
                "type": "address"
            },
            {
                "name": "tokens",
                "type": "uint256"
            }
        ],
        "name": "transferAnyERC20Token",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "tokenOwner",
                "type": "address"
            },
            {
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "remaining",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "a",
                "type": "uint256"
            },
            {
                "name": "b",
                "type": "uint256"
            }
        ],
        "name": "safeAdd",
        "outputs": [
            {
                "name": "c",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "_from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "_to",
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
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "tokens",
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
                "name": "tokenOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "tokens",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    }
];

declare let window: any;

@Injectable({providedIn: 'root'})
export class Web3Service {

    public web3;
    public oNyCoin;
    public balance;

    private accounts: string[];
    public ready = false;
    public accountsObservable = new Subject<string[]>();


    constructor() {
        this.loadContract();
    }


    public loadContract() {
        window.addEventListener('load', async () => {

            if (typeof window.web3 !== 'undefined') {
                // Use Mist/MetaMask's provider
                this.web3 = new Web3(window.web3.currentProvider);
                try {
                    // Request account access if needed
                    await window.ethereum.enable();
                    this.instantiateContract();
                    this.balance = this.getBalance(this.web3.eth.defaultAccount);
                } catch (error) {
                    console.error(error)
                    // User denied account access...
                }
            } else {
                console.log('No web3? You should consider trying MetaMask!');
                this.web3 = new Web3(new Web3.providers.HttpProvider('http://10.5.0.3:7676'));
            }
        });
    }

    public createWallet() {
        // console.log(this.web3.eth.Contract);
        // using the web3 connection to create a new wallet
        let newAccount = this.web3.eth.accounts.create();
        // public key / wallet_address -> used to transfer tokens to
        // console.log(newAccount.address);

        // private key -> should be saved by the user in order to make transactions
        // console.log(newAccount.privateKey);

        return newAccount


        // TODO: use this in registration call, add wallet_address as param
    };

    public instantiateContract() {
        // connect to smartcontract
        this.oNyCoin = new this.web3.eth.Contract(tokenAbi, '0xc6151008736f1aBcB9A1A5C53323291FEFE6CEA7', { // contract address
            from: '0x41E8C3d9112fc109BAd38E8b7c8B3f1350e18Bff', // address where tokens are placed in,
            gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
        });
        //set the default account, linked to MetaMask
        this.web3.eth.defaultAccount = this.web3.eth.accounts.currentProvider.selectedAddress;

    }

    public transferTokens(address, amount) {
        this.oNyCoin.transfer(address, amount, function (error, result) {
            if (!error) {
                // return result
                console.log(result.toString(10));
            } else {
                console.error(error)
            }
        });
    }

    public refund(amount) {
        // console.log(this.web3.eth.defaultAccount);
        // transfers tokens from base address to provided address
        // this.oNyCoin.methods.transferFrom('0x41E8C3d9112fc109BAd38E8b7c8B3f1350e18Bff', this.web3.eth.defaultAccount, 100).call(async function (error, result) {
        this.oNyCoin.methods.transfer('0x41E8C3d9112fc109BAd38E8b7c8B3f1350e18Bff', 5).send({
            from: this.web3.eth.defaultAccount
        }, async function (error, result) {
            if (!error) {
                return await result;
            } else
                await console.error(error);
        });
    }

    public async buyTokens(amount) {
        let privateKey =
            "1ED7C19BA5E342B2730D8896B31D90E3B9BC7CE3A59939DC37AFD1FE4283AD38";

        let transaction = this.oNyCoin.methods.transferFrom('0x41E8C3d9112fc109BAd38E8b7c8B3f1350e18Bff', '0xbB6F75Ef66f3eBc57D5C6595a1Ba94b4BbB3AB8d', 5)
            .send({
                from: '0x41E8C3d9112fc109BAd38E8b7c8B3f1350e18Bff',
                // gas: '2000000',
                gasPrice: '20000000000', // default gas price in wei, 20 gwei in this case
                nonce: '0x0'
            }, async function (error, result) {
                if (!error) {
                    return await result;
                } else
                    await console.error(error);
            });

        console.log(transaction);

        let signedTransaction = await this.web3.eth.accounts.signTransaction(transaction, '1ED7C19BA5E342B2730D8896B31D90E3B9BC7CE3A59939DC37AFD1FE4283AD38').then(console.log);
        await this.web3.eth.sendSignedTransaction(signedTransaction).then(console.log);
        let transactionReceipt = await this.web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);

    }

    public getTransaction(txHash) {
        // find transaction with provided transactionHash
        this.web3.eth.getTransaction(txHash, function (error, result) {
            if (!error) {
                // return result
                console.log(result.toString(10));
            } else {
                console.error(error)
            }
        });
    }

    public getBalance(address) {
        // get the tokenbalance from provided address
        this.oNyCoin.methods.balanceOf(address).call(async function (error, result) {
            if (!error) {
                // console.log(result)

                // this updates the balance in the HTML card when it is loaded. Dirty fuckin' hack though, should be refactored.
                let divs = document.getElementsByClassName('balance');
                for (let i = 0; i < divs.length; i++) {
                    document.getElementsByClassName('balance')[i].innerHTML = result;
                }
                return await result;
            } else
                console.error(error);
        });
    }

    // get all accounts on the blockchain
    private getAllAccounts() {
        this.web3.eth.getAccounts(function (error, result) {
            if (!error)
                console.log(result);
            else
                console.error(error);
        })
    }
}