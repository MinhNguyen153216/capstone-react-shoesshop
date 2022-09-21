import React from "react";
import { Carousel } from "antd";

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
  return (
    <>
      <div className="carousel">
        <Carousel afterChange={onChange} arrows {...arrowSettings}>
          <div className="owl-carousel">
            <div style={contentStyle}>
              <div className="item-carousel">
                <div className="container">
                  <div className="item-left">
                    <img src="./img/image 4.png" alt="..." />
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
                    <img src="./img/image 4.png" alt="..." />
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
                    <img src="./img/image 4.png" alt="..." />
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
              <div className="col-4 item">
                <div
                  className="card mx-auto mt-lg-5 mt-md-4 mt-sm-2"
                  style={{
                    backgroundColor: "#F8F8F8",
                    border: "none",
                    borderRadius: 0,
                    height: 369,
                  }}
                >
                  <img
                    src="./img/image 5.png"
                    alt="..."
                    className="mx-auto mt-5"
                    width={220}
                    height={156}
                  />
                  <div className="card-body">
                    <h5 className="card-title">asd</h5>
                    <p className="card-text">descript</p>
                  </div>
                  <div className="p-0" style={{ height: 64 }}>
                    <div className="d-flex justify-content-center align-items-center text-center h-100">
                      <div
                        className="d-flex justify-content-center align-items-center col h-100"
                        style={{ backgroundColor: "#E1B067" }}
                      >
                        <a
                          href="./detail.html?productid=${item.id}"
                          className="m-0 text-black"
                          style={{
                            fontWeight: 200,
                            fontSize: 24,
                            lineHeight: 29,
                            textDecoration: "none",
                            cursor: "pointer",
                          }}
                        >
                          Buy now
                        </a>
                      </div>
                      <div
                        className="d-flex justify-content-center align-items-center col h-100"
                        style={{ backgroundColor: "#DEDDDC" }}
                      >
                        <p
                          className="m-0"
                          style={{
                            fontWeight: 600,
                            fontSize: 24,
                            lineHeight: 29,
                          }}
                        >
                          price
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
