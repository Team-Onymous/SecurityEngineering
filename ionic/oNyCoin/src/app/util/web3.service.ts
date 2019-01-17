import {Injectable} from '@angular/core';
import * as contract from 'truffle-contract';
import {Observable, Subject} from 'rxjs';
import {map} from "rxjs/operators";
import {BarService} from "../services/bar.services";
import {EncrDecrService} from "../services/EncrDecr.service";
import {UserService} from "../services/user.service";

const Tx = require('ethereumjs-tx');

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
    public userAccount;
    public tokenholderAccount;
    private contractAddress = "0xc6151008736f1aBcB9A1A5C53323291FEFE6CEA7";

    private accounts: string[];
    public ready = false;
    public accountsObservable = new Subject<string[]>();


    constructor(private barService: BarService,
                private EncrDecr: EncrDecrService,
                private userService: UserService) {
        if (this.userService.isLoggedIn()) {
            this.loadContract();
        }
    }


    public loadContract() {
        window.addEventListener('load', async () => {

            if (typeof window.web3 !== 'undefined') {
                // Use Mist/MetaMask's provider
                // this.web3 = new Web3(window.web3.currentProvider);
                this.web3 = new Web3(new Web3.providers.HttpProvider('http://107.178.245.173:8080'));
                try {
                    // Request account access if needed
                    await window.ethereum.enable();

                    this.instantiateContract();


                    let first = "ca";
                    let second = "di";
                    let string = "0x773977df7399bd027f27811c5a50ae38c905b63b08a7e00b7d63e8acb4b17527";

                    let encryptedPrivKey = this.EncrDecr.set(first + second, string);

                    let userAccount = JSON.parse(localStorage.getItem('user'));
                    let decryptedPrivKey = this.EncrDecr.get(userAccount.email.substr(0, 2) + userAccount.lastname.substr(0, 2), atob(userAccount.wallet_key));

                    //user account
                    this.userAccount = this.web3.eth.accounts.privateKeyToAccount(decryptedPrivKey);

                    let key = new Buffer(decryptedPrivKey.substr(2), 'hex');
                    //token holder account
                    this.tokenholderAccount = this.web3.eth.accounts.privateKeyToAccount('0x1ED7C19BA5E342B2730D8896B31D90E3B9BC7CE3A59939DC37AFD1FE4283AD38');

                    //set the default account
                    this.web3.eth.defaultAccount = this.tokenholderAccount.address;

                    this.balance = this.getBalance(this.userAccount.address);

                } catch (error) {
                    console.error(error)
                    // User denied account access...
                }
            } else {
                console.log('No web3? You should consider trying MetaMask!');
                this.web3 = new Web3(new Web3.providers.HttpProvider('http://107.178.245.173:8080'));
            }
        });
    }

    public createWallet() {
        // using the web3 connection to create a new wallet
        let newAccount = this.web3.eth.accounts.create();
        // public key / wallet_address -> used to transfer tokens to
        // console.log(newAccount.address);

        // private key -> should be saved by the user in order to make transactions
        // console.log(newAccount.privateKey);

        return newAccount
    };

    public instantiateContract() {
        // connect to smartcontract
        this.oNyCoin = new this.web3.eth.Contract(tokenAbi, this.contractAddress, { // contract address
            from: '0x41E8C3d9112fc109BAd38E8b7c8B3f1350e18Bff', // address where tokens are placed in,
            gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
        });
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

    public buyConsumables(amount) {
        let userAccount = JSON.parse(localStorage.getItem('user'));
        let decryptedPrivKey = this.EncrDecr.get(userAccount.email.substr(0, 2) + userAccount.lastname.substr(0, 2), atob(userAccount.wallet_key));
        console.log("Decrypted Privkey: " + decryptedPrivKey);

        //user account
        this.userAccount = this.web3.eth.accounts.privateKeyToAccount(decryptedPrivKey);

        let key = new Buffer(decryptedPrivKey.substr(2), 'hex');

        let that = this;

        this.web3.eth.getTransactionCount(userAccount.wallet_address, async function (err, res) {
            if (!err) {

                if (res !== null || res !== undefined) {
                    // calculating nonce here based on previous transactions
                    let nonce = res;

                    let txMethodData = that.oNyCoin.methods.transfer(that.tokenholderAccount.address, amount).encodeABI();

                    let rawTx = {
                        nonce: nonce,
                        gasLimit: '2100',
                        to: that.contractAddress, //contract address
                        data: txMethodData
                    };

                    let tx = new Tx(rawTx);
                    tx.sign(key);

                    let serializedTx = tx.serialize();

                    //actually make the transaction here
                    that.web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).then(transaction => {

                        let user_id = JSON.parse(localStorage.getItem('user')).id;

                        that.barService.addTransaction(transaction.transactionHash, amount, 'order', user_id).subscribe(
                            response => {
                                console.log(response);
                                return response
                            },
                            err => console.log(err)
                        );
                    }).catch(err => console.error(err))


                }
                return res
            } else console.error(err)
        });

    }

    public refund(amount) {

        let userAccount = JSON.parse(localStorage.getItem('user'));
        let decryptedPrivKey = this.EncrDecr.get(userAccount.email.substr(0, 2) + userAccount.lastname.substr(0, 2), atob(userAccount.wallet_key));
        console.log("Decrypted Privkey: " + decryptedPrivKey);

        // User account
        this.userAccount = this.web3.eth.accounts.privateKeyToAccount(decryptedPrivKey);

        let key = new Buffer(this.userAccount.privateKey.substr(2), 'hex');

        let that = this;

        this.web3.eth.getTransactionCount(that.userAccount.address, async function (err, res) {
            if (!err) {
                if (res !== null || res !== undefined) {
                    let nonce = res;
                    let txMethodData = that.oNyCoin.methods.transfer(that.tokenholderAccount.address, amount).encodeABI();

                    //calculate the required Gas for the coming transaction
                    that.web3.eth.estimateGas({
                        "from": that.userAccount.address,
                        "nonce": nonce,
                        "to": that.contractAddress,
                        "data": txMethodData
                    }).then(gas => {
                        let rawTx = {
                            nonce: nonce,
                            gasLimit: gas,
                            to: that.contractAddress, //contract address,
                            data: txMethodData
                        };

                        let tx = new Tx(rawTx);
                        tx.sign(key);

                        let serializedTx = tx.serialize();

                        // actually make the transaction here
                        that.web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
                            .then(transaction => {
                                console.log('receipt token Tx: ');
                                console.log(transaction);
                                that.getBalance(that.userAccount.address)
                            }).catch(err => console.error(err))

                    });


                }
                return res
            } else console.error(err)
        });
    }

    public async buyTokens(amount) {


        let userAccount = JSON.parse(localStorage.getItem('user'));
        let decryptedPrivKey = this.EncrDecr.get(userAccount.email.substr(0, 2) + userAccount.lastname.substr(0, 2), atob(userAccount.wallet_key));
        console.log("Decrypted Privkey: " + decryptedPrivKey);

        //user account
        this.userAccount = this.web3.eth.accounts.privateKeyToAccount(decryptedPrivKey);


        let key = new Buffer(this.tokenholderAccount.privateKey.substr(2), 'hex');

        let that = this;

        // calculating nonce here based on previous transactions --> Raw Ether TX
        this.web3.eth.getTransactionCount(this.tokenholderAccount.address, async function (err, res) {
            if (!err) {
                if (res !== null || res !== undefined) {
                    let nonce = res;

                    // let txMethodData = that.oNyCoin.methods.transfer(that.userAccount.address, amount).encodeABI();

                    //calculate the required Gas for the coming transaction
                    that.web3.eth.estimateGas({
                        "from": that.tokenholderAccount.address,
                        "nonce": nonce,
                        "to": that.userAccount.address,
                        "value": "11000000"
                    }).then(gas => {

                        let rawTx = {
                            nonce: nonce,
                            gasLimit: gas,
                            to: that.userAccount.address, //user address,
                            value: "11000000"
                        };

                        let tx = new Tx(rawTx);
                        tx.sign(key);

                        let serializedTx = tx.serialize();

                        // actually make the transaction here
                        that.web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
                            .then(transaction => {
                                console.log('receipt raw Ether TX: ');
                                console.log(transaction);
                            })
                    });


                    // calculating nonce here based on previous transactions --> Actual token TX
                    that.web3.eth.getTransactionCount(that.tokenholderAccount.address, async function (err, res) {
                        if (!err) {
                            if (res !== null || res !== undefined) {
                                let nonce = res;

                                let txMethodData = that.oNyCoin.methods.transfer(that.userAccount.address, amount).encodeABI();

                                //calculate the required Gas for the coming transaction
                                that.web3.eth.estimateGas({
                                    "from": that.tokenholderAccount.address,
                                    "nonce": nonce++,
                                    "to": that.contractAddress,
                                    "data": txMethodData
                                }).then(gas => {

                                    let rawTx = {
                                        nonce: nonce,
                                        gasLimit: gas,
                                        to: that.contractAddress, //contract address,
                                        data: txMethodData
                                    };

                                    let tx = new Tx(rawTx);
                                    tx.sign(key);

                                    let serializedTx = tx.serialize();

                                    // actually make the transaction here
                                    that.web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
                                        .then(transaction => {
                                            console.log('receipt token Tx: ');
                                            console.log(transaction);
                                            that.getBalance(that.userAccount.address)
                                        })

                                });


                            }
                            return res
                        } else console.error(err)
                    });
                }
                return res
            } else console.error(err)
        });

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