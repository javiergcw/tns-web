import React from "react";
import ShoppingTable from "@/app/components/shopping/getShoppingByUserId";
import "/app/App.css"; // Asegúrate de tener un archivo de estilo
import DrawerLayout from "@/app/components/layout/drawerLayout";
import LatestStatisticalRequestsView from "@/app/components/shopping/LatestStatisticalRequestsView";

const App = () => {
    const userId = 1; // Puedes cambiar este ID por el del usuario que desees

    return (
        <DrawerLayout>
            <div className="app-container">
                <LatestStatisticalRequestsView />
            </div>
        </DrawerLayout>
    );
};

export default App;