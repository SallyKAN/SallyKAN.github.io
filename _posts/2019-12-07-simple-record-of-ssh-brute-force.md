---
layout: post
title: A Simple Record of SSH Brute Force
tags:
- Linux
---

This just happened two days ago, when I decided to log in my server to see if everything is okay after a very busy month. Since I set up this server just for my subject project, the configuration of SSHD is only default, which means that it enables password authentification and the port is 20 (I know... shame on me). As a result, I actually didn't intend to track SSH brute force attacks, but somehow my server has become a sort of honeypots.

The invalid access record in `auth.log` attracted my attention, so I started to analysis a little. Here is what I have.



# Results

During the last month, I got more than 4000 attacks against it. The top username is still root (with more than 50% of the scans):

```
   #Attempts #Username
   240472 root
   1464 admin
   1169 test
   1104 guest
   1080 mysql
    861 server
    279 ftpuser
    279 123456
    255 apache
    231 ftp
    229 www
    217 squid
    216 webmaster
    210 home
    207 asterisk
    205 user
    201 webadmin
    199 dovecot
    198 ident
    197 operator
    197 ching
```
I also analysed a little about the IP locations. Here is the top IP locations:
```
#Attempts  #Region
972 "region":"Hauts-de-France",
684 "region":"Virginia",
273 "region":"Busan",
160 "region":"Haryana",
147 "region":"Minas",
125 "region":"Guangdong",
121 "region":"Shandong",
118 "region":"Tuscany",
118 "region":"Hauts-de-France",
116 "region":"Karnataka",
110 "region":"Logatec",
105 "region":"Hauts-de-France",
104 "region":"Beijing",
103 "region":"Shanghai",
94 "region":"Moscow",
93 "region":"Wales",
89 "region":"Lombardy",
89 "region":"Chihuahua",
89 "region":"Beijing",
87 "region":"Budapest",
```
To my surprise, most attacks come from an IP in the city Roubaix of France. But the attacker would probably use a VPS service, so it‘s not very valuable.

# Some Tips
Take note on some commands I used for this analysis.:
```
#show what processes are responsible for that network connection.
lsof –RPni:PORTNUMBER
#find what files are being used for that process one may execute the following command with root privileges while substituting for the process ID discovered
lsof –Pnp
```
Check the IP location:

```
cat ips.txt | parallel -j 100 curl -s http://ipinfo.io/{}/geo > temp.txt
```

Check when the user is created
```
ls -l /home//.bash_logout
```
Of course, one of the best ways to disable such brute force attacks is to just disable password authentication and change the default ssh port:
```
PasswordAuthentication no
Port <OTHER_PORT>
```

# Other
I happened to read the article [SSH Brute Force – The 10 Year Old Attack That Still Persists](https://blog.sucuri.net/2013/07/ssh-brute-force-the-10-year-old-attack-that-still-persists.htmlhttp://), they deliberately set up a "weak" ssh server to be the honeypot with a modified SSHD version that logs all login attempts (including passwords) and stores all sessions.  Actually it is pretty cool to log invalid password, so I started to think about how they did it, I got some hints from [How can I Log ssh login passwords attempts?
](https://unix.stackexchange.com/questions/260373/how-can-i-log-ssh-login-passwords-attemptshttp://), and I think it could be a potential idea I can play with in the future :)
