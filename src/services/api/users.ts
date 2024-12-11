import { api } from './config';
import type { User } from '../../types';

interface InviteUserData {
  email: string;
  role: 'admin' | 'member';
}

interface UpdateUserData {
  fullName?: string;
  email?: string;
  password?: string;
}

export const usersApi = {
  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>('/api/v1/users/me');
    return response.data;
  },

  async updateCurrentUser(data: UpdateUserData): Promise<User> {
    const response = await api.put<User>('/api/v1/users/me', {
      full_name: data.fullName,
      email: data.email,
      password: data.password,
    });
    return response.data;
  },

  async getCompanyUsers(companyId: number): Promise<User[]> {
    const response = await api.get<User[]>(`/api/v1/users/company/${companyId}`);
    return response.data;
  },

  async deleteUser(userId: number): Promise<User> {
    const response = await api.delete<User>(`/api/v1/users/${userId}`);
    return response.data;
  },

  async updateUserPoints(userId: number, points: number): Promise<User> {
    const response = await api.put<User>(`/api/v1/users/${userId}/giveable-points`, null, {
      params: { points },
    });
    return response.data;
  },
};