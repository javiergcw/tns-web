// src/components/ProfileForm.js
import { useState, useEffect } from 'react';
import { useAuth } from '@/app/store/authContext';

const ProfileForm = () => {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPhone(user.phone);
    }
  }, [user]);

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
