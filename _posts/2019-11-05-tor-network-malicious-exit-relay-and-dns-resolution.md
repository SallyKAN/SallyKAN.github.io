---
title: 'Tor Network: Malicious Exit Relay and DNS Resolution'
tags:
- Tor
- Network
---

# Introduction
In the past few weeks, I have been working on a subject project. In this project, we attempt to monitor and analysis Tor exit relays by detecting the malicious exit relays and looking into the DNS resolution. Based on an existing Tor scanner, we customize and develop our own modules to implement probing all exit relays of the whole Tor network.  To be honest, I didn't expect much that we would find some valuable results in the first place considering the time limit, however, we did eventually get some interesting conclusions!
<p>&nbsp;</p>
# Why We Do It? Why Exit Relays?
To start with, Tor is a popular low-latency anonymous communication network for enhancing privacy. It implements this by using a nested so-called “onion” encryption to encrypts traffic data and hide the source IP/ destination IP as well as randomly building the three-hop circuits.

![](https://cdn.arstechnica.net/wp-content/uploads/2014/01/tor-structure-640x389.jpg)

As shown in the figure above. by design, exit relays almost control the whole Tor network traffic on top of TCP connections, in which situation exit relays are easily targeted to snoop and tamper with sensitive network traffic. 

On top of that, DNS requests and responses are also heavily reliant on exit relays for resolution and validation, which raises potential concerns regarding centralization and misconfiguration.

![](https://zdnet4.cbsistatic.com/hub/i/r/2016/10/03/697335d9-52e8-418b-8c22-03546711983b/resize/470xauto/a5deb59e850d6979d8a811380fbaeec8/overview.png)
<p>&nbsp;</p>
# How We Do It?
So,  we define a malicious exit relay is to:
* Conduct MitM (SSL& SSH, ...)
* Modify DNS responses (DNS poisoning)
* Credentials reusage (traffic sniffing)

In this case,  we want to expose malicious exit relays engaging in man-in-the-middle attacks including SSL/TLS-based attacks, DNS poisoning and traffic sniffing. 

We are also interested in the effect of DNS on exit relay:
* Distribution of the DNS resolvers
* DNSSEC deployment

we try to provide some insights on the effect of DNS on Tor’s anonymity and security by identifying the DNS resolvers and investigating DNSSEC deployment of Tor exit relays.

<p>&nbsp;</p>
# More Specific ......
<p>&nbsp;</p>
## Overview Design
![](/img/overview.png)

Well, the most important part is [exitmap](https://github.com/NullHypothesis/exitmap)

Generally, the design of exitmap:
* Scanner for Tor exit relays
* Fast: asynchronous & event-driven
* Modular: support customized networking task
* Python & Stem library
<p>&nbsp;</p>
## Set up
### Resource
* a single machine with Tor installed
* a DigitalOcean machine running our own guard relay 

### Running
* started on 22nd October, running 2 weeks
* several scans per day

### Probing Modules
* **https module** 
	* Detect HTTPS MitM by comparing fingerprint of X.509 cert 
* **ssh module**
	* Detect SSH MitM by comparing fingerprint of server’s public key
* **sslstrip module**
	* Detect sslstrip attacks by checking if the returned URL contains ‘https’
* **dnspoison module** 
	* Detect exit nodes which tamper with DNS queries and responses by comparing DNS A records 
* **dnssec module** 
	* Check DNSSEC deployment on exit relays by resolving a domain with deliberately misconfigured DNSSEC
* **dnsenum module** 
	* Identify exit node’s DNS resolver by using [Akamai’s DNS whoami tool ](https://developer.akamai.com/blog/2018/05/10/introducing-new-whoami-tool-dns-resolver-information)
<p>&nbsp;</p>
# What We Have Got!!
## Malicious Relays

Here we tabled malicious exit relays we found. The columns are, from left to right:
* Fingerprint: The first 4 bytes of the unique 20-byte SHA-1 fingerprint.
* IP addresses: IPv4 addresses the exit relay.
* Country: The country in which the relay located
* Attack: The attack running by the exit relay

| Fingerprint                              | IP addresses   | Location  | Attack        | Discovery  |
|------------------------------------------|----------------|-----------|---------------|------------|
| 879E4D04 | 42.3.80.81     | Hong Kong | HTTPS MitM    | 2019-10-28 |
| D6D6B661 | 185.220.102.8  | Germany   | DNS Poisoning | 2019-11-02 |
| 30966599 | 82.151.193.197 | Russia    | Censorship    | 2019-10-30 | 

<p>&nbsp;</p>
Here we exposed a possible HTTPS MitM for the domain grc.com. We detected a HTTPS
MitM 7 times coming from the same exit node which returned three different fingerprints
of X.509 certificate in total. However, due to human error, our code only recorded the
unexpected fingerprint, not the full malicious X.509 certificate.

We also found a possible DNS Poisoning from a German exit relay, as shown in the
table. 

The final malicious exit relay we detected censors certain websites. When visiting the
website http://nytimes.com, instead of upgrading to https://nytimes.com, the exit
relay redirected the user to a Russian website over cleartext HTTP. However, it turns
out the destination website, in this case, nytimes.com, is blocked in Russia so it just
returns HTTP URL with a web page to inform users that this website is blocked due to
government policies.
<p>&nbsp;</p>
## DNS Resolver Configuration
Given the importance of DNS queries heavily relying on exit relays, we aim to investigate how the DNS resolvers of Tor exit relays are currently implemented in terms of companies and countries.

![](/img/piechart.png)

We can see that:
* Google holds the highest sharing of 26.1%
* 15.4% of exit relay operators are running their own DNS server (second-largest)

Also, Most DNS Resolvers located in either Western Europe or North America

![](/img/second.png)

This might because many websites outsource their DNS setup to providers such as Cloudflare whose points of presence are centred around Western Europe and North America.
<p>&nbsp;</p>
# Fun Facts
The basic design of this project mainly follows the previous work by Philipp Winter and
Stefan Lindskog et.al. (2014)[1] as well as Benjamin Greschbach et.al. (2017)[2], thus one of our motivations is to give a comparative analysis with the results of previous work and lead to an up-to-date conclusion on Tor network. Here re some fun facet we found compared wth original paper:
* Our scanning performance is 6 times slower compared with Philipp Winter
* The top 4 DNS resolvers used by exit relays  changed since Benjamin Greschbach's work: OVH and OpenDNS 's places are actually replaced by Quintex Alliance Consulting and Emerald Onion. 
<p>&nbsp;</p>
# References
[1] P. Winter, R. Köwer, M. Mulazzani, M. Huber, S. Schrittwieser, S. Lindskog, and E. Weippl, “Spoiled onions: Exposing malicious Tor exit relays,” in PETS. Springer, 2014. URL : https://nymity.ch/tor-dns/pdf/Winter2014b.pdf

[2] Greschbach, B., Pulls, T., Roberts, L., Winter, P., & Feamster, N. (2019).
The Effect of DNS on Tor’s Anonymity. Retrieved 3 November 2019, from
https://arxiv.org/abs/1609.08187

[3] Guarding your Tor Exit’s DNS. (2019). Retrieved 3 November 2019, from
https://blog.daknob.net/guarding-your-tor-exits-dns/

[4] NullHypothesis/exitmap.(2019). Retrieved https://github.com/NullHypothesis/exitmap
