import { createClient } from '@supabase/supabase-js';

// Fallback to mock URLs if env vars are not set to prevent crashing during UI testing
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock_key';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'mock_service_key';

// For client-side and normal operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// For server-side admin operations (e.g., updating order status securely, generating signed URLs)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
