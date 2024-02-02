// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract XPToken is ERC20 {
    uint256 public tokens;
    address public immutable owner;
    address public immutable chainXPContract;

    constructor(address chainXP) ERC20("XP", "XP") {
        owner = msg.sender;
        chainXPContract = chainXP;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    modifier onlyContract {
        require(msg.sender == chainXPContract);
        _;
    }

    function sendRewards(address player, uint256 amount) external onlyContract {
        _mint(player, amount);
        tokens+=amount;
    }

    function payEntryFees(address player, uint256 amount) external onlyContract {
        _burn(player, amount);
        tokens-=amount;
    }
}