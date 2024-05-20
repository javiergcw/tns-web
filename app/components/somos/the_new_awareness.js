import React from 'react';

const TheNewAwareness = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-[#444444] mb-4">The New Awareness: a program to explore New Horizons</h2>
            <p className="mb-4">
                The New Awareness is an educational adventure that complements the curriculum and awakens the curiosity and learning of each participant.
                From leveling, and extension courses in extracurricular time to pedagogical expeditions, they are designed to inspire and learn new learning experiences uniquely and practically.
            </p>
            <p className="mb-4">
                At The New School, we promote the activation of the self in free time as an opportunity to extend consciousness education to other disciplines and cultural, artistic, sports, technological,
                among others, disciplines and settings, thus allowing our participants to explore their abilities, talents, and interests, while strengthening their social and cognitive skills.
            </p>
            <p className="mb-4 font-semibold">Our academic extension courses:</p>
            <ul className="list-disc list-inside mb-4">
                <li>Offer spaces and alternatives that promote the integral personal growth of our participants.</li>
                <li>Promote a wide range of programs that reflect our educational philosophy and enrich the learning experience.</li>
                <li>Promote creative learning, cultural benefit, physical activity, and coexistence through innovative and stimulating activities.</li>
            </ul>
            <p className="mb-4">
                The New Awareness is a journey of discovery, growth, and connection, which transforms lives and leaves a mark on its participants.
                To request more information about the courses and register, contact <a href="tel:+573001715245" className="text-blue-500">3001715245</a>.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <img
                    className="w-full h-[300px] rounded-lg object-cover shadow-lg"
                    src="/images/about_us/our_proposal/photo14.jpg"
                    alt="Imagen 1"
                />
                <img
                    className="w-full h-[300px] rounded-lg object-cover shadow-lg"
                    src="/images/about_us/our_proposal/photo15.jpg"
                    alt="Imagen 2"
                />
            </div>
        </div>
    );
};

export default TheNewAwareness;
