import '/app/globals.css';
import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { toggleLanguage } from '@/app/store/actions';

export default function Historia() {
    const isEnglish = useSelector((state) => state.isEnglish);
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    return (
        <div className="backgroundImagethree">
            <br />
            <div className="contenedor flex justify-center items-center md:mt-[-100px] py-10">
                <div className="flex flex-col md:flex-row max-w-6xl mx-auto items-center gap-8">
                    <div className="md:w-1/2 text-center md:text-left px-4">
                        {/*   <strong>
                            <h1 className="text-4xl text-[#444444] mb-4">Nuestra Historia</h1>
                        </strong> */}
                        <p className="text-[14px]">
                            {isEnglish ? "The spirit of diversity and inclusion beats at the heart of our institution. Each student is a unique crew member in the vast ocean of knowledge. We set sail on a journey that awakens curiosity, embraces differences, and challenges the limits of convention in the pedagogical dynamics of learning. Children and teenagers enjoy the processes of knowledge at each level of the educational path, from preschool to basic primary, basic secondary, and vocational secondary." : "En el corazón de nuestra institución, late el espíritu de la diversidad y la inclusión. Cada estudiante es tripulante único en el vasto océano del conocimiento. Zarpamos hacia una travesía que despierta curiosidad, abraza diferencias y desafía los límites de lo convencional en la dinámica pedagógica del aprendizaje. Los niños y los jóvenes  disfrutan de los procesos del conocimiento en cada uno de los niveles de la formación desde el Preescolar, básica primaria, básica secundaria y media vocacional."}
                            <br></br><br />
                            {isEnglish ? "Since its origin in 1995, as an educational institution we set out to accompany children and young people, in strengthening their cognitive potential and in fostering in them their sense of solidarity, their appreciation of respect to leave their mark as citizens of the world and seek to find themselves committed to humanity and the reduction of their impact on the environment, as well as being able to take care of the development of their leadership, their creativity and their entrepreneurial spirit" : "Desde su origen en 1995, como institución educativa nos propusimos acompañar a los niños y a los jóvenes, en el fortalecimiento tanto de su potencial cognitivo como en propiciar en ellos su sentido de solidaridad, su valoración por el respeto para dejar huella como ciudadanos del mundo y procurar encontrarse de una manera comprometida con la humanidad y la disminución de su impacto en el medio ambiente, así como ser capaces de  ocuparse por el desarrollo de su liderazgo, su creatividad  y su espíritu de emprendedor."}
                            <br></br><br />
                            {isEnglish ? "Guided by a scientific-humanist approach and a curriculum enriched with proposals and projects that contribute to the strengthening of BEING, we transcend toward the autonomy and the relationship with the globality of modernity from their essence so that they understand the importance of taking care not only of themselves but also of their community and the environment that surrounds us." : "Orientados desde un enfoque humanista científico y un currículo enriquecido con propuestas y proyectos que aportan al fortalecimiento del SER, trascendemos hacia el fortalecimiento de la autonomía y el relacionamiento con la globalidad de la modernidad desde la esencia propia de manera que comprenden la importancia de cuidar no sólo de sí mismos, sino también de su comunidad y del entorno que los rodea."}                            '
                            <br></br>
                        </p>
                    </div>
                    <div className="md:w-1/2 flex justify-center px-4">
                        <img className="w-full h-auto max-w-md mx-auto rounded-lg object-cover shadow-lg"
                            src="/images/about_us/our_proposal/photo4.jpg"
                            alt="Descripción de la imagen">
                        </img>
                    </div>
                </div>
            </div>
        </div>
    );
}
