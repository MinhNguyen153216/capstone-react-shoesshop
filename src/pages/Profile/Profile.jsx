import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { USER_LOGIN, getStore } from "../../util/tool";
import {
  getProfileApi,
  updateProfileApi,
} from "../../redux/reducers/userReducer";
import { Tabs } from "antd";
import { Space, Table, Tag } from "antd";
import { Pagination } from "antd";

export default function Profile() {
  // 1
  const { userLogin } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
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
      dispatch(updateProfileApi(values));
    },
  });

  const renderOrderTable = () => {
    if (!userLogin) {
      return <></>;
    }
    if (!userLogin.ordersHistory) {
      return <p>Chưa có order</p>;
    }
    console.log(userLogin.ordersHistory);
    return userLogin.ordersHistory.map((order, index) => {
      console.log(order);
      return (
        <div key={index} style={{ marginTop: "65px" }}>
          <p
            style={{
              color: "#DD2AED",
              fontSize: "20px",
            }}
          >
            + Orders have been placed on {order.date}
          </p>
          <table className="table">
            <thead className="ant-table-thead">
              <tr>
                <th className="ant-table-cell" width={"10%"}>
                  id
                </th>
                <th className="ant-table-cell" width={"15%"}>
                  img
                </th>
                <th className="ant-table-cell" width={"30%"}>
                  name
                </th>
                <th className="ant-table-cell" width={"15%"}>
                  price
                </th>
                <th className="ant-table-cell" width={"15%"}>
                  quantity
                </th>
                <th className="ant-table-cell" width={"15%"}>
                  total
                </th>
              </tr>
            </thead>
            <tbody className="ant-table-tbody">
              <tr>
                <td className="ant-table-cell">{order.id}</td>
                <td className="ant-table-cell">
                  <img
                    src={order.orderDetail[0].image}
                    alt="shoes"
                    width={85}
                    height={56}
                  />
                </td>
                <td className="ant-table-cell">{order.orderDetail[0].name}</td>
                <td className="ant-table-cell">{order.orderDetail[0].price}</td>
                <td className="ant-table-cell">
                  {order.orderDetail[0].quantity}
                </td>
                <td className="ant-table-cell">
                  {order.orderDetail[0].price * order.orderDetail[0].quantity}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    });
  };
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "img",
      dataIndex: "img",
      key: "img",
      render: (img) => <img src={img} alt="shoes" width={85} height={52} />,
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "total",
      dataIndex: "total",
      key: "total",
    },
  ];
  const data = [...userLogin.ordersHistory].map((item, index) => {
    return {
      date: item.date,
      id: item.id,
      img: item.orderDetail[0].image,
      name: item.orderDetail[0].name,
      quantity: item.orderDetail[0].quantity,
      price: item.orderDetail[0].price,
      total: item.orderDetail[0].quantity * item.orderDetail[0].price,
    };
  });
  console.log(data);
  // 3
  useEffect(() => {
    if (!getStore(USER_LOGIN)) {
      dispatch(getProfileApi());
    }
  }, [userLogin]);
  // 2
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
                        disabled
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
      <section className="profile-under">
        <div className="container">
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Order history" key="1">
              <div className="history">{renderOrderTable(userLogin)}</div>
              <div style={{textAlign:'right'}}>
                <Pagination defaultCurrent={1} total={50} />
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Favorite" key="2">
              <Table columns={columns} dataSource={data} />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
