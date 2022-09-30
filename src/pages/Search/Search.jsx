import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  getAllProductApi,
  getProductApi,
  sortListResultAction,
} from "../../redux/reducers/productReducer";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback } from "react";
import _debounce from "lodash/debounce";

export default function Search() {
  const { listProduct, listResult } = useSelector(
    (state) => state.productReducer
  );
  const dispatch = useDispatch();
  const debounceFunc = useCallback(_debounce(handleDebounceFunc, 800), []);

  const form = useFormik({
    initialValues: {
      searchValue: "",
    },
    validationSchema: Yup.object().shape({
      searchValue: Yup.string(),
    }),
    onSubmit: (input) => {
      dispatch(getProductApi(input.searchValue));
    },
  });

  const handleOnInput = (event) => {
    debounceFunc(event.target.value);
  };

  function handleDebounceFunc(searchValue) {
    dispatch(getProductApi(searchValue));
  }

  useEffect(() => {
    dispatch(getAllProductApi());
    dispatch(getProductApi(" "));
  }, []);

  const renderProduct = (listResult) => {
    // console.log("listResult", listResult);
    if (!listResult || listResult.length === 0) {
      return <h1 className="no-result">Không có kết quả</h1>;
    }
    return listResult.map((product, index) => {
      return (
        <div className="col-4 item pt-5" key={index}>
          <div
            className="card mx-auto "
            style={{
              backgroundColor: "#F8F8F8",
              border: "none",
              borderRadius: 0,
              height: 369,
            }}
          >
            <img
              src={product.image}
              alt="..."
              className="mx-auto mt-3"
              height={180}
            />
            {renderHeart()}
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">
                {product.description.length > 75
                  ? `${product.description.substring(0, 75)}...`
                  : product.description}
              </p>
            </div>
            <div className="p-0" style={{ height: 64 }}>
              <div className="d-flex justify-content-center align-items-center text-center h-100">
                <NavLink
                  to={`/detail/${product.id}`}
                  className="d-flex justify-content-center align-items-center col h-100"
                  style={{ backgroundColor: "#E1B067" }}
                >
                  <p
                    className="m-0 text-black"
                    style={{
                      fontWeight: 200,
                      fontSize: 24,
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                  >
                    Buy now
                  </p>
                </NavLink>
                <div
                  className="d-flex justify-content-center align-items-center col h-100"
                  style={{ backgroundColor: "#DEDDDC" }}
                >
                  <p
                    className="m-0"
                    style={{
                      fontWeight: 600,
                      fontSize: 24,
                    }}
                  >
                    {`${product.price}$`}
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
        <FontAwesomeIcon icon="fa-solid fa-heart" className="heart" />
      </>
    );
  };

  const handleSort = (sort) => {
    dispatch(sortListResultAction(sort));
  };

  return (
    <>
      <section className="search-bar">
        <div className="container">
          <p>Search</p>
          <form id="formSearch" onSubmit={form.handleSubmit}>
            <div className="form-container">
              <input
                className="form-control"
                id="searchValue"
                name="searchValue"
                placeholder="Search product name..."
                onChange={form.handleChange}
                onInput={handleOnInput}
              />
              <button id="btnSubmit" type="submit" className="btn btn-submit">
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="search-result">
        <div className="search-title">
          <div className="container">
            <h1>Search result</h1>
          </div>
        </div>
        <div className="product">
          <div className="container">
            <div className="sort">
              <p>Price</p>
              <div className="sort-btn">
                <button onClick={() => handleSort("desc")}>
                  decrease <div className="triangle-dec"></div>
                </button>
              </div>

              <div className="sort-btn">
                <button onClick={() => handleSort("asc")}>
                  ascending
                  <div className="triangle-asc"></div>
                </button>
              </div>

              <br />
              {/* <div
                style={{
                  width: 0,
                  height: 0,
                  borderBottom: "15px solid red",
                  borderLeft: "15px solid transparent",
                  borderRight: "15px solid transparent",
                }}
              ></div> */}
            </div>
            <div className="row" id="product-row">
              {renderProduct(listResult)}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
