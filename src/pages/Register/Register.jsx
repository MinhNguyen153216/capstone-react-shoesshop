import React from "react";
import { Field, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerApi } from "../../redux/reducers/userReducer";

export default function Register() {
  const dispatch = useDispatch();
  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      gender: true,
      phone: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("email không được để trống!")
        .email("email không đúng định dạng!"),
      name: Yup.string().required("name không được để trống!"),
      password: Yup.string()
        .required("password không được để trống!")
        .min(8, "pass từ 8 - 12 ký tự!")
        .max(12, "pass từ 8 - 12 ký tự!"),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref("password"), null], "password phải trùng nhau!")
        .required("password confirm không được để trống!")
        .min(8, "pass từ 8 - 12 ký tự!")
        .max(12, "pass từ 8 - 12 ký tự!"),
      phone: Yup.string().required("phone không được để trống!"),
      // gender: Yup.string().required("Vui lòng chọn giới tính"),
    }),
    onSubmit: (values) => {
      console.log(values);
      dispatch(registerApi(values));
    },
  });

  return (
    <div>
      <div>
        <section className="register">
          <div className="container">
            <div className="row content-register">
              <div className="col-10 mx-auto detail-register">
                <h3 className="text-left display-6 text-dark fs-1">Register</h3>
                <hr />
                <form id="formRegister" onSubmit={form.handleSubmit}>
                  <div className="row register-item">
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
                        // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
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
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="name"
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        // pattern="^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$"
                      />
                      {form.errors.name ? (
                        <span className="text-danger">{form.errors.name}</span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="row register-item">
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
                    <div className="col-6 form-group">
                      <label>Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        placeholder="phone"
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        // pattern="[0-9]+"
                      />
                      {form.errors.phone ? (
                        <span className="text-danger">{form.errors.phone}</span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="row register-item">
                    <div className="col-6 form-group">
                      <label>Password confirm</label>
                      <input
                        type="password"
                        className="form-control"
                        id="passwordConfirm"
                        name="passwordConfirm"
                        placeholder="password confirm"
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                      />
                      {form.errors.passwordConfirm ? (
                        <span className="text-danger">
                          {form.errors.passwordConfirm}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
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
                              defaultChecked={true}
                              type="radio"
                              name="gender"
                              value={true}
                              onChange={() =>
                                form.setFieldValue("gender", true)
                              }
                            />
                            <br />
                            <label className="label-title">Male</label>
                          </div>
                          <div className="gender-click">
                            <input
                              type="radio"
                              name="gender"
                              value={false}
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
                  <div className="button">
                    <div id="btnSubmit">
                      <button type="submit" className="btn-submit btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
