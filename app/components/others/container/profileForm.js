import { useState, useEffect } from "react";
import Modal from "react-modal";
import TextInput from "@/app/components/others/fields/textInput";
import TextDisplay from "./textDisplay";
import { updateProfile, getProfileById } from "@/app/services/profileService";
import { ImagesPath } from "@/app/utils/assetsPath";
import { documentTypeOptions } from "@/app/utils/dataGeneral";
import { getRoles } from "@/app/services/roleService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#__next");

const ProfileForm = () => {
  const [name, setName] = useState("");
  const [identification_type, setIdentificationType] = useState("");
  const [identification_number, setIdentificationNumber] = useState("");
  const [role, setRole] = useState("");
  const [rol_id, setRolId] = useState("");
  const [photo, setPhoto] = useState("");
  const [issue_place, setIssuePlace] = useState("");
  const [position, setPosition] = useState("");
  const [contract_type, setContractType] = useState("");
  const [hire_date, setHireDate] = useState("");
  const [base_salary, setBaseSalary] = useState("");
  const [study_bonus, setStudyBonus] = useState("");
  const [responsibility_bonus, setResponsibilityBonus] = useState("");
  const [status, setStatus] = useState("active");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [userRole, setUserRole] = useState(""); // Rol del usuario logueado

  // Estados temporales para el modal
  const [tempName, setTempName] = useState("");
  const [tempIdentificationType, setTempIdentificationType] = useState("");
  const [tempIdentificationNumber, setTempIdentificationNumber] = useState("");
  const [tempRolId, setTempRolId] = useState("");
  const [tempIssuePlace, setTempIssuePlace] = useState("");
  const [tempPosition, setTempPosition] = useState("");
  const [tempContractType, setTempContractType] = useState("");
  const [tempHireDate, setTempHireDate] = useState("");
  const [tempBaseSalary, setTempBaseSalary] = useState("");
  const [tempStudyBonus, setTempStudyBonus] = useState("");
  const [tempResponsibilityBonus, setTempResponsibilityBonus] = useState("");
  const [tempStatus, setTempStatus] = useState("active");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUserId = localStorage.getItem("profileId");
        const storedRole = localStorage.getItem("role"); // Suponiendo que el rol está en localStorage
        if (storedUserId) {
          setUserId(storedUserId);
          setUserRole(storedRole || "");
          const profile = await getProfileById(storedUserId);
          console.log("Fetched profile:", profile); // Depuración
          setName(profile.name || "");
          setIdentificationType(profile.identification_type || "");
          setIdentificationNumber(profile.identification_number || "");
          setRole(profile.rol ? profile.rol.name : "");
          setRolId(profile.rol ? String(profile.rol.id) : "");
          setPhoto(profile.photo || "");
          setIssuePlace(profile.issue_place || "");
          setPosition(profile.position || "");
          setContractType(profile.contract_type || "");
          setHireDate(profile.hire_date ? profile.hire_date.split("T")[0] : "");
          setBaseSalary(profile.base_salary !== undefined ? String(profile.base_salary) : "");
          setStudyBonus(profile.study_bonus !== undefined ? String(profile.study_bonus) : "");
          setResponsibilityBonus(profile.responsibility_bonus !== undefined ? String(profile.responsibility_bonus) : "");
          setStatus(profile.status || "active");
        } else {
          throw new Error("User ID not found in localStorage");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError(error.message);
        toast.error("Error al cargar el perfil");
      }
    };

    const fetchRoles = async () => {
      try {
        const data = await getRoles();
        console.log("Fetched roles:", data); // Depuración
        setRoles(data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchProfile();
    fetchRoles();
  }, []);

  const handleTempNameChange = (e) => {
    setTempName(e.target.value);
  };

  const handleTempIdentificationTypeChange = (e) => {
    setTempIdentificationType(e.target.value);
  };

  const handleTempIdentificationNumberChange = (e) => {
    if (/^\d*$/.test(e.target.value)) {
      setTempIdentificationNumber(e.target.value);
    }
  };

  const handleTempRolIdChange = (e) => {
    setTempRolId(e.target.value);
  };

  const handleTempIssuePlaceChange = (e) => {
    setTempIssuePlace(e.target.value);
  };

  const handleTempPositionChange = (e) => {
    setTempPosition(e.target.value);
  };

  const handleTempContractTypeChange = (e) => {
    setTempContractType(e.target.value);
  };

  const handleTempHireDateChange = (e) => {
    setTempHireDate(e.target.value);
  };

  const handleTempBaseSalaryChange = (e) => {
    setTempBaseSalary(e.target.value);
  };

  const handleTempStudyBonusChange = (e) => {
    setTempStudyBonus(e.target.value);
  };

  const handleTempResponsibilityBonusChange = (e) => {
    setTempResponsibilityBonus(e.target.value);
  };

  const handleTempStatusChange = (e) => {
    setTempStatus(e.target.value);
  };

  const openModal = () => {
    setTempName(name);
    setTempIdentificationType(identification_type);
    setTempIdentificationNumber(identification_number);
    setTempRolId(rol_id);
    setTempIssuePlace(issue_place);
    setTempPosition(position);
    setTempContractType(contract_type);
    setTempHireDate(hire_date);
    setTempBaseSalary(base_salary);
    setTempStudyBonus(study_bonus);
    setTempResponsibilityBonus(responsibility_bonus);
    setTempStatus(status);
    setErrors({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const validateForm = () => {
    let formIsValid = true;
    let tempErrors = {};

    if (tempName.trim() === "") {
      tempErrors.name = "El nombre es obligatorio";
      formIsValid = false;
    }
    if (tempIdentificationType.trim() === "") {
      tempErrors.identification_type = "El tipo de identificación es obligatorio";
      formIsValid = false;
    }
    if (tempIdentificationNumber.trim() === "" || !/^\d+$/.test(tempIdentificationNumber)) {
      tempErrors.identification_number = "El número de identificación solo debe contener números";
      formIsValid = false;
    }
    if (tempRolId === "") {
      tempErrors.rol_id = "El rol es obligatorio";
      formIsValid = false;
    }
    if (["admin", "Gestión Humana"].includes(userRole)) {
      if (tempIssuePlace.trim() === "") {
        tempErrors.issue_place = "El lugar de expedición es obligatorio";
        formIsValid = false;
      }
      if (tempPosition.trim() === "") {
        tempErrors.position = "El cargo es obligatorio";
        formIsValid = false;
      }
      if (tempContractType.trim() === "") {
        tempErrors.contract_type = "El tipo de contrato es obligatorio";
        formIsValid = false;
      }
      if (tempHireDate === "") {
        tempErrors.hire_date = "La fecha de ingreso es obligatoria";
        formIsValid = false;
      }
      if (tempBaseSalary === "" || isNaN(tempBaseSalary) || Number(tempBaseSalary) <= 0) {
        tempErrors.base_salary = "El salario básico debe ser un número positivo";
        formIsValid = false;
      }
      if (tempStudyBonus && (isNaN(tempStudyBonus) || Number(tempStudyBonus) < 0)) {
        tempErrors.study_bonus = "La bonificación por estudios debe ser un número no negativo";
        formIsValid = false;
      }
      if (tempResponsibilityBonus && (isNaN(tempResponsibilityBonus) || Number(tempResponsibilityBonus) < 0)) {
        tempErrors.responsibility_bonus = "La bonificación por responsabilidad debe ser un número no negativo";
        formIsValid = false;
      }
      if (!["active", "inactive"].includes(tempStatus)) {
        tempErrors.status = "El estado debe ser 'active' o 'inactive'";
        formIsValid = false;
      }
    }

    setErrors(tempErrors);
    return formIsValid;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setLoading(true);
    const updatedProfile = {
      name: tempName,
      identification_type: tempIdentificationType,
      identification_number: tempIdentificationNumber,
      rol_id: Number(tempRolId),
      issue_place: tempIssuePlace,
      position: tempPosition,
      contract_type: tempContractType,
      hire_date: tempHireDate,
      base_salary: Number(tempBaseSalary),
      study_bonus: Number(tempStudyBonus) || 0,
      responsibility_bonus: Number(tempResponsibilityBonus) || 0,
      status: tempStatus,
      photo,
    };

    console.log("Updating profile with:", updatedProfile); // Depuración
    try {
      await updateProfile(userId, updatedProfile);
      setName(tempName);
      setIdentificationType(tempIdentificationType);
      setIdentificationNumber(tempIdentificationNumber);
      setRolId(tempRolId);
      setRole(roles.find((r) => r.id === Number(tempRolId))?.name || "");
      setIssuePlace(tempIssuePlace);
      setPosition(tempPosition);
      setContractType(tempContractType);
      setHireDate(tempHireDate);
      setBaseSalary(tempBaseSalary);
      setStudyBonus(tempStudyBonus);
      setResponsibilityBonus(tempResponsibilityBonus);
      setStatus(tempStatus);
      closeModal();
      toast.success("Perfil actualizado exitosamente");
    } catch (error) {
      console.error("Error actualizando el perfil:", error);
      setError("No se pudo actualizar el perfil");
      toast.error("Error al actualizar el perfil");
    } finally {
      setLoading(false);
    }
  };

  const isAdminOrGestionHumana = ["admin", "Gestión Humana"].includes(userRole);

  return (
      <div className="w-full mx-auto px-4 sm:px-8">
        <ToastContainer />
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
                labelText="Tipo de Documento"
                labelColor="blue"
                displaySize="large"
                value={identification_type}
            />
            <TextDisplay
                labelText="Número de Documento"
                labelColor="blue"
                displaySize="large"
                value={identification_number}
            />
            <TextDisplay
                labelText="Rol"
                labelColor="blue"
                displaySize="large"
                value={role}
            />
            {isAdminOrGestionHumana && (
                <>
                  <TextDisplay
                      labelText="Lugar de Expedición"
                      labelColor="blue"
                      displaySize="large"
                      value={issue_place}
                  />
                  <TextDisplay
                      labelText="Cargo"
                      labelColor="blue"
                      displaySize="large"
                      value={position}
                  />
                  <TextDisplay
                      labelText="Tipo de Contrato"
                      labelColor="blue"
                      displaySize="large"
                      value={contract_type}
                  />
                  <TextDisplay
                      labelText="Fecha de Ingreso"
                      labelColor="blue"
                      displaySize="large"
                      value={hire_date}
                  />
                  <TextDisplay
                      labelText="Salario Básico"
                      labelColor="blue"
                      displaySize="large"
                      value={base_salary ? `$${parseFloat(base_salary).toLocaleString()}` : ""}
                  />
                  <TextDisplay
                      labelText="Bonificación por Estudios"
                      labelColor="blue"
                      displaySize="large"
                      value={study_bonus ? `$${parseFloat(study_bonus).toLocaleString()}` : ""}
                  />
                  <TextDisplay
                      labelText="Bonificación por Responsabilidad"
                      labelColor="blue"
                      displaySize="large"
                      value={responsibility_bonus ? `$${parseFloat(responsibility_bonus).toLocaleString()}` : ""}
                  />
                  <TextDisplay
                      labelText="Estado"
                      labelColor="blue"
                      displaySize="large"
                      value={status === "active" ? "Activo" : "Inactivo"}
                  />
                </>
            )}
          </div>
        </div>

        <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Editar Perfil"
            className="bg-white rounded-md p-6 w-full max-w-lg mx-auto relative max-h-[80vh] overflow-y-auto"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-10"
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
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div className="mb-4 w-full">
            <label className="block text-large font-medium mb-2 text-sky-500">
              Tipo de Documento
            </label>
            <select
                value={tempIdentificationType}
                onChange={handleTempIdentificationTypeChange}
                className={`w-full p-2 border ${errors.identification_type ? "border-red-500" : "border-gray-300"} rounded text-black`}
            >
              <option value="">Selecciona un tipo</option>
              {documentTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
              ))}
            </select>
            {errors.identification_type && <p className="text-red-500 text-sm mt-1">{errors.identification_type}</p>}
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
                pattern="\d*"
                title="Por favor ingrese solo números"
            />
            {errors.identification_number && <p className="text-red-500 text-sm mt-1">{errors.identification_number}</p>}
          </div>
          <div className="mb-4 w-full">
            <label className="block text-large font-medium mb-2 text-sky-500">
              Rol
            </label>
            <select
                value={tempRolId}
                onChange={handleTempRolIdChange}
                className={`w-full p-2 border ${errors.rol_id ? "border-red-500" : "border-gray-300"} rounded text-black`}
            >
              <option value="">Selecciona un rol</option>
              {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
              ))}
            </select>
            {errors.rol_id && <p className="text-red-500 text-sm mt-1">{errors.rol_id}</p>}
          </div>
          {isAdminOrGestionHumana && (
              <>
                <div className="mb-4 w-full">
                  <TextInput
                      labelText="Lugar de Expedición"
                      labelColor="blue"
                      inputSize="large"
                      inputType="text"
                      value={tempIssuePlace}
                      onChange={handleTempIssuePlaceChange}
                      className="w-full text-base p-2"
                  />
                  {errors.issue_place && <p className="text-red-500 text-sm mt-1">{errors.issue_place}</p>}
                </div>
                <div className="mb-4 w-full">
                  <TextInput
                      labelText="Cargo"
                      labelColor="blue"
                      inputSize="large"
                      inputType="text"
                      value={tempPosition}
                      onChange={handleTempPositionChange}
                      className="w-full text-base p-2"
                  />
                  {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}
                </div>
                <div className="mb-4 w-full">
                  <TextInput
                      labelText="Tipo de Contrato"
                      labelColor="blue"
                      inputSize="large"
                      inputType="text"
                      value={tempContractType}
                      onChange={handleTempContractTypeChange}
                      className="w-full text-base p-2"
                  />
                  {errors.contract_type && <p className="text-red-500 text-sm mt-1">{errors.contract_type}</p>}
                </div>
                <div className="mb-4 w-full">
                  <TextInput
                      labelText="Fecha de Ingreso"
                      labelColor="blue"
                      inputSize="large"
                      inputType="date"
                      value={tempHireDate}
                      onChange={handleTempHireDateChange}
                      className="w-full text-base p-2"
                  />
                  {errors.hire_date && <p className="text-red-500 text-sm mt-1">{errors.hire_date}</p>}
                </div>
                <div className="mb-4 w-full">
                  <TextInput
                      labelText="Salario Básico"
                      labelColor="blue"
                      inputSize="large"
                      inputType="number"
                      value={tempBaseSalary}
                      onChange={handleTempBaseSalaryChange}
                      className="w-full text-base p-2"
                      step="0.01"
                      min="0"
                  />
                  {errors.base_salary && <p className="text-red-500 text-sm mt-1">{errors.base_salary}</p>}
                </div>
                <div className="mb-4 w-full">
                  <TextInput
                      labelText="Bonificación por Estudios"
                      labelColor="blue"
                      inputSize="large"
                      inputType="number"
                      value={tempStudyBonus}
                      onChange={handleTempStudyBonusChange}
                      className="w-full text-base p-2"
                      step="0.01"
                      min="0"
                  />
                  {errors.study_bonus && <p className="text-red-500 text-sm mt-1">{errors.study_bonus}</p>}
                </div>
                <div className="mb-4 w-full">
                  <TextInput
                      labelText="Bonificación por Responsabilidad"
                      labelColor="blue"
                      inputSize="large"
                      inputType="number"
                      value={tempResponsibilityBonus}
                      onChange={handleTempResponsibilityBonusChange}
                      className="w-full text-base p-2"
                      step="0.01"
                      min="0"
                  />
                  {errors.responsibility_bonus && <p className="text-red-500 text-sm mt-1">{errors.responsibility_bonus}</p>}
                </div>
                <div className="mb-4 w-full">
                  <label className="block text-large font-medium mb-2 text-sky-500">
                    Estado
                  </label>
                  <select
                      value={tempStatus}
                      onChange={handleTempStatusChange}
                      className={`w-full p-2 border ${errors.status ? "border-red-500" : "border-gray-300"} rounded text-black`}
                  >
                    <option value="active">Activo</option>
                    <option value="inactive">Inactivo</option>
                  </select>
                  {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
                </div>
              </>
          )}
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