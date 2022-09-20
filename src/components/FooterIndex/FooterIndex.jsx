import React from "react";
import { NavLink } from "react-router-dom";

export default function FooterIndex() {
  return (
    <div>
      <footer className="bottom-grids">
        <div className="bottom-top-grids">
          <div className="wrap">
            <div className="bottom-top-grid">
              <h4>GET HELP</h4>
              <ul>
                <li>
                  <NavLink to={"/"}>Home</NavLink>
                </li>
                <li>
                  <NavLink to={"/"}>Nike</NavLink>
                </li>
                <li>
                  <NavLink to={"/"}>Addidas</NavLink>
                </li>
                <li>
                  <NavLink to={"/"}>Contact</NavLink>
                </li>
              </ul>
            </div>
            <div className="bottom-top-grid">
              <h4>SUPPORT</h4>
              <ul>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
                <li>
                  <a href="#">Help</a>
                </li>
                <li>
                  <a href="#">Phone</a>
                </li>
              </ul>
            </div>
            <div className="bottom-top-grid last-bottom-top-grid">
              <h4>REGISTER</h4>
              <ul>
                <li>
                  <a href="#">Register</a>
                </li>
                <li>
                  <a href="#">Login</a>
                </li>
              </ul>
            </div>
            <div className="clear" />
          </div>
        </div>

        <div className="bottom-bottom-grids">
          <p>
            <i className="fa-regular fa-copyright" /> 2022 Cybersoft All Rights
            Reserved | Design Theme by Trương Tấn Khải.
          </p>
        </div>
      </footer>
    </div>
  );
}
