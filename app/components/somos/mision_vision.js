export default function MisionVision() {
    return (
        <div className="flex flex-col md:flex-row justify-center bg-white items-stretch my-12 mx-4 md:mx-20">
            {/* Misión Section */}
            <div className="flex flex-col md:flex-row items-center md:w-1/2">
                <div className="md:w-1/3">
                    <img
                        className="w-full h-auto rounded-lg"
                        src="http://www.thenewschool.edu.co/wp-content/uploads/2015/09/thumbnail_IMG_6251.jpg"
                        alt="Un grupo de niños aprendiendo al aire libre, reflejando la misión de la institución educativa."
                    />
                </div>
                <div className="md:w-2/3 text-center md:text-left md:pl-4 flex flex-col justify-center">
                    <h2 className="text-2xl text-gray-500">Misión</h2>
                    <h4 className="text-xl text-gray-500 mt-2">Lo que somos</h4>
                    <p className="text-gray-500">
                        Propósito de El Nuevo Colegio Formar en consciencia por la vida y <br /> para la vida.
                    </p>
                </div>
            </div>

            {/* Divider */}
            <div className="hidden md:flex md:flex-col md:w-0.5 bg-gray-300 self-stretch mx-10"></div>

            {/* Visión Section */}
            <div className="flex flex-col md:flex-row-reverse items-center md:w-1/2 mt-10 md:mt-0">
                <div className="md:w-1/3">
                    <img
                        className="w-full h-auto rounded-lg"
                        src="http://www.thenewschool.edu.co/wp-content/uploads/2015/09/thumbnail_IMG_5148-1.jpg"
                        alt="Vista de la institución educativa, simbolizando la visión hacia el futuro."
                    />
                </div>
                <div className="md:w-2/3 text-center md:text-right md:pr-4 flex flex-col justify-center">
                    <h2 className="text-2xl text-gray-500">Visión</h2>
                    <h3 className="text-xl text-gray-500 mt-2">Lo que queremos ser</h3>
                    <p className="text-gray-500">
                        Integrar el conocimiento con el ser.
                    </p>
                </div>
            </div>
        </div>
    );
}
