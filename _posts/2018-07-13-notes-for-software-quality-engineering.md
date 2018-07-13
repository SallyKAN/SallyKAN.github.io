---
title: Notes for Software Quality Engineering
tags: SoftwareEngineering  Testing
---

![]({{ "/img/SQE.png "| "C:\Users\K\AppData\Roaming\Sublime Text 3\SallyKAN.github.io\img\SQE.png"}})
# Software Quality Engineering

## What is software quality?

the process to guarantee that a software product does the right things, but also to guarantee that the product does things right.

### Software quality management

### Quality Planning

* Software Quality Assurance Plan

	* It is created before any quality assurance activities are carried out.

* Quality Assurance

*  QA measures 

	* Defect prevention

		* Education and training.

			* Product and domain specific level

			* Software development expertise

			* Knowledge about methodology,  technology and tools
			* Development process knowledge

	* Defect reduction

	* Defect containment

* How to handle defects

	* logging and tracking

* Quality Control

	* Software Quality Requirement

	* Functional requirements

	* Non functional requirements

		* reliability, security, performance, usability, availability


*  Standards for Software Quality

	* The IEEE 730-2002 Standard

		* Software Quality Assurance Plan 
			* Management
			* Organization
			* Tasks
			* Roles
			* Estimated Resources
			* Documentation

		* Software Requirement Specification

		* Software Design Description

		* Verification and validation plans

		* Verification and validation results report.

		* User documentation

		* Software configuration management plan.

		* Reviews

	* ISO/IEC 25010:2011 Standard

When compared with IEEE 730-2002, this standard provides two models of software quality instead of the structure of a Software Quality Plan. The first model contains the aspects related to quality when referring to the use of an application


##  Verification and Validation

### What is verifiaction

* Static 
* Dynamic
* Software inspections

### Software testing

### what is validation

### Typical validation activities

### Typical verification activities

### Verification and validation planning

### Software inspections

### Automated static analysis

### Quality Cost Categories

* P-CMM levels

* Quality Assurance (QA)

	* Quality Assurance (QA) is fault prevention through process design and auditing

	* A quality audit is a structured review of specific quality management activities that help identify lessons learned that could improve performance on current or future projects.

Examples: Templates, checklists, guides


* Quality Control (QC)

	* fault/failure detection through static and/or dynamic testing of artifacts . Examples: Code testing, peer reviews, beta trials
	
	* Acceptance decisions
	* Rework
	* Process adjustments
	* tools and techniques
	* Pareto analysis:

		* Statistical sampling
		* Six Sigma
		* Quality control charts

## Software test plan

* Test Process
* Test Scope
* Test Schedule and Resources
* Roles and Responsibilities

* testing process

	* Component testing
		* Software developer

	* Integration testing

		* independent testing team( Main difficulty is localising errors, Incremental integration testing reduces this problem

	* Top-down testing

	* Bottom-up testing

	* blackbox testing

* equiv. partitions

* structural testing/whitebox testing

	* Path testing

		* Independent path

		* Problems when using FSMs?

		* Problems with FSM states

		* Problems with FSM transitions

		* Steps to create a FSM

		* Applications of FSM

* Power of Markov Chains