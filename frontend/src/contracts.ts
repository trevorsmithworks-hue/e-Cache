// Contract addresses and minimal ABIs for e-Cache ($PWC)
// Base Mainnet (Chain ID: 8453)

export const POWER_COIN_ADDRESS = "0x061610342649ceC7Df2451127A84FDf3daa7418d" as const;
export const VAULT_ADDRESS = "0x089D2B59107F8175d2757B36254146C185e638210" as const;
export const MARKETPLACE_ADDRESS = "0x34A1B4321908320743b12389C32145b897123901" as const;
export const USDC_BASE_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" as const;
export const PWC_LP_TOKEN_ID = "5997348" as const;
export const FOUNDER_WALLET = "0x55dCBa93ED3D1CCUAADDA419ACC2A7f43557615" as const;

export const UNISWAP_TRADE_URL =
  "https://app.uniswap.org/#/swap?chain=base&inputCurrency=0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913&outputCurrency=0x061610342649ceC7Df2451127A84FDf3daa7418d" as const;

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
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export const VAULT_ABI = [
  {
    inputs: [{ name: "amount", type: "uint256" }],
    name: "depositPowerBank",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "termYears", type: "uint256" },
      { name: "bankCount", type: "uint256" },
    ],
    name: "mintPowerBlock",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "tokenId", type: "uint256" }],
    name: "earlyUnlockPowerBlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "tokenId", type: "uint256" }],
    name: "matureUnlockPowerBlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "user", type: "address" }],
    name: "getUserPowerBanks",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
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
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "user", type: "address" }],
    name: "getLoyaltyTier",
    outputs: [{ name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
] as const;
