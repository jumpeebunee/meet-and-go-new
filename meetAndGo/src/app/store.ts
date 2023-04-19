import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './feautures/userSlice';
import eventReducer from './feautures/eventsSlice'
import createEventReducer from './feautures/createEventSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    events: eventReducer,
    createEvent: createEventReducer,
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
