import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PowerState, PowerData } from '@/types';

const initialState: PowerState = {
  currentPower: {
    active: 0,
    reactive: 0,
  },
  chartData: [],
  isPolling: false,
  loading: false,
  error: null,
};

const powerSlice = createSlice({
  name: 'power',
  initialState,
  reducers: {
    setPollingState: (state, action: PayloadAction<boolean>) => {
      state.isPolling = action.payload;
    },
    addChartData: (state, action: PayloadAction<PowerData[]>) => {
      const newData = [...state.chartData, ...action.payload];
      
      if (newData.length > 100) {
        state.chartData = newData.slice(-100);
      } else {
        state.chartData = newData;
      }
      
      if (action.payload.length > 0) {
        const latestPoint = action.payload[action.payload.length - 1];
        state.currentPower = {
          active: latestPoint.activePower,
          reactive: latestPoint.reactivePower,
        };
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetChartData: (state) => {
      state.chartData = [];
      state.currentPower = { active: 0, reactive: 0 };
    },
  },
});

export const {
  setPollingState,
  addChartData,
  setLoading,
  setError,
  resetChartData,
} = powerSlice.actions;

export default powerSlice.reducer;