import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { IEvent } from "../../types/types";
import type { RootState } from "../store";

const initialState = {
  openedEvent: {} as IEvent,
};

const openedEventSlice = createSlice({
  name: "openedEvent",
  initialState,
  reducers: {
    changeOpened(state, action: PayloadAction<IEvent>) {
      state.openedEvent = action.payload;
    },
  },
});

export default openedEventSlice.reducer;
export const { changeOpened } = openedEventSlice.actions;
export const openedEvent = (state: RootState) => state.openedEvent.openedEvent;
