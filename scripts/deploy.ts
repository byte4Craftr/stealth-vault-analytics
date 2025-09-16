import { ethers } from "hardhat";

async function main() {
  console.log("Deploying StealthVaultAnalytics contract...");

  // Get the contract factory
  const StealthVaultAnalytics = await ethers.getContractFactory("StealthVaultAnalytics");

  // Deploy the contract with analytics oracle address (can be updated later)
  const analyticsOracle = "0x0000000000000000000000000000000000000000"; // Placeholder oracle address
  
  const stealthVault = await StealthVaultAnalytics.deploy(analyticsOracle);

  await stealthVault.waitForDeployment();

  const contractAddress = await stealthVault.getAddress();

  console.log("StealthVaultAnalytics deployed to:", contractAddress);
  console.log("Analytics Oracle:", analyticsOracle);
  console.log("Owner:", await stealthVault.owner());

  // Verify contract on Etherscan if on a live network
  if (process.env.ETHERSCAN_API_KEY && process.env.VITE_RPC_URL?.includes("sepolia")) {
    console.log("Waiting for block confirmations...");
    await stealthVault.deploymentTransaction()?.wait(6);
    
    console.log("Verifying contract on Etherscan...");
    try {
      await hre.run("verify:verify", {
        address: contractAddress,
        constructorArguments: [analyticsOracle],
      });
      console.log("Contract verified on Etherscan!");
    } catch (error) {
      console.log("Verification failed:", error);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
