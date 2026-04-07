import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.js';
import { MissingConfigurationError } from './lib/errors.js';

let supabaseAdminClient: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabaseAdmin() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new MissingConfigurationError(
      'Supabase admin credentials are missing. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.',
    );
  }

  if (!supabaseAdminClient) {
    supabaseAdminClient = createClient<Database>(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  return supabaseAdminClient;
}

