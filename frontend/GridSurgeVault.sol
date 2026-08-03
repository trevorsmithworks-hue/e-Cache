// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract GridSurgeVault is Ownable {
    IERC20 public immutable powerCoin;

    bool public isGridSurgeActive;
    uint256 public constant BASE_YIELD_BPS = 500;       // 5.0% Base APY
    uint256 public constant GRID_SURGE_BONUS_BPS = 300; // +3.0% APY Grid Surge
    uint256 public constant GREEN_ZK_BONUS_BPS = 200;   // +2.0% APY ZK-Green Proof

    struct VaultStake {
        uint256 principal;
        uint256 startTime;
        uint256 termYears;
        bool hasZkGreenProof;
        bool isSettled;
    }

    mapping(address => VaultStake[]) public userStakes;

    event StakeCreated(address indexed user, uint256 amount, uint256 termYears, bool isGreen);
    event GridSurgeToggled(bool activeStatus);
    event YieldClaimed(address indexed user, uint256 principal, uint256 yieldEarned);

    constructor(address _powerCoinAddress) Ownable(msg.sender) {
        require(_powerCoinAddress != address(0), "Invalid token address");
        powerCoin = IERC20(_powerCoinAddress);
    }

    function toggleGridSurge(bool _active) external onlyOwner {
        isGridSurgeActive = _active;
        emit GridSurgeToggled(_active);
    }

    function createPowerBlockStake(uint256 _amount, uint256 _termYears, bool _hasZkGreenProof) external {
        require(_termYears == 5 || _termYears == 10 || _termYears == 20, "Invalid term horizon");
        require(_amount > 0, "Amount must exceed 0");

        powerCoin.transferFrom(msg.sender, address(this), _amount);

        userStakes[msg.sender].push(VaultStake({
            principal: _amount,
            startTime: block.timestamp,
            termYears: _termYears,
            hasZkGreenProof: _hasZkGreenProof,
            isSettled: false
        }));

        emit StakeCreated(msg.sender, _amount, _termYears, _hasZkGreenProof);
    }

    function calculateCurrentApy(bool _hasZkGreenProof) public view returns (uint256) {
        uint256 totalApy = BASE_YIELD_BPS;
        if (isGridSurgeActive) {
            totalApy += GRID_SURGE_BONUS_BPS;
        }
        if (_hasZkGreenProof) {
            totalApy += GREEN_ZK_BONUS_BPS;
        }
        return totalApy;
    }
}
