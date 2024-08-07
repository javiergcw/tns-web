// App.js
import "/app/globals.css";
import React from "react";
import CustomComponent from "@/app/components/product-detail/purchase_detail";
import DrawerLayout from "@/app/components/layout/drawerLayout";

const App = () => {
  // Ejemplo de ID de compra para probar
  const shoppingId = 34;

  return (
    <DrawerLayout>
    <div>
      <CustomComponent shoppingId={shoppingId} />
    </div>
    </DrawerLayout>
  );
};

export default App;
