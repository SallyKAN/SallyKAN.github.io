---
layout: post
title: After running rm -rf  /* on my Ubuntu Machine
lang: en
tags:
- Linux
- What-I-Learnt
---

# How it happened

A few days ago, I was working on the code of my project assignment.  In short, this project is to capture traffic traces of smart IoT devices by passively monitoring,  which would then be used to clean and process as the feed of the machine learning model for classification purposes. My main tasks include cleanning processing, and applying statistics on the collected data, so I have written some scripts to help me fasten and automate the process. 


There is a script called `cal_packets.sh`, so one might infer from the name, the function of this script is to calculate the total number of the captured packets from one specific command.  Since the data kept updating, so every time before I run this script, I would need to remove the output directory which includes the old processed data first. AND THAT'S HOW THE TRAGEDY HAPPENED.


Check out this:
```
OUT_DIR=$2
rm -rf $OUT_DIR/*
```

I haven't used this script for a long time, so when I ran it, I even forgot to pass the argument. As a result, the variable `$OUT_DIR` is empty, which means...

```
rm -rf /*
```

After I hit the enter key, it took me like three or four seconds to release something is wrong from the screen output  (TT), and I stopped the command immediately. 

Well, even three or four seconds are long enough to delete a lot of stuff. 



# How I tried to fix it 

The first thing I did after this is to check which files are deleted. New lesson learned here,  as I am not pretty sure about the delete order of `rm`, I did some [online researches](https://stackoverflow.com/questions/30614912/linux-rm-rf-delete-orders), though the result turned out that `rm` command deletes from the hidden directories with a name starting from `.`.

This is quite annoying since hidden directories have many important system and software configurations.   

After I locked the screen of my computer, I can't log in to the desktop mode again, as the error message tells `.Xauthority` is somehow not working, it is very likely some important authority files related to the desktop mode have been deleted. 

The final solution I used to simply reinstall the desktop 

```
sudo apt-get update
sudo apt-get install --reinstall ubuntu-desktop
sudo apt-get install unity
```

Then I was able to log in to the desktop mode again. 

Also, I had to reinstall many softwares which were deleted. Fortunately, the most important documents on my computer are safe, so this accident is not that bad. However, I can't help but start thinking that what if I delete the valuable data by accident, how to avoid that? And if it happens, how to minimize the loss?  This leads me to the topic **backup**



# How to backup 
After a lot of searching online, I decided to make a backup plan for my important personal data. 

Being a little bit geeky, my requirements are:

1. Cheap. There is no big storage space requirement. 

2. Easy and convenient. It put effort should be limited. 

3. Have certain control of the technology. This means I can write a script to automate the backup process. 

4. Privacy

Based on these requirements. I exclude public cloud storage solutions (e.g. Dropbox),  though there are some private cloud storage technologies such as ownCloud, the setup is quite time-consuming myself, so my final solution is as below:

1. `tar` command to archive the specified important directories in my computer every 10 days.

2. `rsync` command to do the incremental backup to a remote server every 10 days.

3. `crontab` command to automate the process.

4. an ECS from aliyun as the remote server, which only takes 89 ￥/year.

An individual directory `backup` is created under  `/`, the above process is scripted as `backup.sh`:

```
#!/bin/bash 
sudo su
cd /

tar -cvpzf /backup/weekly/ubuntu_backup@`date +%Y-%m+%d`.tar.gz /home/snape/Documents /home/snape/Pychar    mProjects /home/snape/CodeProjects /home/snape/IdeaProjects /home/snape/blog /home/snape/orgfiles /home/    snape/.emacs.d /home/snape/scripts /home/snape/.ssh

host=RemoeteServerIP
user=RemoteServerUser
remotedir="/bakcup/"
basedir="/backup"
rsync -av -e 'ssh' $basedir $user@$host:${remotedir}
```

```
chmod 700 backup.sh
```

Set the system crontab job:

```
vi /etc/crontab
```

```
30 3 */10 * * root    /backup/backup.sh
```

This means the to backup and upload to remote server every 10 days at 3:30 am.

Also, to avoid the increasing data volume taking up the harddisk space on the remote server, we need to delete the old backup regularly. The `clean.sh` is as below: 

```
#!/bin/bash
find ./backup/ -mtime +20 -name "*.gz" -exec rm -rf {}\;
```

This means to delete the backup files existing for more than 20 days.

Set the crontab job to automate the running:

```
0 0 */10 * * /root/clean.sh
```
