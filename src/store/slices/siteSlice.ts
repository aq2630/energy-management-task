import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SiteState, SiteInfo, EnergyData, AlarmSummary } from '@/types';

const initialState: SiteState = {
  siteInfo: null,
  energyStats: [],
  alarmSummary: {
    siteDown: 0,
    critical: 0,
    major: 0,
    minor: 0,
  },
  loading: false,
  error: null,
};

const siteSlice = createSlice({
  name: 'site',
  initialState,
  reducers: {
    setSiteInfo: (state, action: PayloadAction<SiteInfo>) => {
      state.siteInfo = action.payload;
    },
    setEnergyStats: (state, action: PayloadAction<EnergyData[]>) => {
      state.energyStats = action.payload;
    },
    setAlarmSummary: (state, action: PayloadAction<AlarmSummary>) => {
      state.alarmSummary = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearSiteData: (state) => {
      state.siteInfo = null;
      state.energyStats = [];
      state.alarmSummary = {
        siteDown: 0,
        critical: 0,
        major: 0,
        minor: 0,
      };
    },
  },
});

export const {
  setSiteInfo,
  setEnergyStats,
  setAlarmSummary,
  setLoading,
  setError,
  clearSiteData,
} = siteSlice.actions;

export default siteSlice.reducer;