
import '/app/globals.css';
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import { toggleLanguage } from '@/app/store/actions';
import { ENGCampus, ENGCulturaNew } from '@/app/data/language/english';
import { ESPCampus } from '@/app/data/language/spanish';
import { ImagesPath } from '@/app/utils/assetsPath';

export default function Members() {
    const isEnglish = useSelector((state) => state.isEnglish);
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };
    
    return (
        <div className="backgroundImagefaith mt-4">
            <div className="contenedor flex justify-center items-center  py-8">
                <div className="flex flex-col md:flex-row max-w-6xl mx-auto items-start">

                    {/* Sección de Texto */}
                    <div className="md:w-1/2 text-center md:text-left px-4">
                        <h1 className="text-3xl font-bold text-grayTerciary mb-4">
                            {isEnglish ? "Sailors and crew members committed to the navigation route:" : "Marineros y tripulantes comprometidos con la ruta de navegación:" }
                        </h1>
                        <p className="text-[13px]">
                            {isEnglish ? ENGCampus.description11:ESPCampus.descripcion11}

                        </p>
                        <br/>
                        <p className="text-[13px]">
                            {isEnglish ? ENGCampus.description12:ESPCampus.descripcion12}

                        </p>
                    </div>

                    {/* Sección de Imagen */}
                    <div className="md:w-1/2 flex justify-center">
                        <img className="md:w-[520px] h-[300px] rounded-lg object-cover shadow-lg"
                            src={ImagesPath.photo13}
                            alt="Descripción de la imagen">
                        </img>
                    </div>

                </div>
            </div>
        </div>
    );
}
