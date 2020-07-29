---
title: Build A Simple Inverted Index Program
lang: en
---

# **Introduction**
I've benn learning searching algorithms these days and I am introduced some interesting applications based on them, one is to look up index given a set of files.  This is also called inverted index, unlike forward index, which maps from documents to content, the inverted index is more used in full text searches,  the internet movie database(IMDB), bioinformatics and so.
# **How It Works**
Genral speaking,  you can regard inverted index as an operation of finding  keys given values in a table. To achieve that, the table needs to  invoke get() and put().
But how can we do that specifically? To start with, we will need two key-value tables 

Let's just jump into a