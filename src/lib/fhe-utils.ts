import { createFhevmInstance } from '@fhevm/solidity';

// FHE utility functions for Stealth Vault Analytics
export class FHEUtils {
  private static instance: any = null;

  /**
   * Initialize FHE instance
   */
  static async initializeFHE() {
    if (!this.instance) {
      this.instance = await createFhevmInstance();
    }
    return this.instance;
  }

  /**
   * Get FHE instance
   */
  static async getFhevmInstance() {
    if (!this.instance) {
      await this.initializeFHE();
    }
    return this.instance;
  }

  /**
   * Encrypt a number for FHE operations
   */
  static async encryptNumber(
    value: number,
    contractAddress: string,
    userAddress: string
  ): Promise<{ encryptedData: string; inputProof: string }> {
    const fhevm = await this.getFhevmInstance();
    
    try {
      const encryptedData = fhevm.encrypt32(value);
      const inputProof = fhevm.generateInputProof(contractAddress, userAddress, encryptedData);
      
      return {
        encryptedData: encryptedData,
        inputProof: inputProof
      };
    } catch (error) {
      console.error('Error encrypting number:', error);
      throw error;
    }
  }

  /**
   * Decrypt a number from FHE operations
   */
  static async decryptNumber(
    encryptedData: string,
    contractAddress: string,
    userAddress: string
  ): Promise<number> {
    const fhevm = await this.getFhevmInstance();
    
    try {
      const decryptedValue = fhevm.decrypt(contractAddress, encryptedData);
      return Number(decryptedValue);
    } catch (error) {
      console.error('Error decrypting number:', error);
      throw error;
    }
  }

  /**
   * Encrypt portfolio data
   */
  static async encryptPortfolioData(
    totalValue: number,
    totalPnl: number,
    riskExposure: number,
    diversificationScore: number,
    contractAddress: string,
    userAddress: string
  ) {
    const [totalValueEnc, totalPnlEnc, riskEnc, divEnc] = await Promise.all([
      this.encryptNumber(totalValue, contractAddress, userAddress),
      this.encryptNumber(totalPnl, contractAddress, userAddress),
      this.encryptNumber(riskExposure, contractAddress, userAddress),
      this.encryptNumber(diversificationScore, contractAddress, userAddress)
    ]);

    return {
      totalValue: totalValueEnc,
      totalPnl: totalPnlEnc,
      riskExposure: riskEnc,
      diversificationScore: divEnc
    };
  }

  /**
   * Encrypt position data
   */
  static async encryptPositionData(
    amount: number,
    shares: number,
    entryPrice: number,
    contractAddress: string,
    userAddress: string
  ) {
    const [amountEnc, sharesEnc, priceEnc] = await Promise.all([
      this.encryptNumber(amount, contractAddress, userAddress),
      this.encryptNumber(shares, contractAddress, userAddress),
      this.encryptNumber(entryPrice, contractAddress, userAddress)
    ]);

    return {
      amount: amountEnc,
      shares: sharesEnc,
      entryPrice: priceEnc
    };
  }

  /**
   * Encrypt vault metrics
   */
  static async encryptVaultMetrics(
    tvl: number,
    totalShares: number,
    performance: number,
    riskScore: number,
    contractAddress: string,
    userAddress: string
  ) {
    const [tvlEnc, sharesEnc, perfEnc, riskEnc] = await Promise.all([
      this.encryptNumber(tvl, contractAddress, userAddress),
      this.encryptNumber(totalShares, contractAddress, userAddress),
      this.encryptNumber(performance, contractAddress, userAddress),
      this.encryptNumber(riskScore, contractAddress, userAddress)
    ]);

    return {
      tvl: tvlEnc,
      totalShares: sharesEnc,
      performance: perfEnc,
      riskScore: riskEnc
    };
  }

  /**
   * Generate random encrypted data for testing
   */
  static async generateRandomEncryptedData(
    contractAddress: string,
    userAddress: string
  ) {
    const randomValue = Math.floor(Math.random() * 1000000);
    return this.encryptNumber(randomValue, contractAddress, userAddress);
  }
}

// Contract interaction utilities
export class ContractUtils {
  /**
   * Get contract instance
   */
  static async getContractInstance(contractAddress: string, abi: any, signer: any) {
    const { ethers } = await import('ethers');
    return new ethers.Contract(contractAddress, abi, signer);
  }

  /**
   * Call contract function with encrypted data
   */
  static async callContractWithEncryption(
    contract: any,
    functionName: string,
    encryptedData: any,
    options?: any
  ) {
    try {
      const tx = await contract[functionName](encryptedData, options);
      return await tx.wait();
    } catch (error) {
      console.error(`Error calling ${functionName}:`, error);
      throw error;
    }
  }

  /**
   * Get encrypted data from contract
   */
  static async getEncryptedDataFromContract(
    contract: any,
    functionName: string,
    ...args: any[]
  ) {
    try {
      const result = await contract[functionName](...args);
      return result;
    } catch (error) {
      console.error(`Error getting data from ${functionName}:`, error);
      throw error;
    }
  }
}

// Portfolio calculation utilities
export class PortfolioUtils {
  /**
   * Calculate portfolio metrics
   */
  static calculatePortfolioMetrics(positions: any[]) {
    let totalValue = 0;
    let totalPnl = 0;
    let riskExposure = 0;
    let diversificationScore = 0;

    positions.forEach((position, index) => {
      totalValue += position.value || 0;
      totalPnl += position.pnl || 0;
      riskExposure += position.risk || 0;
      diversificationScore += position.diversification || 0;
    });

    return {
      totalValue: Math.round(totalValue),
      totalPnl: Math.round(totalPnl),
      riskExposure: Math.round(riskExposure / positions.length) || 0,
      diversificationScore: Math.round(diversificationScore / positions.length) || 0
    };
  }

  /**
   * Calculate position metrics
   */
  static calculatePositionMetrics(entryPrice: number, currentPrice: number, amount: number) {
    const pnl = (currentPrice - entryPrice) * amount;
    const pnlPercentage = entryPrice > 0 ? (pnl / (entryPrice * amount)) * 100 : 0;
    const risk = Math.abs(pnlPercentage) > 20 ? 80 : Math.abs(pnlPercentage) * 4;
    const diversification = Math.min(100, Math.max(0, 100 - risk));

    return {
      value: currentPrice * amount,
      pnl: Math.round(pnl),
      pnlPercentage: Math.round(pnlPercentage * 100) / 100,
      risk: Math.round(risk),
      diversification: Math.round(diversification)
    };
  }
}
