import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./reducers/usersSlice";
import carsReducer from "./reducers/carsSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    cars: carsReducer,
  },
});