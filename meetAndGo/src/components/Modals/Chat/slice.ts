import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";

interface IInitialState {
  isOpen: boolean;
  isLoadingMore: boolean;
  currentChatId?: string;
}

const initialState: IInitialState = { isOpen: false, isLoadingMore: false };

export const { actions: chatActions, reducer: chatReducer } = createSlice({
  name: "chatSlice",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Partial<IInitialState>>) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const getCurrentChatId = (state: RootState) => state.chat.currentChatId;
export const getIsOpen = (state: RootState) => state.chat.isOpen;
export const getIsLoadingMore = (state: RootState) => state.chat.isLoadingMore;
