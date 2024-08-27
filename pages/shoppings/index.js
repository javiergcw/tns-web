import React from "react";
import ShoppingTable from "@/app/components/shopping/getShoppingByUserId";
import "/app/App.css"; // Asegúrate de tener un archivo de estilo
import DrawerLayout from "@/app/components/layout/drawerLayout";

const Shoppings = () => {
    return (
        <DrawerLayout>
            <div className="min-h-screen bg-gray-100 p-4">
                {/* Contenedor para manejar el diseño responsive */}
                <div className="container mx-auto">
                    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md overflow-x-auto">
                        <ShoppingTable />
                    </div>
                </div>
            </div>
        </DrawerLayout>
    );
};

export default Shoppings;
