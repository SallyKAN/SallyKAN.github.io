---
layout: post
title: 'Paper Review - Hijacking Bitcoin: Routing Attacks on Cryptocurrencies'
tags:
- reading
- review
- Cryptocurrency
- Blockchain
- What-I-Learnt
---

# Hijacking Bitcoin: Routing Attacks on Cryptocurrencies

Apostolaki Maria, Zohar Aviv, and Vanbever Laurent. "Hijacking Bitcoin: Routing Attacks on Cryptocurrencies". In: _Proceedings of the 2017 IEEE Symposium on Security and Privacy_ (SP).

## Research motivation
As Bitcoin has become the most successful cryptocurrency today, it is easy to be targeted for attackers. Despite many existing uncovered attacks, routing attacks are still paid little attention as they are often considered as too challenging to exploit. This paper is motivated to prove the possibility of routing attacks against bitcoin in practice and give related countermeasures so that stakeholders can prevent such effects in real-world, for which can be generalized for other cryptocurrencies which similar network as well.

## Research goals
The researchers aim to show the possibility of attacking Bitcoin via the Internet routing infrastructure itself, namely routing attacks, by two key characteristics:
- The performance of manipulating routing advertisements. This is to say how efficient it is for node-level
individuals to divert Bitcoin traffic by manipulating routing from anywhere on the Internet and disconnecting amount of nodes in the network.
- The centralization of Bitcoin with respect to routing and mining. This is to say how much centralization there is in practice with only a few ASes controlling the majority of Bitcoin traffic and mining power by evaluating the fraction of node connections that attackers are able to isolate at AS-level.

## Research methods
They first gave a comprehensive measurement of routing attacks on Bitcoin network by collecting three key datasets including information about Bitcoin IPs, mining power and AS-level topology as well as forwarding paths and analysing on the results.

They then evaluated two general attacks from AS-level adversaries, partitioning attacks and delay attacks, in both node-level and network-level. 
Regarding partitioning attacks, they considered four different aspects:
- Evaluate the required time for manipulating Bitcoin traffic using BGP hijacks in practice by building their own virtual AS with BGP connectivity to the live network using their own public IP prefixes.
- Evaluate the required number of hijacked prefixes for isolating specific sets holding mining power by restricting the sets of nodes as feasible in the experiment.
- Evaluate the number of BGP hijacks to date by detecting BGP hijacks in a 4 billion BGP updates advertised from sessions maintained by 3 RIPE BGP collectors.
- Evaluate the required time to recover from a partitioning attack by building a testbed composed of 1050 Bitcoin clients and enforcing a 50%–50% partition to observe the time.

Regarding delay attack, they considered node-leve and network-level:
- Evaluate the strength of a delay attack on a single node by implementing a prototype of their interception software based on a packet manipulation library.
- Evaluate the practicability of delay attack on the entire Bitcoin network by building a realistic event-driven simulator to observe the impact.

Finally, they presented measures against routing attacks in terms of short-term and long-term. 
 
## Research results

- This paper gives the first comprehensive and overview study of routing attacks against Bitcoin and their impact on the Bitcoin ecosystem in node-level as well as network-level.
- This paper proves that it is feasible to exploit such attacks due to the efficiency of BGP hijacks and the high centralization caused by ASes hosting the majority of Bitcoin traffic. With related demonstrations and evaluations, they found Bitcoin network can be partitioned by hijacking less than 100 prefixes, on top of that, they showed that the block propagation in the Bitcoin network can be significantly slowed down by only a few ASes while remaining undetected.
- This paper provides some reusable methodologies to demonstrate the feasibility of each attack and quantify their effectiveness.
- This paper presents a set of countermeasures against routing attacks with both short-term and long-term measures, some of which can even benifit early adopters. Also, these measurements can be learnt to prevent potential damage for other cryptocurrencies with a similar network. 
- This paper stresses the importance of proposed modifications which argue for encrypting Bitcoin traffic or traffic exchanged among miners as the hijakcing threat to Bicoin is worrying.

## Overall personal summary

This paper details how attacking core protocols of the internet backbone can also lead to an attack on popular cryptocurrencies,
highlighting significant centralisation in a P2P cryptocurrency network.
They also discuss the network's resilience to such attacks, and potential countermeasures.
