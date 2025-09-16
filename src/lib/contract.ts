import { useAccount, useWriteContract, useReadContract } from 'wagmi';
import { FHEUtils, ContractUtils, PortfolioUtils } from './fhe-utils';

// Contract ABI (simplified for demo)
export const STEALTH_VAULT_ABI = [
  {
    "inputs": [
      {"name": "amount", "type": "bytes"},
      {"name": "shares", "type": "bytes"},
      {"name": "entryPrice", "type": "bytes"},
      {"name": "inputProof", "type": "bytes"}
    ],
    "name": "createPosition",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {"name": "positionId", "type": "uint256"},
      {"name": "newAmount", "type": "bytes"},
      {"name": "newShares", "type": "bytes"},
      {"name": "inputProof", "type": "bytes"}
    ],
    "name": "updatePosition",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"name": "totalValue", "type": "bytes"},
      {"name": "totalPnl", "type": "bytes"},
      {"name": "riskExposure", "type": "bytes"},
      {"name": "diversificationScore", "type": "bytes"},
      {"name": "inputProof", "type": "bytes"}
    ],
    "name": "updatePortfolioMetrics",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "requestAnalytics",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "positionId", "type": "uint256"}],
    "name": "getPositionData",
    "outputs": [
      {"name": "amount", "type": "bytes"},
      {"name": "shares", "type": "bytes"},
      {"name": "entryPrice", "type": "bytes"},
      {"name": "currentPrice", "type": "bytes"},
      {"name": "isActive", "type": "bytes"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "user", "type": "address"}],
    "name": "getPortfolioData",
    "outputs": [
      {"name": "totalValue", "type": "bytes"},
      {"name": "totalPnl", "type": "bytes"},
      {"name": "riskExposure", "type": "bytes"},
      {"name": "diversificationScore", "type": "bytes"},
      {"name": "isPrivate", "type": "bytes"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "user", "type": "address"}],
    "name": "getUserPositionCount",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "user", "type": "address"}],
    "name": "getUserPositionIds",
    "outputs": [{"name": "", "type": "uint256[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "clearPrivateData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "positionId", "type": "uint256"}],
    "name": "clearPositionData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

// Contract address (will be set after deployment)
export const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000"; // Placeholder

// Hook for contract interactions
export function useStealthVaultContract() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();

  // Create position with encrypted data
  const createPosition = async (
    amount: number,
    shares: number,
    entryPrice: number
  ) => {
    if (!address) throw new Error("No wallet connected");

    try {
      const encryptedData = await FHEUtils.encryptPositionData(
        amount,
        shares,
        entryPrice,
        CONTRACT_ADDRESS,
        address
      );

      const hash = await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: STEALTH_VAULT_ABI,
        functionName: 'createPosition',
        args: [
          encryptedData.amount.encryptedData,
          encryptedData.shares.encryptedData,
          encryptedData.entryPrice.encryptedData,
          encryptedData.amount.inputProof
        ],
        value: BigInt(0) // No ETH required for this demo
      });

      return hash;
    } catch (error) {
      console.error('Error creating position:', error);
      throw error;
    }
  };

  // Update position with encrypted data
  const updatePosition = async (
    positionId: number,
    newAmount: number,
    newShares: number
  ) => {
    if (!address) throw new Error("No wallet connected");

    try {
      const encryptedData = await FHEUtils.encryptPositionData(
        newAmount,
        newShares,
        0, // entryPrice not needed for update
        CONTRACT_ADDRESS,
        address
      );

      const hash = await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: STEALTH_VAULT_ABI,
        functionName: 'updatePosition',
        args: [
          BigInt(positionId),
          encryptedData.amount.encryptedData,
          encryptedData.shares.encryptedData,
          encryptedData.amount.inputProof
        ]
      });

      return hash;
    } catch (error) {
      console.error('Error updating position:', error);
      throw error;
    }
  };

  // Update portfolio metrics with encrypted data
  const updatePortfolioMetrics = async (
    totalValue: number,
    totalPnl: number,
    riskExposure: number,
    diversificationScore: number
  ) => {
    if (!address) throw new Error("No wallet connected");

    try {
      const encryptedData = await FHEUtils.encryptPortfolioData(
        totalValue,
        totalPnl,
        riskExposure,
        diversificationScore,
        CONTRACT_ADDRESS,
        address
      );

      const hash = await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: STEALTH_VAULT_ABI,
        functionName: 'updatePortfolioMetrics',
        args: [
          encryptedData.totalValue.encryptedData,
          encryptedData.totalPnl.encryptedData,
          encryptedData.riskExposure.encryptedData,
          encryptedData.diversificationScore.encryptedData,
          encryptedData.totalValue.inputProof
        ]
      });

      return hash;
    } catch (error) {
      console.error('Error updating portfolio metrics:', error);
      throw error;
    }
  };

  // Request analytics
  const requestAnalytics = async () => {
    if (!address) throw new Error("No wallet connected");

    try {
      const hash = await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: STEALTH_VAULT_ABI,
        functionName: 'requestAnalytics',
        args: []
      });

      return hash;
    } catch (error) {
      console.error('Error requesting analytics:', error);
      throw error;
    }
  };

  // Clear all private data
  const clearPrivateData = async () => {
    if (!address) throw new Error("No wallet connected");

    try {
      const hash = await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: STEALTH_VAULT_ABI,
        functionName: 'clearPrivateData',
        args: []
      });

      return hash;
    } catch (error) {
      console.error('Error clearing private data:', error);
      throw error;
    }
  };

  // Clear specific position data
  const clearPositionData = async (positionId: number) => {
    if (!address) throw new Error("No wallet connected");

    try {
      const hash = await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: STEALTH_VAULT_ABI,
        functionName: 'clearPositionData',
        args: [BigInt(positionId)]
      });

      return hash;
    } catch (error) {
      console.error('Error clearing position data:', error);
      throw error;
    }
  };

  return {
    createPosition,
    updatePosition,
    updatePortfolioMetrics,
    requestAnalytics,
    clearPrivateData,
    clearPositionData
  };
}

// Hook for reading contract data
export function useStealthVaultData() {
  const { address } = useAccount();

  // Get user position count
  const { data: positionCount } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: STEALTH_VAULT_ABI,
    functionName: 'getUserPositionCount',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address
    }
  });

  // Get user position IDs
  const { data: positionIds } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: STEALTH_VAULT_ABI,
    functionName: 'getUserPositionIds',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address
    }
  });

  return {
    positionCount: positionCount ? Number(positionCount) : 0,
    positionIds: positionIds || []
  };
}

// Utility functions for portfolio management
export class PortfolioManager {
  /**
   * Create a new position
   */
  static async createPosition(
    amount: number,
    shares: number,
    entryPrice: number,
    contract: any
  ) {
    const metrics = PortfolioUtils.calculatePositionMetrics(entryPrice, entryPrice, amount);
    
    return {
      amount,
      shares,
      entryPrice,
      currentPrice: entryPrice,
      value: metrics.value,
      pnl: metrics.pnl,
      pnlPercentage: metrics.pnlPercentage,
      risk: metrics.risk,
      diversification: metrics.diversification,
      timestamp: Date.now()
    };
  }

  /**
   * Update position with new data
   */
  static async updatePosition(
    position: any,
    newAmount: number,
    newShares: number,
    newCurrentPrice: number
  ) {
    const metrics = PortfolioUtils.calculatePositionMetrics(
      position.entryPrice,
      newCurrentPrice,
      newAmount
    );

    return {
      ...position,
      amount: newAmount,
      shares: newShares,
      currentPrice: newCurrentPrice,
      value: metrics.value,
      pnl: metrics.pnl,
      pnlPercentage: metrics.pnlPercentage,
      risk: metrics.risk,
      diversification: metrics.diversification,
      lastUpdate: Date.now()
    };
  }

  /**
   * Calculate portfolio summary
   */
  static calculatePortfolioSummary(positions: any[]) {
    return PortfolioUtils.calculatePortfolioMetrics(positions);
  }
}
