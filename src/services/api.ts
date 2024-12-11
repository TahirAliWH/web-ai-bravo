import { User } from '../types';
import { MOCK_USERS } from './mockData';

const MOCK_CREDENTIALS = {
  'john@example.com': 'password123',
};

export const authService = {
  async login(email: string, password: string) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const mockPassword = MOCK_CREDENTIALS[email as keyof typeof MOCK_CREDENTIALS];
    if (!mockPassword || mockPassword !== password) {
      throw new Error('Invalid email or password');
    }

    const user = MOCK_USERS.find(u => u.email === email);
    if (!user) {
      throw new Error('User not found');
    }

    // Generate a mock token
    const token = btoa(`${email}:${new Date().getTime()}`);

    return {
      user,
      token,
    };
  },
};