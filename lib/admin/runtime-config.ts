export const ADMIN_DATA_MODE = process.env.NEXT_PUBLIC_ADMIN_DATA_MODE || 'mock';
export const ADMIN_API_BASE_URL = process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL || '/api';

export const isAdminApiMode = ADMIN_DATA_MODE === 'api';
