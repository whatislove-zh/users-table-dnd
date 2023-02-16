import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "@@modal",
  initialState: false,
  reducers: {
    setModal: (_, action) => action.payload,
  },
});

export const { setModal } = modalSlice.actions;

export const modalReduser = modalSlice.reducer;


