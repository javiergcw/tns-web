import { useState } from 'react';
import '/app/globals.css';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLanguage } from '@/app/store/actions';
import { ENGEducationModel } from '@/app/data/language/english';
import { ESPEducationModel } from '@/app/data/language/spanish';
import { ImagesPath } from '@/app/utils/imagesPath';

export default function Cultura() {
    const isEnglish = useSelector((state) => state.isEnglish);
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);
    const [isButtonMoved, setIsButtonMoved] = useState(false); // Estado para controlar el movimiento del botón

    const toggleOpen = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
        setIsButtonMoved(!isButtonMoved); // Cambiar el estado para mover el botón
    };

    return (
        <div className="backgroundImagefour py-14">
            <div className="contenedor flex justify-center items-center pt-4 pb-4 ">
                <div className="flex flex-col md:flex-row max-w-6xl mx-auto items-center">
                    <div className="md:w-1/2 text-center md:text-left px-4">
                        <h1 className="text-4xl font-bold text-grayTerciary mb-4">
                            {isEnglish ? ENGEducationModel.title : ESPEducationModel.titulo}
                        </h1>
                        <p className="text-gray-500 text-[13px]">
                            {isEnglish ? ENGEducationModel.descriptionLine1 : ESPEducationModel.descripcionLinea1}
                        </p>
                        <br />
                        <p className="text-gray-500 text-[13px]">
                            {!isEnglish ? ESPEducationModel.descripcionLinea2 : ENGEducationModel.descriptionLine2}
                        </p>

                        <div className={`mt-4 ${isButtonMoved ? 'mt-10' : ''}`}> {/* Clase condicional para mover el botón */}
                            <button onClick={toggleOpen} className="text-gray-600 text-sm focus:outline-none">
                                {isEnglish ? ENGEducationModel.readMore : ESPEducationModel.leerMas}
                            </button>
                            {isOpen && (
                                <div className="text-[13px] mt-2">
                                    <p>
                                        {!isEnglish ? ESPEducationModel.descripcionLinea3 : ENGEducationModel.descriptionLine3}.
                                    </p>
                                    <br />
                                    <p>
                                        {!isEnglish ? ESPEducationModel.descripcionLinea4 : ENGEducationModel.descriptionLine4}
                                    </p>
                                    <br />
                                    <p>
                                        {!isEnglish ? ESPEducationModel.descripcionLinea5 : ENGEducationModel.descriptionLine5}
                                    </p>
                                    <br />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="md:w-1/2 flex justify-center ">
                        <img className="md:w-[420px] rounded-lg object-cover shadow-lg"
                            src={ImagesPath.photo6}
                            alt="Descripción de la imagen">
                        </img>
                    </div>
                </div>
            </div>
            <br />
            <br />
        </div>
    );
}
