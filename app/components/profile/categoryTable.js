import { useState, useEffect } from "react";
import Table from "@/app/components/others/table/table"; // Importa el componente Table
import {
  getCategories,
  addCategory,
  deleteCategory,
} from "@/app/services/categoryService";
import Modal from "react-modal";
import { RedButton, BlueButton } from "@/app/utils/Buttons"; // Importa los botones constantes
import LoaderOverlay from "@/app/utils/loaderOverlay"; // Importa el LoaderOverlay
import ConfirmationModal from "../modals/modalConfirmation"; // Importa el modal de confirmación
import { getProfileById } from "@/app/services/profileService"; // Servicio para obtener el perfil del usuario

const CategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({}); // Estado para los errores de los inputs
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false); // Modal informativo para usuarios no admin
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [role, setRole] = useState(""); // Estado para el rol del usuario

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUserId = localStorage.getItem("profileId");
        if (storedUserId) {
          const userProfile = await getProfileById(storedUserId); // Obtener el perfil del usuario
          setRole(userProfile?.rol?.name || ""); // Asignar el rol del usuario
        } else {
          throw new Error("User ID not found in localStorage");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchCategories();
    fetchProfile();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch categories. Please check your authorization.");
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    let formIsValid = true;
    let tempErrors = {};

    if (newCategoryName.trim() === "") {
      tempErrors.newCategoryName = "El nombre de la categoría es obligatorio";
      formIsValid = false;
    }

    setErrors(tempErrors);

    if (!formIsValid) return;

    setLoading(true);
    try {
      await addCategory(newCategoryName);
      setNewCategoryName("");
      setIsModalOpen(false); // Cerrar el modal después de agregar la categoría
      fetchCategories();
      setErrors({}); // Limpiar errores después de la operación exitosa
    } catch (error) {
      setError("Failed to add category. Please check your authorization.");
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCategory = async () => {
    setLoading(true);
    try {
      await deleteCategory(selectedCategory.id);
      fetchCategories();
      setIsDeleteModalOpen(false);
    } catch (error) {
      setError("Failed to delete category. Please check your authorization.");
    } finally {
      setLoading(false);
    }
  };

  const columns = ["ID", "Nombre", "Acciones"];

  const rows = categories.map((category) => [
    category.id,
    category.name,
    role === "admin" ? (
      <RedButton
        text="Eliminar"
        onClick={() => openDeleteModal(category)}
        className="px-2 py-1"
      />
    ) : null, // No mostrar el botón de eliminar si el rol no es admin
  ]);

  const openInfoModal = () => {
    setIsInfoModalOpen(true); // Abrir modal informativo para usuarios no admin
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">Categorías</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <BlueButton
          text="Agregar Categoría"
          onClick={() => setIsModalOpen(true)}
        />
        {role !== "admin" && (
          <RedButton
            text="Eliminar"
            onClick={openInfoModal} // Abrir modal informativo si no es admin
            className="ml-4"
          />
        )}
      </div>
      {loading && <LoaderOverlay />}
      {!loading && categories.length === 0 && !error && (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-gray-500 text-lg mt-4">No hay datos disponibles</p>
        </div>
      )}
      {!loading && categories.length > 0 && (
        <div className="overflow-x-auto">
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
        contentLabel="Agregar Categoría"
        className="bg-white p-4 rounded shadow-md sm:w-full md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto mt-10 relative flex flex-col px-4 py-6"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-0 right-2 text-black text-4xl font-bold"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4 text-black">
          Agregar Nueva Categoría
        </h2>
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="Nombre de la Categoría"
          className={`border ${errors.newCategoryName ? 'border-red-500' : 'border-gray-300'} px-2 py-1 mb-4 w-full text-black`}
        />
        {errors.newCategoryName && <p className="text-red-500 text-sm mt-1">{errors.newCategoryName}</p>}
        <div className="flex justify-end space-x-2 mt-4">
          <BlueButton text="Agregar" onClick={handleAddCategory} />
          <RedButton text="Cancelar" onClick={() => setIsModalOpen(false)} />
        </div>
      </Modal>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteCategory}
        title="Confirmar Eliminación"
        message={`¿Está seguro que desea eliminar la categoría "${selectedCategory?.name}"?`}
      />

      <Modal
        isOpen={isInfoModalOpen}
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
          Comunícate con un administrador para eliminar esta categoría.
        </p>
        <div className="flex justify-end space-x-2 mt-4">
          <BlueButton text="Cerrar" onClick={() => setIsInfoModalOpen(false)} />
        </div>
      </Modal>
    </div>
  );
};

export default CategoryTable;
