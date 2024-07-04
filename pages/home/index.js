import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Home = () => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    setToken(storedToken);
    setUserId(storedUserId);
  }, []);

  const handleRedirect = () => {
    router.push("/profile"); // Cambia '/profile' a la ruta a la que deseas redirigir
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">
        Bienvenido a la Página de Inicio
      </h1>
      <p className="mb-4">Token: {token}</p>
      <p className="mb-4">User ID: {userId}</p>
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
