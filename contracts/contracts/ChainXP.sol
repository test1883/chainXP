// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import { Gateway } from "./IGateway.sol";
import { XPToken } from "./XPToken.sol";

error OffchainLookup(address sender, string[] urls, bytes callData, bytes4 callbackFunction, bytes extraData);

enum Status {
    Ongoing,
    Retry,
    Failed,
    Ended
}

struct Quest {
    uint256 questId;
    uint256 gameId;
    uint256 endTime;
    uint256 requiredLevel;
    uint256 enterFees;
    uint256 rewards;
    uint256 nTries;
}

struct UserQuest {
    uint256 userId;
    uint256 questId;
    uint256 gameId;
    uint256 triesTaken;
    Status status;
}

contract ChainXP {
    using ECDSA for bytes32;

    XPToken XP;

    string[] private urls;
    address immutable signer;
    address immutable owner;

    address[] private users;
    address[] private games;
    mapping(address => address) private gameOwners;
    mapping(uint256 => Quest[]) public quests;
    mapping(address => UserQuest[]) private userQuests;
    mapping(uint256 => mapping(uint256 => uint256)) private userEarnings;
    mapping(address => uint256) private userAddressToId;

    constructor(string[] memory _urls, address _signer) {
        urls = _urls;
        signer = _signer;
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    
    function alreadyJoined(address user, uint256 questId, uint256 gameId) internal view returns(bool) {
        for (uint256 i = 0; i < userQuests[user].length; i++) {
            if (userQuests[user][i].questId == questId && userQuests[user][i].gameId == gameId) {
                return true;
            }
        }
        return false;
    }

    function joinQuest(uint256 userId, uint256 gameId, uint256 questId) external {
        require(users[userId] == msg.sender, "Not Authorized");
        require(!alreadyJoined(msg.sender, questId, gameId), "Already Joined");
        Quest memory currQuest = quests[gameId][questId];
        require(userEarnings[userId][gameId]>=(currQuest.requiredLevel*100), "Not Eligible");
        require(currQuest.endTime > block.timestamp, "The quest has already ended");
        require(XP.balanceOf(msg.sender)>=currQuest.enterFees, "Insufficient Balance");
        XP.payEntryFees(msg.sender, currQuest.enterFees);
        userQuests[msg.sender].push(UserQuest(
            userId,
            questId,
            gameId,
            1,
            Status.Ongoing
        ));
    }

    function rejoinQuest(uint256 userId, uint256 gameId, uint256 questId) external {
        require(users[userId] == msg.sender, "Not Authorized");
        Quest memory currQuest = quests[gameId][questId];
        require(currQuest.endTime > block.timestamp, "The quest has already ended");
        address user = msg.sender;
        UserQuest memory userQuest;
        uint256 i;
        for (i = 0; i < userQuests[user].length; i++) {
            if (userQuests[user][i].questId == questId && userQuests[user][i].gameId == gameId) {
                userQuest = userQuests[user][i];
                break;
            } else if (i == (userQuests[user].length - 1)) {
                revert("Quest Not Joined");
            }
        }
        require(userQuest.status == Status.Retry, "Cannot Re-join");
        if (currQuest.endTime >= block.timestamp && currQuest.nTries > userQuest.triesTaken) {
            uint256 revisedFees = currQuest.enterFees*(userQuest.triesTaken+1);
            require(XP.balanceOf(msg.sender)>=revisedFees, "Insufficient Balance");
            XP.payEntryFees(msg.sender, revisedFees);
            userQuest.triesTaken++;
            userQuest.status = Status.Ongoing;
        } else {
            userQuest.status = Status.Failed;
        }
        userQuests[user][i] = userQuest;
    }

    function questComplete(address user, uint256 gameId, uint256 questId) external {
        require(msg.sender == games[gameId], "Not Authorized");
        Quest memory currQuest = quests[gameId][questId];
        UserQuest memory userQuest;
        uint256 i;
        for (i = 0; i < userQuests[user].length; i++) {
            if (userQuests[user][i].questId == questId && userQuests[user][i].gameId == gameId) {
                userQuest = userQuests[user][i];
                break;
            } else if (i == (userQuests[user].length - 1)) {
                revert("Quest Not Joined");
            }
        }
        require(userQuest.status == Status.Ongoing, "Quest is not Ongoing");
        userQuest.status = Status.Ended;
        userQuests[user][i] = userQuest;
        uint256 rewards = currQuest.rewards + (currQuest.requiredLevel*10);
        XP.sendRewards(user, rewards);
        userEarnings[userAddressToId[user]][gameId]+=rewards;
    }

    function questFailed(address user, uint256 gameId, uint256 questId) external {
        require(msg.sender == games[gameId], "Not Authorized");
        Quest memory currQuest = quests[gameId][questId];
        UserQuest memory userQuest;
        uint256 i;
        for (i = 0; i < userQuests[user].length; i++) {
            if (userQuests[user][i].questId == questId && userQuests[user][i].gameId == gameId) {
                userQuest = userQuests[user][i];
                break;
            } else if (i == (userQuests[user].length - 1)) {
                revert("Quest Not Joined");
            }
        }
        require(userQuest.status == Status.Ongoing, "Quest is not Ongoing");
        if (currQuest.endTime >= block.timestamp && currQuest.nTries > userQuest.triesTaken) {
            userQuest.status = Status.Retry;
        } else {
            userQuest.status = Status.Failed;
        }
        userQuests[user][i] = userQuest;
    }

    function addQuest(uint256 gameId, string memory title, string memory description, uint256 enterFees, uint256 requiredLevel, uint256 duration, uint256 rewards, uint256 nTries) external view {
        require(msg.sender == gameOwners[games[gameId]], "Not authorized");
        revert OffchainLookup(
            address(this),
            urls,
            abi.encodeWithSelector(Gateway.addQuest.selector, gameId, quests[gameId].length, title, description, nTries),   
            ChainXP.addQuestWithSignature.selector,
            abi.encode(gameId, quests[gameId].length, enterFees, requiredLevel, duration, rewards, nTries)
        );
    }

    function addQuestWithSignature(bytes calldata result, bytes calldata extraData) external {
        (bytes memory sig) = abi.decode(result, (bytes));
        (uint256 gameId, uint256 questId, uint256 enterFees, uint256 requiredLevel, uint256 duration, uint256 rewards, uint256 nTries) = abi.decode(extraData, (uint256, uint256, uint256, uint256, uint256, uint256, uint256));

        address recovered = keccak256(
        abi.encodePacked("\x19Ethereum Signed Message:\n32",
            keccak256(abi.encodePacked(gameId, questId))
        )).recover(sig);
        require(signer == recovered);
        quests[gameId].push(Quest(
            questId,
            gameId,
            block.timestamp + duration,
            requiredLevel,
            enterFees,
            rewards,
            nTries
        ));
    }

    function contains(address[] memory addresses, address toCheck) internal pure returns(bool) {
        uint256 n = addresses.length;
        for (uint256 i = 0; i < n; i++) {
            if (addresses[i] == toCheck) {
                return true;
            }
        }
        return false;
    }

    function createProfile(string memory profile, string memory name, string memory bio, string memory country) external view {
        require(!contains(users, msg.sender), "User already exists");
        revert OffchainLookup(
            address(this),
            urls,
            abi.encodeWithSelector(Gateway.createProfile.selector, users.length, profile, msg.sender, name, bio, country),   
            ChainXP.createProfileWithSignature.selector,
            abi.encode(msg.sender, users.length)
        );
    }

    function createProfileWithSignature(bytes calldata result, bytes calldata extraData) external {
        (bytes memory sig) = abi.decode(result, (bytes));
        (address user, uint256 userId) = abi.decode(extraData, (address, uint256));

        require(!contains(users, user), "User already exists");

        address recovered = keccak256(
        abi.encodePacked("\x19Ethereum Signed Message:\n32",
            keccak256(abi.encodePacked(user))
        )).recover(sig);
        require(signer == recovered);
        users.push(user);
        userAddressToId[user] = userId;
    }

    
    function createGame(string memory name, address contractAddress, string memory description, string memory install, string memory logo) external view {
        require(!contains(games, contractAddress), "Game already exists");
        revert OffchainLookup(
            address(this),
            urls,
            abi.encodeWithSelector(Gateway.createGame.selector, games.length, name, msg.sender, contractAddress, description, install, logo),   
            ChainXP.createGameWithSignature.selector,
            abi.encode(msg.sender, contractAddress)
        );
    }

    function createGameWithSignature(bytes calldata result, bytes calldata extraData) external {
        (bytes memory sig) = abi.decode(result, (bytes));
        (address gameOwner, address contractAddress) = abi.decode(extraData, (address, address));

        address recovered = keccak256(
        abi.encodePacked("\x19Ethereum Signed Message:\n32",
            keccak256(abi.encodePacked(gameOwner, contractAddress))
        )).recover(sig);
        require(signer == recovered);
        games.push(contractAddress);
        gameOwners[contractAddress] = gameOwner;
    }
   
    function addXPToken(XPToken xp) external onlyOwner {
        XP = xp;
    }

    function playerLevel(uint256 gameId) external view returns(uint256) {
        return userEarnings[userAddressToId[msg.sender]][gameId]/100;
    }

    function gameQuests(uint256 gameId) external view returns(Quest[] memory) {
        return quests[gameId];
    }

    function ongoingQuests() external view returns(UserQuest[] memory, Quest[] memory) {
        UserQuest[] memory uQuests = userQuests[msg.sender];
        Quest[] memory qDetails = new Quest[](uQuests.length);
        for (uint256 i = 0; i < uQuests.length; i++) {
            qDetails[i] = quests[uQuests[i].gameId][uQuests[i].questId];
        }
        return (uQuests, qDetails);
    }

}