// src/components/ProfileForm.js
import { useState, useEffect } from 'react';
import { useAuth } from '@/app/store/authContext';
import Modal from 'react-modal';
import { updateProfile } from '@/app/services/profileService';
// Asegúrate de instalar react-modal: npm install react-modal

Modal.setAppElement('#root');

const ProfileForm = () => {
  const { user, setUser } = useAuth();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPhone(user.phone);
    }
  }, [user]);

  const handlePhoneKeyPress = (event) => {
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = async () => {
    const updatedProfile = {
      name,
      identification_type: user.identificationType, // Assuming these fields are part of the user object
      identification_number: user.identificationNumber,
      rol_id: user.rolId,
    };

    try {
      const updatedUser = await updateProfile(user.id, updatedProfile);
      setUser(updatedUser);
      closeModal();
    } catch (error) {
      console.error('Error actualizando el perfil:', error);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto pl-8">
      <div className="mb-4">
        <label className="block text-blue-700 font-bold mb-2">
          Nombre completo:
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md"
          disabled
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
          onKeyPress={handlePhoneKeyPress}
          className="w-full p-3 border border-gray-300 rounded-md"
          disabled
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
          disabled
        />
      </div>
      <button
        onClick={openModal}
        className="mt-4 p-2 bg-blue-500 text-white rounded-md"
      >
        Editar Perfil
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Editar Perfil"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="p-6 bg-white rounded-md w-full max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Editar Perfil</h2>
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
              onKeyPress={handlePhoneKeyPress}
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
          <div className="flex justify-end">
            <button
              onClick={closeModal}
              className="mt-4 p-2 bg-red-500 text-white rounded-md"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="mt-4 p-2 bg-blue-500 text-white rounded-md ml-2"
            >
              Guardar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileForm;