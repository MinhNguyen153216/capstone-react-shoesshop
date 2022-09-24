import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { USER_LOGIN, getStore } from "../../util/tool";
import { getProfileApi } from "../../redux/reducers/userReducer";
import { clear } from "@testing-library/user-event/dist/clear";

export default function Profile() {
  const { userLogin } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!getStore(USER_LOGIN)) {
      dispatch(getProfileApi());
    }
  }, [userLogin]);
  const form = useFormik({
    initialValues: {
      email: userLogin?.email,
      password: "",
      gender: userLogin?.gender,
      phone: userLogin?.phone,
      name: userLogin?.name,
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("email không đúng định dạng!"),
      password: Yup.string()
        .required("Yêu cầu nhập password mới!")
        .min(8, "pass từ 8 - 12 ký tự!")
        .max(12, "pass từ 8 - 12 ký tự!"),
    }),
    onSubmit: (values) => {
      let { email, password, gender, phone, name } = values;
      let userUpdate = {
        ...userLogin,
        ...(email ? { email } : {}),
        ...(password ? { password } : {}),
        ...(gender === null || gender === undefined ? {} : { gender }),
        ...(phone ? { phone } : {}),
        ...(name ? { name } : {}),
      };
      console.log(userUpdate);
      // dispatch(loginApi(values));
    },
  });
  
  return (
    <div className="profile py-4">
      <section className="profile-upper">
        <div className="profile-header">
          <div className="container">
            <h3>Profile</h3>
          </div>
        </div>
        <div className="container">
          <div className="profile-upper-form">
            <form onSubmit={form.handleSubmit}>
              <div className="row profile-content">
                <div className="col-2  profile-avatar">
                  <img src={userLogin?.avatar} alt="avatar" className="w-100" />
                </div>
                <div className="col-10 profile-form">
                  <div className="row profile-row profile-row-1">
                    <div className="col-6 form-group">
                      <label>Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder={userLogin?.email}
                        className="form-control"
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                      />
                      {form.errors.email ? (
                        <span className="text-danger">{form.errors.email}</span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-6 form-group">
                      <label>Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder={userLogin?.name}
                        className="form-control"
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                      />
                      {form.errors.name ? (
                        <span className="text-danger">{form.errors.name}</span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="row profile-row profile-row-2">
                    <div className="col-6 form-group">
                      <label>Phone</label>
                      <input
                        id="phone"
                        name="phone"
                        type="text"
                        placeholder={userLogin?.phone}
                        className="form-control"
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                      />
                      {form.errors.phone ? (
                        <span className="text-danger">{form.errors.phone}</span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-6 form-group">
                      <label>Password</label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="********"
                        className="form-control"
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
                  <div className="row profile-row profile-row-3">
                    <div className="col-6 form-group"></div>
                    <div className="col-6 form-gender">
                      <div id="gender-content">
                        <div className="gender-option">
                          <p
                            style={{
                              fontSize: 18,
                              fontWeight: 500,
                              paddingRight: "20px",
                              display: "inline-block",
                              color: "rgba(0, 0, 0, 0.6)",
                            }}
                          >
                            Gender
                          </p>
                        </div>
                        <div className="gender-option">
                          <div className="gender-click">
                            <input
                              defaultChecked={userLogin?.gender}
                              type="radio"
                              name="gender"
                              onChange={() =>
                                form.setFieldValue("gender", true)
                              }
                            />
                            <br />
                            <label className="label-title">Male</label>
                          </div>
                          <div className="gender-click">
                            <input
                              defaultChecked={!userLogin?.gender}
                              type="radio"
                              name="gender"
                              onChange={() =>
                                form.setFieldValue("gender", false)
                              }
                            />
                            <br />
                            <label className="label-title">Female</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="button btn-profile">
                    <div id="btnSubmit">
                      <button
                        type="submit"
                        className="btn-submit btn btn-primary"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      <section className="profile-under"></section>
    </div>
  );
}
