import '/app/globals.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLanguage } from '@/app/store/actions';
import { ENGCulturaNew } from '@/app/data/language/english';
import { ESPCulturaNew } from '@/app/data/language/spanish';

export default function Formacion() {
    const isEnglish = useSelector((state) => state.isEnglish);
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };
    return (
        <div className='backgroundImagethree'>
            <div className="contenedor flex justify-center items-center">
                <div className="flex flex-col md:flex-row max-w-6xl mx-auto items-center">

                    {/* Sección de Imagen */}
                    <div className="md:w-1/2 flex justify-center">
                        <img className="md:w-[520px] rounded-lg object-cover shadow-lg"
                            src="/images/about_us/our_proposal/photo8.jpg"
                            alt="Descripción de la imagen">
                        </img>
                    </div>

                    {/* Sección de Texto */}
                    <div className="md:w-1/2 text-center md:text-left px-4">
                        <h1 className="text-3xl font-bold text-grayTerciary mb-4">
                            {isEnglish ? ENGCulturaNew.title3 : ESPCulturaNew.titulo3}
                        </h1>
                        <p className="text-[13px]">
                            {isEnglish ? ENGCulturaNew.description5 : ESPCulturaNew.descripcion5}
                        </p>
                        <br />
                        <p className="text-[13px]">
                            {isEnglish ? ENGCulturaNew.description6 : ESPCulturaNew.descripcion6}
                        </p>
                        <br />
                        <p className="text-[13px]">
                            {isEnglish ? ENGCulturaNew.description7 : ESPCulturaNew.descripcion7}
                        </p>

                    </div>

                </div>
            </div>
        </div>

    );
}
