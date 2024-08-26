import { useState, useEffect } from "react";
import Modal from "react-modal";
import Table from "@/app/components/others/table/table"; // Importar el componente Table
import { getAllAccountTypes, createAccountType, updateAccountType, deleteAccountType } from "@/app/services/accountTypeService"; // Importa los servicios correctos
import { RedButton, BlueButton } from "@/app/utils/Buttons"; // Importar los botones
import LoaderOverlay from "@/app/utils/loaderOverlay"; // Importar el LoaderOverlay
import ConfirmationModal from "../modals/modalConfirmation"; // Importar el modal de confirmación

Modal.setAppElement("#__next");

const AccountTypeTable = () => {
    const [accountTypes, setAccountTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [newAccountTypeName, setNewAccountTypeName] = useState("");
    const [newCupo, setNewCupo] = useState(""); // Nuevo estado para cupo
    const [selectedAccountType, setSelectedAccountType] = useState(null);

    useEffect(() => {
        fetchAccountTypes();
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
        try {
            setLoading(true);
            await createAccountType({ name: newAccountTypeName, cupo: newCupo }); // Incluir cupo
            setNewAccountTypeName(""); // Limpiar el campo de entrada
            setNewCupo(""); // Limpiar el campo de cupo
            fetchAccountTypes();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error adding account type:", error);
            setError("Failed to add account type.");
        } finally {
            setLoading(false);
        }
    };

    const handleEditAccountType = async () => {
        try {
            setLoading(true);
            await updateAccountType(selectedAccountType.id, { name: newAccountTypeName, cupo: newCupo }); // Incluir cupo
            fetchAccountTypes();
            setIsEditModalOpen(false);
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
        setIsModalOpen(true);
    };

    const openEditModal = (accountType) => {
        setSelectedAccountType(accountType);
        setNewAccountTypeName(accountType.name); // Pre-cargar el nombre actual en el modal
        setNewCupo(accountType.cupo); // Pre-cargar el cupo actual en el modal
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
            <RedButton
                text="Eliminar"
                onClick={() => openDeleteModal(accountType)}
                className="px-2 py-1 ml-2"
            />
        </>,
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
                className="bg-white p-4 rounded shadow-md w-full max-w-md mx-auto mt-10 relative"
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
                        className="w-full p-2 border border-gray-300 rounded text-black"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-black">
                        Cupo
                    </label>
                    <input
                        type="text"
                        value={newCupo}
                        onChange={(e) => setNewCupo(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-black"
                    />
                </div>
                <BlueButton text="Guardar" onClick={handleAddAccountType} />
                <RedButton
                    text="Cancelar"
                    onClick={() => setIsModalOpen(false)}
                    className="ml-2"
                />
            </Modal>

            <Modal
                isOpen={isEditModalOpen}
                onRequestClose={() => setIsEditModalOpen(false)}
                contentLabel="Editar Tipo de Cuenta"
                className="bg-white p-4 rounded shadow-md w-full max-w-md mx-auto mt-10 relative"
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
                        className="w-full p-2 border border-gray-300 rounded text-black"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-black">
                        Cupo
                    </label>
                    <input
                        type="text"
                        value={newCupo}
                        onChange={(e) => setNewCupo(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-black"
                    />
                </div>
                <BlueButton text="Actualizar" onClick={handleEditAccountType} />
                <RedButton
                    text="Cancelar"
                    onClick={() => setIsEditModalOpen(false)}
                    className="ml-2"
                />
            </Modal>

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onRequestClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteAccountType}
                title="Confirmar Eliminación"
                message={`¿Está seguro que desea eliminar el tipo de cuenta "${selectedAccountType?.name}"?`}
            />
        </div>
    );
};

export default AccountTypeTable;
