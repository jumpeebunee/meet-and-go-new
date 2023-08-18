import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { IEvent } from "../../types/types";
import type { RootState } from "../store";

interface eventsSliceProps {
  events: IEvent[];
}

const initialState: eventsSliceProps = {
  events: [],
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvents(state, action: PayloadAction<IEvent[]>) {
      state.events = action.payload;
    },
  },
});

export default eventsSlice.reducer;
export const { addEvents } = eventsSlice.actions;
export const events = (state: RootState) => state.events.events;
