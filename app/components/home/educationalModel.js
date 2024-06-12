import { ImagesPath } from '@/app/utils/imagesPath';
import '/app/globals.css'

import React from 'react';

export default function EducationalModel () {
    return (
        <div className="backgroundImagetwo">
            {/* Contenido */}
            <div className="contenedor flex justify-center items-center min-h-screen z-10">
                <div className="flex flex-col md:flex-row max-w-6xl mx-auto mb-[290px]">

                    {/* Contenido de la derecha */}
                    <div className="md:w-1/2 mt-[auto]">
                        <h1 className="text-4xl text-grayTerciary mb-4">Conoce Nuestros Proyectos y Apoyo Estudiantil</h1>
                        <h2 className="text-grayTerciary mb-4">Espacio ideal para el Aprendizaje</h2>
                        <p className="text-gray-500 text-[13px] text-justify">
                            En 1995 inició la construcción de la sede actual ubicada en el Km. 10 de la Vía Las Palmas
                            (Cra. 12 N°11 sur – 338 de El Poblado) en una zona campestre de 87.646 m2 de extensión, un
                            área construida de 7.205m2 y 80.490m2 de área libre. Se cuenta con una completa y
                            confortable infraestructura, diseñada para atender las necesidades educativas y de sano
                            esparcimiento de nuestros estudiantes, entre estos espacios encontramos: amplias e
                            iluminadas aulas de clase, laboratorio de química, biblioteca, sala de computo, dos salones
                            de video, gimnasio de preescolar, cancha de fútbol en césped, cancha de fútbol en grama
                            sintética, coliseo cubierto con escenario y camerinos, cinco aulas de artística: salón de
                            música, salón de ensayo de la banda con instrumentos musicales, salón de artes plásticas,
                            talla en madera y expresión corporal; enfermería, cafetería, auditorio, parqueadero, zona de
                            bachillerato, primaria y preescolar, esta última dotada de amplias zonas con juegos
                            multifuncionales, areneros, huerta y deck para la hora de lectura.
                        </p>
                        <br/>
                        <p className="text-gray-500 text-[13px] text-justify">
                            Las zonas de área libre están en su mayoría cubiertas por amplias zonas campestres con
                            bosques, riachuelos, senderos para observar nuestra diversidad natural y una granja con
                            animales.
                        </p>
                        <button
                            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center justify-center">
                            <i className="fas fa-eye mr-2"></i>
                            ver vista Panorámica
                        </button>

                    </div>

                    {/* Contenido de la izquierda */}
                    <div className="md:w-1/2 flex justify-center md:justify-start">
                        <img
                            className=" w-64 h-64 mt-5 ml-2 w-[600px] h-[572px]"
                            src={ImagesPath.group1}
                            alt="Dos niños participando en una actividad educativa, representando los valores centrales de la institución educativa."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

