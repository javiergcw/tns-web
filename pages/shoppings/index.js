import React from "react";
import ShoppingTable from "@/app/components/shopping/getShoppingByUserId";
import "/app/App.css"; // Asegúrate de tener un archivo de estilo
import DrawerLayout from "@/app/components/layout/drawerLayout";

const App = () => {
    const userId = 1; // Puedes cambiar este ID por el del usuario que desees

    return (
        <DrawerLayout>
            <div className="app-container">
                <ShoppingTable userId={userId} />
            </div>
        </DrawerLayout>
    );
};

export default App;