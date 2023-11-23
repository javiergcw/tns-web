'use client'
import React from "react";
import Slider from "react-slick";

export default function BannerCarousel({ imagePaths }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 8000,
        cssEase: "linear"
    };


    return (
        <div className="w-full">
            <Slider {...settings} className="slider">
                {imagePaths.map((path, index) => (
                    <div key={index} className="h-128 overflow-hidden relative">
                        <img src={path}
                            style={{ transform: 'scale(1.1)', transition: 'transform 0.5s ease-out' }}
                            className="parallax-image  w-full h-full object-cover"
                            alt={`Banner ${index + 1}`} />
                    </div>
                ))}
            </Slider>
        </div>
    );
}
