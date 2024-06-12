import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { toggleLanguage } from '@/app/store/actions';
import { ENGTheNewAwareness } from '@/app/data/language/english';
import { ESPTheNewAwareness } from '@/app/data/language/spanish';
import { ImagesPath } from '@/app/utils/imagesPath';

const TheNewAwareness = () => {
    const isEnglish = useSelector((state) => state.isEnglish);
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };
    
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-grayTerciary mb-4">
                {isEnglish ? ENGTheNewAwareness.title1:ESPTheNewAwareness.titulo1}
                </h2>
            <p className="mb-4">
                {isEnglish ? ENGTheNewAwareness.description1:ESPTheNewAwareness.descripcion1 }
            </p>
            <p className="mb-4">
                {isEnglish ? ENGTheNewAwareness.description2:ESPTheNewAwareness.descripcion2 }
            </p>
            <p className="mb-4 font-semibold">
                {isEnglish ? ENGTheNewAwareness.subtitle:ESPTheNewAwareness.subtitulo}
            </p>
            <ul className="list-disc list-inside mb-4">
                <li>{isEnglish ? ENGTheNewAwareness.description3 :ESPTheNewAwareness.descripcion3}</li>
                <li>{isEnglish ? ENGTheNewAwareness.descripcion4 : ESPTheNewAwareness.descripcion4}</li>
                <li>{isEnglish ? ENGTheNewAwareness.descripcion5 : ESPTheNewAwareness.descripcion5}</li>
            </ul>
            <p className="mb-4">
                {isEnglish ? ENGTheNewAwareness.contact : ESPTheNewAwareness.contacto }
                 <a href="tel:+573001715245" className="text-blue-500">3001715245</a>.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <img
                    className="w-full h-[300px] rounded-lg object-cover shadow-lg"
                    src={ImagesPath.photo14}
                    alt="Imagen 1"
                />
                <img
                    className="w-full h-[300px] rounded-lg object-cover shadow-lg"
                    src={ImagesPath.photo15}
                    alt="Imagen 2"
                />
            </div>
        </div>
    );
};

export default TheNewAwareness;
