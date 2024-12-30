const hre = require("hardhat");

// Biconomy Forwarder address for Polygon Mainnet
const BICONOMY_FORWARDER = "0x88a567bae69bbb1bc5d28737428e4a222e302e80";

async function main() {
  console.log("Deploying EffortGlyphTest contract...");

  // Deploy the contract with Biconomy Forwarder
  const EffortGlyph = await hre.ethers.getContractFactory("EffortGlyphTest");
  const effortGlyph = await EffortGlyph.deploy(BICONOMY_FORWARDER);
  await effortGlyph.waitForDeployment();

  const address = await effortGlyph.getAddress();
  console.log("EffortGlyphTest deployed to:", address);

  // Set up initial achievement types with required hours
  const initialAchievements = [
    { type: "Full Stack Achievement", hours: 40 },
    { type: "Backend Excellence", hours: 80 },
    { type: "Frontend Mastery", hours: 36 }
  ];

  console.log("\nSetting up initial achievement types...");
  
  for (const achievement of initialAchievements) {
    const tx = await effortGlyph.setRequiredHours(achievement.type, achievement.hours);
    await tx.wait();
    console.log(`Set ${achievement.type} with ${achievement.hours} required hours`);
  }

  // Verify the contract on Polygonscan
  if (network.name !== "hardhat" && network.name !== "localhost") {
    console.log("\nVerifying contract on Polygonscan...");
    try {
      await hre.run("verify:verify", {
        address: address,
        constructorArguments: [BICONOMY_FORWARDER],
      });
      console.log("Contract verified successfully");
    } catch (error) {
      console.error("Error verifying contract:", error);
    }
  }

  console.log("\nDeployment complete!");
  console.log("Contract address:", address);
  console.log("Add this address to your .env file as CONTRACT_ADDRESS");
  console.log("Biconomy Forwarder address:", BICONOMY_FORWARDER);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
