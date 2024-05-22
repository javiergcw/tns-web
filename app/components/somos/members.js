
import '/app/globals.css';
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import { toggleLanguage } from '@/app/store/actions';

export default function Members() {
    const isEnglish = useSelector((state) => state.isEnglish);
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };
    
    return (
        <div className="backgroundImagefaith mt-4">
            <div className="contenedor flex justify-center items-center  py-8">
                <div className="flex flex-col md:flex-row max-w-6xl mx-auto items-start">

                    {/* Sección de Texto */}
                    <div className="md:w-1/2 text-center md:text-left px-4">
                        <h1 className="text-3xl font-bold text-[#444444] mb-4">
                            {isEnglish ? "Sailors and crew members committed to the navigation route:" : "Marineros y tripulantes comprometidos con la ruta de navegación:" }
                        </h1>
                        <p className="text-[13px]">
                            {isEnglish ? "The New School has structured an exceptional work team, we are happy, helpful, committed, and professional people, all of us here are called “coeducators”, regardless of our professional profile. The shine in the eyes, the loving smile, the understanding mind, the prudent silence, and the enriching diligence, are a sign of our Ubuntu purpose that transmits security, confidence, and example." : "El Nuevo Colegio ha estructurado un equipo de trabajo excepcional,  somos personas alegres, serviciales, comprometidas y profesionales, todos aquí somos llamados “coeducadores¨ independientemente de nuestro perfil profesional. El brillo en los ojos, la sonrisa amorosa, la mente comprensiva, el silencio prudente, la diligencia enriquecedora, son muestra de nuestro propósito Ubuntu y que transmite seguridad, confianza y ejemplo."}

                        </p>
                        <br/>
                        <p className="text-[13px]">
                            {isEnglish ? "We are a team committed to living our philosophical essence and we constantly strengthen our skills to be more aware of our actions every day and a motivating example for our children and young people. With the support of the Human Resources team, we implement workplace well-being strategies that go beyond monetary remuneration, to touch the essence of that BEING that allows us to successfully carry out our institutional purpose. At TNS, learning transcends the classroom and becomes a transformative experience that lasts the entire life of students, parents, teachers, administrators, graduates, allies, and many more." : "Somos un equipo comprometido con la vivencia de nuestra esencia filosófica y constantemente nos fortalecemos en habilidades para ser cada día más conscientes de nuestros actos y ejemplo motivador para nuestros niños y jóvenes. Con apoyo del equipo de Gestión Humana implementamos estrategias de bienestar laboral que van más allá de una retribución monetaria, para tocar la esencia de ese SER que permite llevar a feliz término nuestro propósito institucional. En TNS, el aprendizaje trasciende las aulas y se convierte en una experiencia transformadora que perdura para toda la vida de estudiantes, padres, docentes, administrativos, egresados, aliados y muchos más."}

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
