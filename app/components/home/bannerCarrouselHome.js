'use client'
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Componente para la flecha siguiente personalizada
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
                padding: "10px",
                width: "40px", // Ajuste para un tamaño más adecuado en diferentes pantallas
                height: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
            onClick={onClick}
        />
    );
}

// Componente para la flecha anterior personalizada
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
                padding: "10px",
                width: "40px", // Ajuste para un tamaño más adecuado en diferentes pantallas
                height: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
            onClick={onClick}
        />
    );
}

export default function BannerCarousel({ imagePaths }) {
    const [activeSlide, setActiveSlide] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

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
        responsive: [
            {
                breakpoint: 1024, // Para dispositivos con pantalla hasta 1024px
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600, // Para dispositivos con pantalla hasta 600px
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    nextArrow: null, // Oculta las flechas en pantallas pequeñas
                    prevArrow: null
                }
            },
            {
                breakpoint: 480, // Para dispositivos con pantalla hasta 480px
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    nextArrow: null, // Oculta las flechas en pantallas muy pequeñas
                    prevArrow: null
                }
            }
        ],
        appendDots: dots => (
            <div style={{
                bottom: "25px",
                position: 'absolute',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                opacity: isHovering ? 1 : 0,
                transition: 'opacity 0.5s ease',
            }}>
                <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
        ),
        customPaging: function (i) {
            return (
                <div
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
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
                />
            );
        },
    };

    return (
        <div
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="w-full relative"
        >
            <Slider {...settings}>
                {imagePaths.map((path, index) => (
                    <div key={index} className="h-auto overflow-hidden relative">
                        <img src={path}
                            style={{ width: '100%', height: 'auto', transition: 'transform 0.5s ease-out' }}
                            alt={`Banner ${index + 1}`} />
                    </div>
                ))}
            </Slider>
        </div>
    );
}
