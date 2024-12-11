import { api } from './config';
import type { PointsTransaction } from '../../types';

interface PointsBalance {
  giveablePoints: number;
  redeemablePoints: number;
}

export const pointsApi = {
  async getBalance(): Promise<PointsBalance> {
    const response = await api.get<PointsBalance>('/api/v1/points/balance');
    return response.data;
  },

  async getSentHistory(skip = 0, limit = 100): Promise<PointsTransaction[]> {
    const response = await api.get<PointsTransaction[]>('/api/v1/points/history/sent', {
      params: { skip, limit },
    });
    return response.data;
  },

  async getReceivedHistory(skip = 0, limit = 100): Promise<PointsTransaction[]> {
    const response = await api.get<PointsTransaction[]>('/api/v1/points/history/received', {
      params: { skip, limit },
    });
    return response.data;
  },

  async getCompanyTransactions(companyId: number, skip = 0, limit = 100): Promise<PointsTransaction[]> {
    const response = await api.get<PointsTransaction[]>(`/api/v1/points/company/${companyId}/transactions`, {
      params: { skip, limit },
    });
    return response.data;
  },

  async createAdminAdjustment(userId: number, points: number, notes: string): Promise<PointsTransaction> {
    const response = await api.post<PointsTransaction>('/api/v1/points/admin-adjustment', null, {
      params: { user_id: userId, points, notes },
    });
    return response.data;
  },
};