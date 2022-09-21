import React from "react";
import { Carousel } from "antd";

const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const onChange = (currentSlide) => {
  console.log(currentSlide);
};

export default function Index() {
  return (
    <div className="carousel">
      <Carousel afterChange={onChange}>
        <div>
          <div style={{}}>
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
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
    </div>
  );
}
