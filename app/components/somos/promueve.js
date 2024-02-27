export default function Promueve() {
    return (
        <>
            {/* Contenedor principal ajustado para responsividad */}
            <div className="flex flex-col md:flex-row justify-center items-center py-8 lg:px-8 xl:px-32">
                {/* Sección Izquierda: ajustes para el padding y margin responsive */}
                <div className="w-full md:w-1/2 text-center md:text-left px-4 py-4 mb-4 md:mb-0">
                    <h1 className="text-3xl font-bold text-[#444444] mb-4">La Escuela Nueva promueve</h1>
                    <ul className="text-gray-500 text-[15px] list-disc list-inside">
                        <li className="mb-2">El respeto por el ritmo de aprendizaje.</li>
                        <li className="mb-2">Procesos dinámicos, democráticos, participativos, activos y creativos.</li>
                        <li className="mb-2">La aplicación de guías de aprendizaje por áreas, rincones de trabajo, bibliobancos, buzón de amigos y uso de materiales didácticos.</li>
                        <li className="mb-2">Docentes facilitadores del proceso enseñanza-aprendizaje, en el marco de una relación horizontal en la cual ambos se complementan, comparten experiencias y desarrollan una clase lúdica, creativa y dinámica.</li>
                        <li className="mb-2">La retroalimentación permanente del estudiante para aclarar dudas e identificar falencias que le permitan al docente diseñar estrategias pedagógicas orientadas a mejorar y a valorar sus logros.</li>
                        <li className="mb-2">La participación democrática de los estudiantes a través del gobierno escolar y de los líderes estudiantiles, permitiéndoles expresar sus necesidades e intereses.</li>
                        <li className="mb-2">El trabajo cooperativo o en equipo, con el fin de favorecer la autorregulación del aprendizaje, la asunción de responsabilidades, la participación de todos, las habilidades comunicativas, la ayuda mutua, el respeto, la empatía. El trabajo en equipo es, además, una de las mejores estrategias para abordar la diversidad del aula y caminar hacia una escuela verdaderamente inclusiva.</li>
                        <li className="mb-2">Una educación fundamentada en los intereses, potencialidades y necesidades de los alumnos.</li>
                    </ul>
                </div>

                {/* Sección Derecha: ajustes similares a la sección izquierda */}
                <div className="w-full md:w-1/2 text-center md:text-left px-4 py-4 mb-4 md:mb-0">
                    <h1 className="text-3xl font-bold text-[#444444] mb-4">El Pensamiento Sistémico promueve</h1>
                    <ul className="text-gray-500 text-[15px] list-disc list-inside">
                        <li className="mb-2">La observación deliberada y amplia de los acontecimientos, con el fin de propiciar una visión integral de las situaciones y facilitar la toma de decisiones de acuerdo a la capacidad crítica y equitativa.</li>
                        <li className="mb-2">Pautas de conducta que permitan el desarrollo de modelos mentales de una sana convivencia.</li>
                        <li className="mb-2">La oportunidad de mejorar sus dificultades y errores, fundamentados en que son una valiosa oportunidad de aprendizaje.</li>
                        <li className="mb-2">La integralidad del ser humano en el desarrollo del proceso formativo.</li>
                        <li className="mb-2">Un modelo cientificista que trabaja la estructura curricular sobre líneas de investigación.</li>
                    </ul>
                </div>
            </div>

            {/* Sección Adicional: ajustes para el padding y margin responsive */}
            <div className="text-center md:text-left px-4 py-4 lg:px-8 xl:px-32">
                <h1 className="text-3xl font-bold text-[#444444] mb-4">El Aprendizaje Significativo promueve:</h1>
                <ul className="text-gray-500 text-[15px] list-disc list-inside">
                    <li className="mb-2">El desarrollo de actividades que generen un cambio mediante la interacción entre la experiencia previa y el nuevo conocimiento.</li>
                    <li className="mb-2">Un aprendizaje que sirve para transversalizar lo aprendido en nuevas situaciones, por lo que más que memorizar hay que comprender.</li>
                    <li className="mb-2">La vinculación de la teoría a la práctica mediante la experimentación.</li>
                    <li className="mb-2">El desarrollo de la autonomía para que pueda surgir la creatividad, la espontaneidad, el liderazgo, la investigación y la observación.</li>
                    <li className="mb-2">Contenidos temáticos que permiten el desarrollo de competencias vinculadas al entorno y a los intereses y necesidades de los estudiantes.</li>
                    <li className="mb-2">La competencia de aprender a aprender.</li>
                </ul>
                <p className='text-gray-500 text-[15px]'>
                    El Nuevo Colegio promueve una educación inclusiva, fundamentada en sus pilares filosóficos con el objetivo de formar ciudadanos integrales, competentes y emprendedores, en un ambiente de sana convivencia y de armonía con la naturaleza para la formación de niños y jóvenes felices, responsables, íntegros y autónomos.
                </p>
            </div>
        </>
    );
}
