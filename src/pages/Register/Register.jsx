import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

export default function Register() {
  const dispatch = useDispatch();
  const form = useFormik({
    initialValues: {},
    validationSchema: Yup.object().shape({}),
    onSubmit: (values) => {},
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
                <form id="formRegister">
                  <div className="row register-item">
                    <div className="col-6 form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="txtEmail"
                        placeholder="email"
                        required
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      />
                      <span>Validation</span>
                      <span id="spanEmail" className="text-danger" />
                    </div>
                    <div className="col-6 form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="txtName"
                        placeholder="name"
                        required
                        pattern="^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$"
                      />
                      <span>Validation</span>

                      <span id="spanName" className="text-danger" />
                    </div>
                  </div>
                  <div className="row register-item">
                    <div className="col-6 form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="txtPassword"
                        placeholder="password"
                        required
                      />
                      <span>Validation</span>
                      <span id="spanPassword" className="text-danger" />
                    </div>
                    <div className="col-6 form-group">
                      <label>Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        id="txtPhone"
                        placeholder="phone"
                        required
                        pattern="[0-9]+"
                      />
                      <span>Validation</span>
                      <span id="spanPhone" className="text-danger" />
                    </div>
                  </div>
                  <div className="row register-item">
                    <div className="col-6 form-group">
                      <label>Password confirm</label>
                      <input
                        type="password"
                        className="form-control"
                        id="passwordConfirm"
                        placeholder="password confirm"
                        required
                      />
                      <span>Validation</span>
                      <span id="spanPasswordConfirm" className="text-danger" />
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
                              id="genderMale"
                              type="radio"
                              defaultChecked="checked"
                              name="radio"
                              defaultValue="true"
                            />
                            <br />
                            <label className="label-title">Male</label>
                          </div>
                          <div className="gender-click">
                            <input
                              id="genderFemale"
                              type="radio"
                              name="radio"
                              defaultValue="false"
                            />
                            <br />
                            <label className="label-title">Female</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="button">
                  <div id="btnSubmit">
                    <button type="button" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      ;
    </div>
  );
}
