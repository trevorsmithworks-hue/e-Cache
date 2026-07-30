// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title AIEnergyOracle
 * @author e-Cache Ecosystem
 * @notice Converts AI model inference parameters into raw Joules, electrical kWh, 
 * and equivalent e-Cache Power Coins ($PWC).
 */
contract AIEnergyOracle is Ownable {

    // Model Efficiency Profiles: Joules per 1,000 generated tokens
    mapping(string => uint256) public modelJoulesPerKiloToken;
    
    // Default Global Utilities (can be updated via Oracle feeds)
    uint256 public globalKwhPriceCents; // e.g., 16 = $0.16 USD / kWh
    uint256 public pwcPriceCents;       // e.g., 16 = $0.16 USD / PWC

    event ModelEfficiencyUpdated(string indexed modelName, uint256 joulesPerKiloToken);
    event GlobalRatesUpdated(uint256 newKwhPriceCents, uint256 newPwcPriceCents);
    event AIInferenceCostCalculated(
        string indexed modelName,
        uint256 tokenCount,
        uint256 totalKWhScaled,
        uint256 pwcCostScaled
    );

    /**
     * @dev Pass the deployer address as initial owner for OpenZeppelin v5 compatibility
     */
    constructor(address initialOwner) Ownable(initialOwner) {
        // Industry Baseline Efficiencies (Joules per 1,000 tokens)
        modelJoulesPerKiloToken["gpt-4o"] = 36000;      // ~36 Joules / token
        modelJoulesPerKiloToken["llama-3-70b"] = 12000; // ~12 Joules / token
        modelJoulesPerKiloToken["claude-haiku"] = 3000; // ~3 Joules / token
        modelJoulesPerKiloToken["light-model"] = 1500;  // ~1.5 Joules / token

        // Starting Default Index Values ($0.16 / kWh and $0.16 / PWC)
        globalKwhPriceCents = 16;
        pwcPriceCents = 16;
    }

    /**
     * @notice Registers or updates an AI model's energy efficiency signature
     * @param modelName String identifier of the AI model
     * @param joulesPerKiloToken Hardware Joules consumed per 1,000 tokens
     */
    function setModelEfficiency(string memory modelName, uint256 joulesPerKiloToken) external onlyOwner {
        require(joulesPerKiloToken > 0, "Efficiency must be greater than zero");
        modelJoulesPerKiloToken[modelName] = joulesPerKiloToken;
        emit ModelEfficiencyUpdated(modelName, joulesPerKiloToken);
    }

    /**
     * @notice Updates the live global kWh average price and $PWC market index
     */
    function updateRates(uint256 newKwhPriceCents, uint256 newPwcPriceCents) external onlyOwner {
        require(newKwhPriceCents > 0 && newPwcPriceCents > 0, "Prices must be positive");
        globalKwhPriceCents = newKwhPriceCents;
        pwcPriceCents = newPwcPriceCents;
        emit GlobalRatesUpdated(newKwhPriceCents, newPwcPriceCents);
    }

    /**
     * @notice Calculates the exact kWh footprint and $PWC cost for an AI inference batch
     * @param modelName Name of the registered AI model
     * @param tokenCount Number of tokens generated or processed
     * @return totalKWhScaled Total electrical energy in kWh (scaled by 1e18)
     * @return pwcCostScaled Total cost in $PWC (scaled by 1e18 precision)
     */
    function calculateAIPowerCost(
        string memory modelName,
        uint256 tokenCount
    ) public view returns (uint256 totalKWhScaled, uint256 pwcCostScaled) {
        uint256 joulesPerKilo = modelJoulesPerKiloToken[modelName];
        require(joulesPerKilo > 0, "AI model not registered in oracle");

        // Total Joules = (tokenCount / 1,000) * JoulesPerKilo
        uint256 totalJoules = (tokenCount * joulesPerKilo) / 1000;
        
        // Convert Joules to kWh: 1 kWh = 3,600,000 Joules (Scaled by 1e18 for precision)
        totalKWhScaled = (totalJoules * 1e18) / 3600000; 
        
        // USD Cost in Cents = totalKWhScaled * globalKwhPriceCents
        uint256 usdCostCentsScaled = totalKWhScaled * globalKwhPriceCents;

        // PWC Cost = (usdCostCentsScaled) / pwcPriceCents
        pwcCostScaled = usdCostCentsScaled / pwcPriceCents;
    }
}
