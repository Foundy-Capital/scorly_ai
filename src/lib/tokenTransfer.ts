import { createPublicClient, http, parseEther, formatEther } from 'viem';
import { bsc } from 'viem/chains';

// BSC mainnet RPC
const BSC_RPC_URL = process.env.BSC_RPC_URL || 'https://bsc-dataseed.binance.org/';

// Token contract addresses
export const TOKEN_ADDRESSES = {
  USDT: '0x7670075d86f068C8Cf9724665588dDefe709B2EE',
  USDC: '0x7670075d86f068C8Cf9724665588dDefe709B2EE',
  SCOR: '0x7670075d86f068C8Cf9724665588dDefe709B2EE',
} as const;

// ERC-20 ABI for transfer function
const ERC20_ABI = [
  {
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

// Create BSC public client
export const publicClient = createPublicClient({
  chain: bsc,
  transport: http(BSC_RPC_URL),
});

// Get token decimals
export async function getTokenDecimals(tokenAddress: string): Promise<number> {
  try {
    const decimals = await publicClient.readContract({
      address: tokenAddress as `0x${string}`,
      abi: ERC20_ABI,
      functionName: 'decimals',
      authorizationList: [],
    });
    return decimals as number;
  } catch (error) {
    console.error('Error getting token decimals:', error);
    // Default to 18 decimals for most tokens
    return 18;
  }
}

// Get token balance
export async function getTokenBalance(
  tokenAddress: string,
  walletAddress: string
): Promise<bigint> {
  try {
    const balance = await publicClient.readContract({
      address: tokenAddress as `0x${string}`,
      abi: ERC20_ABI,
      functionName: 'balanceOf',
      args: [walletAddress as `0x${string}`],
      authorizationList: [],
    });
    return balance as bigint;
  } catch (error) {
    console.error('Error getting token balance:', error);
    return BigInt(0);
  }
}

// Check if user has sufficient balance
export async function hasSufficientBalance(
  tokenAddress: string,
  walletAddress: string,
  amount: number
): Promise<boolean> {
  const balance = await getTokenBalance(tokenAddress, walletAddress);
  const decimals = await getTokenDecimals(tokenAddress);
  const requiredAmount = BigInt(Math.floor(amount * Math.pow(10, decimals)));

  return balance >= requiredAmount;
}

// Wait for transaction confirmation
export async function waitForConfirmation(txHash: string, confirmations = 1): Promise<boolean> {
  try {
    const receipt = await publicClient.waitForTransactionReceipt({
      hash: txHash as `0x${string}`,
      confirmations,
    });
    return receipt.status === 'success';
  } catch (error) {
    console.error('Error waiting for confirmation:', error);
    return false;
  }
}

// Calculate token amount with decimals
export function calculateTokenAmount(amount: number, decimals: number): bigint {
  return BigInt(Math.floor(amount * Math.pow(10, decimals)));
}

// Format token amount for display
export function formatTokenAmount(amount: bigint, decimals: number): number {
  return Number(amount) / Math.pow(10, decimals);
}
