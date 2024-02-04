// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

interface IChainXP {
    function questComplete(address user, uint256 gameId, uint256 questId) external;
    function questFailed(address user, uint256 gameId, uint256 questId) external;
}