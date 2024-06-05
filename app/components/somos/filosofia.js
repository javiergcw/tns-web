import { useState } from 'react';
import Image from 'next/image';
import '/app/globals.css';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLanguage } from '@/app/store/actions';

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
                                    {isEnglish ? "At The New School, we immerse ourselves in the vibrant universe of the Cultura New. Every interaction, every word, every gesture, every look, every habit, is impregnated with a harmonious, meaningful environment, typical of the UBUNTU philosophy, which invites us to relate to each other and our environment under the slogan: “Look, evaluate and reflect, principles to act”, which is also a vital fragment of our institutional anthem." : "En The New School nos sumergimos en el vibrante universo de la Cultura New. Cada interacción, cada palabra, cada gesto, cada mirada, cada hábito, está impregnado de un ambiente en armonía, significativo, propio de la filosofía UBUNTU, la cual nos invita a relacionarnos con el otro y nuestro entorno bajo el slogan: “mirar, evaluar y reflexionar, principios para actuar¨, el cual además es fragmento vital de nuestro himno institucional."}
                                </p>
                                <p className="text-description mb-4">
                                    {isEnglish ? "At the heart of our culture lies the harmonious synthesis between deep-rooted values, dynamic competencies, habits that promote consciousness, and assertive language, among others, all of them woven into a network of relationships and transformative experiences of BEING." : "En el corazón de nuestra cultura, yace la síntesis armoniosa entre valores arraigados, competencias dinámicas, hábitos que promueven la consciencia, lenguaje asertivo, entre otros, todos ellos tejidos en una red de relaciones y experiencias transformadoras del SER."}
                                </p>
                                <p className="text-description mb-4">
                                    {isEnglish ? "Our Cultura New, in addition to a way of life, is a living expression of our collective identity, it is a journey of discovery and self-growth, which propels us towards a future full of infinite possibilities." : "En el corazón de nuestra cultura, yace la síntesis armoniosa entre valores arraigados, competencias dinámicas, hábitos que promueven la consciencia, lenguaje asertivo, entre otros, todos ellos tejidos en una red de relaciones y experiencias transformadoras del SER."}
                                </p>
                                <p className="text-description mb-4">
                                    {isEnglish ? "We have enriched the compass of our boat with the image of an institutional mascot: a bird that evokes freedom, and color, inspires, evaluates, and reflects. Motus is the name with which we identify it, it is the representation of a Barranquero which is that beautiful bird that inhabits our forests. We adopt its presence and company as a symbol of the philosophical essence of the Cultura New program." : "La brújula de nuestra embarcación la hemos enriquecido con la imagen de una mascota institucional: un ave que evoca libertad, colorido, inspira, evalúa y reflexiona. Motus es el nombre con el que la identificamos, es la representación de un Barranquero que es ese hermoso pájaro que habita nuestros bosques. Su presencia y compañía la adoptamos como símbolo de la esencia filosófica del programa Cultura New."}
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
                            {isEnglish ? "Institutional values touch every detail of our educational proposal. They all converge in LOVE. We give special attention to six of them:" : "Los valores institucionales tocan cada detalle de nuestra propuesta educativa. Todos convergen en el AMOR. Damos atención especial a seis de ellos:"}
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
