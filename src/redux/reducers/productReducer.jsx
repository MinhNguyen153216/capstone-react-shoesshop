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
  listCartTemp: [],
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
    addToCartAction: (state, action) => {
      let index = state.listCartTemp.findIndex((i) => i.id === action.payload.id);
      if (index === -1) {
        state.listCartTemp.push(action.payload);
      } else {
        state.listCartTemp[index].quantityState += action.payload.quantityState;
      }
    },
  },
});

export const { getAllProductAction, getProductDetailAction, addToCartAction } =
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
