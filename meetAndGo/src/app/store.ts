import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { chatReducer } from "../pages/Chat/chatSlice";
import createEventReducer from "./feautures/createEventSlice";
import eventReducer from "./feautures/eventsSlice";
import openedEventReducer from "./feautures/openedEventSlice";
import userReducer from "./feautures/userSlice";
import notifyReducer from "../pages/EventNotify/EventNotifySlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    events: eventReducer,
    createEvent: createEventReducer,
    openedEvent: openedEventReducer,
    chat: chatReducer,
    notify: notifyReducer,
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
