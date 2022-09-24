import React, { useEffect } from "react";
import { Carousel } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductApi } from "../../redux/reducers/productReducer";
import { NavLink } from "react-router-dom";

const contentStyle = {
  height: "440px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "none",
};
const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
};
const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
};
const arrowSettings = {
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};
const onChange = (currentSlide) => {
  // console.log(currentSlide);
};

export default function Index() {
  const { listProduct } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductApi());
  }, []);

  const renderProduct = () => {
    return listProduct.map((product, index) => {
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
        <img src="./img/unheart.png" alt="..." className="heart" />
      </>
    );
  };

  return (
    <>
      <div className="carousel">
        {/* <Carousel afterChange={onChange} arrows {...arrowSettings}> */}
        <Carousel afterChange={onChange} autoplay>
          <div className="owl-carousel">
            <div style={contentStyle}>
              <div className="item-carousel">
                <div className="container">
                  <div className="item-left">
                    <img src="./img/kindpng_3577910.png" alt="..." />
                  </div>
                  <div className="item-right">
                    <h1>Product name</h1>
                    <p>Product description ...</p>
                    <span className="text-center">Buy now</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="owl-carousel">
            <div style={contentStyle}>
              <div className="item-carousel">
                <div className="container">
                  <div className="item-left">
                    <img src="./img/kindpng_2128929.png" alt="..." />
                  </div>
                  <div className="item-right">
                    <h1>Product name</h1>
                    <p>Product description ...</p>
                    <span className="text-center">Buy now</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="owl-carousel">
            <div style={contentStyle}>
              <div className="item-carousel">
                <div className="container">
                  <div className="item-left">
                    <img src="./img/kindpng_7584997.png" alt="..." />
                  </div>
                  <div className="item-right">
                    <h1>Product name</h1>
                    <p>Product description ...</p>
                    <span className="text-center">Buy now</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Carousel>
        <div className="img-bg-footer">
          <img src="./img/image 6.png" alt="..." />
        </div>
      </div>

      <div className="product-feature">
        <div className="product-title">
          <p>Product Feature</p>
        </div>

        <div className="product mb-lg-5 mb-md-4 mb-sm-1">
          <div className="container">
            <div className="row" id="product-row">
              {renderProduct()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
