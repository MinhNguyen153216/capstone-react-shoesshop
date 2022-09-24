import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
// setup redux
import { Provider } from "react-redux";
import { store } from "./redux/configStore";
// setup router and history
import { BrowerRouter, Routes, Route, Navigate } from "react-router-dom";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
// setup antd and scss
import "antd/dist/antd.css";
import "./assets/scss/styles.scss";
// import components/pages
import App from "./App";
import Index from "./pages/Index/Index";
import Search from "./pages/Search/Search";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import Cart from "./pages/Cart/Cart";
import Detail from "./pages/Detail/Detail";

export const history = createBrowserHistory({ window });
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path="" element={<App />}>
          <Route index element={<Index />} />
          <Route path="search" element={<Search />} />
          <Route path="detail">
            <Route path=":id" element={<Detail />} />
          </Route>
          {/* <Route path="detail" element={<Detail />} /> */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="cart" element={<Cart />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" />} />
          {/*  */}
        </Route>
      </Routes>
    </HistoryRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
