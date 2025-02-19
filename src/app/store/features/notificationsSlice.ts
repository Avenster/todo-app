import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationsState {
  count: number;
}

const initialState: NotificationsState = {
  count: 0,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotificationCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    incrementNotification: (state) => {
      state.count += 1;
    },
    clearNotifications: (state) => {
      state.count = 0;
    },
  },
});

export const {
  setNotificationCount,
  incrementNotification,
  clearNotifications,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;