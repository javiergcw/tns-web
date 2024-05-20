import '/app/globals.css';

export default function Members() {
    return (
        <div className="backgroundImagefaith mt-4">
            <div className="contenedor flex justify-center items-center  py-8">
                <div className="flex flex-col md:flex-row max-w-6xl mx-auto items-start">

                    {/* Sección de Texto */}
                    <div className="md:w-1/2 text-center md:text-left px-4">
                        <h1 className="text-3xl font-bold text-[#444444] mb-4">Sailors and crew members committed to the navigation route:</h1>
                        <p className="text-[13px]">
                            The New School has structured an exceptional work team, we are happy, helpful, committed, and professional people, all of us here are called “coeducators”, regardless of our professional profile. The shine in the eyes, the loving smile, the understanding mind, the prudent silence, and the enriching diligence, are a sign of our Ubuntu purpose that transmits security, confidence, and example.
                        </p>
                        <br/>
                        <p className="text-[13px]">
                            We are a team committed to living our philosophical essence and we constantly strengthen our skills to be more aware of our actions every day and a motivating example for our children and young people. With the support of the Human Resources team, we implement workplace well-being strategies that go beyond monetary remuneration, to touch the essence of that BEING that allows us to successfully carry out our institutional purpose. At TNS, learning transcends the classroom and becomes a transformative experience that lasts the entire life of students, parents, teachers, administrators, graduates, allies, and many more.
                        </p>
                    </div>

                    {/* Sección de Imagen */}
                    <div className="md:w-1/2 flex justify-center">
                        <img className="md:w-[520px] h-[300px] rounded-lg object-cover shadow-lg"
                            src="/images/about_us/our_proposal/photo13.jpg"
                            alt="Descripción de la imagen">
                        </img>
                    </div>

                </div>
            </div>
        </div>
    );
}
