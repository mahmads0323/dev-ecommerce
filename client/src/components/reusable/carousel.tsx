import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; // Optional for default styling
import React from "react";

const carouselSettings = {
  dots: true,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  swipeToSlid: true,
  autoplay: false,
  adaptiveHeight: true,
  speed: 500,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        initialSlide: 3,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 2,
        initialSlide: 2,
        autoplay: true,
        autoplaySpeed: 4000,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 4000,
      },
    },
  ],
};

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, background: "#222831", borderRadius: "50%" }}
      onClick={onClick}
    />
  );
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, background: "#222831", borderRadius: "50%" }}
      onClick={onClick}
    />
  );
}

const Carousel = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full p-8  overflow-x-auto overflow-y-hidden min-h-max">
      <Slider {...carouselSettings}>{children}</Slider>
    </div>
  );
};

export default Carousel;
