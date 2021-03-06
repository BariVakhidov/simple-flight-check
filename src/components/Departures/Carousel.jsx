import React from "react";
import s from "./Departures.module.css";
import Slider from "react-slick";

const Carousel = ({photos}) => {
    const settings = {
        easing: "ease-in",
        autoplay: true,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "35px",
        arrows: false,
        focusOnSelect: true

    };
    return (
        <div className={s.slider}>
            <Slider {...settings}>
                {photos.map(p => <div key={p} style={s.slickBlock}>
                    <div className={s.carouselImg} style={{backgroundImage: `url(${p})`}}></div>
                </div>)}
            </Slider>
        </div>
    )
}
export default Carousel;