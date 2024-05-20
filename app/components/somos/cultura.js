import { useState } from 'react';
import '/app/globals.css';


export default function Cultura() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    return (
        <div className="backgroundImagefour py-14">
            <div className="contenedor flex justify-center items-center pt-4 pb-4 ">
                <div className="flex flex-col md:flex-row max-w-6xl mx-auto items-center">
                    <div className="md:w-1/2 text-center md:text-left px-4">
                        <h1 className="text-4xl font-bold text-[#444444] mb-4">Pedagogical model: the essence of our navigation</h1>
                        <p className="text-gray-500 text-[13px]">
                            Our “Consciousness-based education” model, inspired by active learning pedagogies, offers a journey of discovery of BEING intertwined with DOING; paring on which we anchor knowledge and the countless significant experiences that touch the fields of learning.                        </p>
                        <br />
                        <p className="text-gray-500 text-[13px]"> In a continuous and exciting adventure, students at The New School acquire knowledge in a transversal way, following different research strategies, work methods, project-based learning, the method of scientific thinking, and all those resources that facilitate learning and discovery, while they shape their training seeking to become the architects of tomorrow.</p>

                        <div className="mt-4">
                            <button onClick={toggleOpen} className="text-gray-600 text-sm focus:outline-none">
                                Leer más
                            </button>
                            {isOpen && (
                                <div className="text-[13px] mt-2">
                                    <p>Education in Consciousness means that our students are capable of reflecting on themselves, on the world around them, the meaning of their existence, and the why and what for in life itself of each theory acquired. They can recognize their strengths, their weaknesses, their dreams and aspirations, their values and principles. In this recognition, their personal development and human interrelationships are forged; They surely become beings who can make responsible and ethical decisions, based on respect, equity, and solidarity, given that our educational proposal is not limited to transmitting knowledge, but seeks to educate people in awareness for life and to life.</p>
                                    <br />
                                    <p>Training in autonomy and love means that we want them to be able to feel and express their emotions, to establish healthy and lasting emotional bonds, to take care of themselves and others. People who can appreciate the beauty and diversity of life, nature, and culture. People who get to live with joy, gratitude, and generosity.</p>
                                    <br />
                                    <p>Training for life means that we want our children and teenagers to be able to act with creativity, autonomy, and commitment, with the ability to face challenges with optimism and resilience, to take advantage of opportunities with enthusiasm and passion; adults able to carry out their personal and professional projects, according to their talents and interests. People who can contribute with a critical and transformative vision.</p>
                                    <br />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="md:w-1/2 flex justify-center ">
                        <img className="md:w-[420px] rounded-lg object-cover shadow-lg"
                            src="/images/about_us/our_proposal/photo6.jpg"
                            alt="Descripción de la imagen">
                        </img>
                    </div>
                </div>

            </div>
            <br />
            <br />
        </div>
    );
}
