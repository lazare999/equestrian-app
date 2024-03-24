import React, { useState, useEffect, useCallback } from "react";
// import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { sliderData } from "./slider-data";
import "./Slider.scss";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = sliderData.length;
  const intervalTime = 5000;
  const autoScroll = true;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slideLength);
  }, [slideLength]);

  // const prevSlide = () => {
  //   setCurrentSlide((prevSlide) =>
  //     prevSlide === 0 ? slideLength - 1 : prevSlide - 1
  //   );
  // };

  useEffect(() => {
    let slideInterval;
    if (autoScroll) {
      slideInterval = setInterval(nextSlide, intervalTime);
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide, autoScroll, nextSlide]);

  return (
    <div className="slider">
      {/* <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
      <AiOutlineArrowRight className="arrow next" onClick={nextSlide} /> */}
      {sliderData.map((slide, index) => (
        <div
          className={`slide ${index === currentSlide ? "current" : ""}`}
          key={index}
        >
          {index === currentSlide && (
            <div>
              <img
                src={slide.image}
                alt="slide"
                className="image"
                loading="lazy"
              />
              <div className="content">
                <h2 className="bumph2">{slide.heading}</h2>
                <hr className="bumphr" />
                <p className="bumpp">{slide.desc}</p>
                {/* <button className="--btn --btn-primary bumpbtn">
                  Get Started
                </button> */}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Slider;
