'use client'
import React from 'react';

const ServicesHome = ({ images }) => {
    return (
        <div className="bg-white pt-8 pb-4 flex justify-center flex-wrap w-full items-center px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32">
            {images.map((image, index) => (
                <div key={index} className="group relative m-2 sm:m-4 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/6">
                    <div className="flex justify-center items-center w-full px-2 sm:px-4 md:px-6">
                        <a href={image.href} className="">
                            <img
                                src={image.src}
                                alt={image.alt}
                                className={image.className || "h-auto max-w-full mx-auto"}
                            />
                        </a>
                    </div>
                    <div className="relative w-full border-0 group-hover:border-2 group-hover:border-blueButton mt-2">
                        <div className="hidden group-hover:block absolute left-1/2 top-[calc(100%-0.3rem)] transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent group-hover:border-b-blueButton"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ServicesHome;