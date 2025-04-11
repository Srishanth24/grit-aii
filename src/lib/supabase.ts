
import { createClient } from '@supabase/supabase-js';

// These environment variables need to be set in your deployment platform
// For local development, ask users to add them to their environment
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are available
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(`
    ⚠️ Missing Supabase environment variables!
    
    Please set the following environment variables in your deployment platform:
    - VITE_SUPABASE_URL (Your Supabase project URL)
    - VITE_SUPABASE_ANON_KEY (Your Supabase anon/public key)
    
    You can find these values in your Supabase dashboard:
    1. Go to your project
    2. Navigate to Project Settings > API
    3. Copy the "Project URL" and "anon public" key
  `);
}

// Create Supabase client
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

// Export a function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return !!supabaseUrl && !!supabaseAnonKey;
};
