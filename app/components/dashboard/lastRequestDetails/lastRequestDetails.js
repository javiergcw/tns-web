import React from "react";
import Text from "@/app/components/others/text/text";

const LastRequestDetailsModal = ({ isOpen, onClose, item, total }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-3/4 mx-4">
        <Text
          texto="Detalles de la compra"
          color="blue-secondary"
          type="bigTitle"
          className="text-left mb-4"
        />
        <hr className="text-black mb-4" />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Text
              texto="Categoría:"
              color="blue-secondary"
              type="title"
              className="text-left mb-1"
            />
            <Text texto={item.category.name} color="black" type="subtitle" />
          </div>
          <div>
            <Text
              texto="Usuario:"
              color="blue-secondary"
              type="title"
              className="text-left mb-1"
            />
            <Text
              texto={item.user.profile.name}
              color="black"
              type="subtitle"
            />
          </div>
          <div>
            <Text
              texto="Fecha de creación:"
              color="blue-secondary"
              type="title"
              className="text-left mb-1"
            />
            <Text
              texto={new Date(item.created_at).toLocaleDateString()}
              color="black"
              type="subtitle"
              className="text-left mb-1"
            />
          </div>
          <div>
            <Text
              texto="Estado:"
              color="blue-secondary"
              type="title"
              className="text-left mb-1"
            />
            <Text texto={item.status.name} color="black" type="subtitle" />
          </div>
        </div>

        <hr className="my-4" />
        <Text
          texto="Productos"
          color="blue-secondary"
          type="bigTitle"
          className="text-left mb-4"
        />
        <div className="h-96 overflow-y-auto bg-slate-100 my-10">
          {item.products.map((product, index) => (
            <div key={index} className="mb-6 grid grid-cols-4">
              <div>
                <Text
                  texto="Id:"
                  color="blue-secondary"
                  type="title"
                  className="text-left mb-1"
                />
                <Text
                  texto={index + 1}
                  color="black"
                  type="subtitle"
                  className="text-left mb-1"
                />
              </div>
              <div>
                <Text
                  texto="Nombre del producto:"
                  color="blue-secondary"
                  type="title"
                  className="text-left mb-1"
                />
                <Text
                  texto={product.name}
                  color="black"
                  type="subtitle"
                  className="text-left mb-1"
                />
              </div>
              <div>
                <Text
                  texto="Descripción:"
                  color="blue-secondary"
                  type="title"
                  className="text-left mb-1"
                />
                <Text
                  texto={product.description}
                  color="black"
                  type="subtitle"
                  className="text-left mb-1"
                />
              </div>
              <div>
                <Text
                  texto="Precio:"
                  color="blue-secondary"
                  type="title"
                  className="text-left mb-1"
                />
                <Text
                  texto={`$${product.price.toFixed(2)}`}
                  color="black"
                  type="subtitle"
                  className="text-left mb-1"
                />
              </div>
            </div>
          ))}
        </div>
        <Text
          texto={`Valor total: $${total.toFixed(2)}`}
          color="green"
          type="bigTitle"
          className="text-left mb-4"
        />
        <div className="flex justify-end space-x-4 mt-10">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={onClose}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default LastRequestDetailsModal;
