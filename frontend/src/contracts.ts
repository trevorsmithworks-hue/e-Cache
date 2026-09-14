// Contract addresses and minimal ABIs for e-Cache ($PWC)
// Base Mainnet (Chain ID: 8453)

export const POWER_COIN_ADDRESS = "0x061610342649ceC7Df2451127A84FDf3daa7418d" as const; // Live e-Cache ($PWC) Address
export const VAULT_ADDRESS = "0x89D2B59107F8175d2757B36254146C185e638210" as const; // PowerBlockVault Address
export const MARKETPLACE_ADDRESS = "0x34A1B4321908320743b12389C32145b897123901" as const; // PowerBlockMarketplace Address

export const PWC_ABI = [
  {
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "recipient", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export const VAULT_ABI = [
  {
    inputs: [{ name: "amount", type: "uint256" }],
    name: "depositToPowerBank",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "powerBanksToMerge", type: "uint256" },
      { name: "lockYears", type: "uint256" },
    ],
    name: "forgePowerBlock",
    outputs: [{ name: "tokenId", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "user", type: "address" }],
    name: "getPowerBankBalance",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "tokenId", type: "uint256" }],
    name: "earlyUnlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export const MARKETPLACE_ABI = [
  {
    inputs: [
      { name: "tokenId", type: "uint256" },
      { name: "price", type: "uint256" },
    ],
    name: "listPowerBlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "listingId", type: "uint256" }],
    name: "buyPowerBlock",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ name: "account", type: "address" }],
    name: "getRoyaltyTier",
    outputs: [{ name: "royaltyFeeBps", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;
