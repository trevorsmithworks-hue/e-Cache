// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";

contract PowerBlockTieredMarketplace is ERC721, IERC2981 {
    address public creatorWallet;
    
    uint256 public constant BASE_ROYALTY = 250; // 2.5% base royalty

    constructor(address _creatorWallet) ERC721("e-Cache Power Block", "PWB") {
        creatorWallet = _creatorWallet;
    }

    function royaltyInfo(
        uint256 tokenId,
        uint256 salePrice
    ) external view override returns (address receiver, uint256 royaltyAmount) {
        address seller = ownerOf(tokenId);
        uint256 balance = balanceOf(seller);

        uint256 adjustedBps = BASE_ROYALTY;

        if (balance >= 10) {
            adjustedBps = 100; // Gold Tier: 1.0% royalty
        } else if (balance >= 5) {
            adjustedBps = 150; // Silver Tier: 1.5% royalty
        } else if (balance >= 3) {
            adjustedBps = 200; // Bronze Tier: 2.0% royalty
        }

        uint256 amount = (salePrice * adjustedBps) / 10000;
        return (creatorWallet, amount);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, IERC165) returns (bool) {
        return interfaceId == type(IERC2981).interfaceId || super.supportsInterface(interfaceId);
    }
}
