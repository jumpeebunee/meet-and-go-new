import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import createEventReducer from "./feautures/createEventSlice";
import eventReducer from "./feautures/eventsSlice";
import openedEventReducer from "./feautures/openedEventSlice";
import userReducer from "./feautures/userSlice";

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
