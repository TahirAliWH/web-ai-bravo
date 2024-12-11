import { api } from './config';
import { API_ENDPOINTS } from '../../config/api';
import type { User } from '../../types';

interface SignupData {
  fullName: string;
  email: string;
  password: string;
  companyName: string;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
}

export const authApi = {
  async signup(data: SignupData): Promise<User> {
    const response = await api.post(API_ENDPOINTS.AUTH.SIGNUP, {
      full_name: data.fullName,
      email: data.email,
      password: data.password,
      company_name: data.companyName,
    });
    return response.data;
  },

  async login(email: string, password: string): Promise<LoginResponse> {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    const response = await api.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // Store the token
    localStorage.setItem('token', response.data.access_token);

    return response.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>(API_ENDPOINTS.USERS.ME);
    return response.data;
  },

  async testToken(): Promise<User> {
    const response = await api.post<User>(API_ENDPOINTS.AUTH.TEST_TOKEN);
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
  },
};