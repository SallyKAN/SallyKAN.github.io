---
title: Notes for the introduction of AI
tags: AI  Algorithms
lang: en
---

![]({{ "/img/AI-Intro.png "| "C:\Users\K\AppData\Roaming\Sublime Text 3\SallyKAN.github.io\img\AI-Intro.png"}})
# **AI Introduction**

## What is AI
## Problem solving and search
## Game playing
## Why in AI
* Can be represented as search problems easily

## What Characteristics

* Deterministic VS chance
* Perfect VS imperfect information
* Zero-sum VS non zero-sum

## What types studied in this lecture:
* Deterministic,
* Perfect information, 
* Zero-sum

## Algorithms

* MiniMax Algorithm
* what it it
* Alpha-beta Algorithm
* Expectiminimax Algorithm

## How to eaxm?
1. computes the backed-up values
2. show intermediate bounding values and the branches that would be pruned.
3. show the move
4. Expectiminimax ? Operators,Utility function,Evaluation functionGame tree (What representations)

# Machine learning
## what is it
## what types
## Algorithms

* K-Nearest Neighbor
* 1R
* Naïve Bayes algorithm
* Decision Trees
* Support Vector Machines (SVM)
* Ensemble of Classifiers
	* Bagging 
	* Boosting 
	* Random Forest

## How to exam
1. predict examples using knn 

2. predict examples using NB

3. predict examples using 1R

4. laplace correction

5. NB deal with numeric attributes - probability density function, normal distribution

6. knn deal with numeric attributes

7. How to buld DT
	* How to Find the Best Attribute

8. explain and calculate Entropy

9. explain and calculate information gain

10. explain and calculate Gain Ratio

11. what is support vector

12. how to calculate margin

13. what is Maximum Margin Hyperplane

14. why Maximum Margin?

15. using the Lagrange multipliers to calculate decision boundry

16. explain Soft Margin

17. Kernel Trick

18. explain Ensemble of Classifiers

19. When Ensembles Work Well?

20. When is Bagging Useful?

21. Similarities & Differences for bagging and boosting

## The area of AI to write programs that can learn from 
• examples
• domain knowledge
• user feedback (what is it)

# Neural networks
## What is an ANN
## What types
## Model
## Algorithms
* Single-Neuron Perceptron
* Multilayer perceptron:  Backpropagation
* Deep learning
* Stacked autoencoder networks
* Convolutional networks

## How to exam
1. predicting examples using Single-Neuron Perceptron
2. Unified Learning Rule Formula
3. Multi-layer Perceptron Network – Architecture
* Number of Input Neurons
* Numerical
* Nominal
* Number of Hidden Layers and Neurons
4. Error Function formula
5. explain Steepest Gradient Descent
6. all Backpropagation process formulas
7. what is steepest Gradient Descent used for?
8. explain Steepest Gradient Descent and momentum
9. explain and compute Autoencoder NN
10. training steps of deep NN
11. explain Stacked Autoencoders
12. brief explain of Convolutional networks

# Probabilistic reasoning and inference

## Probability basics
## Bayesian networks
## how to exam

1. Probability basics formula

2. calculate Bayesian Networks

3. calculate Probabilistic reasoning

4. draw CPT

5. Using Bayesian networks for classification

## Unsupervised learning
## What is Clustering
## what types
## Algorithms
*  K-Means Clustering
* Nearest Neighbor Clustering
* Hierarchical Clustering 

## How to exam
1.  explain and calculate Centroid (means) , Medoid M, Single link, Complete link, Average link
2. What is a Good Clustering?
3. Davies-Bouldin (DB) index formula
4. calculate k-means
5. calculate Nearest Neighbor Clustering

# Usual issuses
## Need for Normalization
* why
* how

## High Dimensionality
* why: causes problem for all classifiers, overfitting
* How: is great in low dim but gets ineffective as the dim increases

## Dealing with Missing Values
* How
	* in kNN
	* in 1R
	* in NB
	* in DT

## Dealing With Numeric Attributes

* why: Need to discretize numeric attributes, i.e.
convert them to nominal
* how
	* in kNN
	* in 1R
	* in NB
	* in DT

## Overfitting
* what is overfitting?
* how to avoid
	*  in kNN
	*  in 1R
	*  in NB
	*  in DT
	*  in NN
	*  in SVM

## Handling Attributes with Different Costs
* In DT
* Selecting Attributes

# Evaluating and Comparing
## Evaluating
* how

### what is Holdout Procedure
### what is Repeated Holdout Method
### whats difference between Repeated Holdout Method and cross validation,  
### what is Cross-Validation
### what is Validation Set, what for, which uses
### what is Stratification
## Comparing
* how

### what is Confusion Matrix
### formula of recall (R), precision (P) F1 measure (F1)