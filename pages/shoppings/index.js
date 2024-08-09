import React from "react";
import ShoppingTable from "@/app/components/shopping/getShoppingByUserId";
import "/app/App.css"; // Asegúrate de tener un archivo de estilo
import DrawerLayout from "@/app/components/layout/drawerLayout";

const App = () => {
// Puedes cambiar este ID por el del usuario que desees

    return (
        <DrawerLayout>
            <div className="app-container">
                <ShoppingTable/>
            </div>
        </DrawerLayout>
    );
};

export default App;