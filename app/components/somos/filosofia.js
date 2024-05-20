import Image from 'next/image';
import '/app/globals.css';

const values = [
    {
        title: "Respect",
        description: "It is the exercise of freedom allowing others to also exercise theirs. Other values such as tolerance and trust are associated with it."
    },
    {
        title: "Commitment",
        description: "It is giving without conditions. Responsibility is associated with it."
    },
    {
        title: "Solidarity",
        description: "It is the ability to put yourself in the situation of another, to be kind, helpful, and collaborative; It is learning to share what I have and not what I have left."
    },
    {
        title: "Autonomy",
        description: "It is the ability to decide by one's criteria. It implies freedom, reflection, and criticality."
    },
    {
        title: "Equity",
        description: "It is the particular treatment corresponding to the conditions of each being, the propensity to be guided by the feeling of duty or conscience. Justice is associated with this value."
    },
    {
        title: "Creativity",
        description: "It is being recursive, ingenious, original, and innovative; It is having the ability to generate new ideas."
    }
];

export default function Filosofia() {
    return (
        <div className="backgroundImagethree">
            <div className="contenedor flex justify-center items-center pt-8 pb-8">
                <div className="flex flex-col max-w-6xl mx-auto items-center">
                    <div className="container mx-auto p-6 md:p-12 bg-white rounded-lg shadow-lg">
                        <h1 className="text-3xl font-bold text-title mb-4">The Rhythmic Wave of Cultura New</h1>

                        <div className="grid md:grid-cols-10 gap-4 mb-4">
                            <div className="md:col-span-7">
                                <p className="text-description mb-4">
                                    At The New School, we immerse ourselves in the vibrant universe of the Cultura New. Every interaction, every word, every gesture, every look, every habit, is impregnated with a harmonious, meaningful environment, typical of the UBUNTU philosophy, which invites us to relate to each other and our environment under the slogan: “Look, evaluate and reflect, principles to act”, which is also a vital fragment of our institutional anthem.
                                </p>
                                <p className="text-description mb-4">
                                    At the heart of our culture lies the harmonious synthesis between deep-rooted values, dynamic competencies, habits that promote consciousness, and assertive language, among others, all of them woven into a network of relationships and transformative experiences of BEING.
                                </p>
                                <p className="text-description mb-4">
                                    Our Cultura New, in addition to a way of life, is a living expression of our collective identity, it is a journey of discovery and self-growth, which propels us towards a future full of infinite possibilities.
                                </p>
                                <p className="text-description mb-4">
                                    We have enriched the compass of our boat with the image of an institutional mascot: a bird that evokes freedom, and color, inspires, evaluates, and reflects. Motus is the name with which we identify it, it is the representation of a Barranquero which is that beautiful bird that inhabits our forests. We adopt its presence and company as a symbol of the philosophical essence of the Cultura New program.
                                </p>
                            </div>
                            <div className="md:col-span-3">
                                <Image
                                    src="/images/about_us/our_proposal/photo7.jpg"
                                    alt="Our Proposal"
                                    className="rounded-lg object-cover shadow-lg"
                                    width={800}
                                    height={600}
                                />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-title mb-2">Institutional values touch every detail of our educational proposal. They all converge in LOVE. We give special attention to six of them:</h2>

                        <div className="flex flex-wrap -mx-2 mb-4">
                            {values.map((value, index) => (
                                <div key={index} className="w-full md:w-1/2 px-2 mb-4">
                                    <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                                        <h3 className="text-xl font-bold text-title mb-1">{value.title}</h3>
                                        <p className="text-description mb-2">{value.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
