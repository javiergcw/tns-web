// components/CategoryTable.js
import { useState, useEffect } from 'react';
import { getCategories, addCategory, deleteCategory } from '@/app/services/categoryService';

const CategoryTable = () => {
    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [error, setError] = useState(null);
  
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
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Nueva Categoría"
            className="border px-2 py-1 mr-2"
          />
          <button onClick={handleAddCategory} className="bg-blue-500 text-white px-4 py-2 rounded">
            Agregar Categoría
          </button>
        </div>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Nombre</th>
              <th className="border px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="border px-4 py-2">{category.id}</td>
                <td className="border px-4 py-2">{category.name}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default CategoryTable;