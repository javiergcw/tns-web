import { useState, useEffect } from "react";
import Modal from "react-modal";
import Table from "@/app/components/others/table/table"; // Importar el componente Table
import { getAllAccountTypes, createAccountType, updateAccountType, deleteAccountType } from "@/app/services/accountTypeService"; // Importa los servicios correctos
import { RedButton, BlueButton } from "@/app/utils/Buttons"; // Importar los botones
import LoaderOverlay from "@/app/utils/loaderOverlay"; // Importar el LoaderOverlay
import ConfirmationModal from "../modals/modalConfirmation"; // Importar el modal de confirmación
import { getProfileById } from "@/app/services/profileService"; // Servicio para obtener el perfil del usuario

Modal.setAppElement("#__next");

const AccountTypeTable = () => {
    const [accountTypes, setAccountTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({}); // Estado para errores específicos de los campos
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false); // Modal informativo para usuarios no admin
    const [newAccountTypeName, setNewAccountTypeName] = useState("");
    const [newCupo, setNewCupo] = useState(""); // Nuevo estado para cupo
    const [selectedAccountType, setSelectedAccountType] = useState(null);
    const [role, setRole] = useState(""); // Estado para el rol del usuario

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const storedUserId = localStorage.getItem("profileId");
                if (storedUserId) {
                    const userProfile = await getProfileById(storedUserId); // Llama tu servicio para obtener el perfil del usuario
                    setRole(userProfile?.rol?.name || ""); // Asignar el rol del usuario
                } else {
                    throw new Error("User ID not found in localStorage");
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchAccountTypes();
        fetchProfile();
    }, []);

    const fetchAccountTypes = async () => {
        try {
            setLoading(true);
            const data = await getAllAccountTypes();
            setAccountTypes(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching account types:", error);
            setError(error.message);
            setLoading(false);
        }
    };

    const handleAddAccountType = async () => {
        let formIsValid = true;
        let tempErrors = {};

        if (!newAccountTypeName.trim()) {
            tempErrors.newAccountTypeName = "El nombre del tipo de cuenta es obligatorio";
            formIsValid = false;
        }

        // if (!newCupo.trim()) {
        //     tempErrors.newCupo = "El cupo es obligatorio";
        //     formIsValid = false;
        // }

        setErrors(tempErrors);

        if (!formIsValid) return;

        try {
            setLoading(true);
            await createAccountType({ name: newAccountTypeName, cupo: 1 });
            setNewAccountTypeName(""); // Limpiar el campo de entrada
            //setNewCupo(""); // Limpiar el campo de cupo
            fetchAccountTypes();
            setIsModalOpen(false);
            setErrors({}); // Limpiar errores después de la operación exitosa
        } catch (error) {
            console.error("Error adding account type:", error);
            setError("Failed to add account type.");
        } finally {
            setLoading(false);
        }
    };

    const handleEditAccountType = async () => {
        let formIsValid = true;
        let tempErrors = {};

        if (!newAccountTypeName.trim()) {
            tempErrors.newAccountTypeName = "El nombre del tipo de cuenta es obligatorio";
            formIsValid = false;
        }

        if (!newCupo.trim()) {
            tempErrors.newCupo = "El cupo es obligatorio";
            formIsValid = false;
        }

        setErrors(tempErrors);

        if (!formIsValid) return;

        try {
            setLoading(true);
            await updateAccountType(selectedAccountType.id, { name: newAccountTypeName, cupo: newCupo });
            fetchAccountTypes();
            setIsEditModalOpen(false);
            setErrors({}); // Limpiar errores después de la operación exitosa
        } catch (error) {
            console.error("Error updating account type:", error);
            setError("Failed to update account type.");
        } finally {
            setLoading(false);
        }
    };

    const openAddModal = () => {
        setNewAccountTypeName(""); // Limpiar el nombre del tipo de cuenta
        setNewCupo(""); // Limpiar el cupo
        setErrors({}); // Limpiar los errores cuando se abre el modal
        setIsModalOpen(true);
    };

    const openEditModal = (accountType) => {
        setSelectedAccountType(accountType);
        setNewAccountTypeName(accountType.name); // Pre-cargar el nombre actual en el modal
        setNewCupo(accountType.cupo); // Pre-cargar el cupo actual en el modal
        setErrors({}); // Limpiar los errores cuando se abre el modal
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (accountType) => {
        setSelectedAccountType(accountType);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteAccountType = async () => {
        try {
            setLoading(true);
            await deleteAccountType(selectedAccountType.id);
            fetchAccountTypes();
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.error("Error deleting account type:", error);
            setError("Failed to delete account type.");
        } finally {
            setLoading(false);
        }
    };

    const openInfoModal = () => {
        setIsInfoModalOpen(true); // Abrir modal informativo para usuarios no admin
    };

    const columns = ["ID", "Nombre", "Cupo", "Creado en", "Actualizado en", "Acciones"];

    const rows = accountTypes.map((accountType) => [
        accountType.id,
        accountType.name,
        accountType.cupo,
        new Date(accountType.created_at).toLocaleString(),
        new Date(accountType.updated_at).toLocaleString(),

        <>
            <BlueButton
                text="Editar"
                onClick={() => openEditModal(accountType)}
                className="px-2 py-1"
            />
            {(role === "admin" || role === "Developer") && (
                <RedButton
                    text="Eliminar"
                    onClick={() => openDeleteModal(accountType)}
                    className="px-2 py-1 ml-2"
                />
            )}
        </>
        // No mostrar acciones si el rol no es admin
    ]);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-blue-800">Tipos de Cuenta</h2>
            <div className="mb-4">
                <BlueButton
                    text="Añadir Tipo de Cuenta"
                    onClick={openAddModal} // Usar la nueva función para abrir el modal
                    className="mt-4 p-2"
                />
                {role === "Compras" && (
                    <RedButton
                        text="Eliminar"
                        onClick={openInfoModal} // Abrir modal informativo si no es admin
                        className="ml-4"
                    />
                )}
            </div>
            {loading && <LoaderOverlay />}
            {!loading && accountTypes.length === 0 && !error && (
                <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-gray-500 text-lg mt-4">No hay datos disponibles</p>
                </div>
            )}
            {!loading && accountTypes.length > 0 && (
                <div className="overflow-y-auto h-full">
                    <Table columns={columns} data={rows} />
                </div>
            )}
            {error && (
                <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-red-500 text-lg mt-4">Error: {error}</p>
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="Añadir Tipo de Cuenta"
                className="bg-white p-4 rounded shadow-md sm:w-full md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto mt-10 relative flex flex-col px-4 py-6"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
                <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-0 right-2 text-black text-4xl font-bold"
                >
                    ×
                </button>
                <h2 className="text-2xl font-bold mb-4 text-black">Añadir Tipo de Cuenta</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-black">
                        Nombre del Tipo de Cuenta
                    </label>
                    <input
                        type="text"
                        value={newAccountTypeName}
                        onChange={(e) => setNewAccountTypeName(e.target.value)}
                        className={`w-full p-2 border ${errors.newAccountTypeName ? 'border-red-500' : 'border-gray-300'} rounded text-black`}
                    />
                    {errors.newAccountTypeName && <p className="text-red-500 text-sm mt-1">{errors.newAccountTypeName}</p>}
                </div>
                {/* <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-black">
                        Cupo
                    </label>
                    <input
                        type="text"
                        value={newCupo}
                        onChange={(e) => setNewCupo(e.target.value)}
                        className={`w-full p-2 border ${errors.newCupo ? 'border-red-500' : 'border-gray-300'} rounded text-black`}
                    />
                    {errors.newCupo && <p className="text-red-500 text-sm mt-1">{errors.newCupo}</p>}
                
                </div> */}
                <div className="flex justify-end space-x-2 mt-4">
                    <BlueButton text="Guardar" onClick={handleAddAccountType} />
                    <RedButton
                        text="Cancelar"
                        onClick={() => setIsModalOpen(false)}
                    />
                </div>
            </Modal>

            <Modal
                isOpen={isEditModalOpen}
                onRequestClose={() => setIsEditModalOpen(false)}
                contentLabel="Editar Tipo de Cuenta"
                className="bg-white p-4 rounded shadow-md sm:w-full md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto mt-10 relative flex flex-col px-4 py-6"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
                <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="absolute top-0 right-2 text-black text-4xl font-bold"
                >
                    ×
                </button>
                <h2 className="text-2xl font-bold mb-4 text-black">Editar Tipo de Cuenta</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-black">
                        Nombre del Tipo de Cuenta
                    </label>
                    <input
                        type="text"
                        value={newAccountTypeName}
                        onChange={(e) => setNewAccountTypeName(e.target.value)}
                        className={`w-full p-2 border ${errors.newAccountTypeName ? 'border-red-500' : 'border-gray-300'} rounded text-black`}
                    />
                    {errors.newAccountTypeName && <p className="text-red-500 text-sm mt-1">{errors.newAccountTypeName}</p>}
                </div>
                {/* <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-black">
                        Cupo
                    </label>
                    <input
                        type="text"
                        value={newCupo}
                        onChange={(e) => setNewCupo(e.target.value)}
                        className={`w-full p-2 border ${errors.newCupo ? 'border-red-500' : 'border-gray-300'} rounded text-black`}
                    />
                    {errors.newCupo && <p className="text-red-500 text-sm mt-1">{errors.newCupo}</p>}
                </div> */}
                <div className="flex justify-end space-x-2 mt-4">
                    <BlueButton text="Actualizar" onClick={handleEditAccountType} />
                    <RedButton
                        text="Cancelar"
                        onClick={() => setIsEditModalOpen(false)}
                    />
                </div>
            </Modal>

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onRequestClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteAccountType}
                title="Confirmar Eliminación"
                message={`¿Está seguro que desea eliminar el tipo de cuenta "${selectedAccountType?.name}"?`}
            />

            <Modal
                isOpen={isInfoModalOpen} // Modal informativo para usuarios no admin
                onRequestClose={() => setIsInfoModalOpen(false)}
                contentLabel="Sin Permisos"
                className="bg-white p-4 rounded shadow-md sm:w-full md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto mt-10 relative flex flex-col px-4 py-6"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
                <button
                    onClick={() => setIsInfoModalOpen(false)}
                    className="absolute top-0 right-2 text-black text-4xl font-bold"
                >
                    ×
                </button>
                <h2 className="text-2xl font-bold mb-4 text-black">Sin Permisos</h2>
                <p className="text-black mb-4">
                    Comunícate con un administrador para eliminar este tipo de cuenta.
                </p>
                <div className="flex justify-end space-x-2 mt-4">
                    <BlueButton
                        text="Cerrar"
                        onClick={() => setIsInfoModalOpen(false)}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default AccountTypeTable;
