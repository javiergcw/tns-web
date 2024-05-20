import '/app/globals.css';
export default function Formacion() {
    return (
        <div className='backgroundImagethree'>
            <div className="contenedor flex justify-center items-center">
                <div className="flex flex-col md:flex-row max-w-6xl mx-auto items-center">

                    {/* Sección de Imagen */}
                    <div className="md:w-1/2 flex justify-center">
                        <img className="md:w-[520px] rounded-lg object-cover shadow-lg"
                            src="/images/about_us/our_proposal/photo8.jpg"
                            alt="Descripción de la imagen">
                        </img>
                    </div>

                    {/* Sección de Texto */}
                    <div className="md:w-1/2 text-center md:text-left px-4">
                        <h1 className="text-3xl font-bold text-[#444444] mb-4">The propelling wave of multilingualism</h1>
                        {/*                         <h1 className="text-2xl font-bold text-[#444444] mb-4">Nuestra Propuesta</h1>
 */}                        <p className="text-[13px]">
                            In the vast ocean of knowledge, English stands as the indispensable propeller to explore new horizons and foster the competitiveness of our crew members and sailors. In an era where borders are blurring and international connections are multiplying, mastering English has become more than an advantage, an imperative necessity in an increasingly interconnected world. From the bustling streets of foreign cities to the intricate networks of digital information, English is the key that unlocks the doors of understanding and opportunity.In the vast ocean of knowledge, English stands as the indispensable propeller to explore new horizons and foster the competitiveness of our crew members and sailors. In an era where borders are blurring and international connections are multiplying, mastering English has become more than an advantage, an imperative necessity in an increasingly interconnected world. From the bustling streets of foreign cities to the intricate networks of digital information, English is the key that unlocks the doors of understanding and opportunity.
                        </p>
                        <br />
                        <p className="text-[13px]">
                            In our commitment to the comprehensive growth of our students, we not only offer them the opportunity to learn English, we also open the doors to two additional languages such as French and Italian, creating a multilingual alternative for high school students.
                        </p>
                        <br />
                        <p className="text-[13px]">
                            We believe in the richness of linguistic diversity and in the transformative power of global communication, which is why we continually design pedagogical strategies such as the alliance with Richmond and Cambridge Assessment to offer excellent educational quality in the teaching of English and allow our graduates to be capable of skillfully navigating the universal currents of communication without limit.
                        </p>

                    </div>

                </div>
            </div>
        </div>

    );
}
