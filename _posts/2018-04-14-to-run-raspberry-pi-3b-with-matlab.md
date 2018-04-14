---
title: How To Run Raspberry Pi 3B with MATLAB.
tags: RaspberryPi3, MATLAB, Linux
---

# **What you need to prepare**

### **Software** 

* MATLAB 2016B or higher version
* Simulink 2016B or higher version

### **Hardware**
* A Host PC
* Raspberry Pi 3B
* USB cable
* Ethernet cable


# **What you need to know**

Raspberry Pi is a low-cost general-purpose computing platform, running on a Debian-based Linux operating system. It can be also configured as an embedded system incorporating sensors, and programmed through MATLAB/Simulink.
Raspberry Pi board  is comprised of 1.2GHz Broadcom 64bit CPU and 1GB RAM, with in-built WiFi and Bluetooth Low Energy.
If you want more information, please visit:
[Raspberry Pi 3B](http://www.raspberrypi.org/products/raspberry-pi-3-model-b/)
[Raspberry Pi 3B Video](http://www.youtube.com/watch?v=gbJB3387xUw)


![](http://au.element14.com/productimages/standard/en_GB/2525225-40.jpg)


# **What you need to do**
### **Frist step -Setup Board**
1. Download the OS from [the official website](https://www.raspberrypi.org/downloads/), in this post we chose Raspbian OS.
2. Burn the OS image to the SD card. You could use [Win32DiskImager](https://sourceforge.net/projects/win32diskimager/) tool to do this job.
3. Setup the Raspberry Pi Raspbian OS to be compatible with MATLAB and Simulink support package for Raspberry Pi.  Copy the Shell script corresponding to your Raspbian version to the Raspberry Pi hardware from [there](https://github.com/mathworks/Raspbian_OS_Setup) and  run the shell script on the Raspberry Pi terminal.
4. Test the connection between MATLAB and Raspberry Pi,  on the MATLAB command prompt, execute the following

```
myrpi = raspi('Device IP address','Username','password')
% Device IP adress - IP address of your raspberry pi
% Username - Username associated with the login on Raspberry Pi
% Password  - Corresponding password
```


After execution, if the command returns a valid Raspi object, the setup for Raspberry Pi is successful.

### **Second step-Run First Alogrithm**

```
myrpi = raspi('Device IP address', 'Username', 'passward');
witeLED (myrpi, 'led0', 1);   % Switch on led0
witeLED (myrpi, 'led0,  0);     % Switch off led0
```
The above code will instruct the board to switch on or off led0.
You can make the LED bink in a loop with a period of 1 second as well:

```
for i = 1:10
  writeLED(rpi, led, 0);
  pause(0.5);
  writeLED(rpi, led, 1);
  pause(0.5);
end
```

### **Third step- Interact witch Raspberry Pi Board**
```
openShell(myrpi)
```
A terminal window will appear and you can execute Linux commands there.
Then you can interaci by the session with the berry Pi board.

### **Forth step-Shutdown the board**

There is no a shutdown button on the board so the correct procedure is not to unplug the power cable. Instead, you shall execute the shutdown instruction in either the MATLAB command window or the terminal session.
The following MATLAB command will shut down the system in one minute
```
system(myrpi, 'sudo shutdown -h');
```
Alternatively, you can enter the Linux command in the terminal session.
```
sudo shutdown -h
```



Finally , I hope you enjoy playing Raspberry Pi!!