---
layout: post
title: Paper Review - Examining How the Great Firewall Discovers Hidden Circumvention
  Servers
tags:
- review
- reading
---

# Examining How the Great Firewall Discovers Hidden Circumvention Servers

Roya Ensafi , David Fifield , Philipp Winter , Nick Feamster , Nicholas Weaver , Vern Paxson, Examining How the Great Firewall Discovers Hidden Circumvention Servers, Proceedings of the 2015 ACM Conference on Internet Measurement Conference, October 28-30, 2015, Tokyo, Japan DOI:http://doi.acm.org/10.1145/2815675.2815690.

## Research motivation
Though researchers have provided a comprehensive understanding of how the Great Firewall of China's (GFW) works and the first insight of active probing system alongside with GFW, there are still unexplained questions remained about the implementation of active probing, such as the different types of probing, the physical structure of the system. This paper is motivated to answer these questions by developing a deep understanding of the nature of active probing system with several network measurements. 

## Research goals
In this paper, the researchers aim to better understand how the active probing system conducts against serval privacy tools and censorship circumvention systems. Based on that, they seek to answer questions as following:
- The sensors which can trigger active probing and how to locate them.
- The delay between a connection attempting to a Tor bridge and active probing
- The types and origin of the probers
- Effectiveness of active probing system on discovering and blocking Tor bridges
- The physical architecture of the probing system
- The operations of privacy tools and circumvention proxies that reveal about ways to thwart them.
- Detecting and fingerprinting an active probe

## Research methods
The researchers investigate the nature of active probing by conducting several experiments on various datasets. There are four datasets in total, they are described as following:
- Shadow Infrastructure, which was built as Tor clients and bridges for a controlled experiment of active probing over three months. There are six Tor clients within China, nine bridges of a control group and a single client outside of China, various steps are taken to prevent the bridges from being discovered by any means other than active probing, such as private configuration, listening on random ports and implementation of proxy. 
- Sybil Infrastructure, which was built to attract many active probers in 20 hours. There are hundreds of distinct Tor servers and a virtual private server (VPS) in France and one in China, they are used to establish Tor connections to every port in the port range to attract active probing connections.
- Log, which was the application logs of a server operated by one of the researchers, received active probes from China for over 2.5 years. By mining the application logs, the researchers investigate the behaviour of active probing. 
- Counterprobing, which was built to find if there is sharing IP address pools between active probers and normal Internet users. Several network diagnostic tools such as ping, traceroute, and Nmap is used to investigate this by scanning some probers repeatedly.

The obvious limitation of the methodology is Server Logs, which is also acknowledged by the authors, that is they do not record as much valuable information to answer the research questions as key evidence.

## Research results
- About the Effectiveness of Active Probing: They found that although Tor is mostly blocked, Tor clients succeed in connecting roughly every 25 hours. It seems to be able to scan bridges in real-time. On average, it takes only half a second after a bridge connection for an active probe to show up.
- About the origin of the probers: they found patterns in the TCP headers of active probes that suggest that all these thousands of IP addresses are controlled by a single source. 
- About the type of the probers: The active probing is not only for Tor but also targeting other circumvention systems, namely SoftEther and GoAgent. Also from the application layer’s perspective, active probing is capable of detecting the servers of at least five
circumvention protocols (the vanilla Tor protocol, obfs2, obfs3, SoftEther, and Google App Engine domain fronting) and is upgraded regularly.
- About the physical infrastructure: They inferred it is a network of distributed proxies that simply forwards raw packets, and is centrally controlled by the active probing system.

From my view, the most significant progress for the research community is:
- They develop measurement infrastructure for studying active probing systems.
- They identify various probe types and the vast majority originate from Chinese IP addresses.
- They infer the physical structure of the probing system and provide evidence.
- They localize the sensors that trigger active probes which are distinct from China’s main censorship infrastructure, the “Great Firewall” (GFW)

## Overall personal summary
Though I think this paper gives a little bit too much information in a wide range of parts of GFW that it does not focuse on diving into a key point, it is still a valuable paper for GFW study in terms of their findings considering GFW is such a huge (and powerful) system.
