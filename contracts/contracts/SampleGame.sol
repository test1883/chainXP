// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "./IChainXP.sol";

contract SampleGame {
    address immutable owner;
    uint256 private gameId;
    IChainXP chainXP; 
    constructor() {
        owner=msg.sender;
    }
    // ...other game functions
    function addChainXP(IChainXP xp) external {
        require(msg.sender == owner);
        chainXP = xp;    
    }
    function setGameId(uint256 _gameId) external {
        require(msg.sender == owner);
        gameId = _gameId;
    }
    function questComplete(uint256 questId) external {
        chainXP.questComplete(msg.sender, gameId, questId);
    }
    function questFailed(uint256 questId) external {
        chainXP.questFailed(msg.sender, gameId, questId);
    }
}