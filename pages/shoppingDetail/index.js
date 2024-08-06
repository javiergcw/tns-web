// App.js

import React from "react";
import ShoppingDetails from "@/app/components/shopping/getShoppingById";

const App = () => {
  // Ejemplo de ID de compra para probar
  const shoppingId = 2;

  return (
    <div>
      <h1>Aplicación de Compras</h1>
      <ShoppingDetails shoppingId={shoppingId} />
    </div>
  );
};

export default App;
