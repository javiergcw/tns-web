import React from 'react';

const images = [
    '/images/about_us/our_proposal/photo10.jpg',
    '/images/about_us/our_proposal/photo11.jpg',
    '/images/about_us/our_proposal/photo12.jpg'
];

const ResponsiveImageGallery = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((src, index) => (
                    <div key={index} className="flex justify-center">
                        <img
                            className="w-full h-[300px] rounded-lg object-cover shadow-lg"
                            src={src}
                            alt={`Imagen ${index + 1}`}
                        />
                    </div>
                ))}
            </div>
            <br />
            <h1 className="text-3xl font-bold text-[#444444] mb-4">Our campus, a vast ocean of meaningful details.</h1>
            <p className="text-[13px]">
                Welcome to the heart of The New School, the place where the light of the stars that we inhabit here is lit, the physical space where events and interrelationships converge, the terrestrial universe in which magic is lit and where each member awakens an avid desire for knowledge, creativity, innovation, problem-solving and the joy of GIVING to others in the desire to transmit, solve, help, complement.
                Our campus is an extensive ocean of elements, resources, and spaces, like vessels of knowledge. We try to enjoy every millimeter of our physical environment or even take ownership of our city, the country, and the world to explore knowledge and motivate multicultural openness in our students. We will immerse ourselves in the serene beauty of the countryside to take advantage of the richness of all the learning spaces that make up our campus and awaken the student's creativity through exploration, applying the immensity of all the disciplines of knowledge to them.
            </p>
            <br />
            <p className="text-[13px]">
                For our methodology, play and fun are the propelling sails of the imagination and development of children in each of their stages, therefore, being immersed in our forests, the large trees, under the melody of birds, the neighing from Camilo (our horse) and the running of the rabbits, our students enjoy a safe and fun environment, where nature is both a teacher and a playmate.
                From the wide corridors, illuminated classrooms, and even the most secret corners, we can inspire and stimulate curiosity. The New School has a multiplicity of educational environments such as classrooms, an auditorium, a coliseum, a farm, an orchard, Cosmolab (kitchen laboratory), sandpits, a soccer field, a sports center, coliseum, language laboratories, a chemistry laboratory, music rooms, plastic art workshop, theater, astronomy, arts and crafts, technology, restaurant and click gallery as a workspace for learning and managing our emotions. Here, even administrative offices, walls, gardens, and stairs are transformed into learning spaces, where each interaction is a fun opportunity to grow and learn.
                Our commitment promotes the protection of the environment and among its various strategies we use solar panels that produce 100% of the energy consumed, we set goals for the reduction of the use of plastics, printed stationery, waste management, reuse of materials, making ecological bricks and promoting campaigns to raise environmental awareness throughout our educational community.

            </p>
        </div>
    );
};

export default ResponsiveImageGallery;
