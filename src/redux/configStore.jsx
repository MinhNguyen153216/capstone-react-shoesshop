import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productReducer";
import testReducer from "./reducers/testReducer";
import userReducer from "./reducers/userReducer";

export const store = configureStore({
  reducer: {
    productReducer: productReducer,
    userReducer: userReducer,
    // testReducer: testReducer,
  },
});
