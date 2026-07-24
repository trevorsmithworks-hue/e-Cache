// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ECachePowerCoin is ERC20, Ownable {
    address public creatorWallet;
    
    // 50 basis points = 0.5% creator reflection tax
    uint256 public constant TAX_RATE = 50; 
    uint256 public constant BASIS_POINTS = 10000;

    mapping(address => bool) public isExcludedFromTax;

    constructor(address _creatorWallet) ERC20("e-Cache", "PWC") Ownable(msg.sender) {
        require(_creatorWallet != address(0), "Invalid creator address");
        creatorWallet = _creatorWallet;

        // Mint hard-capped total supply of 10,000,000 tokens to deployer
        _mint(msg.sender, 10000000 * 10 ** decimals());

        isExcludedFromTax[msg.sender] = true;
        isExcludedFromTax[address(this)] = true;
        isExcludedFromTax[_creatorWallet] = true;
    }

    function setCreatorWallet(address _newWallet) external onlyOwner {
        require(_newWallet != address(0), "Invalid address");
        creatorWallet = _newWallet;
    }

    function setExcludedFromTax(address account, bool excluded) external onlyOwner {
        isExcludedFromTax[account] = excluded;
    }

    function _update(
        address sender,
        address recipient,
        uint256 amount
    ) internal virtual override {
        if (sender == address(0) || recipient == address(0) || isExcludedFromTax[sender] || isExcludedFromTax[recipient]) {
            super._update(sender, recipient, amount);
            return;
        }

        uint256 taxAmount = (amount * TAX_RATE) / BASIS_POINTS;
        uint256 netAmount = amount - taxAmount;

        if (taxAmount > 0) {
            super._update(sender, creatorWallet, taxAmount);
        }

        super._update(sender, recipient, netAmount);
    }
}
