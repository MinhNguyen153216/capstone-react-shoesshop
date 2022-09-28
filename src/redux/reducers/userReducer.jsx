import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { history } from "../../index";
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
  userLogin: getStoreJson(USER_LOGIN),
  // userLogin: { a: "asd", b: "zxc" },
  userFavorite: getStoreJson("USER_FAV"),
  test: 1
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    getProfileAction: (state, action) => {
      console.log("action", action.payload);
      state.userLogin = action.payload;
    },
    logOutUserAction: (state, action) => {
      localStorage.clear();
      state.userLogin = null;
    },
    getUserFavAction: (state, action) => {
      console.log("action", action.payload);
      state.userFavorite = action.payload;
    },

  },
});

export const { getProfileAction, logOutUserAction, getUserFavAction } =
  userReducer.actions;

export default userReducer.reducer;

export const registerApi = (userRegister) => {
  return async (dispatch) => {
    try {
      const result = await http.post("/users/signup", userRegister);
      //Sau khi đăng nhập thành công => lưu dữ liệu vào localstorage hoặc cookie
      console.log(result);
      //Chuyển hướng về profile, trang quên mật khẩu
      alert("Đăng ký thành công!");
      history.push("/login");
      //Sau khi đăng nhập thành công thì dispatch action getProfile
    } catch (err) {
      alert("Tài khoản đã tồn tại");
      history.push("/register");
      console.log(err);
    }
  };
};
export const loginApi = (userLogin) => {
  return async (dispatch) => {
    try {
      const result = await http.post("/users/signin", userLogin);
      console.log(result);

      setCookie(ACCESS_TOKEN, result.data.content.accessToken, 30);
      setStore(ACCESS_TOKEN, result.data.content.accessToken);

      dispatch(getProfileApi());
      dispatch(getProductsFavoriteApi());
      alert("Đăng nhập thành công!");
      history.push("/profile");
    } catch (err) {
      alert("Kiểm tra lại email và password");
      history.push("/login");
      console.log(err);
    }
  };
};

export const getProfileApi = (accessToken = getStore(ACCESS_TOKEN)) => {
  console.log(accessToken);
  return async (dispatch) => {
    try {
      const result = await http.post("users/getProfile");

      setStoreJson(USER_LOGIN, result.data.content);

      dispatch(getProfileAction(result.data.content));
    } catch (err) {
      alert("Vui lòng đăng nhập để sử dụng chức năng này");
      history.push("/home");
      console.log(err);
    }
  };
};
export const updateProfileApi = (userUpdate) => {
  return async (dispatch) => {
    try {
      const result = await http.post("/Users/updateProfile", userUpdate);
      console.log("updateProfileApi", result);
      dispatch(getProfileApi());
      alert("Cập nhật dữ liệu thành công!");
    } catch (err) {
      console.log(err);
      alert("Cập nhật dữ liệu không thành công!");
    }
  };
};
export const getProductsFavoriteApi = (
  accessToken = getStore(ACCESS_TOKEN)
) => {
  return async (dispatch) => {
    try {
      let result = await http.get("/Users/getproductfavorite");
      console.log("getProductsFavoriteApi", result.data.content);
      setStoreJson("USER_FAV", result.data.content);
      dispatch(getUserFavAction(result.data.content));
    } catch (err) {
      console.log(err);
    }
  };
};

export const fbLoginApi = (fbToken) => {
  return async (dispatch) => {
    try {
      console.log(fbToken);
      const result = await http.post("/Users/facebooklogin", fbToken);
      console.log(result);
      console.log(result.data.content.accessToken);

      // setCookie(ACCESS_TOKEN, result.data.content.accessToken, 30);
      // setStore(ACCESS_TOKEN, result.data.content.accessToken);

      // dispatch(getProfileApi());
      // alert("Đăng nhập thành công!");
      // history.push("/index");
    } catch (err) {
      // alert("Kiểm tra lại email và password");
      // history.push("/login");
      console.log(err);
    }
  };
};
