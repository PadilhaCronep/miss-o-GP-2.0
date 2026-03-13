import type { ApiResponse } from '@/lib/admin/api-contracts';

const ADMIN_API_BASE = process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL || '/api';

export async function adminFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<ApiResponse<T>> {
  const response = await fetch(`${ADMIN_API_BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Admin API error (${response.status}): ${text}`);
  }

  return (await response.json()) as ApiResponse<T>;
}
