'use client'
import React from 'react';
import SocialMedia from './socialMedia';

// Componente ServicesStandart
const ServicesStandart = () => {
    // Ejemplo de uso de ContainerService
    return (
        <>
            {/* Imagen Centralizada */}
            <div className="flex justify-center">
                <div className="flex justify-center items-end">
                    <div className="w-0 h-0 border-b-[30px] border-b-[#004F9F] border-l-transparent border-l-[30px] border-r-transparent border-r-[30px]"></div>
                    <div className="w-0 h-0 border-b-[45px] border-b-[#004F9F] border-l-transparent border-l-[40px] border-r-transparent border-r-[40px] mx-1"></div>
                    <div className="w-0 h-0 border-b-[30px] border-b-[#004F9F] border-l-transparent border-l-[30px] border-r-transparent border-r-[30px]"></div>
                </div>
            </div>

            {/* Contenedor Principal */}
            <div className="flex flex-wrap justify-center gap-4 w-full bg-[#004F9F]">
                <ContainerService
                    title="Proyecto educativo"
                    text="Conoce nuestro proyecto educativo"
                    imageUrl="/images/icons/rocket.png"
                    href="https://294347513a062ec6e0b6-8f8f94440e741fa4111c4d620d6f574f.ssl.cf5.rackcdn.com/global/TNS_PE_2021V2.pdf"
                />
                <ContainerService
                    title="Reglamento interno de trabajo"
                    text="Reglamento interno de trabajo"
                    imageUrl="/images/icons/rules.png"
                    href="https://294347513a062ec6e0b6-8f8f94440e741fa4111c4d620d6f574f.ssl.cf5.rackcdn.com/global/TNSRIT.pdf"
                />
                <ContainerService
                    title="Resolución de costos educativos"
                    text="Vigente para los años 2023-2024"
                    imageUrl="/images/icons/money.png"
                    href="https://drive.google.com/file/d/1x4rd2v13zeFQpqFuZ8KQrENql8ZwOcha/view?usp=sharing"
                />
                <ContainerService
                    title="Utiles escolares"
                    text="Vigente para los años 2023-2024"
                    imageUrl="/images/icons/backpack.png"
                    href="https://drive.google.com/file/d/1JFjtz1yTzPYQroivwRt67tH5x_PQZD1m/view"
                />
                <ContainerService
                    title="Manual de convivencia"
                    text="Lee nuestro manual de convivencia"
                    imageUrl="/images/icons/people.png"
                    href="https://drive.google.com/file/d/1dfQFNVT9u-3l3-Qm36qkYiefvnLr4t00/view"
                />
                        <SocialMedia />

            </div>
        </>
    );
};

export default ServicesStandart;


const ContainerService = ({ title, text, imageUrl, href }) => {
    return (
        <a href={href} className="group block text-center">
            <div className="p-4 transform transition duration-300 ease-in-out hover:-translate-y-2">
                {/* La imagen escalará hacia abajo si es demasiado grande para el contenedor, sin recortar */}
                <div className="w-64 h-40 overflow-hidden">
                    <img src={imageUrl} alt={title} className="w-full h-full object-scale-down" />
                </div>
                <h3 className="text-white text-lg mt-3 font-bold">{title}</h3>
                <p className="text-white mt-2 text-sm">{text}</p>
            </div>
        </a>
    );
};

