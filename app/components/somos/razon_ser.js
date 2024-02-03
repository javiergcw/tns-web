import '/app/globals.css'
import Image from 'next/image'
export default function RazonDeSeR() {

    return (
        <div className="backgroundImage">
            {/* Contenido */}
            <div className="contenedor flex justify-center items-center min-h-screen z-10">
                <div className="flex flex-col md:flex-row max-w-6xl mx-auto mt-[-300px]">
                    {/* Contenido de la izquierda */}
                    <div className="md:w-1/2 flex justify-center md:justify-start">
                        <img
                            className="rounded-full w-64 h-64 mt-5 ml-2 w-[600px] h-[572px] border-4 border-gray-200"
                            src="/images/others/about1.jpg"
                            alt="Dos niños participando en una actividad educativa, representando los valores centrales de la institución educativa."
                        />
                    </div>

                    {/* Contenido de la derecha */}
                    <div className="md:w-1/2 mt-4 md:mt-0 md:pl-8 mb-[128px]">
                        <h1 className="text-4xl text-center text-[#1e73be] md:text-center mb-20">Nuestra Razón de Ser</h1>
                        <p className="text-gray-500 text-[13px]">
                            El Nuevo Colegio – The New School es desde su fundación una institución educativa inclusiva que reconoce la diferencia, promueve nuevas formas de aprender y enseñar desde la valoración del otro con sus limitaciones y potencialidades. La Institución asume la atención a la diversidad como una oportunidad, valora los diferentes ritmos de aprendizaje y promueve un clima afectivo y emocional como condición fundamental para que los estudiantes construyan su aprendizaje, disfruten y participen plenamente de la vida escolar.
                            <br /><br />
                            La propuesta educativa de este joven colegio, nació en 1995 como una respuesta a la necesidad de formar nuevos líderes comprometidos con su país y el mundo entero, bajo el principio de ver al otro en su individualidad, para que a partir del respeto, la solidaridad, la valoración por la vida, la naturaleza y las cosas que los rodean, generen las condiciones para la consolidación de una sociedad más pacífica y solidaria.
                            <br /><br />
                            Nuestra institución educativa consolida su programa bilingüe con base en losestándares del Marco Común Europeo, su metodología se basa en la enseñanza en áreas de contenido, el establecimiento de niveles en todos los grados y el desarrollo de estrategias metodológicas, relacionadas con los pilares filosóficos institucionales (Escuela Nueva, Aprendizaje Significativo y Pensamiento Sistémico).
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}