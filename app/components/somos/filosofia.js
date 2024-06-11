import { useState } from 'react';
import Image from 'next/image';
import '/app/globals.css';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLanguage } from '@/app/store/actions';
import { ENGCulturaNew } from '@/app/data/language/english';
import { ESPCulturaNew } from '@/app/data/language/spanish';

const valuesEs = [
    {
        title: "Respeto",
        description: "Es el ejercicio de la libertad permitiendo que los demás también puedan ejercer la suya. A él se asocian otros valores como la tolerancia y la confianza."
    },
    {
        title: "Compromiso",
        description: "Es la entrega sin condicionamientos. A él se asocia la responsabilidad."
    },
    {
        title: "Solidaridad",
        description: "Es la capacidad de ponerse en la situación del otro, ser amable, servicial, colaborador; es aprender a compartir lo que tengo y no lo que me sobra."
    },
    {
        title: "Autonomía",
        description: "Es la capacidad de decidir por criterio propio. Lleva implícitas la libertad, la reflexión y la criticidad."
    },
    {
        title: "Equidad",
        description: "Es el tratamiento particular correspondiente a las condiciones de cada ser, la propensión a dejarse guiar por el sentimiento del deber ser o de la conciencia. A este valor se asocia la justicia."
    },
    {
        title: "Creatividad",
        description: "Es ser recursivo, ingenioso, original e innovador; es poseer la capacidad para generar nuevas ideas."
    }
];
const valuesEn = [
    {
        title: "Respect",
        description: "It is the exercise of freedom allowing others to also exercise theirs. Other values such as tolerance and trust are associated with it."
    },
    {
        title: "Commitment",
        description: "It is giving without conditions. Responsibility is associated with it."
    },
    {
        title: "Solidarity",
        description: "It is the ability to put yourself in the situation of another, to be kind, helpful, and collaborative; It is learning to share what I have and not what I have left."
    },
    {
        title: "Autonomy",
        description: "It is the ability to decide by one's criteria. It implies freedom, reflection, and criticality."
    },
    {
        title: "Equity",
        description: "It is the particular treatment corresponding to the conditions of each being, the propensity to be guided by the feeling of duty or conscience. Justice is associated with this value."
    },
    {
        title: "Creativity",
        description: "It is being recursive, ingenious, original, and innovative; It is having the ability to generate new ideas."
    }
];

export default function Filosofia() {

    const isEnglish = useSelector((state) => state.isEnglish);
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    const values = isEnglish ? valuesEn : valuesEs;

    return (
        <div className="backgroundImagethree">
            <div className="contenedor flex justify-center items-center pt-8 pb-8">
                <div className="flex flex-col max-w-6xl mx-auto items-center">
                    <div className="container mx-auto p-6 md:p-12 bg-white rounded-lg shadow-lg">
                        <h1 className="text-3xl font-bold text-title mb-4">
                            {isEnglish ? "The Rhythmic Wave of Cultura New" : "El oleaje rítmico de la Cultura New"}
                        </h1>
                        <div className="grid md:grid-cols-10 gap-4 mb-4">
                            <div className="md:col-span-7">
                                <p className="text-description mb-4">
                                    {isEnglish ? ENGCulturaNew.description1 : ESPCulturaNew.descripcion1}
                                </p>
                                <p className="text-description mb-4">
                                    {isEnglish ? ENGCulturaNew.description2: ESPCulturaNew.descripcion2}
                                </p>
                                <p className="text-description mb-4">
                                    {isEnglish ? ENGCulturaNew.description3 : ESPCulturaNew.descripcion3}
                                </p>
                                <p className="text-description mb-4">
                                    {isEnglish ? ENGCulturaNew.description4 : ESPCulturaNew.descripcion4}
                                </p>
                            </div>
                            <div className="md:col-span-3">
                                <Image
                                    src="/images/about_us/our_proposal/photo7.jpg"
                                    alt="Our Proposal"
                                    className="rounded-lg object-cover shadow-lg"
                                    width={800}
                                    height={600}
                                />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-title mb-2">
                            {isEnglish ? ENGCulturaNew.title2 : ESPCulturaNew.titulo2}
                        </h2>

                        <div className="flex flex-wrap -mx-2 mb-4">
                            {values.map((value, index) => (
                                <div key={index} className="w-full md:w-1/2 px-2 mb-4">
                                    <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                                        <h3 className="text-xl font-bold text-title mb-1">{value.title}</h3>
                                        <p className="text-description mb-2">{value.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
