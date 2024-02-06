import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

export default function EducationalModel() {
    return (
        <div className="backgroundImagetwo">
            <div className="contenedor flex justify-center items-center min-h-screen z-10">
                <div className="flex flex-col lg:flex-row max-w-6xl mx-auto p-4 lg:mb-[290px]">

                    {/* Contenido de la derecha */}
                    <div className="lg:w-1/2 text-center lg:text-left space-y-4 mb-4 lg:mb-0">
                        <h1 className="text-2xl lg:text-4xl text-[#444444] mb-4">Conoce Nuestros Proyectos y Apoyo Estudiantil</h1>
                        <h2 className="text-xl lg:text-2xl text-[#444444]">Espacio ideal para el Aprendizaje</h2>
                        <p className="text-gray-500 text-sm lg:text-base text-justify">
                            En 1995 inició la construcción de la sede actual ubicada en el Km. 10 de la Vía Las Palmas
                            (Cra. 12 N°11 sur – 338 de El Poblado) en una zona campestre de 87.646 m2 de extensión, un
                            área construida de 7.205m2 y 80.490m2 de área libre. Se cuenta con una completa y
                            confortable infraestructura, diseñada para atender las necesidades educativas y de sano
                            esparcimiento de nuestros estudiantes.
                        </p>
                        <p className="text-gray-500 text-sm lg:text-base text-justify">
                            Las zonas de área libre están en su mayoría cubiertas por amplias zonas campestres con
                            bosques, riachuelos, senderos para observar nuestra diversidad natural y una granja con
                            animales.
                        </p>
                        <button
                            className="mt-4 px-6 py-2 bg-[#5472d2] text-white rounded hover:bg-blue-700 transition-colors">
                            <FontAwesomeIcon icon={faEye} className="mr-2" />
                            Ver vista Panorámica
                        </button>
                    </div>

                    {/* Contenido de la izquierda */}
                    <div className="lg:w-1/2 flex justify-center lg:justify-end">
                        <img
                            className="max-w-full h-auto mt-5"
                            src="http://www.thenewschool.edu.co/wp-content/uploads/2015/10/Group-1-3.png"
                            alt="Dos niños participando en una actividad educativa, representando los valores centrales de la institución educativa."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
