import { createClient } from '@moralis/sdk';

if (!process.env.VITE_MORALIS_API_KEY) {
  throw new Error('Missing Moralis API key');
}

export const moralisClient = createClient({
  apiKey: process.env.VITE_MORALIS_API_KEY,
});