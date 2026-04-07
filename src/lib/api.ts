import type { Session } from '@supabase/supabase-js';

export type UserProfile = {
  email: string;
  fullName: string;
};

type ApiErrorPayload = {
  error?: string;
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

const baseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

function buildUrl(pathname: string) {
  return `${baseUrl}${pathname}`;
}

async function apiRequest<T>(pathname: string, options: RequestInit, session?: Session | null) {
  const response = await fetch(buildUrl(pathname), {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
      ...(session?.access_token
        ? {
            Authorization: `Bearer ${session.access_token}`,
          }
        : {}),
    },
  });

  if (!response.ok) {
    let payload: ApiErrorPayload | null = null;

    try {
      payload = (await response.json()) as ApiErrorPayload;
    } catch {
      payload = null;
    }

    throw new ApiError(payload?.error || 'The request failed.', response.status);
  }

  return (await response.json()) as T;
}

export async function fetchUserProfile(session: Session) {
  return apiRequest<UserProfile>('/api/user/profile', { method: 'GET' }, session);
}
