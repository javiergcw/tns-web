import '/app/globals.css';

export default function MisionVision() {
    return (
        // Asegurando que el componente no se solape con el contenido anterior
        <div className="flex flex-col md:flex-row justify-center bg-white items-stretch mx-4 md:mx-20 my-20">
            {/* Misión Section */}
            <div className="flex-1 flex flex-col md:flex-row items-center">
                <div className="md:w-1/3 p-4">
                    <img
                        className="w-full h-auto rounded-lg object-cover shadow-lg"
                        src="/images/about_us/our_proposal/photo2.jpg"
                        alt="Un grupo de niños aprendiendo al aire libre, reflejando la misión de la institución educativa."
                        style={{ width: '300px', height: '200px' }}
                    />
                </div>
                <div className="w-full md:w-2/3 text-center md:text-left p-4">
                    <strong>
                        <h1 className="text-2xl text-gray-600">MISSION – PURPOSE</h1>
                    </strong>
                    <strong>
                        <h2 className="text-xl text-gray-600 mt-2">WHO WE ARE</h2>
                    </strong>
                    <p className="text-gray-500 mt-4">
                        Guide in awareness to life and for life.
                    </p>
                </div>
            </div>

            {/* Divider */}
            <div className="w-full md:w-0.5 bg-gray-300 md:my-0 mx-auto md:self-stretch"></div>

            {/* Visión Section */}
            <div className="flex-1 flex flex-col md:flex-row items-center">
                <div className=" md:w-1/3 p-4 md:order-2">
                    <img
                        className="w-full h-auto rounded-lg object-cover shadow-lg"
                        src="/images/about_us/our_proposal/photo3.jpg"
                        alt="Vista de la institución educativa, simbolizando la visión hacia el futuro."
                        style={{ width: '300px', height: '200px' }}
                    />
                </div>
                <div className="w-full md:w-2/3 text-center md:text-right p-4 md:order-1">
                    <strong>
                        <h1 className="text-2xl text-gray-600">VISION</h1>
                    </strong>
                    <strong>
                        <h2 className="text-xl text-gray-600 mt-2"> WE WANT TO BE</h2>
                    </strong>
                    <p className="text-gray-500 mt-4">
                        Integrar el conocimiento con el ser.
                    </p>
                </div>
            </div>
        </div >
    );
}
