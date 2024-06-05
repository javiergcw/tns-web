import { useState } from 'react';

const ProfileForm = () => {
  const [image, setImage] = useState('/path/to/default/image.jpg');
  const [name, setName] = useState('Felipe Loaiza Moreno');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">MI PERFIL</h1>
      <hr className="mb-6 border-gray-300"/>
      <div className="flex justify-between">
        <div className="flex flex-col items-center w-1/3">
          <div className="relative w-40 h-40 mb-4 group">
            <img
              src={image}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-green-500"
            />
            <label
              htmlFor="imageUpload"
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 7V4a2 2 0 012-2h3m10 0h3a2 2 0 012 2v3m-5 0h5m-5 0a2 2 0 01-2 2H8m0 0H4m0 0a2 2 0 01-2-2V8m0 0V4m0 4l8 8m0 0l-8-8m8 8l8-8"
                />
              </svg>
            </label>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <button className="w-32 bg-blueButton text-white p-3 rounded-md font-bold">
            Guardar
          </button>
        </div>
        <div className="w-2/3 pl-8">
          <div className="mb-4">
            <label className="block text-blue-700 font-bold mb-2">
              Nombre completo:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-blue-700 font-bold mb-2">
              Celular:
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-blue-700 font-bold mb-2">
              Contraseña:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
