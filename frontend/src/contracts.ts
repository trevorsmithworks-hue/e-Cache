// Contract addresses and minimal ABIs for e-Cache ($PWC)

export const PWC_ADDRESS = "0x71C09590DF0E0630b91012C1215B6323a7674258"; // Deployed ECachePowerCoin Address (Sepolia)
export const VAULT_ADDRESS = "0x89D2B59107F8175d2757B36254146C185e638210"; // Deployed PowerBlockVault Address (Sepolia)
export const MARKETPLACE_ADDRESS = "0x34A1B4321908320743b12389C32145b897123901"; // Deployed PowerBlockTieredMarketplace Address (Sepolia)

export const PWC_ABI = [
  {
    "inputs": [{ "name": "account", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "name": "spender", "type": "address" },
      { "name": "amount", "type": "uint256" }
    ],
    "name": "approve",
    "outputs": [{ "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "name": "recipient", "type": "address" },
      { "name": "amount", "type": "uint256" }
    ],
    "name": "transfer",
    "outputs": [{ "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

export const VAULT_ABI = [
  {
    "inputs": [{ "name": "amount", "type": "uint256" }],
    "name": "depositToPowerBank",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "name": "account", "type": "address" }],
    "name": "stakedBalanceOf",
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "name": "amount", "type": "uint256" }],
    "name": "withdrawFromPowerBank",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

export const MARKETPLACE_ABI = [
  {
    "inputs": [{ "name": "tokenId", "type": "uint256" }],
    "name": "getRoyaltyTier",
    "outputs": [{ "name": "", "type": "uint8" }],
    "stateMutability": "view",
    "type": "function"
  }
] as const;
