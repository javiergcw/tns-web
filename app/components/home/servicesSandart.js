import React from 'react';
import SocialMedia from './socialMedia';
import ResponsiveTriangles from './triangle';

// Componente ServicesStandart
const ServicesStandart = async () => {
    const mediaData = await getStaticProps(); // Esto es un ejemplo, reemplázalo con tu lógica real

    // Ejemplo de uso de ContainerService
    return (
        <>
            {/* Imagen Centralizada */}
            <ResponsiveTriangles />

            {/* Contenedor Principal */}
            <div className="flex flex-wrap justify-center gap-4 w-full bg-[#004F9F] px-4 py-8">
                <ContainerService
                    title="Proyecto educativo"
                    text="Conoce nuestro proyecto educativo"
                    imageUrl="/images/icons/rocket.png"
                    href="https://294347513a062ec6e0b6-8f8f94440e741fa4111c4d620d6f574f.ssl.cf5.rackcdn.com/global/TNS_PE_2021V2.pdf"
                />
                <ContainerService
                    title="Reglamento interno de trabajo"
                    text="Reglamento interno de trabajo"
                    imageUrl="/images/icons/rules.png"
                    href="https://drive.google.com/file/d/1kJfbDVMG2Bl36uECJL-gY87miejbMPI-/view?usp=sharing"
                />
                <ContainerService
                    title="Resolución de costos educativos"
                    text="Vigente para los años 2023-2024"
                    imageUrl="/images/icons/money.png"
                    href="https://drive.google.com/file/d/1x4rd2v13zeFQpqFuZ8KQrENql8ZwOcha/view?usp=sharing"
                />
                <ContainerService
                    title="Utiles escolares"
                    text="Vigente para los años 2023-2024"
                    imageUrl="/images/icons/backpack.png"
                    href="https://drive.google.com/file/d/1JFjtz1yTzPYQroivwRt67tH5x_PQZD1m/view"
                />
                <ContainerService
                    title="Manual de convivencia"
                    text="Lee nuestro manual de convivencia"
                    imageUrl="/images/icons/people.png"
                    href="https://drive.google.com/file/d/1dfQFNVT9u-3l3-Qm36qkYiefvnLr4t00/view"
                />
                <SocialMedia  />

            </div>
        </>
    );
};

export default ServicesStandart;


const ContainerService = ({ title, text, imageUrl, href }) => {
    return (
        <a href={href} className="group block text-center w-full px-2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
            <div className="p-4 transform transition duration-300 ease-in-out hover:-translate-y-2">
                <div className="w-full overflow-hidden">
                    <img src={imageUrl} alt={title} className="mx-auto w-auto h-24 object-scale-down" />
                </div>
                <h3 className="text-white text-md mt-3 font-bold">{title}</h3>
                <p className="text-white mt-2 text-xs sm:text-sm">{text}</p>
            </div>
        </a>
    );
};

export const getStaticProps = async () => {
    const accessToken = 'IGQWRNRWQyZAUs4cG5IMFhmRVFQeGNQSmxYZADR4M1J0M0lsMnphcm43ZA29ENEZAfcDVjcVpaMW43RWZAmX0w2WkdoNUdDTVJzaEtNLThTSWNfdExURkJzOHVWbktRTlljUXdBN1JGeUNJTGhMaWpIaTc3TGZAHTzZAsSHMZD'; // Asegúrate de usar tu propio Access Token

    const apiURL = `https://graph.instagram.com/me/media?fields=thumbnail_url,media_url,caption,permalink&limit=80&access_token=${accessToken}`;

    try {
        const res = await fetch(apiURL);
        const { data } = await res.json();

        // Suponiendo que 'data' es el array con tus objetos de medios
        return {
            props: {
                mediaData: data,
            },
            revalidate: 60, // En segundos, opcional, para revalidar los datos periódicamente
        };
    } catch (error) {
        console.error("Error al obtener datos de Instagram:", error);
        return {
            props: {
                mediaData: [],
            },
        };
    }
};

