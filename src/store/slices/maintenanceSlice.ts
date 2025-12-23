import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MaintenanceState, MaintenanceTicket } from '@/types';

const initialState: MaintenanceState = {
  tickets: [],
  submitting: false,
  lastSubmitted: null,
  error: null,
};

const maintenanceSlice = createSlice({
  name: 'maintenance',
  initialState,
  reducers: {
    addTicket: (state, action: PayloadAction<MaintenanceTicket>) => {
      state.tickets.push(action.payload);
      state.lastSubmitted = action.payload;
    },
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.submitting = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearLastSubmitted: (state) => {
      state.lastSubmitted = null;
    },
  },
});

export const {
  addTicket,
  setSubmitting,
  setError,
  clearLastSubmitted,
} = maintenanceSlice.actions;

export default maintenanceSlice.reducer;