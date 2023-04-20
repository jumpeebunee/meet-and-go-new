import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './feautures/userSlice';
import eventReducer from './feautures/eventsSlice'
import createEventReducer from './feautures/createEventSlice';
import openedEventReducer from './feautures/openedEventSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    events: eventReducer,
    createEvent: createEventReducer,
    openedEvent: openedEventReducer,
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
