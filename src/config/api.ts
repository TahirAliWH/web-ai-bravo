export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: '/api/v1/auth/signup',
    LOGIN: '/api/v1/auth/login',
    TEST_TOKEN: '/api/v1/auth/test-token',
  },
  USERS: {
    ME: '/api/v1/users/me',
    BY_COMPANY: (companyId: number) => `/api/v1/users/company/${companyId}`,
    DELETE: (userId: number) => `/api/v1/users/${userId}`,
    UPDATE_POINTS: (userId: number) => `/api/v1/users/${userId}/giveable-points`,
  },
};