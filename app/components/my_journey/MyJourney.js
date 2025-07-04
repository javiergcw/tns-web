"use client";
import '/app/globals.css';
import { ImagesPath } from '@/app/utils/assetsPath';

export default function MyJourney() {
    // Lista de meses con enlaces específicos
    const months = [
        {
            name: 'August',
            key: 'august',
            links: [
                { name: 'Questions / Stories', image: '/images/journey/dragon.jpeg', href: '[INSERT ONEDRIVE LINK FOR AUGUST QUESTIONS]' },
                { name: 'Tablero del Sabio', image: '/images/journey/mago.jpeg', href: '[INSERT ONEDRIVE LINK FOR AUGUST TABLERO]' },
                { name: 'Mindfulness', image: '/images/journey/arbol.jpeg', href: '[INSERT ONEDRIVE LINK FOR AUGUST MINDFULNESS]' },
            ],
        },
        {
            name: 'September',
            key: 'september',
            links: [
                { name: 'Questions / Stories', image: '/images/journey/dragon.jpeg', href: '[INSERT ONEDRIVE LINK FOR SEPTEMBER QUESTIONS]' },
                { name: 'Tablero del Sabio', image: '/images/journey/mago.jpeg', href: '[INSERT ONEDRIVE LINK FOR SEPTEMBER TABLERO]' },
                { name: 'Mindfulness', image: '/images/journey/arbol.jpeg', href: '[INSERT ONEDRIVE LINK FOR SEPTEMBER MINDFULNESS]' },
            ],
        },
        {
            name: 'October',
            key: 'october',
            links: [
                { name: 'Questions / Stories', image: '/images/journey/dragon.jpeg', href: '[INSERT ONEDRIVE LINK FOR OCTOBER QUESTIONS]' },
                { name: 'Tablero del Sabio', image: '/images/journey/mago.jpeg', href: '[INSERT ONEDRIVE LINK FOR OCTOBER TABLERO]' },
                { name: 'Mindfulness', image: '/images/journey/arbol.jpeg', href: '[INSERT ONEDRIVE LINK FOR OCTOBER MINDFULNESS]' },
            ],
        },
        {
            name: 'November',
            key: 'november',
            links: [
                { name: 'Questions / Stories', image: '/images/journey/dragon.jpeg', href: '[INSERT ONEDRIVE LINK FOR NOVEMBER QUESTIONS]' },
                { name: 'Tablero del Sabio', image: '/images/journey/mago.jpeg', href: '[INSERT ONEDRIVE LINK FOR NOVEMBER TABLERO]' },
                { name: 'Mindfulness', image: '/images/journey/arbol.jpeg', href: '[INSERT ONEDRIVE LINK FOR NOVEMBER MINDFULNESS]' },
            ],
        },
        {
            name: 'December',
            key: 'december',
            links: [
                { name: 'Questions / Stories', image: '/images/journey/dragon.jpeg', href: '[INSERT ONEDRIVE LINK FOR DECEMBER QUESTIONS]' },
                { name: 'Tablero del Sabio', image: '/images/journey/mago.jpeg', href: '[INSERT ONEDRIVE LINK FOR DECEMBER TABLERO]' },
                { name: 'Mindfulness', image: '/images/journey/arbol.jpeg', href: '[INSERT ONEDRIVE LINK FOR DECEMBER MINDFULNESS]' },
            ],
        },
        {
            name: 'January',
            key: 'january',
            links: [
                { name: 'Questions / Stories', image: '/images/journey/dragon.jpeg', href: '[INSERT ONEDRIVE LINK FOR JANUARY QUESTIONS]' },
                { name: 'Tablero del Sabio', image: '/images/journey/mago.jpeg', href: '[INSERT ONEDRIVE LINK FOR JANUARY TABLERO]' },
                { name: 'Mindfulness', image: '/images/journey/arbol.jpeg', href: '[INSERT ONEDRIVE LINK FOR JANUARY MINDFULNESS]' },
            ],
        },
        {
            name: 'February',
            key: 'february',
            links: [
                { name: 'Questions / Stories', image: '/images/journey/dragon.jpeg', href: '[INSERT ONEDRIVE LINK FOR FEBRUARY QUESTIONS]' },
                { name: 'Tablero del Sabio', image: '/images/journey/mago.jpeg', href: '[INSERT ONEDRIVE LINK FOR FEBRUARY TABLERO]' },
                { name: 'Mindfulness', image: '/images/journey/arbol.jpeg', href: '[INSERT ONEDRIVE LINK FOR FEBRUARY MINDFULNESS]' },
            ],
        },
        {
            name: 'March',
            key: 'march',
            links: [
                { name: 'Questions / Stories', image: '/images/journey/dragon.jpeg', href: '[INSERT ONEDRIVE LINK FOR MARCH QUESTIONS]' },
                { name: 'Tablero del Sabio', image: '/images/journey/mago.jpeg', href: '[INSERT ONEDRIVE LINK FOR MARCH TABLERO]' },
                { name: 'Mindfulness', image: '/images/journey/arbol.jpeg', href: '[INSERT ONEDRIVE LINK FOR MARCH MINDFULNESS]' },
            ],
        },
        {
            name: 'April',
            key: 'april',
            links: [
                { name: 'Questions / Stories', image: '/images/journey/dragon.jpeg', href: '[INSERT ONEDRIVE LINK FOR APRIL QUESTIONS]' },
                { name: 'Tablero del Sabio', image: '/images/journey/mago.jpeg', href: '[INSERT ONEDRIVE LINK FOR APRIL TABLERO]' },
                { name: 'Mindfulness', image: '/images/journey/arbol.jpeg', href: '[INSERT ONEDRIVE LINK FOR APRIL MINDFULNESS]' },
            ],
        },
        {
            name: 'May',
            key: 'may',
            links: [
                { name: 'Questions / Stories', image: '/images/journey/dragon.jpeg', href: '[INSERT ONEDRIVE LINK FOR MAY QUESTIONS]' },
                { name: 'Tablero del Sabio', image: '/images/journey/mago.jpeg', href: '[INSERT ONEDRIVE LINK FOR MAY TABLERO]' },
                { name: 'Mindfulness', image: '/images/journey/arbol.jpeg', href: '[INSERT ONEDRIVE LINK FOR MAY MINDFULNESS]' },
            ],
        },
        {
            name: 'June',
            key: 'june',
            links: [
                { name: 'Questions / Stories', image: '/images/journey/dragon.jpeg', href: '[INSERT ONEDRIVE LINK FOR JUNE QUESTIONS]' },
                { name: 'Tablero del Sabio', image: '/images/journey/mago.jpeg', href: '[INSERT ONEDRIVE LINK FOR JUNE TABLERO]' },
                { name: 'Mindfulness', image: '/images/journey/arbol.jpeg', href: '[INSERT ONEDRIVE LINK FOR JUNE MINDFULNESS]' },
            ],
        },
        {
            name: 'July',
            key: 'july',
            links: [
                { name: 'Questions / Stories', image: '/images/journey/dragon.jpeg', href: '[INSERT ONEDRIVE LINK FOR JULY QUESTIONS]' },
                { name: 'Tablero del Sabio', image: '/images/journey/mago.jpeg', href: '[INSERT ONEDRIVE LINK FOR JULY TABLERO]' },
                { name: 'Mindfulness', image: '/images/journey/arbol.jpeg', href: '[INSERT ONEDRIVE LINK FOR JULY MINDFULNESS]' },
            ],
        },
    ];

    return (
        <div className="backgroundImagefour py-14">
            {/* Sección de presentación */}
            <div className="contenedor flex justify-center items-center pt-4 pb-4">
                <div className="flex flex-col md:flex-row max-w-6xl mx-auto items-center">
                    <div className="md:w-1/2 flex justify-center order-1 md:order-1">
                        <img
                            className="md:w-[420px] rounded-lg object-cover"
                            src={ImagesPath.presentacion1}
                            alt="My Journey Presentation"
                        />
                    </div>
                    <div className="md:w-1/2 text-center md:text-left px-4 order-2 md:order-2">
                        <h1 className="text-4xl font-bold text-grayTerciary mb-4">
                            My Journey
                        </h1>
                        <p className="text-gray-500 text-[13px]">
                            This journal invites us to take time each day to get to know ourselves, so that we can optimally express our Being in our relationship with ourselves, with others, and with the various circumstances of our human experience. It has been designed as a timeless journal that we can use in our own style and at our own learning pace at any point in our life journey.
                        </p>
                        <br />
                        <p className="text-gray-500 text-[13px]">
                            Didactically, this journey has been structured into 12 stages—one for each month—corresponding to the essential aspects of the competencies of "knowing how to be," which promote the development of consciousness for life and through life. Using the metaphor of the hero's journey, we embark on an "inner journey," discovering what we already are and know.
                        </p>
                    </div>
                </div>
            </div>

            {/* Sección de instrucciones */}
            <div className="contenedor flex justify-center items-center pt-4 pb-4">
                <div className="flex flex-col md:flex-row max-w-6xl mx-auto items-center">
                    <div className="md:w-1/2 text-center md:text-left px-4 order-2 md:order-1">
                        <h2 className="text-2xl font-bold text-grayTerciary mb-4">
                            Instructions for use:
                        </h2>
                        <ol className="text-gray-500 text-[13px] list-decimal list-inside">
                            <li className="mb-2">
                                Open the treasure map inside the envelope called ‘Call to Adventure!’ read the clues; locate the corresponding place for each clue on the map and mark it with the number of the competency assigned to that clue.
                            </li>
                            <li className="mb-2">
                                Fill the page called “the TNS coat of arms inspires my biographical journey”.
                            </li>
                            <li className="mb-2">
                                Use the monthly divider as follows:
                                <ol className="list-decimal list-inside ml-4">
                                    <li className="mb-1">
                                        Explore the dragon caves by reading the questions in each of them and answering them.
                                    </li>
                                    <li className="mb-1">
                                        Discover the symbols in the wizard’s stories by reading the tale on the back of the divider and creating a drawing that represents my interpretation of the story.
                                    </li>
                                    <li className="mb-1">
                                        Investigate the sage’s board by scanning the QR code on the back of the divider, next to the image of Motus, the TNS mascot. Here, I find scientific elements that help me reflect on the dragon’s questions.
                                    </li>
                                    <li className="mb-1">
                                        Practice mindfulness exercises by accessing the QR code located next to the tree on the front of the divider.
                                    </li>
                                </ol>
                            </li>
                            <li className="mb-2">
                                Discover treasures and record what I have learned each day of the month, applying it to my life. Additionally, I fill in the remaining rays of the gratitude sun with my own expressions, write my power phrases, and note the symbolic language of my dreams.
                            </li>
                            <li className="mb-2">
                                Engage in and solve the logical and critical thinking activities.
                            </li>
                            <li className="mb-2">
                                Use the flyer titled for my "Inner journey” daily.
                            </li>
                        </ol>
                        <p className="text-gray-500 text-[13px] mt-4">
                            Thank you very much for embarking on this adventure.<br />
                            The Editors.
                        </p>
                    </div>
                    <div className="md:w-1/2 flex justify-center order-1 md:order-2">
                        <img
                            className="md:w-[420px] rounded-lg object-cover"
                            src={ImagesPath.presentacion2}
                            alt="Instructions Presentation"
                        />
                    </div>
                </div>
            </div>

            {/* Sección de meses */}
            <div className="contenedor flex justify-center items-center pt-4 pb-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl font-bold text-grayTerciary mb-8 text-center">
                        Monthly Journey
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {months.map((month, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md p-4">
                                <h3 className="text-xl font-semibold text-grayTerciary mb-4 text-center">
                                    {month.name}
                                </h3>
                                <div className="space-y-4">
                                    {month.links.map((link, linkIndex) => (
                                        <div key={linkIndex} className="flex items-center space-x-4">
                                            <img
                                                className="w-16 h-16 rounded-md object-cover"
                                                src={link.image}
                                                alt={link.name}
                                            />
                                            <a
                                                href={link.href}
                                                className="text-gray-500 font-serif font-bold text-[13px] hover:underline"
                                            >
                                                {link.name}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <br />
            <br />
        </div>
    );
}