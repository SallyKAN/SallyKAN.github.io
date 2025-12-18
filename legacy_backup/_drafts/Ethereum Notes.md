# **blockchain paradigm**
## Basis
1. State(n+1) = State-transitionF(State(n), T)
2.  State(n+1) = State-of-block-transitionF(State(n), B)
3.  B = (..., (T0,T1,...),...)
4.  State-of-block-transitionF(State, B) = block-finalisation state transition function(B, State-transitionF( State-transitionF(State,T0),T1)... )
​
## Value
Ethereum has an intrinsic currency, Ether, known also as ETH and sometimes referred to by the Old English •D.
The smallest subdenomination of Ether, and thus the one in which all integer values of the currency are counted, is the Wei. One Ether is defined as being 10^18 Wei. There exist other subdenominations of Ether:
10^0 Wei
10^12 Szabo
10^15 Finney
10^18 Ether
## Generate consensus
  Since the system is decentralised and all parties have an opportunity to create a new block
  on some older pre-existing block, the resultant structure is necessarily a tree of blocks. In order to form a consensus as to which path, from root (the genesis block) to leaf (the block containing the most recent transactions) through this tree structure, known as the blockchain, there must
  be an agreed-upon scheme. If there is ever a disagreement between nodes as to which root-to-leaf path down the block tree is the "best" blockchain, then a fork occurs.
  The scheme we use in order to generate consensus is a simpli•ed version of the GHOST protocol introduced by Sompolinsky and Zohar [2013].