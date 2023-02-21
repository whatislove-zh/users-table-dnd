import { createSlice } from "@reduxjs/toolkit";

const selectedColumnsSlice = createSlice({
  name: "@@columns",
  initialState: ["name", "username", "email", "address"],
  reducers: {
    setColumn: (_, action) => action.payload
  },
});

export const selectedColumnsReducer = selectedColumnsSlice.reducer;

export const { setColumn } = selectedColumnsSlice.actions;
