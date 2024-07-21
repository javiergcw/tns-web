import { ImagesPath } from "@/app/utils/assetsPath";
import "/app/globals.css";

export default function FooterTwo() {
  return (
    <footer className="bg-[url('/images/footer/background.png')] bg-cover p-4 md:p-10 w-full h-auto pb-12 md:pb-24">
      <div className="flex flex-col md:flex-row justify-between mt-12">
        {/* Primer Div - Contenido de contacto */}
        <div className="flex flex-col md:flex-row items-center p-5 text-[#CCCCCC] text-xs md:text-sm">
          <img
            src="/images/logo-vertical.jpeg"
            alt="Descripción de la imagen"
            className="h-24 md:h-44 mb-4 md:mb-0"
          />
          <div className="flex-1 ml-4">
            <p>
              <strong>Dirección:</strong> Carrera 9 #11 Sur-338 Medellín -
              Antioquía
            </p>

            <p className="py-2">
              <strong>Teléfono:</strong> (604) 520 7270
            </p>
            <p>
              <strong>E-mails:</strong> Correo@thenewschool.edu.co
            </p>
          </div>
        </div>

        {/* Segundo Div - Mapa */}
        <div className="my-6 md:my-0">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.5587117642744!2d-75.54862258470654!3d6.1897553286690625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4682bec07c0a41%3A0x37f6091fba9d7f7f!2sThe+New+School!5e0!3m2!1ses-419!2sco!4v1446133288933"
            width="100%"
            height="200"
            frameBorder="0"
            style={{ border: 0 }}
          ></iframe>
        </div>

        {/* Tercer Div - Redes Sociales */}
        <div className="text-white text-xs md:text-sm">
          <p className="mb-4">
            <strong>Síguenos en:</strong>
          </p>
          <div className="flex justify-center md:justify-start mb-4">
            {/* Iconos de redes sociales */}
            <a
              href="https://www.youtube.com/@thenewschool1995"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={ImagesPath.vjazL2G}
                alt="YouTube"
                className="h-8 md:h-10 w-8 md:w-10 mx-1"
              />
            </a>
            <a
              href="https://www.facebook.com/thenewschool95/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={ImagesPath.dhMhCtX}
                alt="Facebook"
                className="h-8 md:h-10 w-8 md:w-10 mx-1"
              />
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=573008909800"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={ImagesPath.rbTnBn1}
                alt="Whatsapp"
                className="h-8 md:h-10 w-8 md:w-10 mx-1"
              />
            </a>
            <a
              href="https://www.instagram.com/thenewschool95/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={ImagesPath.o3jjmGR}
                alt="Instagram"
                className="h-8 md:h-10 w-8 md:w-10 mx-1"
              />
            </a>
          </div>
          <hr className="my-2 border-gray-600" />
          <a
            href="https://drive.google.com/file/d/1TEh7VuTRxOraGW_rzIeSs9Bb_g5Z8kDX/view?usp=share_link"
            target="_blank"
          >
            <p>Política de Protección de Datos Personales</p>
          </a>
          {/* Botón Flowbite */}
          <br></br>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <a href="/videos" target="_blank">
              Ver videos
            </a>
          </button>
        </div>
      </div>
    </footer>
  );
}
