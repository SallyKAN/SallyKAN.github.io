---
title: Dijkstra's Algorithm
tags: Algorithms Python
lang: en
---

## What is it for?
To find the shortest paths between nodes in graph.

## Use cases
* Road Network
* Package routing
* Social network analysis
* Game Development
* More......

## Algorithm in Python
First, set a hashtable as the whole graph, 
```
graph = {}
```
Store neighbors of a node:
```
graph["node"] = ["neighbor1","neighbor2","neighbor3"]
```
Represent weights of paths in graph:
```
graph["node1"]["node2"] = 4
graph["node2"]["node3"] = 6
```
Represent costs of each node in graph, here the costs means the total distance from the start node to the current node.
```
costs = {}
costs["node4"]=7
```
Represent processed nodes
```
processed = []
```


The complete code:
```
node = find_lowest_cost_node(costs)
while node is not None:
	cost = costs[node]
	neighbors = graph[node]
	for n in neighbors.keys():
		new_cost = cost+ neighbors[n]
		if costs[n] > new_cost:
			costs[n] = new_cost
			parents[n] = node
			processed.append(node)
			node = find_lowest_cost_node(costs)
						
```