"use client";
import "/app/globals.css";
import React, { useState, useEffect } from "react";

import MainLayout from "@/app/components/layout/drawerLayout";
import CreatePurchaseForm from "@/app/components/others/container/createPurchaseForm";
import ProductForm from "@/app/components/others/fields/productForm";
import PrivateRoute from "@/app/components/privateRoute"; // Importa el HOC PrivateRoute

const CreateProduct = (termsAccepted = false) => {
  const [categories, setCategories] = useState([]);
  const [acceptedTerms, setAcceptedTerms] = useState(termsAccepted);

  const [shoppingData, setShoppingData] = useState({
    shopping: {
      id: 1,
      title: "",
      description: "",
      category_id: 0,
      status_id: 0,
      request_date: "",
      pending_date: "",
      date_approval: "",
    },
    products: [{ name: "", url: "", description: "", price: 0 }],
  });

  const handleShoppingChange = (e) => {
    setShoppingData({
      ...shoppingData,
      shopping: { ...shoppingData.shopping, [e.target.name]: e.target.value },
    });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleProductChange = (index, e) => {
    const newProducts = [...shoppingData.products];
    newProducts[index] = {
      ...newProducts[index],
      [e.target.name]: e.target.value,
    };
    setShoppingData({ ...shoppingData, products: newProducts });
  };

  const addProduct = () => {
    setShoppingData({
      ...shoppingData,
      products: [
        ...shoppingData.products,
        { name: "", url: "", description: "", price: 0 },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://peaceful-basin-91811-0bab38de372b.herokuapp.com/api/v1/create_shopping",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(shoppingData),
      }
    );
    const data = await response.json();
    console.log(data);
  };
  return (
    <MainLayout>
      <form onSubmit={handleSubmit} className="w-full p-6 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4 text-black">
          Creación de compra
        </h2>
        <div className="flex justify-between space-x-4">
          {/* Primera columna: Contenedor para la información de la compra */}
          <div className="w-1/2 p-4 bg-white rounded-lg shadow-md">
            <div className="mb-4">
              <select
                value={shoppingData.category_id}
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
                Fecha de Solicitud
              </label>
              <input
                type="date"
                name="request_date"
                placeholder="Fecha de Solicitud"
                value={shoppingData.request_date}
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
                value={shoppingData.pending_date}
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
                value={shoppingData.date_approval}
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
              <label className="text-black">
                Acepto los términos y condiciones
              </label>
            </div>
          </div>

          {/* Segunda columna: Contenedor para la selección de productos */}
          <div className="w-1/2 p-4 bg-white rounded-lg shadow-md">
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
                  {product.title} - {product.price}
                </label>
              </div>
            ))}
            <button
              type="submit"
              className="mt-4 w-full bg-blue-500 text-white p-2 rounded"
            >
              Registrar
            </button>
          </div>
        </div>
      </form>
      {/*  <div className="w-full bg-bgPrimary min-h-screen px-4 md:px-20 py-10 overflow-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">
          Crear Producto
        </h1>
        <div className="w-full bg-Primary p-4 md:p-8 rounded-lg  flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0">
          <div className="w-full md:w-1/2">
            <ProductForm setProducts={setProducts} />
          </div>
          <div className="w-full md:w-1/2">
            <CreatePurchaseForm products={products} />
          </div>
        </div>
      </div> */}
    </MainLayout>
  );
};

// Envuelve CreateProduct con PrivateRoute para proteger la ruta
export default PrivateRoute(CreateProduct);
