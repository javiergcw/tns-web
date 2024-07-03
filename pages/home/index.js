// pages/home.js
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/profile'); // Cambia '/some-other-page' a la ruta a la que deseas redirigir
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Bienvenido a la Página de Inicio</h1>
      <button
        onClick={handleRedirect}
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      >
        Redirigir a Otra Página
      </button>
    </div>
  );
};

export default Home;
