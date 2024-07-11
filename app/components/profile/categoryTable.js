import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Table from '@/app/components/others/table/table'; // Importa el componente Table
import { getCategories, addCategory, deleteCategory } from '@/app/services/categoryService';
import Lottie from 'react-lottie';
import animationData from '@/public/videos/errorData.json';

Modal.setAppElement('#__next'); // Asegúrate de que esto apunta al elemento correcto

const CategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

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
    if (newCategoryName.trim() === '') {
      return;
    }
    setLoading(true);
    try {
      await addCategory(newCategoryName);
      setNewCategoryName('');
      setIsModalOpen(false); // Cerrar el modal después de agregar la categoría
      fetchCategories();
    } catch (error) {
      setError("Failed to add category. Please check your authorization.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    setLoading(true);
    try {
      await deleteCategory(id);
      fetchCategories();
    } catch (error) {
      setError("Failed to delete category. Please check your authorization.");
    } finally {
      setLoading(false);
    }
  };

  const columns = ["ID", "Nombre", "Acciones"];

  const rows = categories.map(category => [
    category.id,
    category.name,
    <button
      onClick={() => handleDeleteCategory(category.id)}
      className="bg-red-500 text-white px-2 py-1 rounded"
    >
      Eliminar
    </button>
  ]);

  // Configuración de la animación Lottie
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">Categorías</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Agregar Categoría
        </button>
      </div>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="loader"></div>
        </div>
      )}
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
        className="bg-white p-4 rounded shadow-md w-full max-w-md mx-auto mt-10"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-2xl font-bold mb-4">Agregar Nueva Categoría</h2>
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="Nombre de la Categoría"
          className="border px-2 py-1 mb-4 w-full"
        />
        <button onClick={handleAddCategory} className="bg-blue-500 text-white px-4 py-2 rounded">
          Agregar
        </button>
        <button
          onClick={() => setIsModalOpen(false)}
          className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
        >
          Cancelar
        </button>
      </Modal>
    </div>
  );
};

export default CategoryTable;
