import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/types";
import { RootState } from "../store";

interface UserSliceProps {
  user: IUser;
}

const initialState: UserSliceProps = {
  user: {} as IUser,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    updateImage(state, action: PayloadAction<string>) {
      state.user.image = action.payload;
    }
  }
})

export default userSlice.reducer;
export const { addUser, updateImage } = userSlice.actions;
export const user = ((state: RootState) => state.user.user);
export const userImage = ((state: RootState) => state.user.user.image);