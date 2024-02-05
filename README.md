# ChainXP

A Web3.0 Project Built for Encode Lightlink Hackathon.

## Overview
Game Development is already a tedious task, and once we add a pinch of Web3 in it, it becomes even more tedious. Whether it be creating smart contracts, designing NFT assets or adding a reward mechanism, everything takes alot of time and resources. And even after all that, there's still no specific system for challenge-based games. One such solution is built by the Perion Team, which is [xp.gg](xp.gg), which adds a XP token mechanism to some popular games. However, there should be something for new web3.0 developers too.
ChainXP solves this problem by allowing new web3 games to integrate XP token mechanism to organise quests/challenges to their game without even a single line of code.

## Usage

- **For Players:**
1. Go to [ChainXP](www.chainxp.com) and connect your wallet.
2. Click on the settings button and fill in your details and choose avatar.
3. Go to the home page and choose a game.
4. Check for any ongoing challenges and join in as per your eligibility.
5. Go to the Game's "How to Play" link and play the game.
6. If you fail the challenge and still have some tries left, pay extra fees and re-join on ChainXP.
7. If you complete the challenge within the time duration, you get XP tokens as the reward.

- **For Developers:**
1. Go to [ChainXP](www.chainxp.com) and connect your wallet.
2. Click on the settings button and fill in your details and choose avatar.
3. Go to the Dev Mode tab and register your ChainXP Compatible(see below) game contract.
4. Click on the add quest button to create a new quest.
5. Call the smart contract methods from the frontend whenever a player completes/fails in a quest.

### ChainXP Compatible Contract

## How it's made
### [Frontend](/frontend/README.md)
- Framework - ReactJS
- Smart Contract Interaction - Wagmi, Ethers.js, CCIP Read Protocol
- Styling - Bootstrap
### [Smart Contracts](/contracts/README.md) -
- Environment - Hardhat
- Deployment - Pegasus (Lightlink Enterprise Mode)
### [Backend](/worker/README.md) -
- Gateway - Cloudflare
- Database - Cloudflare D1
- Database Querying - Kysely

## License

[MIT](https://choosealicense.com/licenses/mit/)