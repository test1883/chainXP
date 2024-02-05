# ChainXP - Smart Contracts

The smart contracts are created inside a hardhat project.

## Overview
The main contract of ChainXP is [ChainXP.sol](/contracts/ChainXP.sol). It contains the following functionalities -
- `createProfile` - It allows a new user to register for the first time. `createProfile` is called first followed by `createProfileWithSignature` which is a signed callback from the backend.
- `createGame` - It allows a new game to be registerd. `createGame` is called first followed by `createGameWithSignature`.
- `addQuest` - It allows new quests to be added in a game. `addQuest` is called first followed by `addQuestWithSignature`.
- `joinQuest` - It allows a user to join a quest by paying the entry fees in XP tokens. These tokens are burnt to maintain the supply.
- `questComplete` - It is called externally from the game when the user completes a quest, user receives XP tokens at the end.
- `questFailed` - It is called externally from the game when the user fails to complete a quest.
- `rejoinQuest` - It allows the user to rejoin a quest if he has any tries left along with extra XP tokens.