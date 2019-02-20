---
layout: post
title: Ethereum Study Note(1) introduction
tags:
- ''
- Cryptocurrency
- Blockchain
- What-I-Learnt
- Ethereum
---

# Why start this series
Glad to finally accomplish my undergraduate thesis of **Ethereum** topic this year, I spent almost the last 8 months on this project and really studied everything about blockchain from scratch(though I did heard "blockchain and bitcoin"in cybersecurity course). Not trying to say that I have mastered it already but still, there are tons of thoughts going on during the whole process, I think it'd be great if I write down some most important and inspiring parts of Ethereum platform. 
In short, I studied the underlying implementation of blockchain based on Ethereum platform with the main methodology taken in the research including building, debugging and reading Ethereum source code. Based on that, we could have an overview understanding of core implementation with context to blockchain technology in Ethereum.
and that's it.
# What is Ethereum?
## **First, Know Bitcoin** 

**Before** Bitcoin becoming booming in recent years, we can actually notice that the influence of the internet has been around everywhere, especially for global information transmission, which has been amazing cheapnowadays.  

This brings about technology-rooted movements like Bitcoin in 2009, which have demonstrated the power of the default, consensus mechanisms and built a decentralised value-transfer system based on cryptographic proof.
Bitcoin seems to have the most disruptive features:

* Decentralisation
* Transparency
* Immutability


There have already been many new products in global supply chains, financial transactions, asset ledgers and decentralised social networking based on these three  features of blockchain technology.

## **A Short History**
**In the past**, almost all the online transactions needed to process electronic payments via financial institutions serving as the trusted third parties. This works well enough for most cases, while it still has trust issues considering the inherent weaknesses of this model.
![](/img/trust.jpg)

However, there is still a possibility that transactions can be tampered maliciously and it is impossible for financial institutions to avoid mediating disputes, which increases transaction costs as well. In real life, these costs and payment uncertainties can be avoided in person by using physical currency face to face, while there is no existing system to allow transactions happen in a person-to-person way without a trusted party.

This brings the concept of decentralised digital currency, which is an electronic payment system based on cryptographic proof instead of human trust, allowing any two willing parties to transact directly with each other without the need for a trusted third party.

It is noted that this concept has been around for decades since the 1980s, some anonymous e-cash protocols have already implemented cryptographic primitive such as Chaumian blinding to provide a currency with high confidentiality, but they all finally failed due to reliance on a centralized intermediary. It was until 2009 that a decentralized currency, Bitcoin, was for the first time implemented in practice by Satoshi Nakamoto. 

## **Why Ethereum**

In Bitcoin’s case, the blockchain technology is designed as a distributed ledger to facilitate trustless finance between individuals. However, with blockchain technology attracting greater attention from developers and technologists, novel projects began to use the blockchain for purposes other than transfers of value tokens. 

One of these is Ethereum,  Ethereum is proposed to be a decentralized and programmable blockchain platform for building decentralized applications. Rather than giving users a set of pre-defined operations like in Bitcoin transactions, the intent of Ethereum is to allow users to create their own operations of any complexity they wish with a suite of protocols that define a platform for decentralised applications. The heart of these protocols is called the Ethereum Virtual Machine (“EVM”), which can execute code of arbitrary algorithmic complexity. In this way, developers can write smart contracts and decentralized applications that run on the EVM with their own arbitrary rules for ownership, transaction formats and state transition functions.

As mentioned above,  all the transactions are stored in the distributed block-grouped databases. This database is maintained and updated by many nodes connected to the network, which means every node in the Ethereum network runs the EVM and executes the same instructions. This is why Ethereum is also called “ World Computer”. However,  the entire Ethereum network has still been inefficient so far due to the massive parallelisation of computing, which means computation on Ethereum is far slower and more expensive than on a traditional “computer”. In addition, since every Ethereum node runs the EVM in order to maintain consensus across the blockchain, Ethereum itself would have extreme levels of fault tolerance, ensure zero downtime, and make data stored on the blockchain forever unchangeable and censorship-resistant.
