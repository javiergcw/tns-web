import '/app/globals.css';
import Image from 'next/image';

export default function RazonDeSeR() {
    return (
        <div className="backgroundImage">
            <div className="flex justify-center items-center z-10">
                <div className="flex flex-col lg:flex-row max-w-6xl mx-auto px-4 lg:px-0">
                    {/* Ajustes para la imagen y contenedor */}
                    <div className="lg:w-1/2 flex justify-center lg:justify-start items-center py-4">
                        <div className="max-w-xs lg:max-w-md xl:max-w-lg 2xl:max-w-xl mx-auto">
                            <img
                                className="rounded-full"
                                src="/images/others/about1.jpg"
                                alt="Dos niños participando en una actividad educativa, representando los valores centrales de la institución educativa."
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </div>
                    </div>

                    {/* Ajustes para el texto */}
                    <div className="lg:w-1/2 mt-8 lg:mt-0 lg:pl-8">
                        <h1 className="text-center lg:text-left text-[#1e73be] mb-4 lg:mb-8 font-bold">Nuestra Razón de Ser</h1>
                        <p className="text-justify">
                            El Nuevo Colegio – The New School es desde su fundación una institución educativa inclusiva que reconoce la diferencia, promueve nuevas formas de aprender y enseñar desde la valoración del otro con sus limitaciones y potencialidades. La Institución asume la atención a la diversidad como una oportunidad, valora los diferentes ritmos de aprendizaje y promueve un clima afectivo y emocional como condición fundamental para que los estudiantes construyan su aprendizaje, disfruten y participen plenamente de la vida escolar.
                            <br /><br />
                            La propuesta educativa de este joven colegio, nació en 1995 como una respuesta a la necesidad de formar nuevos líderes comprometidos con su país y el mundo entero, bajo el principio de ver al otro en su individualidad, para que a partir del respeto, la solidaridad, la valoración por la vida, la naturaleza y las cosas que los rodean, generen las condiciones para la consolidación de una sociedad más pacífica y solidaria.
                            <br /><br />
                            Nuestra institución educativa consolida su programa bilingüe con base en los estándares del Marco Común Europeo, su metodología se basa en la enseñanza en áreas de contenido, el establecimiento de niveles en todos los grados y el desarrollo de estrategias metodológicas, relacionadas con los pilares filosóficos institucionales (Escuela Nueva, Aprendizaje Significativo y Pensamiento Sistémico).
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
