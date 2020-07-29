---
layout: post
title:  Truffle Private Ethereum
lang: en
date:   2020-01-03 14:42:14 +1100
tags: Blockchain Ethereum What-I-Learnt
---
Few days ago, I conducted research on Truffle private Ethereum,  here I want to record some of my findings. Truffle packs a private virtual Ethereum for development purposes.
In this study, I focus on
1. How to set it up
2. Does it support all the functions of Ethereum?
   - create account
   - transaction
   - deploy contract
   - invoke contract
   - fetch blocks / transactions information
3. Ethereum is PoW, it mines regardless if there is any transaction, is Truffle Ethereum also like this?
4. How fast is the throughput on it, if you keep sending transactions to it, how fast they will be mined?

## Set up

Truffle provides two ways to interactively test and debug smart contracts in a Ethereum blockchain [1].

- **Truffle Console**: A basic interactive console connecting to any Ethereum client

    This is for developers who have already been using a client, such as Ganache or geth, they can also deploy the contract on a testnet (or the main Ethereum network)

- **Truffle Develop**: An interactive console that also spawns a development blockchain

    This is for testing contracts with no intention of immediately deploying, in this blockchain, developers don't need to work with specific accounts as there already are default development accounts.

Here we focus on how to set up **Truffle Develop**

First, to launch Truffle Develop (we have already installed `truffle`):

    truffle develop

This will spawn a development blockchain locally on port 9545 by default. It will generate the addresses, private keys, and mnemonic for this particular blockchain as shown below

    Truffle Develop started at http://127.0.0.1:9545/
    
    Accounts:
    (0) 0x7b38dfc0c8a8bf34a400cb65b6b7e14bc9a850fa
    (1) 0xab4684847374b191112604ca682e7822a3ea7b22
    (2) 0x0022f2f52436d6e7a10f12e41ecacb6ffaf208b5
    (3) 0xf7c6e417c3815b605b7455f66b90a1040424a72e
    (4) 0x8a465e75db3618f2929fb5153c632cf295cab8d0
    (5) 0xbb8e1122affa7043e5304af59c3f0863077cb1aa
    (6) 0xa45360b2407b235acd310ed086582a9f32ff9fe6
    (7) 0x3037d6317699c02b7dfa7dfb0caeef7b55141717
    (8) 0xbcbc41ce737c1ed727830ec3db0cb58be876605c
    (9) 0x131c1222d359bc51cd86a08ce35af642ad74bdc7
    
    Private Keys:
    (0) 086b5f591e73ce3a97c79eae7a8adfeac41eaff803934012a92fc9ff0292d1b1
    (1) 6f60290f0ca85e8fa63badab7032f67f12e03a7e6e0496dfd3b9ee49b6c80f30
    (2) 7b95241176d0ca89fa043285cd930dae66dbbd60dfb848228b91cf411f90921a
    (3) 0fe867699034be971e38dc84d86ea02bc903b5017e24a694141d0f9747fa431e
    (4) 676ad1498b3de8cbd9d2be1cfa453ebb009b8d8f1c12bef8d503048b02751510
    (5) ae77eb21270d469b3bc1e18ac2d372e8d12cd5ce85143567d8c2b7df082ab943
    (6) e50f831050baacbfe7242d61e21a65f353c90c471c8c4a873f59ce2b4c710056
    (7) e9d4f268ecd3a32958aa895a435ff25339dce0faa7d2e128004b3ba420f48061
    (8) 021f2f51b46a206403688d0ce5ac58728d83fbe257e5a1cb4340153fe4ac04db
    (9) 7cafec2bdd8f6e0f0641188f6b38cd6bc5028ffcba9474ebd1497816229df50d
    Mnemonic: candy maple cake sugar pudding cream honey rich smooth crumble sweet treat

## Interact

We can interact with Ethereum contracts from JavaScript by using contract abstractions via the `truffle-contract` module. The contract abstractions are just wrapper codes for implementing `web3` library in `Truffle`.  

First we need to set up a new web3 provider instance for our contract, for example:

    var provider = new Web3.providers.HttpProvider("http://localhost:8545");
    var contract = require("@truffle/contract");
    
    var MyContract = contract({
      abi: ...,
      unlinked_binary: ...,
      address: ..., // optional
      // many more
    })
    MyContract.setProvider(provider);

Here we use the `MetaCoin` contract provided in Truffle Boxes via `truffle unbox metacoin` , as `Truffle Develop` runs by default on 127.0.0.1:9545, so the above to say:

    var provider = new Web3.providers.HttpProvider("http://localhost:9545");

Actually, The `web3` library is made available and is set to connect to our Ethereum client(`Truffle Develop` in this case), so we don't have to configure as above unless we are using other Ethereum clients.

Once we got `web3` library, we can implement all the functions in Ethereum blockchain.

For example, create new account

    truffle(develop)> web3.eth.personal.newAccount('12345')
    '0xE386D7BF9C078802Cae42CD1B214b92cceEb2635'
    truffle(develop)> let accounts = await web3.eth.getAccounts()
    undefined
    truffle(develop)> accounts
    [ '0x7b38DFC0C8a8Bf34A400Cb65B6B7E14BC9A850Fa',
      '0xAb4684847374b191112604cA682E7822A3ea7B22',
      '0x0022f2f52436D6E7a10F12E41ecACB6ffAf208b5',
      '0xf7C6E417c3815b605B7455F66B90A1040424A72E',
      '0x8a465E75db3618F2929Fb5153c632Cf295CAB8d0',
      '0xBb8E1122AFFa7043E5304Af59C3f0863077Cb1Aa',
      '0xA45360B2407B235ACd310ed086582a9f32fF9fe6',
      '0x3037d6317699c02b7Dfa7dFb0CAEEf7B55141717',
      '0xbcBC41ce737C1eD727830EC3db0Cb58BE876605c',
      '0x131C1222d359bc51cD86a08cE35AF642Ad74bdC7',
      '0xE386D7BF9C078802Cae42CD1B214b92cceEb2635' ]

As shown above, the last account is the one we just created.

For example, send a transaction (the same as in [`web3.js`](https://web3js.readthedocs.io/en/v1.2.2/web3-eth.html#sendtransaction))

    web3.eth.sendTransaction(transactionObject [, callback])

In addition to implement `web3` directly in `Truffle Develop` blockchain, we can write our own functions in contract to achieve similar goals.

    pragma solidity >=0.4.25 <0.6.0;
    
    import "./ConvertLib.sol";
    
    // This is just a simple example of a coin-like contract.
    // It is not standards compatible and cannot be expected to talk to other
    // coin/token contracts. If you want to create a standards-compliant
    // token, see: https://github.com/ConsenSys/Tokens. Cheers!
    
    contract MetaCoin {
        mapping (address => uint) balances;
    
        event Transfer(address indexed _from, address indexed _to, uint256 _value);
    
        constructor() public {
            balances[tx.origin] = 10000;
        }
    
        function sendCoin(address receiver, uint amount) public returns(bool sufficient) {
            if (balances[msg.sender] < amount) return false;
            balances[msg.sender] -= amount;
            balances[receiver] += amount;
            emit Transfer(msg.sender, receiver, amount);
            return true;
        }
    
        function getBalanceInEth(address addr) public view returns(uint){
            return ConvertLib.convert(getBalance(addr),2);
        }
    
        function getBalance(address addr) public view returns(uint) {
            return balances[addr];
        }
    }

As we have defined a `sendCoin` in the `MetaCoin` contract(shown above), we can make a transaction by calling this contract function. When calling `sendCoin`, we'll execute it as a transaction. In the following example, we'll send 10 Meta coin from one account to another, in a way that persists changes on the network.

    truffle(develop)> let instance = await MetaCoin.deployed()
    truffle(develop)> instance
    truffle(develop)> let accounts = await web3.eth.getAccounts()
    truffle(develop)> instance.sendCoin(accounts[1], 10, {from: accounts[0]})

Also, we can see that the  `truffle-contract` module provides this contract abstraction `deployed()`, which creates an instance of the contract representing the contract at its deployed address.This allows us to write code referring to a specific deployed contract without having to manage those addresses ourselves.

As mentioned in the document of `[truffle-contract](https://github.com/trufflesuite/truffle/tree/master/packages/contract)` , the contract abstractions provided by Truffle contain a wealth of utilities for making interacting with our contracts easy, such as:

- Making a call

        truffle(develop)> let balance = await instance.getBalance(accounts[0])
        truffle(develop)> balance.toNumber()

- Processing transaction results

        truffle(develop)> let result = await contract.sendCoin(accounts[1], 10, {from: accounts[0]})
        truffle(develop)> result

- Add a new contract to the network

        truffle(develop)> let newInstance = await MetaCoin.new()
        truffle(develop)> newInstance.address
        '0x64307b67314b584b1E3Be606255bd683C835A876'

- Use a contract at a specific address

        let specificInstance = await MetaCoin.at("0x1234...");

## PoW in Truffle

We can configure `Truffle Develop` blockchain to use any of the available configurable network settings, for example [2] :

    module.exports = {
      /* ... rest of config */
    
      networks: {
        /* ... other networks */
    
        develop: {
          port: 8545,
          network_id: 20,
          accounts: 5,
          defaultEtherBalance: 500,
          blockTime: 3
        }
      }
    };

Here the flag `blockTime` is related with mining process, it indicates seconds for automatic mining, If we don't specify this flag, the blockchain network will instantly mine a new block for every transaction. It is discouraged to use the `blockTime` option in official document unless we have tests which require a specific mining interval. However, it seems there are no miners in Truffle, we cannot accurately mimic miner actions on the main network [3].

## Throughput in Truffle

As mentioned above, the mining interval can be set in the flag `blockTime`, so theoretically the throughput would just depend on the configuration of `blockTime`

## References

1. [https://www.trufflesuite.com/docs/truffle/getting-started/using-truffle-develop-and-the-console](https://www.trufflesuite.com/docs/truffle/getting-started/using-truffle-develop-and-the-console) 
2. [https://github.com/trufflesuite/ganache-core#usage](https://github.com/trufflesuite/ganache-core#usage) 
3. [https://www.trufflesuite.com/docs/truffle/getting-started/interacting-with-your-contracts](https://www.trufflesuite.com/docs/truffle/getting-started/interacting-with-your-contracts)
4.  [https://www.trufflesuite.com/docs/truffle/reference/configuration](https://www.trufflesuite.com/docs/truffle/reference/configuration) 
5. [https://www.notion.so/Truffle-Private-Ethereum-1ddfce20c6db4d55acb212ec9d65ccd3#1e962fd955f645c68b996fc51dc4b220](https://www.notion.so/Truffle-Private-Ethereum-1ddfce20c6db4d55acb212ec9d65ccd3#1e962fd955f645c68b996fc51dc4b220) 
6. [https://github.com/trufflesuite/truffle/tree/master/packages/contract](https://github.com/trufflesuite/truffle/tree/master/packages/contract)
