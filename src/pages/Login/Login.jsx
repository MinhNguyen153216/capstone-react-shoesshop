import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { loginApi, fbLoginApi } from "../../redux/reducers/userReducer";
import FacebookLogin from "react-facebook-login";

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

  const responseFacebook = (response) => {
    let data = { facebookToken: response.accessToken };
    console.log(data);
    dispatch(fbLoginApi(data));
  };

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
                    <button type="submit" className="btn-submit">
                      Login
                    </button>
                  </div>
                </div>
                <div className="login-facebook">
                  {/* <FacebookLogin
                      appId="1108418000101590"
                      autoLoad={true}
                      fields="name,email,picture"
                      callback={responseFacebook}
                    /> */}
                </div>
              </form>

              <div className="row justify-content-center py-4">
                <div className="">
                  <FacebookLogin
                    appId="637563051189682"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={responseFacebook}
                  />
                  ,
                  {/* <FacebookLogin
                    appId="1108418000101590"
                    autoLoad
                    callback={responseFacebook}
                    render={(renderProps) => (
                      <button
                        className="btn-3"
                        onClick={renderProps.onClick}
                      >
                        <p className="px-3 fa-brands fa-facebook">
                          Continue With Facebook
                        </p>
                      </button>
                    )}
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
