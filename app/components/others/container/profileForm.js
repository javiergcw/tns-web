import { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import TextInput from "@/app/components/others/fields/textInput";
import TextDisplay from "./textDisplay";
import { updateProfile, getProfileById } from "@/app/services/profileService";
import { ImagesPath } from "@/app/utils/assetsPath";
import { documentTypeOptions } from "@/app/utils/dataGeneral";
import { FiEdit } from "react-icons/fi";

Modal.setAppElement("#__next");

const ProfileForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [photo, setPhoto] = useState("");
  const [identificationType, setIdentificationType] = useState("");
  const [identificationNumber, setIdentificationNumber] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Crear estados temporales para el modal
  const [tempName, setTempName] = useState("");
  const [tempPhone, setTempPhone] = useState("");
  const [tempIdentificationType, setTempIdentificationType] = useState("");
  const [tempIdentificationNumber, setTempIdentificationNumber] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUserId = localStorage.getItem("profileId");
        if (storedUserId) {
          setUserId(storedUserId);
          const profile = await getProfileById(storedUserId);
          setName(profile.name);
          setPhone(profile.identificationNumber);
          setRole(profile.rol ? profile.rol.name : "");
          setPhoto(profile.photo);
          setIdentificationType(profile.identificationType || "");
          setIdentificationNumber(profile.identificationNumber || "");
        } else {
          throw new Error("User ID not found in localStorage");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError(error.message);
      }
    };

    fetchProfile();
  }, []);

  const handleTempNameChange = (e) => {
    setTempName(e.target.value);
  };

  const handleTempPhoneChange = (e) => {
    if (/^\d*$/.test(e.target.value)) {
      setTempPhone(e.target.value);
    }
  };

  const handleTempIdentificationTypeChange = (e) => {
    setTempIdentificationType(e.target.value);
  };

  const handleTempIdentificationNumberChange = (e) => {
    if (/^\d*$/.test(e.target.value)) {
      setTempIdentificationNumber(e.target.value);
    }
  };

  const openModal = () => {
    setTempName(name);
    setTempPhone(phone);
    setTempIdentificationType(identificationType);
    setTempIdentificationNumber(identificationNumber);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = async () => {
    setLoading(true);
    const updatedProfile = {
      name: tempName,
      identification_type: tempIdentificationType,
      identification_number: tempIdentificationNumber,
      phone: tempPhone,
      rol_id: 1,
      password,
      photo,
    };

    try {
      await updateProfile(userId, updatedProfile);
      setName(tempName);
      setPhone(tempPhone);
      setIdentificationType(tempIdentificationType);
      setIdentificationNumber(tempIdentificationNumber);
      closeModal();
    } catch (error) {
      console.error("Error actualizando el perfil:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto px-4 sm:px-8">
      <div className="mb-4 flex flex-col items-center sm:flex-row sm:items-start">
        <div className="flex w-1/4 flex-col items-center sm:mr-8">
          <img
            src={photo || ImagesPath.profileDefaultPhoto}
            alt="Profile"
            className="w-32 h-32 sm:w-60 sm:h-60 rounded-full border-2 border-green-500 object-cover"
          />
          <button
            onClick={openModal}
            className="mt-4 p-2 bg-blue-500 text-white rounded-md w-full sm:w-auto text-lg"
          >
            Editar Perfil
          </button>
        </div>
        <div className="w-2/4 space-y-4 mt-4 sm:mt-0">
          <TextDisplay
            labelText="Nombre"
            labelColor="blue"
            displaySize="large"
            value={name}
          />

          <TextDisplay
            labelText="Celular"
            labelColor="blue"
            displaySize="large"
            value={phone}
          />

          <TextDisplay
            labelText="Rol"
            labelColor="blue"
            displaySize="large"
            value={role}
          />

          <TextDisplay
            labelText="Tipo de Documento"
            labelColor="blue"
            displaySize="large"
            value={identificationType}
          />

          <TextDisplay
            labelText="Número de Documento"
            labelColor="blue"
            displaySize="large"
            value={identificationNumber}
          />
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Editar Perfil"
        className="bg-white rounded-md p-6 w-full max-w-lg mx-auto relative"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <button
          onClick={closeModal}
          className="absolute top-0 right-2 text-black text-4xl font-bold"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4 text-black">Editar Perfil</h2>
        <div className="mb-4 flex flex-col items-center relative">
          <img
            src={photo || ImagesPath.profileDefaultPhoto}
            alt="Profile"
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-2 border-greenDrawer mb-2"
          />
        </div>
        <div className="mb-4 w-full">
          <TextInput
            labelText="Nombre"
            labelColor="blue"
            inputSize="large"
            inputType="text"
            value={tempName}
            onChange={handleTempNameChange}
            className="w-full text-base p-2"
          />
        </div>
        <div className="mb-4 w-full">
          <TextInput
            labelText="Celular"
            labelColor="blue"
            inputSize="large"
            inputType="text"
            value={tempPhone}
            onChange={handleTempPhoneChange}
            className="w-full text-base p-2"
          />
        </div>
        <div className="mb-4 w-full">
          <label className="block text-large font-medium mb-2 text-sky-500">
            Tipo de Documento
          </label>
          <select
            value={tempIdentificationType}
            onChange={handleTempIdentificationTypeChange}
            className="w-full p-2 border border-gray-300 rounded text-black"
          >
            <option value="">Selecciona un tipo</option>
            {documentTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 w-full">
          <TextInput
            labelText="Número de Documento"
            labelColor="blue"
            inputSize="large"
            inputType="text"
            value={tempIdentificationNumber}
            onChange={handleTempIdentificationNumberChange}
            className="w-full text-base p-2"
          />
        </div>
        <div className="flex flex-col sm:flex-row justify-end">
          <button
            onClick={closeModal}
            className="mt-4 p-2 bg-red-500 text-white rounded-md w-full sm:w-auto"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="mt-4 p-2 bg-blue-500 text-white rounded-md sm:ml-2 w-full sm:w-auto"
          >
            Guardar
          </button>
        </div>
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="loader"></div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProfileForm;
