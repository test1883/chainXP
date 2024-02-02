//SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

interface Gateway {
    function createProfile(uint256 userId, string memory profile, address owner, string memory name, string memory bio, string memory country, string[] memory socials, string[] memory links) external view returns(bytes memory sig);
    function createGame(uint256 gameId, string memory name, address owner, address contractAddress, string memory description, string memory install, string memory logo) external view returns(bytes memory sig);
    function addQuest(uint256 gameId, uint256 questId, string memory title, string memory description, uint256 nTries) external view returns(bytes memory sig);
}