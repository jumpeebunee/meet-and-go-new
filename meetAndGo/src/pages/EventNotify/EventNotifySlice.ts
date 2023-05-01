import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IEvent } from "../../types/types";

interface EventNotifySliceProps {
  isOpen: boolean;
  notifications: IEvent[];
}

const initialState: EventNotifySliceProps = {
  isOpen: false,
  notifications: [],
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
    }
  }
})

export default EventNotifySlice.reducer;
export const {changeNotifyOpen, changeNotifications, confirmNotification} = EventNotifySlice.actions;
export const isNotifyOpen = (state: RootState) => state.notify.isOpen;
export const notifications = (state: RootState) => state.notify.notifications;