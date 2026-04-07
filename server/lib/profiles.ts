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

// PostgreSQL error code for "relation does not exist"
const RELATION_NOT_FOUND = '42P01';

function handleProfilesError(error: { code?: string; message: string }): never {
  if (error.code === RELATION_NOT_FOUND) {
    throw new HttpError(500, `Supabase table "profiles" is not ready yet. Run supabase/schema.sql first.`);
  }
  throw new HttpError(500, error.message);
}

export async function getProfile(userId: string) {
  const { data, error } = await getSupabaseAdmin()
    .from('profiles')
    .select('id,email,full_name')
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    handleProfilesError(error);
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
    handleProfilesError(error);
  }

  return data;
}

export function buildUserProfile(user: User, profile: ProfileRecord | null) {
  return {
    email: user.email || profile?.email || '',
    fullName:
      profile?.full_name || user.user_metadata.full_name || user.user_metadata.name || user.user_metadata.user_name || '',
  };
}
