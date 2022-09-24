import { createSlice } from "@reduxjs/toolkit";
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
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    getProfileAction: (state, action) => {
      console.log("action", action.payload);
      state.userLogin = action.payload;
    },
  },
});

export const { getProfileAction } = userReducer.actions;

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
      alert("Vui lòng đăng nhập");
      history.push("/home");
      console.log(err);
    }
  };
};
export const updateProfileApi = (userUpdate) => {
  return async (dispatch) => {
    try {
      const result = await http.post("/Users/updateProfile", userUpdate);
      console.log(result);
      dispatch(getProfileApi());
    } catch (err) {
      console.log(err);
      alert("Cập nhật dữ liệu không thành công!");
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
