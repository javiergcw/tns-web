import '/app/globals.css';
export default function Filosofia() {
    return (
        <div className="backgroundImagethree">
            <div className="contenedor flex justify-center items-center  pt-4 pb-4">
                <div className="flex flex-col md:flex-row-reverse max-w-6xl mx-auto items-center">

                    {/* Sección de Texto */}
                    <div className="md:w-1/2 text-center md:text-left px-4">
                        <h1 className="text-3xl font-bold text-[#444444] mb-4">Filosofía</h1>
                        <h1 className="text-2xl font-bold text-[#444444] mb-4">Ambiente Escolar</h1>
                        <p className="text-[13px]">
                            El Nuevo Colegio nos invita a construir un ambiente escolar amable, lleno de valores,
                            participativo, rico en academia y con alto sentido de conciliación entre sus miembros.
                            <br></br>
                            Acogemos a toda la Comunidad Educativa como agente y sujeto de derechos y deberes. Esta
                            mirada nos invita a observar con atención el entorno donde crece cada estudiante en miras a
                            comprender sus diferentes ritmos y sus diferencias socio-culturales.
                            <br></br>
                            Nuestra construcción es permanente, abierta y negociable, donde la razón nos permite
                            conciliar y llegar a acuerdos que siempre favorecen y garantizan la justicia, la equidad y
                            el aprendizaje.
                            <br></br>
                            La norma nos permite un orden, más no es el fin de nuestra intervención para alcanzar
                            comportamientos deseables en los estudiantes. Centramos nuestra fuerza en la valoración de
                            la misma como medio para fortalecer la autonomía y la responsabilidad.
                        </p>
                    </div>

                    {/* Sección de Imagen */}
                    <div className="md:w-1/2 flex justify-center">
                        <img className="md:w-[520px]"
                             src="/images/others/about5.jpg"
                             alt="Descripción de la imagen">
                        </img>
                    </div>
                </div>
            </div>
        </div>
    );
}
