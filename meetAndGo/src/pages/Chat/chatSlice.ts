import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface IInitialState {
  currentChatId?: string;
}

const initialState: IInitialState = {};

export const { actions: chatActions, reducer: chatReducer } = createSlice({
  name: "chatSlice",
  initialState,
  reducers: {
    setFields: (state, action: PayloadAction<Partial<IInitialState>>) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const getCurrentChatId = (state: RootState) => state.chat.currentChatId;
