import { configureStore } from '@reduxjs/toolkit';
import kanbanReducer from './features/kanbanSlice';
import notificationsReducer from './features/notificationsSlice';

export const store = configureStore({
  reducer: {
    kanban: kanbanReducer,
    notifications: notificationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;