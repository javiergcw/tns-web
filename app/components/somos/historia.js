import '/app/globals.css';

export default function Historia() {
    return (
        <div className="backgroundImagethree">
            <br/>
            <div className="contenedor flex justify-center items-center md:mt-[-100px] py-8">
                <div className="flex flex-col md:flex-row max-w-6xl mx-auto items-center gap-8">
                    <div className="md:w-1/2 text-center md:text-left px-4">
                        <h1 className="text-4xl text-[#444444] mb-4">Nuestra Historia</h1>
                        <p className="text-[14px]">
                            En la década de 1985 a 1995 un grupo de amigos soñaban la posibilidad de
                            crear un colegio que desarrollara en los jóvenes sentimientos de solidaridad con la ciudad,
                            capaces de aportar de sí mismos, a su región y al país. Era un sueño con fundamento humano,
                            que moldeaba una propuesta nueva de educación.
                            <br></br>
                            La idea se maduró durante muchos conversatorios con aportes que iban surgiendo del grupo y
                            los amigos del mismo.
                            <br></br>
                            La visión de formar personas comprometidas con la ciudad que continuaran participando y
                            compartiendo con el Colegio sus conocimientos dominó los espacios de maduración del
                            proyecto.
                            <br></br>
                            Se concibió el principio de ver la individualidad y la diferencia, dando prevalencia a las
                            equivocaciones antes que al error. La valoración por las cosas era importante, en
                            consecuencia enseñar a dar de lo que se tiene se convirtió en un reto para la formación de
                            los estudiantes.
                        </p>
                    </div>
                    <div className="md:w-1/2 flex justify-center px-4">
                        <img className="w-full h-auto max-w-md mx-auto"
                             src="/images/others/about4.jpg"
                             alt="Descripción de la imagen">
                        </img>
                    </div>
                </div>
            </div>
        </div>
    );
}
