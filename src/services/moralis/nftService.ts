import Moralis from 'moralis';
import { EvmChain } from '@moralis/evm-utils';

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: {
    trait_type: string;
    value: string | number;
  }[];
}

export class NFTService {
  static async initialize() {
    if (!process.env.VITE_MORALIS_API_KEY) {
      throw new Error('Missing Moralis API key');
    }
    await Moralis.start({
      apiKey: process.env.VITE_MORALIS_API_KEY,
    });
  }

  static async mintNFT(metadata: NFTMetadata, recipientAddress: string) {
    try {
      await this.initialize();
      
      // Upload metadata to IPFS
      const response = await Moralis.EvmApi.ipfs.uploadFolder({
        abi: [{
          path: 'metadata.json',
          content: {
            ...metadata,
            external_url: `https://effortglyph.com/nft/${metadata.name}`,
          },
        }],
      });

      const metadataUri = response.result[0].path;

      // Implement contract interaction for minting
      // This is a placeholder - you'll need to add your smart contract details
      const transaction = await Moralis.EvmApi.utils.runContractFunction({
        address: 'YOUR_CONTRACT_ADDRESS',
        functionName: 'mint',
        abi: [], // Add your contract ABI
        params: {
          to: recipientAddress,
          uri: metadataUri,
        },
      });

      return transaction;
    } catch (error) {
      console.error('Error minting NFT:', error);
      throw error;
    }
  }

  static async getNFTsByWallet(walletAddress: string) {
    try {
      await this.initialize();
      
      const response = await Moralis.EvmApi.nft.getWalletNFTs({
        address: walletAddress,
        chain: EvmChain.POLYGON,
      });

      return response.result;
    } catch (error) {
      console.error('Error fetching NFTs:', error);
      throw error;
    }
  }
}