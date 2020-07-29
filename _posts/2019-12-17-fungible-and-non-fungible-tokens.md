---
layout: post
title: Fungible and Non-Fungible Tokens
lang: en
tags:
- Blockchain
- Ethereum
- Cryptocurrency
- NTF
---

## Difference between fungible and non-fungible tokens

Nowadays fungible tokens in the blockchain are most used as cryptocurrencies, it is believed that the blockchain economy is actually built on fungible tokens. In this case, fungibility is considered as a critical property of any currency from the economic perspective. Ethereum has started a standard called **ERC-20** for fungible tokens.

A non-fungible token (NFT) is a special type of cryptographic token to ensure uniquity, non-fungible tokens are thus not interchangeable. This is in contrast to cryptocurrencies like bitcoin(however, bitcoin being fungible or non-fungible tokens is still in controversial), and many networks or utility tokens that are fungible in nature. With such features, they are often used in the fields to do with things like digital certificates. Ethereum has accepted the standard **ERC-721** for non-fungible tokens.

## Technical View on ERC721 NFTs

To better understand non-fungible tokens, here we focus on the ERC721 standard for the non-fungible token. With Ethereum blockchain platform, applications that use ERC-721 will record the unique possession of digital or physical assets and assign them to the pseudonymous account numbers. A bunch of assets is considered to be owned with the use cases of NFTs:

- Physical property — houses, unique artwork
- Virtual collectables — unique pictures of kittens, collectable cards
- "Negative value" assets — loans, burdens and other responsibilities

Generally, NFTs are distinguishable and capable of being tracked the ownership of each one separately.

Ethereum achieves this by making ERC-721 a simple interface for developers to implement in solidity smart contracts

```
interface ERC721 is ERC165 {
  function balanceOf(address _owner) external view returns (uint256);
  function ownerOf(uint256 _tokenId) external view returns (address);
  
  function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes data) external payable;
  function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable;
  function transferFrom(address _from, address _to, uint256 _tokenId) external payable;
  
  function approve(address _approved, uint256 _tokenId) external payable;
  function setApprovalForAll(address _operator, bool _approved) external;
  function getApproved(uint256 _tokenId) external view returns (address);
  function isApprovedForAll(address _owner, address _operator) external view returns (bool);

  event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
  event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
  event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
}

interface ERC165 {
  function supportsInterface(bytes4 interfaceID) external view returns (bool);
}
```

**Token creation**

The NTF first needs to be created for later transfer. This is done by deploying a new smart contract to the Ethereum blockchain. A most common method to do is a token sale, which is also known as an Initial Coin Offering (ICO). Solidy smart contracts have a `mint` function that allows the owner of the contract to create new tokens. 

For example:
```
function mint(address _to, uint256 _amount) public {
  require(msg.sender == owner);
  balances[_to] += amount;
  supply += amount;
  
  emit Transfer(address(0), _to, _amount);
}
```

When `msg.sender` (the address that calls the function) is equal to the owner of the contract, the set number of tokens will be sent to the address specified. In the case of an ICO, a similar `mint` function could be used, but instead of manually having to specify the amount, `msg.value` (the amount of ETH sent in the transaction) is used to calculate how many tokens someone gets.

**Token destruction** 

Tokens can also be destroyed. This process is called `burning` , Token burning refers to the permanent removal of existing cryptocurrency coins from circulation. This can be done in multiple ways as well, including:
- Reducing the actual number of tokens in circulation.
- Sending the tokens to an hardly in use address (like [0x000000000000000000000000000000](https://etherscan.io/address/0x0000000000000000000000000000000000000000)). Many tokens prevent sending from and/or to this address.



The ERC-721 standard has no restrictions as to how tokens are created or burned, or who can create them, so developers are free to make these decisions according to their needs.

**Token Rationale**

As shown in the code example, every **ERC-721** compliant contract must implement the **ERC721** and **ERC165** interfaces. Here the `supportsInterface` function is used to detect and queried to see if the contract implements that specific interface ID.

In addition, **ERC-721** specification has adopted `balanceOf`, `totalSupply`, `name` and `symbol` semantics from the **ERC-20** specification for backwards compatibility. 

However, there are many significant differences compared with **ERC-20.** One of the big differences is the use of the `tokenId` parameter, **ERC-721** achieves the identity of the NFT by using a pair `(contract address, uint256 tokenId)` as a globally unique and fully-qualified identifier for a specific asset on an Ethereum chain, and the developers shall never make the `tokenId` predictable.

Another big difference is the transfer. **ERC-721** comes with two transfer functions: `safeTransferFrom`, `transferFrom`. As the function name indicates, the former is a safe transfer function and the latter is an unsafe function. General speaking, `safeTransferFrom` prevents anyone from accidentally sending their NFTs to a smart contract that doesn’t support them(ERC-721 in this case). The `transferFrom` function won’t check if the target address is capable of receiving ERC-721 tokens.

To initialize a transfer event, three requirements must be meet:

- The owner of an NFT
- The approved address of an NFT
- An authorized operator of the current owner of an NFT

Specifically important to conversations surrounding fungibility is the `ownerOf` function. This query is to find out who owns a specific token. This is because the tokens each have a specific owner.

**ERC-721** also have the `approve` function just like ERC-20. It can be used to approve transferring a single token (specified by the token ID). That’s why there’s also the `setApprovalForAll` function, which would allow the operator to send all tokens owned by the address.
## Use Cases of NTFs

- **CryptoKitties**

    Compatible with an earlier version of this standard.

- **CryptoPunks**

    Partially ERC-20 compatible, but not easily generalizable because it includes auction functionality directly in the contract and uses function names that explicitly refer to the assets as "punks".

- **Auctionhouse Asset Interface**

    The author needed a generic interface for the Auctionhouse ÐApp (currently ice-boxed). His "Asset" contract is very simple, but is missing ERC-20 compatibility, approve() functionality, and metadata. This effort is referenced in the discussion for EIP-173.

- **Decentraland**

    A virtual world owned by its users. Build, explore, and earn money from user's creations.

- **DMarket**

## References

1.[https://medium.com/0xcert/fungible-vs-non-fungible-tokens-on-the-blockchain-ab4b12e0181a](https://medium.com/0xcert/fungible-vs-non-fungible-tokens-on-the-blockchain-ab4b12e0181a)

2.[https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md)

3.[https://medium.com/nonfungible/why-most-of-the-definitions-of-non-fungible-are-incorrect-3565fa3cfc66](https://medium.com/nonfungible/why-most-of-the-definitions-of-non-fungible-are-incorrect-3565fa3cfc66)

4.[https://github.com/OpenZeppelin/openzeppelincontracts/blob/master/contracts/token/ERC721/ERC721.sol](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)

5.[https://medium.com/mycrypto/the-technology-behind-ethereum-tokens-5615527e1af8](https://medium.com/mycrypto/the-technology-behind-ethereum-tokens-5615527e1af8)

6.[http://erc721.org/](http://erc721.org/)
