import '/app/globals.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLanguage } from '@/app/store/actions';

export default function Bilingue() {
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
                    ˝
                    {/* Sección de Texto */}
                    <div className="md:w-1/2 text-center md:text-left px-4">
                        <h1 className="text-3xl font-bold text-[#444444] mb-4">
                            {isEnglish ? "Methodology and didactics for sailors" : "Metodología y didáctica para navegantes"}

                        </h1>
                        <p className="text-[13px]">
                            {isEnglish ? "Our curricular approach focused on BEING, DOING, and KNOWING, facilitates the development of generic, specific intercultural and bilingual competencies, which surely enrich holistic education, where subjects are intertwined with thematic lines of different visions, facilitating transversality and enriching the students' training process based on practice." : "Nuestro enfoque curricular centrado en el SER, el HACER y el CONOCER, facilita el desarrollo de las competencias genéricas, las específicas y las interculturales y bilingües, las cuales con seguridad, enriquecen la formación holística, donde las asignaturas se entrelazan con líneas temáticas de diferentes visiones, facilitando la transversalidad y el enriquecimiento del proceso formativo de los estudiantes a partir de la práctica."}
                        </p>
                    </div>

                    {/* Sección de Imagen */}
                    <div className="md:w-1/2 flex justify-center">
                        <img className="md:w-[520px] h-[300px] rounded-lg object-cover shadow-lg"
                            src="/images/about_us/our_proposal/photo9.jpg"
                            alt="Descripción de la imagen">
                        </img>
                    </div>˝
                </div>
            </div>
            <br />
            <br />
        </div>
    );
}
