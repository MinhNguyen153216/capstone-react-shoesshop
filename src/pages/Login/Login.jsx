import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { loginApi } from "../../redux/reducers/userReducer";

export default function Login() {
  const dispatch = useDispatch();
  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("email không đúng định dạng!")
        .required("email không được để trống!"),
      password: Yup.string()
        .required("password không được để trống!")
        .min(8, "pass từ 8 - 12 ký tự!")
        .max(12, "pass từ 8 - 12 ký tự!"),
    }),
    onSubmit: (values) => {
      console.log(values);
      dispatch(loginApi(values));
    },
  });

  return (
    <div>
      <section className="register">
        <div className="container">
          <div className="row content-register">
            <div className="col-10 mx-auto detail-register">
              <h3 className="text-left display-6 text-dark fs-1">Login</h3>
              <hr />
              <form id="formRegister" onSubmit={form.handleSubmit}>
                <div className="row justify-content-center register-item mb-4">
                  <div className="col-6 form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="email"
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                    />
                    {form.errors.email ? (
                      <span className="text-danger">{form.errors.email}</span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="row justify-content-center register-item mb-4">
                  <div className="col-6 form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="password"
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                    />
                    {form.errors.password ? (
                      <span className="text-danger">
                        {form.errors.password}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="button mt-3 d-flex justify-content-center">
                  <div className="register mt-3">
                    <NavLink
                      className="text-primary fs-5 fw-semibold"
                      to={"/register"}
                    >
                      Register now?
                    </NavLink>
                  </div>
                  <div id="btnSubmit">
                    <button type="submit" className="btn-2 btn btn-primary">
                      Login
                    </button>
                  </div>
                </div>
                <div className="row justify-content-center pb-3">
                  <div className="col-6 form-group d-flex align-items-center">
                    <button className="btn-3 btn btn-primary fs-5">
                      <FontAwesomeIcon icon="fa-brands fa-facebook" /> Continue
                      With Facebook
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
