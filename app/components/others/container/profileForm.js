import { useState } from 'react';

const ProfileForm = () => {
  const [name, setName] = useState('Felipe Loaiza Moreno');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  return (
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
  );
};

export default ProfileForm;
