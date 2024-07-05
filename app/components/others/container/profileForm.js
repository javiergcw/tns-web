import { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import TextInput from "@/app/components/others/fields/textInput";
import TextDisplay from "./textDisplay";
import { updateProfile, getProfileById } from "@/app/services/profileService";
import { ImagesPath } from "@/app/utils/assetsPath";
import { documentTypeOptions } from "@/app/utils/dataGeneral"; // Importar opciones de tipos de documentos

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
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUserId = localStorage.getItem("userId");
        console.log("Retrieved userId from localStorage:", storedUserId); // Depuración
        if (storedUserId) {
          setUserId(storedUserId);
          const profile = await getProfileById(storedUserId);
          console.log("Fetched profile:", profile); // Depuración
          setName(profile.name);
          setPhone(profile.identificationNumber); // Assuming this field is used for phone number
          setRole(profile.rol ? profile.rol.name : ""); // Assuming role name is available
          setPhoto(profile.photo); // Set the photo URL
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

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    if (/^\d*$/.test(e.target.value)) {
      setPhone(e.target.value);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIdentificationTypeChange = (e) => {
    setIdentificationType(e.target.value);
  };

  const handleIdentificationNumberChange = (e) => {
    if (/^\d*$/.test(e.target.value)) {
      setIdentificationNumber(e.target.value);
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
      identification_type: identificationType,
      identification_number: identificationNumber,
      phone,
      rol_id: 1, // Replace with actual role ID if necessary
      password,
      photo,
    };

    try {
      await updateProfile(userId, updatedProfile);
      closeModal();
    } catch (error) {
      console.error("Error actualizando el perfil:", error);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-8">
      <div className="mb-4 flex flex-col sm:flex-row items-center sm:items-start">
        <div className="flex flex-col items-center sm:mr-8">
          <img
            src={photo || ImagesPath.defaultProfilePhoto}
            alt="Profile"
            className="w-40 h-40 rounded-full border-2 border-green-500"
          />
          <button
            onClick={openModal}
            className="mt-4 p-2 bg-blue-500 text-white rounded-md w-full sm:w-auto"
          >
            Editar Perfil
          </button>
        </div>
        <div className="w-full space-y-4">
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
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="p-6 bg-white rounded-md w-full max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Editar Perfil</h2>
          <div className="mb-4 flex flex-col items-center">
            <img
              src={photo || ImagesPath.defaultProfilePhoto}
              alt="Profile"
              className="w-40 h-40 rounded-full border-2 border-green-500 cursor-pointer mb-2"
              onClick={() => fileInputRef.current.click()}
            />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handlePhotoChange}
            />
          </div>
          <div className="mb-4">
            <TextInput
              labelText="Nombre"
              labelColor="blue"
              inputSize="large"
              inputType="text"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="mb-4">
            <TextInput
              labelText="Celular"
              labelColor="blue"
              inputSize="large"
              inputType="text"
              value={phone}
              onChange={handlePhoneChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-sky-500">
              Tipo de Documento
            </label>
            <select
              value={identificationType}
              onChange={handleIdentificationTypeChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Selecciona un tipo</option>
              {documentTypeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <TextInput
              labelText="Número de Documento"
              labelColor="blue"
              inputSize="large"
              inputType="text"
              value={identificationNumber}
              onChange={handleIdentificationNumberChange}
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
        </div>
      </Modal>
    </div>
  );
};

export default ProfileForm;
