import React from 'react';

const ServicesHome = ({ images }) => {
    return (
        // Ajustes para el contenedor principal para mejorar la disposición en pantallas pequeñas y grandes
        <div className="bg-white pt-8 pb-4 justify-center flex flex-wrap w-full items-center px-4 lg:px-32">
            {images.map((image, index) => (
                // Ajusta el ancho y el margen de cada elemento de la imagen para responsividad
                <div key={index} className="group relative m-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
                    <div className="flex justify-center">
                        <a href={image.href}>
                            <img src={image.src} alt={image.alt} className="block w-full h-auto" />
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
