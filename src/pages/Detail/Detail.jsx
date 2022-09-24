import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getProductDetailApi } from "../../redux/reducers/productReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Detail() {
  const { productDetail } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();
  const param = useParams();

  useEffect(() => {
    let { id } = param;
    dispatch(getProductDetailApi(id));
  }, [param.id]);

  const renderProductDetail = (productDetail) => {
    return (
      <>
        <div className="col-left">
          <div className="detail-left">
            <img src={productDetail.image} alt="..." />
          </div>
        </div>
        <div className="col-right">
          <div className="detail-right">
            <h3>{productDetail.name}</h3>
            <p>{productDetail.description}</p>
            <span>Avaiable size</span>
            <div className="size" id="size-list">
              <div className="size-num">
                <p>38</p>
              </div>
              <div className="size-num">
                <p>38</p>
              </div>
            </div>
            <h1>{productDetail.price}$</h1>
            <div className="changeSize">
              <div className="enhance">
                <p>+</p>
              </div>
              <p>1</p>
              <div className="enhance">
                <p>-</p>
              </div>
            </div>
            <NavLink to={"/cart"} className="addBTN">
              Add to cart
            </NavLink>
          </div>
        </div>
      </>
    );
  };

  const renderProductSize = () => {};

  const renderRelateProduct = (relatedList) => {
    return relatedList.map((item, index) => {
      return (
        <div className="col item" key={index}>
          <div
            className="card mx-auto mt-lg-5 mt-md-4 mt-sm-2"
            style={{
              backgroundColor: "#F8F8F8",
              border: "none",
              borderRadius: 0,
            }}
          >
            <img src={item.image} alt="..." className="m-auto mt-4" width="220px" />
            {renderHeart()}
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">
                {item.description.length > 30
                  ? `${item.description.substring(0, 30)}...`
                  : item.description}
              </p>
            </div>
            <div className="p-0" style={{ height: 64 }}>
              <div className="d-flex justify-content-center align-items-center text-center h-100">
                <div
                  className="d-flex justify-content-center align-items-center col h-100"
                  style={{ backgroundColor: "#E1B067" }}
                >
                  <NavLink
                    to={`/detail/${item.id}`}
                    className="m-0 text-black"
                    style={{
                      fontWeight: 200,
                      fontSize: 24,
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                  >
                    Buy now
                  </NavLink>
                </div>
                <div
                  className="d-flex justify-content-center align-items-center col h-100"
                  style={{ backgroundColor: "#DEDDDC" }}
                >
                  <p
                    className="m-0"
                    style={{ fontWeight: 600, fontSize: 24, lineHeight: 29 }}
                  >
                    {item.price}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  const renderHeart = () => {
    return (
      <>
        <FontAwesomeIcon icon="fa-solid fa-heart" className="heart"/>
      </>
    );
  };

  return (
    <div>
      <div>
        <section className="detail">
          <div className="container">
            <div className="row-detail" id="item-detail">
              {renderProductDetail(productDetail)}
            </div>
          </div>
        </section>
        <section className="product mb-lg-5 mb-md-4 mb-sm-2">
          <div className="container">
            <h2 className="text-center">- Relate Product -</h2>
            <div className="row" id="product-row">
              {productDetail.relatedProducts ? (
                renderRelateProduct(productDetail.relatedProducts)
              ) : (
                <></>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
