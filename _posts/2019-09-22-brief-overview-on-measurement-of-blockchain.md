---
layout: post
title: Brief Overview on Measurement of Blockchain
tags:
- Blockchain
- Ethereum
- HyperledgerCaliper
---

# Why It Matters

It is not doubted that Blockchain technologies are taking the world by storm. Some of the most remarkable public blockchains, such like Bitcoin and Ethereum, the former establishes the real-world value for Blockchain implementation, the later, on the other hand, building up a platform for decentralized applications and coming up with the idea of smart contract.  



Being aware of the disruptive potentials along with Blockchain, people started to explore the feasibility of replacing existing distributed databases with blockchains in the past few years, this leads to the increasing demanding of a systematic framework for evaluating the performance of different implementation Blockchain technologies. Such a framework is able to assess the main factors affecting the performance of blockchain so that developers can identify the limitations of their platform and thus get further improvement. 



# Key Performance Metrics

As far, there are some common metrics that apply to blockchains.

* ### **Read Latency**

**Formula: Read Latency = Time when the response received – submit time*** 

 Measured as the time between when the read request is submitted and when the reply is received.

* ### **Read Throughput**

***Formula:Read Throughput = Total read operations / total time in seconds***

 Measured as how many read operations are completed in a defined time period, expressed as reads per second (RPS)

* ### **Transaction Latency**

***Formula:Transaction Latency = (Confirmation time @ network threshold) – submit time***

Measured as the time taken to process a transaction to be valid network-wide. 

* ### **Transaction Throughput**

***Formula:Transaction Throughput = Total committed transactions / total time in seconds@ #committed nodes***

Measured as the number of successful transactions per second, also that the total number of invalid transactions should be subtracted from the total transactions to yield the total committed transactions.



# Related Work

Currently, there are some softwares are used to measure Blockchain.

### **Blockbench**

It supports Ethereum, hyperledger, parity and quorum, and is capable to measure throughput, latency, scalability and fault tolerance. However, you can only use a fixed number of workloads, and it's unable to monitor resource utilization.



![Architecture of Blockbench](/img/blockchainblog.png)



### **HyperledgerCaliper**

As part of Hyperledger project, Hyperledger Caliper currently only supports Hyperlegder Burrow, HyperledgerComposer, HyperledgerFabric, HyperledgerIroha, HyperledgerSawtooth.  It is customized for the user to define their own test module, it is capable to measure throughput, latency, resource utilization. Also,  it's easy to integrate private chains and configure. 



![Architecture of Hyperledger Caliper](/img/blockchainblog2.png)



### **BTCSpark**

 BTCSpark is an open-source software for analyzing Bitcoin and building blockchain analysis tools. The tool provides an environment that is easy to use with good performance.  It aims to offer high quality, easy to use, performant, and free software to Bitcoin developers and analysts.

 

###  **TPC-C**

TPC Benchmark C is an on-line transaction processing (OLTP) benchmark. The on-line transaction processing is designed to solve the issue that the difficulty of comparing between different bank systems. With TPC-C, the test of on-line transaction finally got a very promising standard. Technically, TPC-C seems not the direct solution for Blockchain measurement,  but Blockchain has a lot in common with a database, so I think there would be some key points that a standard blockchain benchmark can learn from TPC-C.

# How To Measure

To start a measurement of Blockchain platform, there are several key considerations when designing any blockchain performance evaluation. 



### **Test Environment**

To ensure test results are independently reproducible, all environment parameters and test software, including any workload, should be documented and made available.

### **Observation Points**

An ideal measurement should be made outside the Blockchain platform which is to be evaluated, This is considered as  to be closer to the viewpoint of the end

user so the result could be more accurate.

### **Transaction Characteristics**

Keep in mind the key characteristics of the transaction of the blockchain platform,  such as the logical of the smart contract(in Ethereum for example),  the size of transactions,  the dependencies of transaction.

# Reading List

There are much more to discuss this topic, I've made a list containing valuable papers for further reading.

* BLOCKBENCH: A Framework for Analyzing Private Blockchains

* Hyperledger Blockchain Performance Metrics

* Performance Analysis of Ethereum Transactions in Private Blockchain

* Performance Analysis of Private Blockchain Platforms in Varying Workloads

* Performance Benchmarking and Optimizing Hyperledger Fabric Blockchain Platform

* Predicting Latency of Blockchain-Based Systems Using Architectural Modelling and Simulation

# Reference

1.https://wiki.hyperledger.org/groups/pswg/performance-and-scale-wg 

2.https://github.com/JeremyRubin/BTCSpark

3.https://medium.com/harmony-one/measure-of-a-blockchain-getting-metrics-that-matter-d57a1d034839
