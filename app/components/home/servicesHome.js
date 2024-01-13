'use client'

import React from 'react';

const ServicesHome = ({ images }) => {
    return (
        <div className="bg-white h-full justify-center flex w-full lg:flex-row  lg:justify-start lg:h-40 items-center">
            {images.map((image, index) => (
                <div key={index} className="group relative m-0 w-full">
                    <div className="flex justify-center">
                        <a href={image.href}>
                            <img src={image.src} alt={image.alt} className="block w-full" />
                        </a>
                    </div>
                    <div className="relative w-full border-0 group-hover:border-2 group-hover:border-[#2991D6] mt-2">
                        <div className="hidden group-hover:block absolute left-1/2 top-[calc(100%-0.3rem)] transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent group-hover:border-b-[#2991D6]"></div>
                    </div>

                </div>
            ))}
        </div>
    );
};

export default ServicesHome;

