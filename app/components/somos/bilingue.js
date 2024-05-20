import '/app/globals.css';

export default function Bilingue() {
    return (
        <div className="backgroundImagefaith mt-4">
            <div className="contenedor flex justify-center items-center  py-8">
                <div className="flex flex-col md:flex-row max-w-6xl mx-auto items-start">
˝
                    {/* Sección de Texto */}
                    <div className="md:w-1/2 text-center md:text-left px-4">
                        <h1 className="text-3xl font-bold text-[#444444] mb-4">Methodology and didactics for sailors</h1>
                        <p className="text-[13px]">
                            Our curricular approach focused on BEING, DOING, and KNOWING, facilitates the development of generic, specific intercultural and bilingual competencies, which surely enrich holistic education, where subjects are intertwined with thematic lines of different visions, facilitating transversality and enriching the students' training process based on practice.
                        </p>
                    </div>

                    {/* Sección de Imagen */}
                    <div className="md:w-1/2 flex justify-center">
                        <img className="md:w-[520px] h-[300px] rounded-lg object-cover shadow-lg"
                            src="/images/about_us/our_proposal/photo9.jpg"
                            alt="Descripción de la imagen">
                        </img>
                    </div>˝
                </div>
            </div>
            <br />
            <br />
        </div>
    );
}
