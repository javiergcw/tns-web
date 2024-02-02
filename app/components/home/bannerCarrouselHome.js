'use client'
import React, { useState } from "react";
import Slider from "react-slick";


function NextArrow(props) {
    const { className, style, onClick, isHovering } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: "block",
                right: "20px",
                opacity: isHovering ? 1 : 0,
                transition: 'opacity 0.2s ease',
                zIndex: 25,
                background: "rgba(0, 0, 0, 0.5)",
                color: "white",
                borderRadius: "50%",
                padding: "5px",
                width: "25px",
                height: "25px",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
            }}
            onClick={onClick}
        >
        </div>
    );
}

function PrevArrow(props) {
    const { className, style, onClick, isHovering } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: "block",
                left: "20px",
                opacity: isHovering ? 1 : 0,
                transition: 'opacity 0.2s ease',
                zIndex: 25,
                background: "rgba(0, 0, 0, 0.5)",
                color: "white",
                borderRadius: "50%",
                padding: "5px",
                width: "25px",
                height: "25px",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
            }}
            onClick={onClick}
        >
        </div>
    );
}

export default function BannerCarousel({ imagePaths }) {
    const [activeSlide, setActiveSlide] = useState(0);
    const [isHovering, setIsHovering] = useState(false); // Estado para manejar si el ratón está encima del carrusel


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 8000,
        fade: true,
        cssEase: "linear",
        nextArrow: <NextArrow isHovering={isHovering} />,
        prevArrow: <PrevArrow isHovering={isHovering} />,
        beforeChange: (current, next) => setActiveSlide(next),
        appendDots: dots => (
            <div style={{
                bottom: "25px",
                position: 'absolute',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                opacity: isHovering ? 1 : 0, // Controla la opacidad de los dots basado en si el ratón está encima
                transition: 'opacity 0.5s ease', // Transición suave de la opacidad
            }}>
                <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
        ),
        customPaging: function (i) {
            return (
                <div className="w-full relative"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    <button
                        style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            backgroundColor: i === activeSlide ? "#000" : "#FFF",
                            border: "2px solid #000",
                            padding: "0",
                            margin: "0 5px",
                            outline: "none",
                        }}
                    >
                    </button>
                </div>

            );
        },
    };

    return (
        <div className="w-full relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <Slider {...settings}>
                {imagePaths.map((path, index) => (
                    <div key={index} className="h-128 overflow-hidden relative">
                        <img src={path}
                            style={{ transform: 'scale(1.1)', transition: 'transform 0.5s ease-out' }}
                            className="w-full h-full object-cover"
                            alt={`Banner ${index + 1}`} />
                    </div>
                ))}
            </Slider>
        </div>
    );
}
