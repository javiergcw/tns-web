import '/app/globals.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLanguage } from '@/app/store/actions';
import { ENGOurProposal } from '@/app/data/language/english';
import { ESPOurProposal } from '@/app/data/language/spanish';
import { ImagesPath } from '@/app/utils/assetsPath';


export default function RazonDeSeR() {
    const isEnglish = useSelector((state) => state.isEnglish);
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };
    return (
        <div className="backgroundImage flex justify-center items-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl w-full space-y-8  p-8 rounded-lg">
                <div className="flex flex-col lg:flex-row items-center">
                    {/* Ajustes para la imagen y contenedor */}
                    <div className="lg:w-1/2 flex justify-center lg:justify-start items-center py-4">
                        <div className="w-full max-w-xs lg:max-w-md xl:max-w-lg mx-auto">
                            <img
                                className="rounded-full border-4 border-[#1e73be]"
                                src={ImagesPath.photo1}
                                alt="Dos niños participando en una actividad educativa, representando los valores centrales de la institución educativa."
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </div>
                    </div>

                    {/* Ajustes para el texto */}
                    <div className="lg:w-1/2 mt-8 lg:mt-0 lg:pl-8">
                        <h1 className="text-center text-[#1e73be] text-2xl lg:text-3xl font-bold mb-4 mt-4">THE NEW SCHOOL</h1>
                        <p className="text-gray-700 md:text-[16px] lg:text-lg text-justify leading-relaxed">
                            {isEnglish
                                ? ENGOurProposal.razonSerDescription
                                : ESPOurProposal.razonSerDescription}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
