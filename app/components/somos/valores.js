import '/app/globals.css'
import Image from 'next/image'
import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { toggleLanguage } from '@/app/store/actions';

export default function Valores() {
    const isEnglish = useSelector((state) => state.isEnglish);
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };
    const valoresEn = [
        {
            titulo: "",
            descripcion: "Believe in freedom under the limit of respect.",
            imagen: "/images/others/respeto.png"
        },
        {
            titulo: "",
            descripcion: "Value diversity and balance of individuality.",
            imagen: "/images/others/compromiso.png"
        },
        {
            titulo: "",
            descripcion: "Emphasize justice and equity as a step to freedom.",
            imagen: "/images/others/solidaridad.png"
        },
        {
            titulo: "",
            descripcion: "Stimulate self-knowledge from the daily praxis of reflection.",
            imagen: "/images/others/autonomia.png"
        },
        {
            titulo: "",
            descripcion: "Invite a critical look, evaluation, and authentic reflection.",
            imagen: "/images/others/equidad.png"
        },
        {
            titulo: "",
            descripcion: "Form citizens, social beings who contribute to the development of humanity.",
            imagen: "/images/others/creatividad.png"
        },
        {
            titulo: "",
            descripcion: "Promote personal growth, social commitment, and essential care for our planet.",
            imagen: "/images/others/autonomia.png"
        },
        {
            titulo: "",
            descripcion: "Value school mediation as a conciliatory principle in the face of differences in the relationship with others.",
            imagen: "/images/others/solidaridad.png"
        },
        {
            titulo: "",
            descripcion: "Develop a comprehensive transdisciplinary curriculum.",
            imagen: "/images/others/compromiso.png"
        },
        {
            titulo: "",
            descripcion: "Value the support of the family in each dimension of the formation of children.",
            imagen: "/images/others/respeto.png"
        }
    ];

    const valoresEs = [
        {
            titulo: "",
            descripcion: "Creer en la libertad bajo el límite del respeto.",
            imagen: "/images/others/respeto.png"
        },
        {
            titulo: "",
            descripcion: "Valorar la diversidad y el equilibrio de la individualidad.",
            imagen: "/images/others/compromiso.png"
        },
        {
            titulo: "",
            descripcion: "Enfatizar en la justicia y la equidad como un paso a la libertad.",
            imagen: "/images/others/solidaridad.png"
        },
        {
            titulo: "",
            descripcion: "Estimular el autoconocimiento desde la praxis cotidiana de la reflexión.",
            imagen: "/images/others/autonomia.png"
        },
        {
            titulo: "",
            descripcion: "Invitar a la mirada crítica, a la evaluación y a la auténtica reflexión.",
            imagen: "/images/others/equidad.png"
        },
        {
            titulo: "",
            descripcion: "Formar ciudadanos, seres sociales que aportan al desarrollo de la humanidad.",
            imagen: "/images/others/creatividad.png"
        },
        {
            titulo: "",
            descripcion: "Promover el crecimiento personal, el compromiso social y el cuidado primordial de nuestro planeta.",
            imagen: "/images/others/autonomia.png"
        },
        {
            titulo: "",
            descripcion: "Valorar la mediación escolar como principio conciliador ante las diferencias en la interrelación con el otro.",
            imagen: "/images/others/solidaridad.png"
        },
        {
            titulo: "",
            descripcion: "Desarrollar un currículo transdisciplinario integral.",
            imagen: "/images/others/compromiso.png"
        },
        {
            titulo: "",
            descripcion: "Valorar el acompañamiento de la familia en cada dimensión de la formación de los hijos.",
            imagen: "/images/others/respeto.png"
        }
    ];

    const valores = isEnglish ? valoresEn : valoresEs;

    return (
        <div className="pt-10 pb-10 bg-white sm:pt-5 sm:pb-5 md:pt-0 md:pb-0">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center">
                    <strong>
                        <h1 className="text-3xl text-[#444444;] sm:text-4xl sm:leading-10">
                            {isEnglish ? "The navigation route that has forged history" : "El trayecto de navegación que ha forjado historia"}

                        </h1>
                    </strong>
                    <p className="mt-3 max-w-2xl mx-auto text-lg leading-7 text-gray-500 sm:mt-4">
                        {isEnglish ? "Between 1985 and 1995, a group of friends met with a common aspiration: to give life to a school to guide conscious, creative, innovative, autonomous, and supportive human beings, with critical thinking skills, respect for diversity, and leadership, Among all those skills and values that make a human being an INTEGRAL BEING. The purpose was set to accompany children and young people through an innovative educational proposal, based on theoretical bases such as Humanist Pedagogy, Systemic Thinking, Scientific Thinking, Critical Thinking, and Active School." : "Entre los años 1985 y 1995, un grupo de amigos se reunía con una aspiración en común: dar vida a un colegio para formar seres humanos conscientes, creativos, innovadores, autónomos, solidarios, con habilidades de pensamiento crítico, respeto por la diversidad, liderazgo, entre todas aquellas competencias y valores que hacen de un ser humano un SER INTEGRAL. Se fijó el propósito de acompañar a niños y jóvenes a través de una propuesta educativa innovadora, sustentada en bases teóricas como la Pedagogía Humanista, el Pensamiento Sistémico, el Pensamiento Científico, el Pensamiento Crítico y la Escuela Activa."}
                        <br /><br />
                        {isEnglish ? "Driven by a shared desire to build a space where each person was valued for their individuality and where mistakes were seen as a natural part of the learning process, the project took shape, and gradually, was fueled by the dream of a constructivist and humanist education to guide in Consciousness through life and for life, facilitating the fulfillment of ten fundamental principles:" : "Impulsados por el deseo compartido de construir un espacio donde cada individuo fuera valorado por su individualidad y donde los desaciertos fueran vistos como parte natural del proceso de aprendizaje, el proyecto tomó forma, y gradualmente, fue alimentado por el sueño de una formación constructivista y humanista con el propósito de Formar en Consciencia por la vida y para la vida, facilitando el cumplimiento de diez principios fundacionales"}
                    </p>
                </div>
                <div className="mt-8 sm:mt-10 md:mt-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {valores.map((valor, index) => (
                            <div key={index} className={`flex items-center p-4 shadow-lg rounded-lg ${index === valores.length - 1 ? 'md:col-span-3 justify-center' : ''}`}>
                                <Image src={valor.imagen} width={80} height={80} alt={`Icono de ${valor.titulo}`} />
                                <div className='ml-4'>
                                    <h1 className="text-lg font-bold text-gray-900">{valor.titulo}</h1>
                                    <p>{valor.descripcion}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
}
