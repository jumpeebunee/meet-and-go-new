import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './feautures/userSlice';
import eventReducer from './feautures/eventsSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    events: eventReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
