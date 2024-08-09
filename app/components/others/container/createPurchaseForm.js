import React, { useState, useEffect } from "react";
import { getCategories } from "@/app/services/categoryService";
import { createShopping } from "@/app/services/shoppingService";

const CreatePurchaseForm = ({ products }) => {
  const [categories, setCategories] = useState([]);
  const [category_id, setCategoryId] = useState("");
  const [selectedproducts, setSelectedproducts] = useState([]);
  const [request_date, setRequestDate] = useState("");
  const [pending_date, setPendingDate] = useState("");
  const [date_approval, setDateApproval] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const status_id = 1;

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setSelectedproducts((prevSelected) =>
      checked
        ? [...prevSelected, value]
        : prevSelected.filter((product) => product !== value)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!termsAccepted) {
      alert("Debes aceptar los términos y condiciones");
      return;
    }

    const productsData = products
      .filter((product) => selectedproducts.includes(product.title))
      .map((product) => ({
        name: product.title,
        url: product.url,
        description: product.description,
        price: parseFloat(product.price.replace(/\./g, "").replace(/,/g, "")),
      }));

    const shoppingData = {
      shopping: {
        category_id,
        status_id,
        request_date,
        pending_date,
        date_approval,
      },
      products: productsData,
    };

    console.log("Datos de la compra que se están enviando:", shoppingData); // Línea de depuración

    try {
      await createShopping(shoppingData);
      alert("Compra creada exitosamente");
    } catch (error) {
      console.error("Error al crear la compra:", error);
      alert("Error al crear la compra");
    }
  };

  return (
    <form className="w-full p-6 rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4 text-black">Creación de compra</h2>
      <div className="mb-4">
        <select
          value={category_id}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded text-black"
          required
        >
          <option value="">Selecciona una categoría</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-black text-sm font-bold mb-2">
          Selecciona productos:
        </label>
        {products.map((product, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={`product-${index}`}
              value={product.title}
              onChange={handleCheckboxChange}
              className="mr-2 leading-tight text-black checked:text-greenDrawer"
            />
            <label htmlFor={`product-${index}`} className="text-black">
              {product.title}
            </label>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <label className="block text-black text-sm font-bold mb-2">
          Fecha de Solicitud
        </label>
        <input
          type="date"
          name="request_date"
          placeholder="Fecha de Solicitud"
          value={request_date}
          onChange={(e) => setRequestDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded text-black"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-black text-sm font-bold mb-2">
          Fecha Pendiente
        </label>
        <input
          type="date"
          name="pending_date"
          placeholder="Fecha Pendiente"
          value={pending_date}
          onChange={(e) => setPendingDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded text-black"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-black text-sm font-bold mb-2">
          Fecha de Aprobación
        </label>
        <input
          type="date"
          name="date_approval"
          placeholder="Fecha de Aprobación"
          value={date_approval}
          onChange={(e) => setDateApproval(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded text-black"
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="checkbox"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          className="mr-2 text-black checked:text-greenDrawer"
          required
        />
        <label className="text-black">Acepto los términos y condiciones</label>
      </div>
    </form>
  );
};

export default CreatePurchaseForm;
