'use client'

import React from 'react';

const ServicesHome = ({ images }) => {
    return (
        <div className="flex flex-wrap justify-center md:justify-start">
            {images.map((image, index) => (
                <div key={index} className="group relative m-4">
                    <div className="flex justify-center">
                        <a href={image.href}>
                            <img src={image.src} alt={image.alt} className="block" />
                        </a>
                    </div>
                    <div className="relative w-full border-b border-gray-300 group-hover:border-blue-500 mt-2">
                        <div className="hidden group-hover:block absolute left-1/2 -top-2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-blue-500"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ServicesHome;

/* import React from 'react';

const ServicesHome = ({ images }) => {
    return (
        <div className="flex flex-wrap justify-center md:justify-start">
            {images.map((image, index) => (
                <div key={index} className="group relative m-4">
                    <div className="flex justify-center">
                        <a href={image.href}>
                            <img src={image.src} alt={image.alt} className="block" />
                        </a>
                    </div>
                    <div className="w-full border-b border-gray-300 group-hover:border-blue-500 mt-2">
                        <div className="hidden group-hover:block absolute left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-blue-500" style={{ bottom: '-6px' }}></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ServicesHome; */
