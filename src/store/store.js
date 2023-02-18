import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import * as api from "./config";
import { usersReduser } from "./get-users/users-slice";
import { modalReduser } from "./modal-show/modal-slice";
import { selectedColumnsReducer } from "./selected-columns/selected-columns-slice";

export const store = configureStore({
  reducer: {
    isModalOpen: modalReduser,
    users: usersReduser,
    selectedColumn: selectedColumnsReducer,
   
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          client: axios,
          api,
        },
      },
      serializableCheck: false,
    }),
});
