"use client";
import "/app/globals.css";
import React, { useState, useEffect } from "react";


import PrivateRoute from "@/app/components/privateRoute"; // Importa el HOC PrivateRoute
import { getCategories } from "@/app/services/categoryService";
import CreateShoppingForm from "@/app/components/shopping/create_ShoppingForm";
import DrawerLayout from "@/app/components/layout/drawerLayout";

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

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setSelectedProducts((prevSelected) =>
      checked
        ? [...prevSelected, value]
        : prevSelected.filter((product) => product !== value)
    );
  };
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
  };
  return (
    <DrawerLayout>
      <div className="min-h-screen h-2 justify-center bg-gray-100 overflow-y-auto">
        <div className="pt-8 pb-6 my-8 mx-4 md:mx-8 lg:mx-12 max-w-full">
          <CreateShoppingForm />
        </div>
      </div>

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
    </DrawerLayout>
  );
};

// Envuelve CreateProduct con PrivateRoute para proteger la ruta
export default (CreateProduct);
