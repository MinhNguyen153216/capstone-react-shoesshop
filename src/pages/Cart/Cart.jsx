import React, { useState } from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";
import {
  changeQuantityAction,
  handleDeleteAction,
} from "../../redux/reducers/productReducer";
import { useDispatch } from "react-redux";
import { postOrderProductApi } from "../../redux/reducers/productReducer";
import { history } from "../../index";
import { Navigate } from "react-router-dom";

export default function Cart() {
  const { listCartTemp } = useSelector((state) => state.productReducer);
  const { userLogin } = useSelector((state) => state.userReducer);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const dispatch = useDispatch();
  const columns = [
    {
      title: "id",
      dataIndex: "id",
    },
    {
      title: "image",
      dataIndex: "image",
      render: (image) => (
        <img src={image} alt="Favorite" width={70} height={65} />
      ),
    },
    {
      title: "name",
      dataIndex: "name",
    },
    {
      title: "price",
      dataIndex: "price",
    },
    {
      title: "quantity",
      dataIndex: "quantityState",
      render: (quantityState, obj) => {
        return (
          <div>
            <button
              className="btn-1 mx-4"
              onClick={() => {
                handleChangeQuantity(+1, obj.id);
              }}
            >
              +
            </button>
            <span className="span-quantity py-2 px-5">{quantityState}</span>
            <button
              className="btn-1 mx-4"
              onClick={() => {
                if (quantityState <= 1) {
                  if (window.confirm(`Bạn có muốn xóa sản phẩm ${obj.name}`)) {
                    handleDelete(obj.id);
                  }
                } else {
                  handleChangeQuantity(-1, obj.id);
                }
              }}
            >
              -
            </button>
          </div>
        );
      },
    },
    {
      title: "total",
      dataIndex: "total",
    },
    {
      title: "action",
      dataIndex: "action",
      render: (id, obj) => {
        return (
          <div>
            <button className="btn-edit mx-3">EDIT</button>
            <button
              className="btn-delete mx-3"
              onClick={() => {
                if (window.confirm(`Bạn có muốn xóa sản phẩm ${obj.name}`)) {
                  handleDelete(id);
                }
              }}
            >
              DELETE
            </button>
          </div>
        );
      },
    },
  ];
  //dummy data
  const data = [];

  console.log(listCartTemp);
  for (let i = 0; i < listCartTemp.length; i++) {
    data.push({
      key: i,
      id: listCartTemp[i].id,
      name: listCartTemp[i].name,
      image: listCartTemp[i].image,
      price: listCartTemp[i].price,
      quantityState: listCartTemp[i].quantityState,
      total: listCartTemp[i].price * listCartTemp[i].quantityState,
      action: listCartTemp[i].id,
    });
  }
  console.log("data", data);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
    // console.log("selectedRowKeys changed: ", selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }

            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }

            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };
  let handleChangeQuantity = (number, id) => {
    // console.log(number, id);
    dispatch(changeQuantityAction([number, id]));
  };
  let handleDelete = (id) => {
    console.log(id);
    dispatch(handleDeleteAction(id));
  };

  const handleSubmitOrder = () => {
    if (listCartTemp.length === 0) {
      history.push("/home");
      return alert("Vui lòng chọn sản phẩm cần đặt hàng!");
    }
    let orderDetail = [];
    selectedRowKeys.forEach((i, index) => {
      orderDetail.push({
        productId: listCartTemp[i].id,
        quantity: listCartTemp[i].quantityState,
      });
    });
    let { email } = userLogin;
    let order = { orderDetail, email };
    console.log(order);
    if (orderDetail.length === 0) {
      return alert("Vui lòng chọn sản phẩm cần đặt hàng");
    }
    dispatch(postOrderProductApi(order, listCartTemp));
  };
  return (
    <>
      <section className="cart">
        <div className="container">
          <h3>Carts</h3>
          <div className="cart-table">
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={data}
            />
            <button className="btn-submit-order" onClick={handleSubmitOrder}>
              SUBMIT ORDER
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

//dispatch useState để gửi các dòng đã chọn lên Api
