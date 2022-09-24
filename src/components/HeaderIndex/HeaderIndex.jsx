import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function HeaderIndex() {
  const { userLogin } = useSelector((state) => state.userReducer);

  const countCart = (userLogin) => {
    let { ordersHistory } = userLogin;
    let count = 0;
    // if user doesn't have any order
    if (!ordersHistory) {
      return 0;
    }
    // ordersHistory.forEach((order) => {
    //   let [obj] = order.orderDetail;
    //   // console.log(obj.quantity);
    //   count += obj.quantity;
    // });
    count = ordersHistory.length;

    return count;
  };

  const renderCart = () => {
    console.log(userLogin);
    if (!userLogin) {
      return (
        <>
          <NavLink className="me-3" to={"/login"}>
            <FontAwesomeIcon
              icon="fa-solid fa-cart-shopping"
              className="me-1"
            />

            <span>(0)</span>
          </NavLink>
        </>
      );
    }
    return (
      <>
        <NavLink className="me-3" to={"/cart"}>
          <FontAwesomeIcon icon="fa-solid fa-cart-shopping" className="me-1" />
          {/* <span>(0)</span> */}({countCart(userLogin)})
        </NavLink>
      </>
    );
  };
  const renderLoginItem = () => {
    if (!userLogin) {
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
    return (
      <NavLink to={"/profile"}>
        {" "}
        <FontAwesomeIcon icon="fa-solid fa-user" className="me-1" />
        {userLogin.name}
      </NavLink>
    );
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
                <NavLink to={"/search"} className={"me-3"}>
                  <FontAwesomeIcon
                    icon="fa-solid fa-magnifying-glass"
                    className="me-1"
                  />
                  Search
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
