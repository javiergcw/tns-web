import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { toggleLanguage } from '@/app/store/actions';

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
            <h2 className="text-3xl font-bold text-[#444444] mb-4">
                {isEnglish ? "The New Awareness: a program to explore New Horizons" : "The New Awareness: un programa para explorar Nuevos Horizontes" }
                </h2>
            <p className="mb-4">
                {isEnglish ? "The New Awareness is an educational adventure that complements the curriculum and awakens the curiosity and learning of each participant. From leveling, and extension courses in extracurricular time to pedagogical expeditions, they are designed to inspire and learn new learning experiences uniquely and practically." : "The New Awareness es una aventura educativa que complementa el currículo y despierta la curiosidad y el aprendizaje de cada participante. Desde nivelaciones, cursos de extensión en tiempo extraescolar hasta expediciones pedagógicas, son diseñados para inspirar y aprender de una manera única y práctica nuevas experiencias de aprendizaje." }
            </p>
            <p className="mb-4">
                {isEnglish ? "At The New School, we promote the activation of the self in free time as an opportunity to extend consciousness education to other disciplines and cultural, artistic, sports, technological, among others, disciplines and settings, thus allowing our participants to explore their abilities, talents, and interests, while strengthening their social and cognitive skills." : "En The New School, promovemos la activación del ser en el tiempo libre como una oportunidad para extender la formación en consciencia a otras disciplinas y escenarios culturales, artísticos, deportivos, tecnológicos, entre otros y así brindarle a nuestros participantes la oportunidad de explorar sus habilidades, talentos e intereses, mientras fortalecen sus competencias sociales y cognitivas." }
            </p>
            <p className="mb-4 font-semibold">
                {isEnglish ? "Our academic extension courses:" : "Nuestros cursos de extensión académica facilitan:"}
            </p>
            <ul className="list-disc list-inside mb-4">
                <li>{isEnglish ? "Offer spaces and alternatives that promote the integral personal growth of our participants." : "Ofrecer espacios y alternativas que impulsen el crecimiento personal integral de nuestros participantes."}</li>
                <li>{isEnglish ? "Promote a wide range of programs that reflect our educational philosophy and enrich the learning experience." : "Promover una amplia gama de programas que reflejen nuestra filosofía educativa y enriquezcan la experiencia de aprendizaje."}</li>
                <li>{isEnglish ? "Promote creative learning, cultural benefit, physical activity, and coexistence through innovative and stimulating activities." : "Fomentar el aprendizaje creativo, el beneficio cultural, la actividad física y la convivencia a través de actividades innovadoras y estimulantes."}</li>
            </ul>
            <p className="mb-4">
                {isEnglish ? "The New Awareness is a journey of discovery, growth, and connection, which transforms lives and leaves a mark on its participants. To request more information about the courses and register, contact" : "The New Awareness es un viaje de descubrimiento, crecimiento y conexión, que transforma vidas y deja una huella en sus participantes, para solicitar más información de los cursos y realizar la inscripción comunícate al" }
                 <a href="tel:+573001715245" className="text-blue-500">3001715245</a>.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <img
                    className="w-full h-[300px] rounded-lg object-cover shadow-lg"
                    src="/images/about_us/our_proposal/photo14.jpg"
                    alt="Imagen 1"
                />
                <img
                    className="w-full h-[300px] rounded-lg object-cover shadow-lg"
                    src="/images/about_us/our_proposal/photo15.jpg"
                    alt="Imagen 2"
                />
            </div>
        </div>
    );
};

export default TheNewAwareness;
