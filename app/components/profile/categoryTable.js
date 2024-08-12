import { useState, useEffect } from "react";
import Table from "@/app/components/others/table/table"; // Importa el componente Table
import {
  getCategories,
  addCategory,
  deleteCategory,
} from "@/app/services/categoryService";
import Lottie from "react-lottie";
import Modal from "react-modal";
import animationData from "@/public/videos/errorData.json";
import { RedButton, BlueButton } from "@/app/utils/Buttons"; // Importa los botones constantes
import LoaderOverlay from "@/app/utils/loaderOverlay"; // Importa el LoaderOverlay
import ConfirmationModal from "../modals/modalConfirmation"; // Importa el modal de confirmación

const CategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
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
    if (newCategoryName.trim() === "") {
      return;
    }
    setLoading(true);
    try {
      await addCategory(newCategoryName);
      setNewCategoryName("");
      setIsModalOpen(false); // Cerrar el modal después de agregar la categoría
      fetchCategories();
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
    <RedButton
      text="Eliminar"
      onClick={() => openDeleteModal(category)}
      className="px-2 py-1"
    />,
  ]);

  // Configuración de la animación Lottie
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
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
      </div>
      {loading && <LoaderOverlay />}
      {!loading && categories.length === 0 && !error && (
        <div className="flex flex-col items-center justify-center h-full">
          <Lottie options={defaultOptions} height={400} width={400} />
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
          <Lottie options={defaultOptions} height={400} width={400} />
          <p className="text-red-500 text-lg mt-4">Error: {error}</p>
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Agregar Categoría"
        className="bg-white p-4 rounded shadow-md w-full max-w-md mx-auto mt-10 relative"
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
          className="border px-2 py-1 mb-4 w-full text-black"
        />
        <BlueButton text="Agregar" onClick={handleAddCategory} />
        <RedButton
          text="Cancelar"
          onClick={() => setIsModalOpen(false)}
          className="ml-2"
        />
      </Modal>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteCategory}
        title="Confirmar Eliminación"
        message={`¿Está seguro que desea eliminar la categoría "${selectedCategory?.name}"?`}
      />
    </div>
  );
};

export default CategoryTable;
