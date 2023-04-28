import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Root } from "react-dom/client";

interface IInitialState {
	isOpen: boolean,
  currentChatId?: string;
}

const initialState: IInitialState = {isOpen: false};

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
export const getIsOpen = (state: RootState) => state.chat.isOpen
