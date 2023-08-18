import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getIsoDate } from "../../helpers/getIsoDate";
import { getRandomColor } from "../../helpers/getRandomColor";
import type { RootState } from "../store";

type IEventData = {
  stage: number;
  name: string;
  date: string;
  location: string;
  address: string;
  validError: string;
  users: number;
  price: string;
  color: number;
  coords: number[];
};

const BASE_CONFIG_DATA = {
  stage: 1,
  name: "",
  date: getIsoDate(),
  location: "",
  address: "",
  validError: "",
  users: 2,
  price: "0",
  color: getRandomColor(),
  coords: [],
};

interface createEventSliceProps {
  data: IEventData;
}

const initialState: createEventSliceProps = {
  data: BASE_CONFIG_DATA,
};

const createEventSlice = createSlice({
  name: "createEvent",
  initialState,
  reducers: {
    changeStage(state, action: PayloadAction<number>) {
      state.data.stage = action.payload;
    },
    changeName(state, action: PayloadAction<string>) {
      state.data.name = action.payload;
    },
    changeDate(state, action: PayloadAction<string>) {
      state.data.date = action.payload;
    },
    changeLocation(state, action: PayloadAction<string>) {
      state.data.location = action.payload;
    },
    changeAddress(state, action: PayloadAction<string>) {
      state.data.address = action.payload;
    },
    changeError(state, action: PayloadAction<string>) {
      state.data.validError = action.payload;
    },
    changeUsers(state, action: PayloadAction<number>) {
      state.data.users = action.payload;
    },
    changePrice(state, action: PayloadAction<string>) {
      state.data.price = action.payload;
    },
    changeCoords(state, action: PayloadAction<number[]>) {
      state.data.coords = action.payload;
    },
    changeColor(state, action: PayloadAction<number>) {
      state.data.color = action.payload;
    },
    clearState(state) {
      state.data = BASE_CONFIG_DATA;
    },
  },
});

export default createEventSlice.reducer;
export const {
  changeStage,
  changeName,
  changeDate,
  changeLocation,
  changeColor,
  changeError,
  clearState,
  changeAddress,
  changeUsers,
  changePrice,
  changeCoords,
} = createEventSlice.actions;
export const eventData = (state: RootState) => state.createEvent.data;
