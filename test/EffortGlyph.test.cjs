const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EffortGlyphTest", function () {
  let effortGlyph;
  let owner;
  let recipient;
  const achievementType = "Full Stack Achievement";
  const requiredHours = 40;
  const tokenURI = "ipfs://QmExample";

  beforeEach(async function () {
    [owner, recipient] = await ethers.getSigners();

    const EffortGlyph = await ethers.getContractFactory("EffortGlyphTest");
    effortGlyph = await EffortGlyph.deploy();
    await effortGlyph.waitForDeployment();

    // Set up achievement type
    await effortGlyph.setRequiredHours(achievementType, requiredHours);
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await effortGlyph.owner()).to.equal(owner.address);
    });

    it("Should set the correct name and symbol", async function () {
      expect(await effortGlyph.name()).to.equal("EffortGlyphTest");
      expect(await effortGlyph.symbol()).to.equal("EGLYPHTEST");
    });
  });

  describe("Achievement Management", function () {
    it("Should set required hours for achievement type", async function () {
      const hours = await effortGlyph.getRequiredHours(achievementType);
      expect(hours).to.equal(requiredHours);
    });

    it("Should emit event when setting required hours", async function () {
      await expect(effortGlyph.setRequiredHours("New Achievement", 50))
        .to.emit(effortGlyph, "RequiredHoursUpdated")
        .withArgs("New Achievement", 50);
    });

    it("Should only allow owner to set required hours", async function () {
      await expect(
        effortGlyph.connect(recipient).setRequiredHours(achievementType, 60)
      ).to.be.revertedWithCustomError(effortGlyph, "OwnableUnauthorizedAccount");
    });
  });

  describe("NFT Minting", function () {
    it("Should mint achievement NFT", async function () {
      const tx = await effortGlyph.mintAchievement(
        recipient.address,
        achievementType,
        tokenURI
      );

      await expect(tx)
        .to.emit(effortGlyph, "AchievementMinted")
        .withArgs(recipient.address, 1, achievementType, tokenURI);

      expect(await effortGlyph.ownerOf(1)).to.equal(recipient.address);
      expect(await effortGlyph.tokenURI(1)).to.equal(tokenURI);
      expect(await effortGlyph.getAchievementType(1)).to.equal(achievementType);
    });

    it("Should only allow owner to mint", async function () {
      await expect(
        effortGlyph
          .connect(recipient)
          .mintAchievement(recipient.address, achievementType, tokenURI)
      ).to.be.revertedWithCustomError(effortGlyph, "OwnableUnauthorizedAccount");
    });

    it("Should require valid achievement type and URI", async function () {
      await expect(
        effortGlyph.mintAchievement(recipient.address, "", tokenURI)
      ).to.be.revertedWith("Achievement type cannot be empty");

      await expect(
        effortGlyph.mintAchievement(recipient.address, achievementType, "")
      ).to.be.revertedWith("URI cannot be empty");
    });
  });
});
