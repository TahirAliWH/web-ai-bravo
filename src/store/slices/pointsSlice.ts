import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { PointsTransaction } from '../../types';
import { MOCK_TRANSACTIONS } from '../../services/mockData';

interface PointsState {
  transactions: PointsTransaction[];
  loading: boolean;
  error: string | null;
}

const initialState: PointsState = {
  transactions: MOCK_TRANSACTIONS,
  loading: false,
  error: null,
};

const pointsSlice = createSlice({
  name: 'points',
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<PointsTransaction[]>) => {
      state.transactions = action.payload;
    },
    addTransaction: (state, action: PayloadAction<PointsTransaction>) => {
      state.transactions.push(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setTransactions,
  addTransaction,
  setLoading,
  setError,
} = pointsSlice.actions;

export default pointsSlice.reducer;