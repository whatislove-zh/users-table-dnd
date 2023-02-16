import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadUsers = createAsyncThunk(
  "@@users/load-users",
  (_, { extra: { client, api } }) => {
    return client.get(api.BASE_URL);
  }
);

const initialState = {
  list: "",
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "@users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadUsers.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload || action.meta.error;
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.status = "received";
        state.list = action.payload.data;
      });
  },
});

export const usersReduser = userSlice.reducer;

//selectors

export const selectUsersInfo = (state) => ({
  status: state.users.status,
  error: state.users.error,
  qty: state.users.list.length,
});

export const selectUsers = (state) => state.users.list;
