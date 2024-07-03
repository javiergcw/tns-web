import { useState } from 'react';
import { useRouter } from 'next/router';
import { register } from '@/app/services/apiService';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await register(email, password, confirmPassword, name);
      if (response) {
        setMessage('Usuario registrado con éxito');
        setShowModal(true); // Mostrar el modal
        // Guardar el token y redirigir a la página de inicio después de un tiempo
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.id);
        setTimeout(() => {
          setShowModal(false); // Ocultar el modal
          router.push('/login');
        }, 5000); // 3 segundos de espera
      } else {
        setMessage('Error en el registro');
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white">
      <div className="w-full md:w-1/2 flex justify-center items-center p-6 bg-white">
        <img
          src="https://thenewschool.edu.co/images/logo-vertical.jpeg"
          alt="Imagen de registro"
          className="max-w-full h-auto"
        />
      </div>
      <div className="w-full md:w-1/2 flex justify-center items-center p-6 bg-white">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full">
            <h2 className="text-4xl font-bold mb-2 text-blue-600">Regístrate</h2>
            <p className="text-lg text-gray-600 mb-6">Ingresa tu nombre, correo y contraseña para registrarte</p>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-900">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
                placeholder="Nombre completo"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">Correo</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
                placeholder="mail@simmmple.com"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
                placeholder="Min. 8 caracteres"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900">Confirmar Contraseña</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
                placeholder="Min. 8 caracteres"
                required
              />
            </div>
            <div className="flex items-start mb-4">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                />
              </div>
              <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900">Recuérdame</label>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-3 text-center"
            >
              Registrarse
            </button>
            {message && <p className="mt-4 text-green-500">{message}</p>}
          </form>
          <p className="mt-6 text-sm text-center text-gray-600">
            ¿Ya tienes cuenta? <a href="/login" className="text-blue-600 hover:underline">Inicia sesión aquí</a>.
          </p>
        </div>
      </div>

      {/* Modal de registro exitoso */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Registro Exitoso</h2>
            <p>Serás redirigido a la página de inicio en breve.</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setShowModal(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
