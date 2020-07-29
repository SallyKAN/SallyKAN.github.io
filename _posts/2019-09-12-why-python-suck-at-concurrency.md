---
layout: post
title: About Concurrency In Python
lang: en
tags:
- Python
- Concurrency
---

# Why

Emm...I was heading to talk about this little topic(you sure it is a little topic??) few weeks ago, but you know, procrastination.  Actually I happened to write an assignment in Python for scanning some given domains to get some HTTP header information,  and when the number of given domains exceeding 1000, naturally you want to do it in a concurrent way. 

So, this is where  I started to meet the topic: How you do concurrency in Python? 



# First, What

## Concepts

Some concepts to warm up first, but I promise this blog won't be very long (because I don't want that either, just lazy).

### **Concurrency** **vs** **Parallelism**

There is a difference between **concurrency** and **parallelism**, as you might get some explanations by just googling the last sentence. General speaking, concurrency is concerned about dealing with different threads,  parallelism is concerned with utilizing multiple

processors to improve the performance of computation.



Also, concurrency is a kind of approach to execute two or more tasks, and it just seems like it's executing these tasks at the same time(simultaneously), especially for users, but in fact, it does not achieve true simultaneity. This could just be a trick of CPU time-slicing from OS.



As for parallelism, it is more like something related to hardware design according to my understanding. It can literally execute multiple tasks at the same time by implementing the so-called multi-core infrastructure of CPU, in this way, it physically does simultaneous execution.



Remember some notes:

> An application can be concurrent – but not parallel, which means that it processes more than one task at the same time, but no two tasks are executing at the same time instant.



> An application can be parallel – but not concurrent, which means that it processes multiple sub-tasks of a task in multi-core CPU at the same time.



> An application can be neither parallel – nor concurrent, which means that it processes all tasks one at a time, sequentially.



> An application can be both parallel – and concurrent, which means that it processes multiple tasks concurrently in multi-core CPU at the same time.



### **Thread**

A thread is the smallest execution unit of CPU, it is a sequence of instructions within a process, which is also called "lightweight process". 



### **Process**

In computing, a process is an instance of a computer program that is being executed. For example, a Python program could be considered as a process, in such a process,  several threads can be created to execute multiple tasks, yeah, like concurrently.

> When we launch a python shell or executing a python script, we start a process that runs our python shell or our python script. The operating system creates a process in response to us starting the python shell or python script and the primary thread of our process begins executing.



### **Multithreading**

Well, multithreading happens by taking advantages of  CPU time-slicing(if I remember it right? But I know no one would read this blog ANYWAY) on a single-core CPU. Sometimes users can barely feel it is not simultaneously because the context switching is fast enough.



However, multithreading can be truely in parallelism if it is implemented on a multi-core system.



# So What Happened in Python 

The thing is that Python prevents parallel threads of execution even on multiple cores, which is caused by python’s (CPython) Global Interpreter Lock (GIL).  This means you can not get multiple tasks running simultaneously in a standard Python implementation of Python (like CPython). 

Why Python has this GIL design anyway? You may ask as I do,  actually, GIL has some benefits:

* Speed up the single-threaded program. 

* Keep thread-safe in C libraries(this is for CPython).



But still, if you are doing CPU-intensive work in pure Python, (of course there are ways to get away the GIL limitation), it may not speed up at all to have multiple threading.

> There is some python interpreter implementation (such as Jython and IronPython) that do not have a GIL and so multithreaded execution for a CPU-bound python application will work well but the typical python interpreters that we use - CPython - is not appropriate for multithreaded CPU execution.

> 



# Solutions

Like I just said, there are ways to execute in parallel with python, not that graceful though, which is kinda what I hate.  

* Jython is a java implementation of Python (Jython) supports true threading (concurrent and parallel) by taking advantage of the underlying JVM. We also know that the IronPython port (running on Microsoft’s CLR) do not have GIL. 

* Use the `multiprocessing` module instead of `multithreading` module

* Some third-party libraries implementing multiple threads to override the standard



However, compared with Rust or Golang,  concurrency in Python is kind of disappointing, you have to pick from many un-official libraries and implement some weird syntax(like in asyncio) to get your job done, it's just not simple and grace. 



On top of that,  these platforms are always playing catch-up with new language features or library features, which leads to a trade-off between being able to use updated python features and python library features versus being able to run true threading code on Jython/IronPython.



In short, I really don't like the design. I rewrote my concurrency part in Golang anyway.
# References
1. https://howtodoinjava.com/java/multi-threading/concurrency-vs-parallelism/
2. https://learn-gevent-socketio.readthedocs.io/en/latest/general_concepts.html
3. https://realpython.com/intro-to-python-threading/
4. https://softwareengineering.stackexchange.com/questions/186889/why-was-python-written-with-the-gil
