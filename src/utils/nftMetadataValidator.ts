import { NFTMetadataSchema } from '../types/nft';
import type { NFTMetadata } from '../types/nft';

export class NFTMetadataValidator {
  static validate(metadata: NFTMetadata) {
    try {
      NFTMetadataSchema.parse(metadata);
      return { valid: true, errors: null };
    } catch (error) {
      return {
        valid: false,
        errors: error.errors || 'Invalid metadata format'
      };
    }
  }

  static validateImage(imageUrl: string): Promise<boolean> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = imageUrl;
    });
  }

  static async validateComplete(metadata: NFTMetadata) {
    const schemaValidation = this.validate(metadata);
    if (!schemaValidation.valid) {
      return schemaValidation;
    }

    const imageValid = await this.validateImage(metadata.image);
    if (!imageValid) {
      return {
        valid: false,
        errors: 'Invalid image URL'
      };
    }

    return { valid: true, errors: null };
  }
}