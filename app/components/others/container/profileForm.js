// src/components/ProfileForm.js
import { useState, useEffect } from "react";
import Modal from "react-modal";
import TextInput from "@/app/components/others/fields/textInput";
import { updateProfile } from "@/app/services/profileService";
import { getUserProfile } from "@/app/services/userService";
// Asegúrate de instalar react-modal: npm install react-modal

Modal.setAppElement("#root");

const ProfileForm = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Usar useEffect para obtener y establecer el perfil del usuario cuando el componente se monte
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getUserProfile();
        setName(profile.name);
        setId(profile.id);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleNameChange = (e) => {
    console.log("Name input value:", e.target.value); // Log para depuración
    setName(e.target.value);
  };
  const handleIdChange = (e) => {
    console.log("ID input value:", e.target.value); // Log para depuración
    setId(e.target.value);
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
      console.error("Error actualizando el perfil:", error);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto pl-8">
      <div className="mb-4">
        <TextInput
          labelText="Nombre"
          labelColor="blue"
          inputSize="large"
          inputType="text"
          value={name}
          onChange={handleNameChange}
        />

        <TextInput
          labelText="ID"
          labelColor="blue"
          inputSize="large"
          inputType="text"
          value={id}
          onChange={handleIdChange}
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
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
          {/* <div className="mb-4">
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
          </div> */}
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
