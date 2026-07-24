// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IPowerCoin {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
}

contract PowerBlockVault {
    IPowerCoin public immutable powerCoin;
    
    uint256 public constant MAX_POWER_BANK_CAP = 100 * 10 ** 18; // Capped at 100 PWC
    
    struct PowerBlock {
        uint256 bankCount;
        uint256 totalPooledPWC;
        uint256 unlockTimestamp;
        bool isYieldBoosted;
        address owner;
    }

    mapping(uint256 => PowerBlock) public powerBlocks;
    mapping(address => uint256[]) public userPowerBlocks;
    uint256 public nextBlockId;

    event PowerBankCreated(address indexed owner, uint256 amount);
    event PowerBlockVaulted(address indexed owner, uint256 blockId, uint256 lockYears, uint256 totalPWC);

    constructor(address _powerCoinAddress) {
        powerCoin = IPowerCoin(_powerCoinAddress);
    }

    function depositPowerBank(uint256 amount) external {
        require(amount <= MAX_POWER_BANK_CAP, "Exceeds 100 PWC Power Bank limit");
        require(powerCoin.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        
        emit PowerBankCreated(msg.sender, amount);
    }

    function mintPowerBlock(uint256 totalAmount, uint256 lockYears, bool verifiedEfficient) external {
        require(lockYears == 5 || lockYears == 10 || lockYears == 20, "Invalid bond term");
        require(powerCoin.transferFrom(msg.sender, address(this), totalAmount), "Transfer failed");

        uint256 unlockTime = block.timestamp + (lockYears * 365 days);
        uint256 blockId = nextBlockId++;

        powerBlocks[blockId] = PowerBlock({
            bankCount: totalAmount / MAX_POWER_BANK_CAP,
            totalPooledPWC: totalAmount,
            unlockTimestamp: unlockTime,
            isYieldBoosted: verifiedEfficient,
            owner: msg.sender
        });

        userPowerBlocks[msg.sender].push(blockId);
        emit PowerBlockVaulted(msg.sender, blockId, lockYears, totalAmount);
    }
}
