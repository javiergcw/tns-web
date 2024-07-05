import { useState, useEffect } from 'react';
import { getCategories, addCategory, deleteCategory } from '@/app/services/categoryService';
import Modal from 'react-modal';

Modal.setAppElement('#__next'); // Asegúrate de que esto apunta al elemento correcto

const CategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      setError("Failed to fetch categories. Please check your authorization.");
    }
  };

  const handleAddCategory = async () => {
    if (newCategoryName.trim() === '') {
      return;
    }
    try {
      await addCategory(newCategoryName);
      setNewCategoryName('');
      setIsModalOpen(false); // Cerrar el modal después de agregar la categoría
      fetchCategories();
    } catch (error) {
      setError("Failed to add category. Please check your authorization.");
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      fetchCategories();
    } catch (error) {
      setError("Failed to delete category. Please check your authorization.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Categorías</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Agregar Categoría
        </button>
      </div>
      <table className="min-w-full bg-white border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="py-1 px-2 border text-black  border-gray-300 text-sm">ID</th>
            <th className="py-1 px-2 border text-black border-gray-300 text-sm">Nombre</th>
            <th className="py-1 px-2 border text-black border-gray-300 text-sm">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="border-t border-gray-200">
              <td className="py-1 px-2 border text-black border-gray-300 text-sm">{category.id}</td>
              <td className="py-1 px-2 border text-black border-gray-300 text-sm">{category.name}</td>
              <td className="py-1 px-2 border border-gray-300 text-sm">
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
