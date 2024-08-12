import React from "react";
import ShoppingTable from "@/app/components/shopping/getShoppingByUserId";
import "/app/App.css"; // Asegúrate de tener un archivo de estilo
import DrawerLayout from "@/app/components/layout/drawerLayout";

const Shoppings = () => {
// Puedes cambiar este ID por el del usuario que desees

    return (
        <DrawerLayout>
            <div className="app-container bg-bgPrimary">
                <ShoppingTable/>
            </div>
        </DrawerLayout>
    );
};

export default Shoppings;