import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function HeaderIndex() {
  const { userLogin } = useSelector((state) => state.userReducer);

  const countCart = (orders) => {
    let count = 0;
    if (orders.length === 0) {
      return 0;
    }
    orders.forEach((orderDetail) => {
      count += orderDetail.quantity;
    });
    return count;
  };

  const renderCart = () => {
    if (userLogin == null) {
      return (
        <>
          <NavLink className="cart" to={"/login"}>
            <img src="./img/image 8.png" alt="imgcart" />
            <span>(0)</span>
          </NavLink>
        </>
      );
    }
    return (
      <>
        <NavLink className="cart" to={"/cart"}>
          <img src="./img/image 8.png" alt="imgcart" />
          <span>({countCart(userLogin.orderHistory)})</span>
        </NavLink>
      </>
    );
  };
  const renderLoginItem = () => {
    if (userLogin == null) {
      return (
        <>
          <NavLink className="login" to={"/login"}>
            Login
          </NavLink>
          <NavLink className="register-menu" to={"/register"}>
            Register
          </NavLink>
        </>
      );
    }
    return <NavLink to={"/profile"}>{userLogin.name}</NavLink>;
  };
  return (
    <div>
      <div>
        <header className="header">
          <div className="container">
            <div className="top-header d-flex justify-content-between">
              <NavLink className="header-left" to={"/"}>
                <img src="./img/image 3.png" alt="img3" />
              </NavLink>

              <div className="header-right">
                <NavLink to={"/search"}>
                  <img src="./img/download.png" alt="imgdownload" width={25} />
                  <img
                    src="./img/Search.png"
                    alt="imgsearch"
                    width={50}
                    className="me-3"
                  />
                </NavLink>
                {renderCart()}
                {renderLoginItem()}
              </div>
            </div>
          </div>
        </header>
        <nav className="menu-header">
          <div className="container">
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"/"}>Men</NavLink>
            <NavLink to={"/"}>Women</NavLink>
            <NavLink to={"/"}>Kid</NavLink>
            <NavLink to={"/"}>Sport</NavLink>
          </div>
        </nav>
      </div>
    </div>
  );
}
