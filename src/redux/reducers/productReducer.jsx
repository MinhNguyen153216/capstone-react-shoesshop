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
  productDetail: {},
  
};

const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    getAllProductAction: (state, action) => {
      state.listProduct = action.payload;
    },
    getProductDetailAction: (state, action) => {
      state.productDetail = action.payload;
    },
  },
});

export const { getAllProductAction, getProductDetailAction } =
  productReducer.actions;

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

export const getProductDetailApi = (id) => {
  return async (dispatch) => {
    try {
      let result = await http.get(`./product/getbyid?id=${id}`);
      dispatch(getProductDetailAction(result.data.content));
    } catch (err) {
      console.log(err);
    }
  };
};
