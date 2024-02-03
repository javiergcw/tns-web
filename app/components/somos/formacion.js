export default function Formacion() {
    return (
            <div className="contenedor flex justify-center items-center min-h-screen mt-[-400px]">
                <div className="flex flex-col md:flex-row max-w-6xl mx-auto items-center">

                    {/* Sección de Imagen */}
                    <div className="md:w-1/2 flex justify-center">
                        <img className="md:w-[520px]"
                             src="/images/others/about6.jpg"
                             alt="Descripción de la imagen">
                        </img>
                    </div>

                    {/* Sección de Texto */}
                    <div className="md:w-1/2 text-center md:text-left px-4">
                        <h3 className="text-4xl text-[#444444] mb-4">Formación en Conciencia</h3>
                        <h4 className="text-3xl text-[#444444] mb-4">Nuestra Propuesta</h4>
                        <p className="text-gray-500 text-[13px]">
                            El Nuevo Colegio fue fundado en 1995 por un grupo de padres de familia de un preescolar llamado Mi Primera Estación. Con la propuesta educativa nació el principio de ver a cada ser en su individualidad y diferencia, razón por la cual estructura un modelo pedagógico que acoge tres pilares filosóficos: Escuela Nueva, Pensamiento Sistémico y Aprendizaje Significativo.
                        </p>
                    </div>

                </div>
            </div>
    );
}
