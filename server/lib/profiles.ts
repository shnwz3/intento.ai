import type { User } from '@supabase/supabase-js';
import { getSupabaseAdmin } from '../clients.js';
import type { ProfileRow } from '../database.js';
import { HttpError } from './errors.js';

type ProfileRecord = Pick<
  ProfileRow,
  | 'email'
  | 'full_name'
  | 'id'
>;

export type { ProfileRecord };

function currentTimestamp() {
  return new Date().toISOString();
}

function schemaSetupError(tableName: string) {
  return new HttpError(500, `Supabase table "${tableName}" is not ready yet. Run supabase/schema.sql first.`);
}

export async function getProfile(userId: string) {
  const { data, error } = await getSupabaseAdmin()
    .from('profiles')
    .select('id,email,full_name')
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    throw schemaSetupError('profiles');
  }

  return data;
}

export async function upsertProfile(user: User, extra: Partial<ProfileRecord> = {}) {
  const payload = {
    email: extra.email ?? user.email ?? '',
    full_name:
      extra.full_name ?? user.user_metadata.full_name ?? user.user_metadata.name ?? user.user_metadata.user_name ?? null,
    id: user.id,
    updated_at: currentTimestamp(),
  };

  const { data, error } = await getSupabaseAdmin()
    .from('profiles')
    .upsert(payload, { onConflict: 'id' })
    .select('id,email,full_name')
    .single();

  if (error) {
    throw schemaSetupError('profiles');
  }

  return data;
}

export function buildUserProfile(user: User, profile: ProfileRecord | null) {
  return {
    email: profile?.email || user.email || '',
    fullName:
      profile?.full_name || user.user_metadata.full_name || user.user_metadata.name || user.user_metadata.user_name || '',
  };
}
