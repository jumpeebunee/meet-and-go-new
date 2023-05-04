import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IEvent } from "../../types/types";

interface EventNotifySliceProps {
  isOpen: boolean;
  notifications: IEvent[];
  opened: IEvent | null;
}

const initialState: EventNotifySliceProps = {
  isOpen: false,
  notifications: [],
  opened: null,
}

const EventNotifySlice = createSlice({
  name: 'notify',
  initialState,
  reducers: {
    changeNotifyOpen(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
    changeNotifications(state, action: PayloadAction<IEvent[]>) {
      state.notifications = action.payload;
    },
    confirmNotification(state, action: PayloadAction) {
      state.notifications.shift();
    },
    changeOpened(state, action: PayloadAction<IEvent>) {
      state.opened = action.payload;
    }
  }
})

export default EventNotifySlice.reducer;
export const {changeNotifyOpen, changeNotifications, confirmNotification, changeOpened} = EventNotifySlice.actions;
export const isNotifyOpen = (state: RootState) => state.notify.isOpen;
export const notifications = (state: RootState) => state.notify.notifications;
export const openedNotify = (state: RootState) => state.notify.opened;
