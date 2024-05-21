import { useState } from 'react';
import '/app/globals.css';
import { useLanguage } from '@/app/context/language_context';


export default function Cultura() {
    const { isEnglish, toggleLanguage } = useLanguage();

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    return (
        <div className="backgroundImagefour py-14">
            <div className="contenedor flex justify-center items-center pt-4 pb-4 ">
                <div className="flex flex-col md:flex-row max-w-6xl mx-auto items-center">
                    <div className="md:w-1/2 text-center md:text-left px-4">
                        <h1 className="text-4xl font-bold text-[#444444] mb-4">
                            {isEnglish ? "Pedagogical model: the essence of our navigation" : "Modelo pedagógico: la esencia de nuestra navegación"}
                        </h1>
                        <p className="text-gray-500 text-[13px]">
                            {isEnglish ? "Our “Consciousness-based education” model, inspired by active learning pedagogies, offers a journey of discovery of BEING intertwined with DOING; paring on which we anchor knowledge and the countless significant experiences that touch the fields of learning." : "Nuestro modelo “Formación en Consciencia”, está inspirado en las pedagogías activas del aprendizaje, ofrece un viaje de descubrimiento del SER entrelazado con el HACER; binomio sobre el que anclamos el conocimiento y las innumerables experiencias significativas que tocan los campos del aprendizaje."}
                        </p>
                        <br />
                        <p className="text-gray-500 text-[13px]">
                            {!isEnglish ? "En una aventura continua y emocionante, los estudiantes en The New School conjugan el conocimiento de manera transversal, siguiendo diferentes estrategias de investigación, métodos de trabajo, aprendizajes basados en proyectos, el método del pensamiento científico y todos aquellos recursos que facilitan la adquisición del conocimiento, mientras moldean su formación buscando convertirse en los arquitectos del mañana." : "In a continuous and exciting adventure, students at The New School acquire knowledge in a transversal way, following different research strategies, work methods, project-based learning, the method of scientific thinking, and all those resources that facilitate learning and discovery, while they shape their training seeking to become the architects of tomorrow."}
                        </p>

                        <div className="mt-4">
                            <button onClick={toggleOpen} className="text-gray-600 text-sm focus:outline-none">
                                Leer más
                            </button>
                            {isOpen && (
                                <div className="text-[13px] mt-2">
                                    <p>
                                        {!isEnglish ? "Formar en Conciencia significa que nuestros estudiantes son capaces de reflexionar sobre sí mismos, sobre el mundo que los rodea y sobre el sentido de su existencia y del por qué y para qué en la vida misma de cada conocimiento adquirido. Ellos pueden reconocer sus fortalezas, sus debilidades, sus sueños y aspiraciones, sus valores y principios. En ese reconocimiento se forja su desarrollo personal y sus interrelaciones humanas; con seguridad se constituyen en seres que pueden tomar decisiones responsables y éticas, basadas en el respeto, la equidad y la solidaridad, dado que nuestra propuesta educativa no se limita a transmitir conocimientos, sino que busca formar en conciencia por la vida y para la vida." : "Education in Consciousness means that our students are capable of reflecting on themselves, on the world around them, the meaning of their existence, and the why and what for in life itself of each theory acquired. They can recognize their strengths, their weaknesses, their dreams and aspirations, their values and principles. In this recognition, their personal development and human interrelationships are forged; They surely become beings who can make responsible and ethical decisions, based on respect, equity, and solidarity, given that our educational proposal is not limited to transmitting knowledge, but seeks to educate people in awareness for life and to life"}.</p>
                                    <br />
                                    <p>
                                        {!isEnglish ? "Formar en la autonomía y en el amor significa que queremos que ellos sean capaces de sentir y expresar sus emociones, de establecer vínculos afectivos sanos y duraderos, de cuidar de sí mismos y de los demás. Que pueden apreciar la belleza y la diversidad de la vida, de la naturaleza y de la cultura. Que pueden vivir con alegría, gratitud y generosidad." : "Training in autonomy and love means that we want them to be able to feel and express their emotions, to establish healthy and lasting emotional bonds, to take care of themselves and others. People who can appreciate the beauty and diversity of life, nature, and culture. People who get to live with joy, gratitude, and generosity."}
                                    </p>
                                    <br />
                                    <p>
                                        {!isEnglish ? "Formar para la vida significa que queremos que nuestros niños y jóvenes sean capaces de actuar con creatividad, autonomía y compromiso, con capacidad para enfrentar los desafíos con optimismo y resiliencia, aprovechando las oportunidades con entusiasmo y pasión; que pueden realizar sus proyectos personales y profesionales, de acuerdo con sus talentos e intereses. Que pueden aportar con una visión crítica y transformadora." : "Training for life means that we want our children and teenagers to be able to act with creativity, autonomy, and commitment, with the ability to face challenges with optimism and resilience, to take advantage of opportunities with enthusiasm and passion; adults able to carry out their personal and professional projects, according to their talents and interests. People who can contribute with a critical and transformative vision."}
                                    </p>
                                    <br />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="md:w-1/2 flex justify-center ">
                        <img className="md:w-[420px] rounded-lg object-cover shadow-lg"
                            src="/images/about_us/our_proposal/photo6.jpg"
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
