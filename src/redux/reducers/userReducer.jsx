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
  userLogin: getStore(USER_LOGIN),
  // userLogin: {
  //   name: "asd",
  //   orderHistory: [
  //     {
  //       orderDetail: [
  //         {
  //           name: "Adidas Prophere",
  //           alias: "adidas-prophere",
  //           shortDescription:
  //             "The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n",
  //           quantity: 995,
  //           price: 350,
  //           image: "https://shop.cyberlearn.vn/images/adidas-prophere.png",
  //           description:
  //             "The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n",
  //         },
  //       ],
  //       id: 1350,
  //       date: "2022-09-17T09:02:01",
  //       status: null,
  //       email: "minhnguyen@gmail.com",
  //       alias: "",
  //     },
  //     {
  //       orderDetail: [
  //         {
  //           name: "Adidas Prophere Black White",
  //           alias: "adidas-prophere-black-white",
  //           shortDescription:
  //             "The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n",
  //           quantity: 990,
  //           price: 450,
  //           image:
  //             "https://shop.cyberlearn.vn/images/adidas-prophere-black-white.png",
  //           description:
  //             "The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n",
  //         },
  //       ],
  //       id: 1351,
  //       date: "2022-09-17T09:02:14",
  //       status: null,
  //       email: "minhnguyen@gmail.com",
  //       alias: "",
  //     },
  //   ],
  // },
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {},
});

export const {} = userReducer.actions;

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
      setCookie(USER_LOGIN, result.data.content.accessToken, 30);
      setStore(USER_LOGIN, result.data.content.accessToken);
      alert("Đăng nhập thành công!");
      history.push("/index");
    } catch (err) {
      alert("Kiểm tra lại email và password");
      history.push("/login");
      console.log(err);
    }
  };
};
