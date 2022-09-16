import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productReducer";

export const store = configureStore({
  reducer: {
    productReducer: productReducer,
  },
});
