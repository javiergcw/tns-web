import '/app/globals.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLanguage } from '@/app/store/actions';

export default function Formacion() {
    const isEnglish = useSelector((state) => state.isEnglish);
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };
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
                        <h1 className="text-3xl font-bold text-[#444444] mb-4">
                            {isEnglish ? "The propelling wave of multilingualism" : "El oleaje propulsor del multilingüismo"}
                        </h1>
                        <p className="text-[13px]">
                            {isEnglish ? "In the vast ocean of knowledge, English stands as the indispensable propeller to explore new horizons and foster the competitiveness of our crew members and sailors. In an era where borders are blurring and international connections are multiplying, mastering English has become more than an advantage, an imperative necessity in an increasingly interconnected world. From the bustling streets of foreign cities to the intricate networks of digital information, English is the key that unlocks the doors of understanding and opportunity.In the vast ocean of knowledge, English stands as the indispensable propeller to explore new horizons and foster the competitiveness of our crew members and sailors. In an era where borders are blurring and international connections are multiplying, mastering English has become more than an advantage, an imperative necessity in an increasingly interconnected world. From the bustling streets of foreign cities to the intricate networks of digital information, English is the key that unlocks the doors of understanding and opportunity." : "En el vasto océano del conocimiento, el inglés se erige como la hélice indispensable para explorar nuevos horizontes y propiciar la competitividad de nuestros tripulantes y marineros. En una era donde las fronteras se desdibujan y las conexiones internacionales se multiplican, dominar el inglés se ha vuelto más que una ventaja, una necesidad imperativa en un mundo cada vez más interconectado. Desde las calles bulliciosas de ciudades extranjeras hasta las intrincadas redes de la información digital, el inglés es la llave que abre las puertas del entendimiento y las oportunidades."}
                        </p>
                        <br />
                        <p className="text-[13px]">
                            {isEnglish ? "In our commitment to the comprehensive growth of our students, we not only offer them the opportunity to learn English, we also open the doors to two additional languages such as French and Italian, creating a multilingual alternative for high school students." : "En nuestro compromiso con el crecimiento integral de nuestros estudiantes, no solo les ofrecemos la oportunidad de aprender inglés, sino que también le abrimos las puertas a dos idiomas adicionales como el francés y el italiano, generando alternativa multilingüe para los estudiantes de secundaria."}
                        </p>
                        <br />
                        <p className="text-[13px]">
                            {isEnglish ? "We believe in the richness of linguistic diversity and in the transformative power of global communication, which is why we continually design pedagogical strategies such as the alliance with Richmond and Cambridge Assessment to offer excellent educational quality in the teaching of English and allow our graduates to be capable of skillfully navigating the universal currents of communication without limit." : "Creemos en la riqueza de la diversidad lingüística y en el poder transformador de la comunicación global, por lo cual diseñamos continuamente estrategias pedagógicas como la alianza con Richmond y Cambridge Assessment para ofrecer una excelente calidad educativa en la enseñanza del inglés y permitirles a nuestros egresados ser capaces de navegar con destreza por las corrientes universales propias de la comunicación sin límite alguno."}
                        </p>

                    </div>

                </div>
            </div>
        </div>

    );
}
