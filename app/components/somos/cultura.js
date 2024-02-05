import { useState } from 'react';
import '/app/globals.css';

export default function Cultura() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    return (
        <div className="backgroundImagefour">
            <div className="contenedor flex justify-center items-center min-h-screen md:mt-[-200px]">
                <div className="flex flex-col md:flex-row max-w-6xl mx-auto items-center">
                    <div className="md:w-1/2 text-center md:text-left px-4">
                        <h3 className="text-4xl text-[#444444] mb-4">Cultura New (Culture New)</h3>
                        <p className="text-gray-500 text-[13px]">
                            La Cultura New es la relación sistémica entre los integrantes del colegio The New School acorde con su modelo de Formación en Conciencia y la interiorización de comportamientos, lenguajes, actitudes y protocolos, fundamentados en los valores de respeto, solidaridad, compromiso, equidad, autonomía y creatividad y el desarrollo de competencias de liderazgo, trabajo en equipo, comunicación, emprendimiento, bilingüismo, sentido de pertenencia, arte, deporte y ecología, con el objetivo de formar ciudadanos integrales, competentes y emprendedores.
                        </p>
                        <div className="mt-4">
                            <button onClick={toggleOpen} className="text-gray-600 text-sm focus:outline-none">
                                Leer más
                            </button>
                            {isOpen && (
                                <div className="text-gray-500 text-[13px] mt-2">
                                    <p>Para lograr apropiación y aceptación de las normas de comportamiento de los estudiantes, padres y empleados, nació la Cultura New con la representación gráfica de una mascota llamada Motus como elemento de comunicación que simboliza y sensibiliza, permitiendo la interiorización de los preceptos de la Cultura New.</p>
                                    <p>Motus fue el nombre asignado al diseño caricaturesco del ave Momotus Momota, también conocido con Barranquero, y el cual habita las zonas boscosas que rodean nuestro colegio y cuyos colores verde y azul, coinciden con la imagen visual institucional.</p>
                                    <p>The Cultura New is the systemic relationship between the members of the Institution The New School according to its Awareness Training Model and the knowledge of behaviors, languages, attitudes and protocols based on values of respect, solidarity, commitment, equity, autonomy and creativity and the competences development of leadership, teamwork, communication, Business Entrepreneurship, bilingualism, sense of belonging, art, sport and ecology, with the aim of educating integral, competent and entrepreneur citizens.</p>
                                    <p>To achieve the appropriation and acceptance of behavior rules of students, parents and staff was born The Cultura New with a Pet graphic representation named MOTUS as a communication element that symbolizes and sensitizes, allowing the interiorization of The Cultura New precepts.</p>
                                    <p>MOTUS was the name given to the cartoonish design of the bird Momotus Momota, also known as Barranquero and which inhabits wooded areas that surround our school and whose colors green and blue match with our corporate visual image.</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                        <img className="md:w-[420px]"
                             src="/images/others/pajaro.png"
                             alt="Descripción de la imagen">
                        </img>
                    </div>
                </div>
            </div>
        </div>
    );
}
