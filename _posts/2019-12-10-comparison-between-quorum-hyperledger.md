---
layout: post
title: Comparison Between Quorum & Hyperledger
tags:
- HyperLedgerFabric
- Cryptocurrency
- Blockchain
- Quorum
---

This is just something I did for my intern, it's probably not error-free, I have searched through the Internet for some exact answers though, it seems that there are still ongoing topics remained.  I have also listed the references where I concluded the results.
# What is Quorum
In general, Quorum is an enterprise-focused blockchain platform based on Ethereum. It provides a layer on top of Ethereum which enables it to perform private transactions and makes it more robust by using different consensus algorithms. Quorum is developed by J.P.Morgan, which plans to implement a Global Network Payments initiative to help banks use distributed networks.

# What is HyperLedger Fabric
It is a Permissioned Blockchain developed by Linux Foundation with support from IBM and many large enterprises as members. HyperLedger Fabric is designed as a plug for implementation of blockchain technology to develop high-scaling blockchain applications with various level of permissions.

# Comparison
Hyperledger, Ethereum, and Quorum have emerged as some of the most popular blockchain development platforms. Here I will compare the major points of distinction between the **Hyperledger** and **Quorum** platforms.
### **Architecture**
The architecture of Hyperledger Fabric comprises of the following components:

- Shared Ledger
- Channel
- Peer to Peer Network
- Membership Services Provider
- Chaincode
- Consensus Protocol

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/7797fa38-6206-4ca8-8cfe-4eaa74f588dc/image1.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAT73L2G45MKNWVFOH%2F20191210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20191210T114749Z&X-Amz-Expires=86400&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIC%2FAqANZd7IcSL44mcJb5zab3diiNFB4EUZWUvslaR0dAiEA225tsEMk57yIme98u3AeJxjURTDK81IZsdw%2F8Knu3Isq2wII0f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwyNzQ1NjcxNDkzNzAiDIXPInoefE9Y2O5D7CqvAhTOqqcOqprcwI9BBoY1tg6%2B7me98CcDAUHH1OMO0xfdRQlUtfGoELpObPJrSFwATU75N0SvbUTf76Gihueh2UU%2Ff4CEbYrSRiR29FNmTRxbZ0cOLQtVkQuwx%2FUBEcKL%2Fz9bkVpKcc%2BmMU2Ag9S3O8fz11QfbXBhVk2WFzzsT2ysb6QVDdanNaJm71Xc98fgSlL1uRG49OCn4u7SqA6wLNHZjZzzM1MRX85SamAR1XlJog5gQiPMwQow7B%2BphyNEHPIcBSj%2BKeavYLGYuGsWrGlHnIGlsupisArCyPnUdDq%2FN%2FLs3B6PT%2BvEBiq4i33uzsDDthUEhe5auRtlRGptD6sb80On9aqIcBd77dKh%2FoJisgYOqgneblMUeE0rRIss4Q1mBv5ONEkgI7D3tOzyzzC%2BkL3vBTrNAqZUKjQ7wXmaVPrdce05xediGvoTETbdLS6RYAOojpHROHCCnn4k51YXPP6bfPwIILw%2BSlZ7S8KdAsLCPACarzos8AP8hKADIOjPPIM24sfO%2FRXnWOqi8LGOLfiq2sl4DdvVdTMOH%2FUOq5auFelvc7l%2BsnrSeVKyAVkwdTc%2Fk8IbzcX%2Fw9zdvbwtofbvAfjrNRglfJ85aSHMdmM1cw9EP1HZzpSSeR8iOzVXszZrMzhCLZ9SnSkw11m0w5qiCosy7QYx76F%2BTPPVwJFEqeY9clLwcHvuW3ipFPWDEQTaqo2CM1S5SSXNgIU6hsuWguktQhmWom9qgcOlk1Lj69apLICy4eB0MVm4mUdtvHb6pqCuIqJQ4fFjJ3tQIIPBLGRPICGjqwxHbkKLF0jQeCJr4puNHYOqeqM%2FcCpag8FjKek4ht4phr%2FhKs%2B%2BO8GIBw%3D%3D&X-Amz-Signature=d96ba91a84c0b2a5dbdb9565c3c0cc7ac62af3f276facf39d6e9b95eb1a30234&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22image1.png%22)

As the purpose of Quorum is to be designed as a lightweight fork so that it can take advantage of the Ethereum implementation. It is updated regularly such that it is in line with the future geth releases. The architecture of Quorum comprises of the following components:

- Quorum Node (modified Geth Client)
- Constellation- Transaction Manager
- Constellation: Enclave

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9f3134ac-a859-4dba-b7dc-5d6d1ddfe59f/image2.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAT73L2G45HLPACVMK%2F20191210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20191210T114837Z&X-Amz-Expires=86400&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDHOqv2Vw8g1OxQOiEt8Dihh4Ts7QX447da8SJXRGdUiAiB82%2Bl1UOZUjCn3bmZTnXHZ9ZSJ9zA0EMEfzQWUPi0GtirbAgjR%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDI3NDU2NzE0OTM3MCIMBAoGkHinWR53l9jAKq8C8DsMkXXmYUvnio4C%2FQR7LKMtzblfj4JDS5yoa7B%2BFUzYagl49n%2F5S41KAxvUW8laYj%2FhUXGCeSqUycbMRVLy8fRYiqMpf%2BYHAAFFFSTnIRCPkPFzeJTB1lMGflXDwaiwPQL%2FRkMHN82Z6rFQH%2BTNZpjnPf5YZB%2F7shSs0vm4ls1JT5Fj7l1XpGTPrNqAzx5AJHwFKUSee8ngOCiEjIe2Vj8%2FJmYJW9yJdiiVdrxyMSyBqWdnqB8lGrmT53sc69ofRfDHGWiMRKJdrJ%2Fh%2B%2FzLq3Js1g6rGstO%2B4zFkzUVleTbxWjd4njfwtkrgvcE0mkw3HyzlzZ%2F49QMZ0mcWC9tzKWY1zGcTxQ3%2BwagWc2TouQ%2FvVnKaiuyoqhvFW7HYgLr2wBNU%2FJHWhrwgbIgazXRMJGdve8FOs4CUJs3dLM5zTlixhEqCC8itGI4KbUkpegYm%2BCQ81B3ycmy14V1dGlTHfbvlOsHFoJgBoSyRJzP8L5rdbH8gJCe5wePqvQsy7SmVdWIFBE2XyoPz%2FxbpwlhXlBkh2i2x3%2BZjetxgA1aYgnCVrzSl%2FBqz5aRKwD6EATznCQeoVdGMYL3JWwxnueN039IFK4P7sug7Zj7txKyh8D0%2B1OTBm3PIZ8clny%2Blv0SmPu4pFrMkEbO19IhYAzQq5fT2Ke7V2ZhrGSebeiBO2IzNaXy%2BEqzGdmLcguwUJL70JUuu6yRmTOWz3pgWrM8aCxVsCKs%2Fl2NnDdfzh9T2L%2FCTmYvBR8DYU66iCY8JaZI0VzwA85eqGjH5%2BISFC2m%2BDb97B3XwtKxC6tVX8IW5ic6FGhvRrmHG5XxsTRb8wTc%2F7MBTa3OJcS0G%2BWkzKv20HoWhorJRQ%3D%3D&X-Amz-Signature=46c8d9ce011c738417929ea0735d935f3c3e02aadff89db7ec83a6918374cdf7&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22image2.jpg%22)

### **Privacy**

**Hyperledger Fabric** offers the ability to set up shared channels (each one a ledger) between parties, with the transaction within the channel being private to outside parties. It avoids that channel-level account balances can be viewed by channel participants.

**Quorum** achieves privacy via public and individual private state trees, with the public state tree storing vanilla Ethereum transactions and hashes of encrypted private smart contract changes. Quorum thus offers and requires both private and public smart contract transactions. The private contracts enable private transactions between two parties, while public transactions are used to distribute zero-knowledge proofs for verification on the Quorum network.

### **Scalability & Performance**

In **Hyperledger Fabric**, the network complexity rises with each new participant, and participants need to maintain and move funds between individual channel-level accounts for each channel.

**Quorum** offers significantly higher performance than public geth(ethereum) as it is more robust and has the capability to process more than 100 transactions per second which is much more than that of Bitcoin and Ethereum.

### **Consensus Mechanisms**

**Consensus in Hyperledger Fabric**

In the case of Hyperledger Fabric, the understanding of consensus is broad, and it encircles the entire transaction flow beginning with initiating a transaction to the network and then committing it in the ledger. There are two kinds of consensus. One is lottery-based and the other is voting-based. Lottery-based refers to algorithms such as Proof-of-Work (PoW) and Proof-of-Elapsed Time (PoET).

Hyperledger Fabric v1.4.1 introduced Raft as a crash fault tolerance consensus. Raft follows a “leader and follower” model wherein a leader node is elected for every channel and the decision taken by the leader node is replicated by the follower nodes. In case of failure, Raft ensures that the system is able to take decisions and process client requests.

**Consensus in Quorum**

Quorum uses a consensus protocol called “QuorumChain”. The consensus here is relatively straightforward and a consensus is reached by simple majority voting. A certain number of nodes are relegated with voting rights. These nodes only verify the transaction. The two consensus algorithms used by Quorum are:

- **Raft-based Consensus**

Raft is a consensus algorithm with Crash Fault Tolerance (CFT). It helps perform transactions faster as the block minting process is 50ms. It helps save storage space by mining only the proper blocks and not the empty blocks. Its other significant features are transaction finality and on-demand block creation.

- **Istanbul BFT**

This is a consensus algorithm which is based on Byzantine Fault Tolerance. It helps protect the blockchain. It provides protection for the blocks generated in the blockchain.

### **Smart Contracts**

**Hyperledger Fabric** uses “Chaincode” as the business logic of the technology. Chaincode takes leverage from the in-built trust of blockchain technology and underlying consensus from the peers. Hyperledger also allows you to write the ‘Chaincode’ in any standard programming language. ‘‘Chaincode’’ can be written in either Node.js, Go, and Java.

**Quorum**, soft forked from Ethereum supports both public and private contracts. The public contracts are built with Solidity whereas the private contracts which allow specifying which nodes in the network have the access to execute the contract. What’s more, to understand here is that Quorum privacy design imposes constraints, a private contract cannot be updated to a public contract and vice-versa.

### **Use cases**

Use cases of Hyperledger Fabric

- Banking
- Finance
- Healthcare
- IT
- Supply chain management

Use cases of Quorum

- Finance
- Banking

### **Brief Summary**


Comparison| HyperLedger Fabric | Quorum  
------------- |------------|-----------
Architecture | Enormous technology stack including membership services, blockchain services and chaincode services | The blockchain platform on Ethereum with modified services 
Privacy      | Achieved by setting up shared channels (each one a ledger) between parties|Achieved by public and individual private state trees
Performance | Maximum TPS is around 500 in v1.0 |Able to process more than 100 transactions per second
Consensus|Uses permissioned voting-based consensus from the pool of other consensus named the lottery-based consensus, uses Raft as a crash fault tolerance consensus|Uses a consensus protocol called “QuorumChain”,uses Raft-based and Istanbul BFT for better fault tolerance
Smart Contracts | Uses “Chaincode” as the business logic of the technology    | Use soft forked version from Ethereum supports both public and private contracts
Use Cases|Enterprise-focused in broad fields|Enterprise-focused in the financial field

## References

1. [https://www.blockchain-council.org/hyperledger/quorum-vs-hyperledger-the-ultimate-guide/](https://www.blockchain-council.org/hyperledger/quorum-vs-hyperledger-the-ultimate-guide/)
2. [https://hackernoon.com/quorum-101-getting-started-with-quorum-9906294ea45b](https://hackernoon.com/quorum-101-getting-started-with-quorum-9906294ea45b)
3. [https://medium.com/akeo-tech/hyperledger-fabric-vs-corda-vs-quorum-the-business-choice-dd5238b20d88](https://medium.com/akeo-tech/hyperledger-fabric-vs-corda-vs-quorum-the-business-choice-dd5238b20d88)
4. [http://blockdigest.com/courses/hlfabric101/](http://blockdigest.com/courses/hlfabric101/)
5. [https://www.researchgate.net/publication/327557586_Performance_Analysis_of_Hyperledger_Fabric_Platforms](https://www.researchgate.net/publication/327557586_Performance_Analysis_of_Hyperledger_Fabric_Platforms)
