'use client'

import React, { useState, useRef, useEffect } from "react";
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
                width: "40px",
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
                width: "40px",
                height: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
            onClick={onClick}
        />
    );
}

export default function BannerCarousel({ videoPaths }) {
    const [activeSlide, setActiveSlide] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const sliderRef = useRef(null);
    const videoRefs = useRef([]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        fade: true,
        nextArrow: <NextArrow isHovering={isHovering} />,
        prevArrow: <PrevArrow isHovering={isHovering} />,
        beforeChange: (current, next) => {
            console.log(`Cambiando de slide ${current} a ${next}`); // Depuración
            setActiveSlide(next);
        },
        afterChange: (current) => {
            // Forzar la reproducción del video activo
            if (videoRefs.current[current]) {
                videoRefs.current[current].play().catch((error) => {
                    console.error("Error al reproducir video:", error);
                });
            }
        },
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    nextArrow: null,
                    prevArrow: null
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    nextArrow: null,
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

    const handleVideoEnded = () => {
        console.log("Video terminado, pasando al siguiente slide"); // Depuración
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };

    // Inicializar videoRefs con un arreglo del tamaño de videoPaths
    useEffect(() => {
        videoRefs.current = videoRefs.current.slice(0, videoPaths.length);
    }, [videoPaths]);

    return (
        <div
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="w-full relative"
        >
            <Slider ref={sliderRef} {...settings}>
                {videoPaths.map((path, index) => (
                    <div key={index} className="h-auto overflow-hidden relative">
                        <video
                            ref={(el) => (videoRefs.current[index] = el)} // Asignar referencia al video
                            src={path}
                            autoPlay={activeSlide === index}
                            muted
                            playsInline
                            preload="auto" // Precargar video
                            onEnded={handleVideoEnded}
                            style={{ width: '100%', height: 'auto' }}
                            alt={`Video ${index + 1}`}
                        >
                            <source src={path} type="video/mp4" />
                            <img src="/images/fallback.jpg" alt="Fallback" /> {/* Imagen de respaldo */}
                        </video>
                    </div>
                ))}
            </Slider>
        </div>
    );
}