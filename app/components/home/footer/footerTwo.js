'use client'

export default function FooterTwo() {
    return (
        <footer className="bg-[url('/images/footer/background.png')] bg-cover p-10 w-full h-auto pb-24">
            <div className="flex justify-between">
                {/* Primer Div */}
                <div className="bg-red-500 p-5 text-white">
                    <p>Dirección: Carrera 9 #11 Sur-338 Medellín - Antioquía</p>
                    <p>Teléfono: (604) 520 7270</p>
                    <p>E-mail: Correo@thenewschool.edu.co</p>
                </div>

                {/* Segundo Div */}
                <div>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.5587117642744!2d-75.54862258470654!3d6.1897553286690625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4682bec07c0a41%3A0x37f6091fba9d7f7f!2sThe+New+School!5e0!3m2!1ses-419!2sco!4v1446133288933"
                        width="300"
                        height="200"
                        frameBorder="0"
                        style={{ border: 0 }}
                        allowFullScreen=""
                    ></iframe>
                </div>

                {/* Tercer Div */}
                <div className="text-white">
                    <p>Síguenos en:</p>
                    {/* Aquí van las imágenes de las redes sociales. Reemplaza 'path_to_icon' con las rutas de tus imágenes */}
                    <div className="flex">
                        <img src="path_to_icon" alt="Facebook" className="h-6 w-6 mx-1" />
                        <img src="path_to_icon" alt="Twitter" className="h-6 w-6 mx-1" />
                        <img src="path_to_icon" alt="YouTube" className="h-6 w-6 mx-1" />
                        <img src="path_to_icon" alt="Instagram" className="h-6 w-6 mx-1" />
                    </div>
                    <hr className="my-2 border-black" />
                    <p>Política de Protección de Datos Personales</p>
                </div>
            </div>
        </footer>
    );
}
