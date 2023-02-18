import { createSlice } from "@reduxjs/toolkit";

const selectedColumnsSlice = createSlice({
  name: "@@columns",
  initialState: ["name", "username", "email", "phone"],
  reducers: {
    addColumn: (state, action) => {state.push(action.payload)}
  },
});

export const selectedColumnsReducer = selectedColumnsSlice.reducer;

export const { addColumn } = selectedColumnsSlice.actions;
