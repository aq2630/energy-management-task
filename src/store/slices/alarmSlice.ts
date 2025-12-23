import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlarmState, Alarm } from '@/types';

const initialState: AlarmState = {
  alarms: [],
  favorites: [],
  searchTerm: '',
  loading: false,
  error: null,
};

const alarmSlice = createSlice({
  name: 'alarms',
  initialState,
  reducers: {
    setAlarms: (state, action: PayloadAction<Alarm[]>) => {
      state.alarms = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const alarmId = action.payload;
      const index = state.favorites.indexOf(alarmId);
      
      if (index > -1) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(alarmId);
      }
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
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
  setAlarms,
  toggleFavorite,
  setSearchTerm,
  setLoading,
  setError,
} = alarmSlice.actions;

export default alarmSlice.reducer;