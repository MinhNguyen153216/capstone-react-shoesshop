import axios from "axios";
import { history } from "../index";

export const config = {
  setCookie: (name, value, days) => {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  },
  getCookie: (name) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  eraseCookie: (name) => {
    document.cookie =
      name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  },
  getStore: (name) => {
    if (localStorage.getItem(name)) {
      return localStorage.getItem(name);
    }
    return null;
  },
  setStore: (name, value) => {
    localStorage.setItem(name, value);
  },
  setStoreJson: (name, value) => {
    let json = JSON.stringify(value);
    localStorage.setItem(name, json);
  },
  getStoreJson: (name) => {
    if (localStorage.getItem(name)) {
      console.log(JSON.parse(localStorage.getItem(name)));
      return JSON.parse(localStorage.getItem(name));
    }
    return null;
  },
  ACCESS_TOKEN: "access_token",
  USER_LOGIN: "userLogin",
};

export const {
  setCookie,
  getCookie,
  setStore,
  getStore,
  setStoreJson,
  getStoreJson,
  ACCESS_TOKEN,
  USER_LOGIN,
} = config;

/**Cấu hình request cho tất cả api cũng như response cho tất cả kết quả từ api trả về */
//cấu hình domain gửi đi:
const DOMAIN = "https://shop.cyberlearn.vn/api";
const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMCIsIkhldEhhblN0cmluZyI6IjE3LzAyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY3NjU5MjAwMDAwMCIsIm5iZiI6MTY0ODIyNzYwMCwiZXhwIjoxNjc2NzM5NjAwfQ.aK-3RvHXQyu6H2-FFiafeSKR4UMCcRmnuDbTT-XIcUU";
export const http = axios.create({
  baseURL: DOMAIN,
  timeout: 30000,
});
//---Cấu hình request header
http.interceptors.request.use(
  (config) => {
    const token = getStore(ACCESS_TOKEN);
    config.headers = {
      ...config.headers,
      ["Authorization"]: `Bearer ${token}`,
      ["TokenCybersoft"]: TOKEN_CYBERSOFT,
    };
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//---Cấu hình kết quả trả về (response)
http.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (err) => {
    console.log(err.response.status);
    //bắt lỗi không hợp lệ
    if (err.response.status === 400) {
      //bắt lỗi đăng ký email đã tồn tại
      // alert("Email đã được đăng ký!");
      history.push("/");
      return Promise.reject(err);
    }
    if (err.response.status === 404) {
      // alert("Sản phẩm không tồn tại");
      history.push("/");
      return Promise.reject(err);
    }
    if (err.response.status === 401 || err.response.status === 403) {
      // alert("Token không hợp lệ ! vui lòng đăng nhập lại. ");
      history.push("/login");
      return Promise.reject(err);
    }
  }
);

/**
 * status code
 * 400: Tham số gửi lên không hợp lệ => kết quả không tìm được (Badrequest)
 * 404: Tham số gửi lên hợp lệ nhưng không tìm thấy => có thể bị xóa rồi (Not found)...
 * 200: Thành công, OK
 * 201: Đã được tạo thành công => (Mình đã tạo rồi sau đó request tiếp thì sẽ trả 201) (Created)
 * 401:
 * 403:
 * 500:
 */
