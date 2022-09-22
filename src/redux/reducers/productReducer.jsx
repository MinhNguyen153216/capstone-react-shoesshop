import { createSlice } from "@reduxjs/toolkit";
import {
  ACCESS_TOKEN,
  USER_LOGIN,
  getStore,
  setStore,
  getStoreJson,
  setStoreJson,
  http,
  setCookie,
} from "../../util/tool";

const initialState = {
  listProduct: [],
};

const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    getAllProductAction: (state, action) => {
      state.listProduct = action.payload;
    },
  },
});

export const { getAllProductAction } = productReducer.actions;

export default productReducer.reducer;

// -----------action api----------------------
export const getAllProductApi = () => {
  return async (dispatch) => {
    try {
      const result = await http.get("/product");
      dispatch(getAllProductAction(result.data.content));
    } catch (err) {
      console.log(err);
    }
  };
};
