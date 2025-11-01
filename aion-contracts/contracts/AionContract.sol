// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title AionContract
 * @dev AION Prediction Market with Battle System
 */
contract AionContract is ERC20, Ownable, ReentrancyGuard {
    struct Market {
        uint256 id;
        string title;
        string description;
        uint256 eventDate;
        bool resolved;
        bool outcome;
        uint256 totalStakeYes;
        uint256 totalStakeNo;
        address creator;
        uint256 createdAt;
    }

    struct Stake {
        uint256 amount;
        bool prediction;
        bool claimed;
    }

    struct Battle {
        address player1;
        address player2;
        string player1Direction;
        string player2Direction;
        uint256 stakeAmount;
        bool isComplete;
        address winner;
    }

    uint256 public marketCounter;
    uint256 public battleCount;
    uint256 public constant PLATFORM_FEE = 2; // 2%
    
    mapping(uint256 => Market) public markets;
    mapping(uint256 => mapping(address => Stake)) public stakes;
    mapping(address => uint256) public aiModelReputation;
    mapping(uint256 => Battle) public battles;
    
    event MarketCreated(uint256 indexed marketId, string title, address creator);
    event StakePlaced(uint256 indexed marketId, address indexed staker, uint256 amount, bool prediction);
    event MarketResolved(uint256 indexed marketId, bool outcome);
    event RewardClaimed(uint256 indexed marketId, address indexed staker, uint256 reward);
    event BattleCreated(uint256 indexed id, address player1, string direction, uint256 stakeAmount);
    event BattleJoined(uint256 indexed id, address player2, string direction);
    event BattleCompleted(uint256 indexed id, address winner);

    constructor() ERC20("AION Token", "AION") Ownable(msg.sender) {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    function createMarket(
        string memory _title,
        string memory _description,
        uint256 _eventDate
    ) external returns (uint256) {
        require(_eventDate > block.timestamp, "Event date must be in future");
        
        marketCounter++;
        
        markets[marketCounter] = Market({
            id: marketCounter,
            title: _title,
            description: _description,
            eventDate: _eventDate,
            resolved: false,
            outcome: false,
            totalStakeYes: 0,
            totalStakeNo: 0,
            creator: msg.sender,
            createdAt: block.timestamp
        });
        
        emit MarketCreated(marketCounter, _title, msg.sender);
        return marketCounter;
    }

    function stake(uint256 _marketId, uint256 _amount, bool _prediction) external nonReentrant {
        Market storage market = markets[_marketId];
        require(market.id != 0, "Market does not exist");
        require(!market.resolved, "Market already resolved");
        require(block.timestamp < market.eventDate, "Market expired");
        require(_amount > 0, "Amount must be greater than 0");
        require(balanceOf(msg.sender) >= _amount, "Insufficient balance");

        Stake storage userStake = stakes[_marketId][msg.sender];
        require(userStake.amount == 0, "Already staked on this market");

        _transfer(msg.sender, address(this), _amount);

        stakes[_marketId][msg.sender] = Stake({
            amount: _amount,
            prediction: _prediction,
            claimed: false
        });

        if (_prediction) {
            market.totalStakeYes += _amount;
        } else {
            market.totalStakeNo += _amount;
        }

        emit StakePlaced(_marketId, msg.sender, _amount, _prediction);
    }

    function resolveMarket(uint256 _marketId, bool _outcome) external onlyOwner {
        Market storage market = markets[_marketId];
        require(market.id != 0, "Market does not exist");
        require(!market.resolved, "Market already resolved");
        require(block.timestamp >= market.eventDate, "Market not yet expired");

        market.resolved = true;
        market.outcome = _outcome;

        emit MarketResolved(_marketId, _outcome);
    }

    function claimReward(uint256 _marketId) external nonReentrant {
        Market storage market = markets[_marketId];
        require(market.resolved, "Market not resolved");

        Stake storage userStake = stakes[_marketId][msg.sender];
        require(userStake.amount > 0, "No stake found");
        require(!userStake.claimed, "Reward already claimed");
        require(userStake.prediction == market.outcome, "Prediction incorrect");

        uint256 totalWinningStake = market.outcome ? market.totalStakeYes : market.totalStakeNo;
        uint256 totalLosingStake = market.outcome ? market.totalStakeNo : market.totalStakeYes;
        
        uint256 platformFeeAmount = (totalLosingStake * PLATFORM_FEE) / 100;
        uint256 rewardPool = totalLosingStake - platformFeeAmount;
        
        uint256 userReward = userStake.amount + (rewardPool * userStake.amount) / totalWinningStake;

        userStake.claimed = true;
        _transfer(address(this), msg.sender, userReward);

        emit RewardClaimed(_marketId, msg.sender, userReward);
    }

    function getMarket(uint256 _marketId) external view returns (Market memory) {
        return markets[_marketId];
    }

    function getUserStake(uint256 _marketId, address _user) external view returns (Stake memory) {
        return stakes[_marketId][_user];
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    // ============ BATTLE FUNCTIONS ============

    function createBattle(string memory direction, uint256 stakeAmount) public nonReentrant {
        require(stakeAmount > 0, "Stake amount must be greater than 0");
        require(balanceOf(msg.sender) >= stakeAmount, "Insufficient balance");
        
        _transfer(msg.sender, address(this), stakeAmount);
        
        battleCount++;
        battles[battleCount] = Battle({
            player1: msg.sender,
            player2: address(0),
            player1Direction: direction,
            player2Direction: "",
            stakeAmount: stakeAmount,
            isComplete: false,
            winner: address(0)
        });
        
        emit BattleCreated(battleCount, msg.sender, direction, stakeAmount);
    }

    function joinBattle(uint256 id, string memory direction) public nonReentrant {
        Battle storage b = battles[id];
        require(b.player1 != address(0), "Battle not found");
        require(b.player2 == address(0), "Already full");
        require(msg.sender != b.player1, "Cannot join your own battle");
        require(!b.isComplete, "Battle already completed");
        require(balanceOf(msg.sender) >= b.stakeAmount, "Insufficient balance");
        
        _transfer(msg.sender, address(this), b.stakeAmount);
        
        b.player2 = msg.sender;
        b.player2Direction = direction;
        
        emit BattleJoined(id, msg.sender, direction);
    }

    function completeBattle(uint256 id, address winner) public onlyOwner {
        Battle storage b = battles[id];
        require(!b.isComplete, "Already completed");
        require(b.player2 != address(0), "Battle not full");
        require(winner == b.player1 || winner == b.player2, "Invalid winner");
        
        b.isComplete = true;
        b.winner = winner;
        
        uint256 totalPrize = b.stakeAmount * 2;
        uint256 platformFeeAmount = (totalPrize * PLATFORM_FEE) / 100;
        uint256 winnerPrize = totalPrize - platformFeeAmount;
        
        _transfer(address(this), winner, winnerPrize);
        
        emit BattleCompleted(id, winner);
    }

    function getBattle(uint256 id)
        public
        view
        returns (
            address player1,
            address player2,
            string memory dir1,
            string memory dir2,
            uint256 stakeAmount,
            bool complete,
            address winner
        )
    {
        Battle memory b = battles[id];
        return (
            b.player1,
            b.player2,
            b.player1Direction,
            b.player2Direction,
            b.stakeAmount,
            b.isComplete,
            b.winner
        );
    }

    function cancelBattle(uint256 id) public nonReentrant {
        Battle storage b = battles[id];
        require(b.player1 == msg.sender, "Not battle creator");
        require(b.player2 == address(0), "Battle already joined");
        require(!b.isComplete, "Battle already completed");
        
        b.isComplete = true;
        _transfer(address(this), msg.sender, b.stakeAmount);
    }
}
