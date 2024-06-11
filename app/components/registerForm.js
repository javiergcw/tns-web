import { useState } from 'react';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Las contraseñas no coinciden');
      return;
    }

    const res = await fetch('https://d6d0-190-27-163-119.ngrok-free.app/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('Usuario registrado con éxito');
    } else {
      setMessage(`Error: ${data.message}`);
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
              Iniciar Sesión
            </button>
            {message && <p className="mt-4 text-green-500">{message}</p>}
          </form>
          <p className="mt-6 text-sm text-center text-gray-600">
            ¿Ya tienes cuenta? <a href="/login" className="text-blue-600 hover:underline">Inicia sesión aquí</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
