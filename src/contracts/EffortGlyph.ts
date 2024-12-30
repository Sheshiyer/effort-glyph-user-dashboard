import { ethers } from 'ethers';

const EffortGlyphABI = [
  "function getAchievementType(uint256 tokenId) view returns (string)",
  "function getRequiredHours(string memory achievementType) view returns (uint256)",
  "function mintAchievement(address recipient, string memory achievementType, string memory uri) returns (uint256)",
  "function setRequiredHours(string memory achievementType, uint256 _requiredHours)",
  "function owner() view returns (address)",
  "event AchievementMinted(address indexed recipient, uint256 tokenId, string achievementType, string uri)",
  "event RequiredHoursUpdated(string achievementType, uint256 requiredHours)"
];

type SendGaslessTransaction = (transaction: ethers.TransactionRequest) => Promise<ethers.TransactionReceipt>;

type TransactionResult = ethers.TransactionReceipt;

export class EffortGlyphContract {
  private contract: ethers.Contract;
  private signer: ethers.Signer;
  private sendGaslessTransaction?: SendGaslessTransaction;

  constructor(
    contractAddress: string,
    signer: ethers.Signer,
    sendGaslessTransaction?: SendGaslessTransaction
  ) {
    this.signer = signer;
    this.contract = new ethers.Contract(contractAddress, EffortGlyphABI, signer);
    this.sendGaslessTransaction = sendGaslessTransaction;
  }

  async getAchievementType(tokenId: number): Promise<string> {
    return await this.contract.getAchievementType(tokenId);
  }

  async getRequiredHours(achievementType: string): Promise<number> {
    const hours = await this.contract.getRequiredHours(achievementType);
    return Number(hours);
  }

  async mintAchievement(
    recipient: string,
    achievementType: string,
    uri: string
  ): Promise<TransactionResult> {
    const data = this.contract.interface.encodeFunctionData('mintAchievement', [
      recipient,
      achievementType,
      uri
    ]);

    if (this.sendGaslessTransaction) {
      // Use gasless transaction if available
      return await this.sendGaslessTransaction({
        to: await this.contract.getAddress(),
        data,
      });
    }

    // Fallback to regular transaction
    const tx = await this.contract.mintAchievement(recipient, achievementType, uri);
    return await tx.wait();
  }

  async setRequiredHours(
    achievementType: string,
    hours: number
  ): Promise<TransactionResult> {
    const data = this.contract.interface.encodeFunctionData('setRequiredHours', [
      achievementType,
      hours
    ]);

    if (this.sendGaslessTransaction) {
      // Use gasless transaction if available
      return await this.sendGaslessTransaction({
        to: await this.contract.getAddress(),
        data,
      });
    }

    // Fallback to regular transaction
    const tx = await this.contract.setRequiredHours(achievementType, hours);
    return await tx.wait();
  }

  async isOwner(): Promise<boolean> {
    const owner = await this.contract.owner();
    const signerAddress = await this.signer.getAddress();
    return owner.toLowerCase() === signerAddress.toLowerCase();
  }

  // Event listeners
  onAchievementMinted(
    callback: (recipient: string, tokenId: number, achievementType: string, uri: string) => void
  ) {
    this.contract.on('AchievementMinted', 
      (recipient: string, tokenId: number, achievementType: string, uri: string) => {
        callback(recipient, tokenId, achievementType, uri);
      }
    );
  }

  onRequiredHoursUpdated(
    callback: (achievementType: string, hours: number) => void
  ) {
    this.contract.on('RequiredHoursUpdated',
      (achievementType: string, hours: number) => {
        callback(achievementType, hours);
      }
    );
  }

  // Cleanup
  removeAllListeners() {
    this.contract.removeAllListeners();
  }
}
