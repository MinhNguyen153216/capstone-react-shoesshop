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
import { getProfileApi } from "./userReducer";
import _ from "lodash";

const initialState = {
  listProduct: [],
  productDetail: {},
  listCartTemp: [],
  listResult: [],
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
      let index = state.listCartTemp.findIndex(
        (i) => i.id === action.payload.id
      );
      if (index === -1) {
        state.listCartTemp.push(action.payload);
      } else {
        state.listCartTemp[index].quantityState += action.payload.quantityState;
      }
    },
    clearListCartTempAction: (state, action) => {
      state.listCartTemp = [];
    },
    changeQuantityAction: (state, action) => {
      console.log("action", action.payload);
      let index = state.listCartTemp.findIndex(
        (i) => i.id === action.payload[1]
      );
      if (index !== -1) {
        state.listCartTemp[index].quantityState += action.payload[0];
      }
    },
    handleDeleteAction: (state, action) => {
      let newListCartTemp = state.listCartTemp.filter(
        (i) => i.id !== action.payload
      );
      state.listCartTemp = newListCartTemp;
    },
    submitOrderAction: (state, action) => {
      let newListCartTemp = [...state.listCartTemp];
      console.log(action.payload.orderDetail);
      action.payload.orderDetail.forEach((i, index) => {
        newListCartTemp = newListCartTemp.filter((j) => j.id !== i.productId);
      });
      console.log("newListCartTemp", newListCartTemp);
      state.listCartTemp = newListCartTemp;
    },
    getListResultAction: (state, action) => {
      state.listResult = action.payload;
    },
    sortListResultAction: (state, action) => {
      console.log("order:", action.payload);
      let sortedListResult = [...state.listResult];
      sortedListResult = _.orderBy(
        sortedListResult,
        ["price"],
        [action.payload]
      );
      console.log("sorted: ", sortedListResult);
      state.listResult = sortedListResult;
    },
  },
});

export const {
  getAllProductAction,
  getProductDetailAction,
  addToCartAction,
  clearListCartTempAction,
  changeQuantityAction,
  handleDeleteAction,
  submitOrderAction,
  getListResultAction,
  sortListResultAction,
} = productReducer.actions;

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

export const postOrderProductApi = (order) => {
  return async (dispatch) => {
    try {
      const result = await http.post("/Users/order", order);
      console.log(result);
      alert("Đặt hàng thành công!");
      dispatch(submitOrderAction(order));
      dispatch(getProfileApi());
    } catch (err) {
      console.log(err);
    }
  };
};

export const getProductApi = (keyword) => {
  return async (dispatch) => {
    try {
      const result = await http.get(`/Product?keyword=${keyword}`);
      dispatch(getListResultAction(result.data.content));
    } catch (err) {
      alert("Không tìm thấy sản phẩm");
      console.log(err);
    }
  };
};
