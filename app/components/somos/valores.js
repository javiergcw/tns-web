import '/app/globals.css'
import Image from 'next/image'

export default function Valores() {
    return (
        <div className="pt-10 pb-10 bg-white sm:pt-5 sm:pb-5 md:pt-0 md:pb-0">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center">
                    <strong>
                        <h1 className="text-3xl text-[#444444;] sm:text-4xl sm:leading-10">Valores Institucionales</h1>
                    </strong>
                    <p className="mt-3 max-w-2xl mx-auto text-xl leading-7 text-gray-500 sm:mt-4">
                        En El Nuevo Colegio se trabaja una cultura basada en valores, cuya práctica habitual permite el alcance de nuestra razón de ser. Fundamentados en el AMOR, promovemos la vivencia de los valores relacionados a continuación:
                    </p>
                </div>
                <div className="mt-8 sm:mt-10 md:mt-12">
                    <div className="flex flex-wrap justify-center md:justify-between">
                        {/* Columna izquierda */}
                        <div className="flex flex-col items-center md:items-end md:w-1/2 space-y-10 mb-10 md:mb-0">
                            {/* Card de valor 'Respeto' */}
                            <div className="flex items-center p-4">
                                <Image src="/images/others/respeto.png" width={80} height={80} alt="Icono de Respeto" />
                                <div className='ml-4'>
                                    <strong>
                                        <h1 className="text-lg font-bold text-gray-900">Respeto</h1>
                                    </strong>
                                    <p>Es el ejercicio de la libertad permitiendo que los demás también puedan ejercer la suya. A él se asocian otros valores como la Tolerancia y la Confianza.</p>
                                </div>
                            </div>
                            {/* Card de valor 'Compromiso' */}
                            <div className="flex items-center p-4">
                                <Image src="/images/others/compromiso.png" width={80} height={80} alt="Icono de Compromiso" />
                                <div className='ml-4'>
                                    <strong>
                                        <h1 className="text-lg font-bold text-gray-900">Compromiso</h1>
                                    </strong>
                                    <p>Es la entrega sin condicionamientos. A él se asocia la Responsabilidad.</p>
                                </div>
                            </div>
                            {/* Card de valor 'Solidaridad' */}
                            <div className="flex items-center p-4">
                                <Image src="/images/others/solidaridad.png" width={80} height={80} alt="Icono de Solidaridad" />
                                <div className='ml-4'>
                                    <strong>
                                        <h1 className="text-lg font-bold text-gray-900">Solidaridad</h1>
                                    </strong>
                                    <p>Es la capacidad de ponerse en la situación del otro, ser amable, servicial, colaborador; es aprender a compartir lo que tengo y no lo que me sobra.</p>
                                </div>
                            </div>
                        </div>
                        {/* Columna derecha */}
                        <div className="flex flex-col items-center md:items-start md:w-1/2 space-y-10">
                            {/* Card de valor 'Autonomía' */}
                            <div className="flex items-center p-4">
                                <Image src="/images/others/autonomia.png" width={80} height={80} alt="Icono de Autonomía" />
                                <div className='ml-4'>
                                    <strong>
                                        <h1 className="text-lg font-bold text-gray-900">Autonomía</h1>
                                    </strong>
                                    <p>Es la capacidad de decidir por criterio propio. Lleva implícitas la Libertad, la Reflexión y la Criticidad.</p>
                                </div>
                            </div >
                            {/* Card de valor 'Equidad' */}
                            <div className="flex items-center p-4">
                                <Image src="/images/others/equidad.png" width={80} height={80} alt="Icono de Equidad" />
                                <div className='ml-4'>
                                    <strong>
                                        <h1 className="text-lg font-bold text-gray-900">Equidad</h1>
                                    </strong>
                                    <p>Es el tratamiento particular correspondiente a las condiciones de cada ser, la propensión a dejarse guiar por el sentimiento del deber ser o de la conciencia. A este valor se asocia la Justicia.</p>
                                </div>
                            </div>
                            {/* Card de valor 'Creatividad' */}
                            <div className="flex items-center p-4">
                                <Image src="/images/others/creatividad.png" width={80} height={80} alt="Icono de Creatividad" />
                                <div className='ml-4'>
                                    <strong>
                                        <h1 className="text-lg font-bold text-gray-900">Creatividad</h1>
                                    </strong>
                                    <p>Es ser recursivo, ingenioso, original e innovador; es poseer la capacidad para generar nuevas ideas.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
