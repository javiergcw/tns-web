'use client'
import '/app/globals.css'
export default function FooterTwo() {
    return (
        <footer className="bg-[url('/images/footer/background.png')] bg-cover p-10 w-full h-auto pb-24 ">
            <div className="flex justify-between mt-12">
                {/* Primer Div */}
                <div className="flex items-center  p-5 " style={{ color: '#CCCCCC', fontSize: '13px' }}>
                    <img src="/images/logo-vertical.jpeg" alt="Descripción de la imagen" className=" h-44" />
                    <div className="flex-1 ml-4">
                        <p><strong>Dirección:</strong> Carrera 9 #11 Sur-338 Medellín - Antioquía</p>
                        <p><strong>Teléfono:</strong> (604) 520 7270</p>
                        <p><strong>E-mail:</strong> Correo@thenewschool.edu.co</p>
                    </div>
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
                    <p className="mb-4" style={{ color: '#CCCCCC', fontSize: '13px' }}>
                        <strong>Síguenos en:</strong></p>
                    {/* Aquí van las imágenes de las redes sociales. Reemplaza 'path_to_icon' con las rutas de tus imágenes */}
                    <div className="flex mb-4">
                        <a href="https://www.youtube.com/@thenewschool1995" target="_blank" rel="noopener noreferrer">
                            <img src="https://imgur.com/vjazL2G.png" alt="YouTube" className="h-10 w-10 mx-1" />
                        </a>
                        <a href="https://www.facebook.com/thenewschool95/" target="_blank" rel="noopener noreferrer">
                            <img src="https://imgur.com/dhMhCtX.png" alt="Facebook" className="h-10 w-10 mx-1" />
                        </a>
                        <a href="https://api.whatsapp.com/send?phone=573008909800" target="_blank" rel="noopener noreferrer">
                            <img src="https://imgur.com/rbTnBn1.png" alt="Whatsapp" className="h-10 w-10 mx-1" />
                        </a>
                        <a href="https://www.instagram.com/thenewschool95/" target="_blank" rel="noopener noreferrer">
                            <img src="https://imgur.com/o3jjmGR.png" alt="Instagram" className="h-10 w-10 mx-1" />
                        </a>
                    </div>
                    <hr className="my-2 border-black" />
                    <p style={{ color: '#CCCCCC', fontSize: '13px' }}>Política de Protección de Datos Personales</p>
                </div>
            </div>
        </footer>
    );
}
