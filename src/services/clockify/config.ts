import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Clockify configuration
export const clockifyApi = axios.create({
  baseURL: 'https://api.clockify.me/api/v1',
  headers: {
    'X-Api-Key': 'MTdhZTg1ZDUtNGU3YS00NzI2LTgyOTAtNjJmM2I0MzU0YTAy'
  }
});

// Supabase configuration
export const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);