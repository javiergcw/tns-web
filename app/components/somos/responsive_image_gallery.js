import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toggleLanguage } from '@/app/store/actions';
import { ENGCampus, ENGCulturaNew } from '@/app/data/language/english';
import { ESPCampus, ESPCulturaNew } from '@/app/data/language/spanish';

const images = [
    '/images/about_us/our_proposal/photo10.jpg',
    '/images/about_us/our_proposal/photo11.jpg',
    '/images/about_us/our_proposal/photo12.jpg'
];

const ResponsiveImageGallery = () => {
    const isEnglish = useSelector((state) => state.isEnglish);
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((src, index) => (
                    <div key={index} className="flex justify-center">
                        <img
                            className="w-full h-[300px] rounded-lg object-cover shadow-lg"
                            src={src}
                            alt={`Imagen ${index + 1}`}
                        />
                    </div>
                ))}
            </div>
            <br />
            <h1 className="text-3xl font-bold text-grayTerciary mb-4">
                {isEnglish ? ENGCampus.title5 : ESPCampus.titulo5}
            </h1>
            <p className="text-[13px]">
                {isEnglish ? ENGCampus.description9 : ESPCampus.descripcion9}
            </p>
            <br />
            <p className="text-[13px]">
                {isEnglish ? ENGCampus.description10 : ESPCampus.descripcion10}

            </p>
        </div>
    );
};

export default ResponsiveImageGallery;
