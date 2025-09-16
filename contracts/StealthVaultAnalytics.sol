// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint64, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";
import { Reencrypt } from "@fhevm/solidity/lib/Reencrypt.sol";

contract StealthVaultAnalytics is SepoliaConfig {
    using FHE for *;
    
    struct VaultPosition {
        euint32 positionId;
        euint32 encryptedAmount; // Encrypted amount in the vault
        euint32 encryptedShares; // Encrypted shares owned by user
        euint32 encryptedEntryPrice; // Encrypted entry price
        euint32 encryptedCurrentPrice; // Encrypted current price
        ebool isActive;
        address owner;
        uint256 timestamp;
    }
    
    struct VaultMetrics {
        euint32 totalValueLocked; // Encrypted TVL
        euint32 totalShares; // Encrypted total shares
        euint32 performance; // Encrypted performance percentage
        euint32 riskScore; // Encrypted risk score (1-100)
        ebool isPublic; // Whether metrics are public
        uint256 lastUpdate;
    }
    
    struct UserPortfolio {
        euint32 totalValue; // Encrypted total portfolio value
        euint32 totalPnl; // Encrypted total P&L
        euint32 riskExposure; // Encrypted risk exposure
        euint32 diversificationScore; // Encrypted diversification score
        ebool isPrivate; // Whether portfolio is private
        address owner;
        uint256 lastUpdate;
    }
    
    mapping(uint256 => VaultPosition) public positions;
    mapping(address => uint256[]) public userPositions;
    mapping(address => UserPortfolio) public portfolios;
    mapping(uint256 => VaultMetrics) public vaultMetrics;
    
    uint256 public positionCounter;
    uint256 public vaultCounter;
    
    address public owner;
    address public analyticsOracle;
    
    event PositionCreated(uint256 indexed positionId, address indexed owner, uint32 amount);
    event PositionUpdated(uint256 indexed positionId, uint32 newAmount);
    event PortfolioUpdated(address indexed owner, uint32 totalValue);
    event VaultMetricsUpdated(uint256 indexed vaultId, uint32 tvl);
    event AnalyticsRequested(address indexed requester, uint256 timestamp);
    
    constructor(address _analyticsOracle) {
        owner = msg.sender;
        analyticsOracle = _analyticsOracle;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyOracle() {
        require(msg.sender == analyticsOracle, "Only oracle can call this function");
        _;
    }
    
    /**
     * @dev Create a new vault position with encrypted data
     */
    function createPosition(
        externalEuint32 amount,
        externalEuint32 shares,
        externalEuint32 entryPrice,
        bytes calldata inputProof
    ) public payable returns (uint256) {
        uint256 positionId = positionCounter++;
        
        // Convert external encrypted values to internal
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        euint32 internalShares = FHE.fromExternal(shares, inputProof);
        euint32 internalEntryPrice = FHE.fromExternal(entryPrice, inputProof);
        
        positions[positionId] = VaultPosition({
            positionId: FHE.asEuint32(positionId),
            encryptedAmount: internalAmount,
            encryptedShares: internalShares,
            encryptedEntryPrice: internalEntryPrice,
            encryptedCurrentPrice: internalEntryPrice, // Initially same as entry
            isActive: FHE.asEbool(true),
            owner: msg.sender,
            timestamp: block.timestamp
        });
        
        userPositions[msg.sender].push(positionId);
        
        emit PositionCreated(positionId, msg.sender, 0); // Amount encrypted, emit 0
        return positionId;
    }
    
    /**
     * @dev Update position with new encrypted data
     */
    function updatePosition(
        uint256 positionId,
        externalEuint32 newAmount,
        externalEuint32 newShares,
        bytes calldata inputProof
    ) public {
        require(positions[positionId].owner == msg.sender, "Not position owner");
        require(FHE.decrypt(positions[positionId].isActive), "Position not active");
        
        euint32 internalAmount = FHE.fromExternal(newAmount, inputProof);
        euint32 internalShares = FHE.fromExternal(newShares, inputProof);
        
        positions[positionId].encryptedAmount = internalAmount;
        positions[positionId].encryptedShares = internalShares;
        
        emit PositionUpdated(positionId, 0); // Amount encrypted, emit 0
    }
    
    /**
     * @dev Update current price for a position (oracle only)
     */
    function updateCurrentPrice(
        uint256 positionId,
        externalEuint32 newPrice,
        bytes calldata inputProof
    ) public onlyOracle {
        require(FHE.decrypt(positions[positionId].isActive), "Position not active");
        
        euint32 internalPrice = FHE.fromExternal(newPrice, inputProof);
        positions[positionId].encryptedCurrentPrice = internalPrice;
    }
    
    /**
     * @dev Calculate and update portfolio metrics
     */
    function updatePortfolioMetrics(
        externalEuint32 totalValue,
        externalEuint32 totalPnl,
        externalEuint32 riskExposure,
        externalEuint32 diversificationScore,
        bytes calldata inputProof
    ) public {
        euint32 internalTotalValue = FHE.fromExternal(totalValue, inputProof);
        euint32 internalTotalPnl = FHE.fromExternal(totalPnl, inputProof);
        euint32 internalRiskExposure = FHE.fromExternal(riskExposure, inputProof);
        euint32 internalDiversificationScore = FHE.fromExternal(diversificationScore, inputProof);
        
        portfolios[msg.sender] = UserPortfolio({
            totalValue: internalTotalValue,
            totalPnl: internalTotalPnl,
            riskExposure: internalRiskExposure,
            diversificationScore: internalDiversificationScore,
            isPrivate: FHE.asEbool(true),
            owner: msg.sender,
            lastUpdate: block.timestamp
        });
        
        emit PortfolioUpdated(msg.sender, 0); // Value encrypted, emit 0
    }
    
    /**
     * @dev Update vault metrics (oracle only)
     */
    function updateVaultMetrics(
        uint256 vaultId,
        externalEuint32 tvl,
        externalEuint32 totalShares,
        externalEuint32 performance,
        externalEuint32 riskScore,
        bytes calldata inputProof
    ) public onlyOracle {
        euint32 internalTvl = FHE.fromExternal(tvl, inputProof);
        euint32 internalTotalShares = FHE.fromExternal(totalShares, inputProof);
        euint32 internalPerformance = FHE.fromExternal(performance, inputProof);
        euint32 internalRiskScore = FHE.fromExternal(riskScore, inputProof);
        
        vaultMetrics[vaultId] = VaultMetrics({
            totalValueLocked: internalTvl,
            totalShares: internalTotalShares,
            performance: internalPerformance,
            riskScore: internalRiskScore,
            isPublic: FHE.asEbool(false), // Default to private
            lastUpdate: block.timestamp
        });
        
        emit VaultMetricsUpdated(vaultId, 0); // TVL encrypted, emit 0
    }
    
    /**
     * @dev Request analytics data (triggers oracle update)
     */
    function requestAnalytics() public {
        emit AnalyticsRequested(msg.sender, block.timestamp);
    }
    
    /**
     * @dev Get encrypted position data (for reencryption)
     */
    function getPositionData(uint256 positionId) public view returns (
        euint32 amount,
        euint32 shares,
        euint32 entryPrice,
        euint32 currentPrice,
        ebool isActive
    ) {
        VaultPosition memory position = positions[positionId];
        return (
            position.encryptedAmount,
            position.encryptedShares,
            position.encryptedEntryPrice,
            position.encryptedCurrentPrice,
            position.isActive
        );
    }
    
    /**
     * @dev Get encrypted portfolio data (for reencryption)
     */
    function getPortfolioData(address user) public view returns (
        euint32 totalValue,
        euint32 totalPnl,
        euint32 riskExposure,
        euint32 diversificationScore,
        ebool isPrivate
    ) {
        UserPortfolio memory portfolio = portfolios[user];
        return (
            portfolio.totalValue,
            portfolio.totalPnl,
            portfolio.riskExposure,
            portfolio.diversificationScore,
            portfolio.isPrivate
        );
    }
    
    /**
     * @dev Get encrypted vault metrics (for reencryption)
     */
    function getVaultMetrics(uint256 vaultId) public view returns (
        euint32 totalValueLocked,
        euint32 totalShares,
        euint32 performance,
        euint32 riskScore,
        ebool isPublic
    ) {
        VaultMetrics memory metrics = vaultMetrics[vaultId];
        return (
            metrics.totalValueLocked,
            metrics.totalShares,
            metrics.performance,
            metrics.riskScore,
            metrics.isPublic
        );
    }
    
    /**
     * @dev Set oracle address (owner only)
     */
    function setOracle(address _oracle) public onlyOwner {
        analyticsOracle = _oracle;
    }
    
    /**
     * @dev Clear user's private data (user only)
     */
    function clearPrivateData() public {
        require(portfolios[msg.sender].owner == msg.sender, "Not portfolio owner");
        
        // Clear portfolio data
        delete portfolios[msg.sender];
        
        // Clear user positions
        delete userPositions[msg.sender];
        
        emit PortfolioUpdated(msg.sender, 0);
    }
    
    /**
     * @dev Clear specific position data (position owner only)
     */
    function clearPositionData(uint256 positionId) public {
        require(positions[positionId].owner == msg.sender, "Not position owner");
        
        // Mark position as inactive instead of deleting to maintain history
        positions[positionId].isActive = FHE.asEbool(false);
        positions[positionId].encryptedAmount = FHE.asEuint32(0);
        positions[positionId].encryptedShares = FHE.asEuint32(0);
        
        emit PositionUpdated(positionId, 0);
    }
    
    /**
     * @dev Emergency pause function (owner only)
     */
    function pause() public onlyOwner {
        // Implementation for emergency pause
    }
    
    /**
     * @dev Get user position count
     */
    function getUserPositionCount(address user) public view returns (uint256) {
        return userPositions[user].length;
    }
    
    /**
     * @dev Get user position IDs
     */
    function getUserPositionIds(address user) public view returns (uint256[] memory) {
        return userPositions[user];
    }
}
