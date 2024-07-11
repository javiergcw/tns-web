"use client";
import "/app/globals.css";
import RequestsCarousel from "@/app/components/dashboard/listLastRequest/requestsCarousel";
import Container from "@/app/components/dashboard/container/container";
import { useState, useEffect } from "react";
import TrackingTable from "@/app/components/dashboard/trackingTable/trackingTable";
import MonthlyExpenses from "@/app/components/dashboard/monthlyExpenses/monthlyExpenses";
import CircularDiagram from "@/app/components/others/graph/circularDiagram";
import { getAllShoppings } from "@/app/services/shoppingService";
import Text from "@/app/components/others/text/text";
import MainLayout from "@/app/components/layout/drawerLayout";
import PrivateRoute from "@/app/components/privateRoute"; // Importa el HOC PrivateRoute

/**
 * dashboardManager Page
 *
 * Esta página es el área de trabajo general del administrador que aprueba o niega las peticiones de compras.
 * Aquí se muestra un dashboard con un drawer navegable, un carrusel de peticiones recientes,
 * un componente de gastos mensuales y una tabla de seguimiento de peticiones.
 *
 * @page
 */

/*
 * NOMBRE: fetchData
 * DESCRIPCIÓN: Función para obtener todas las compras.
 * @return: arreglo con todas las compras
 */
const fetchData = async () => {
  try {
    const res = await getAllShoppings();
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

/*
 * NOMBRE: getApprovedExpenses
 * DESCRIPCIÓN: Función para obtener el valor total de las compras aprobadas en el mes y un array con estas compras aprobadas.
 * @param data: es la lista de las compras que devuelve el endpoint.
 * @return: 1) valor total de las compras aprobadas. 2) Array modificado.
 */
const getApprovedExpenses = (data) => {
  const currentMonth = new Date().getMonth() + 1; // Mes actual (de 0 a 11)
  const ApprovedExpenses = data.filter(
    (item) =>
      item.status &&
      item.status.id === 2 &&
      new Date(item.updated_at).getMonth() + 1 === currentMonth
  );

  const total = ApprovedExpenses.reduce((accumulator, item) => {
    const productTotal = item.products.reduce(
      (sum, product) => sum + product.price,
      0
    );
    return accumulator + productTotal;
  }, 0);
  const flattenedExpenses = ApprovedExpenses.flatMap((item) =>
    item.products.map((product) => ({
      price: product.price,
      name: product.description,
    }))
  );
  return { ApprovedExpenses: flattenedExpenses, total };
};

/*
 * NOMBRE: getUnapprovedExpenses
 * DESCRIPCIÓN: Función para obtener las compras no aprobadas del mes hasta el momento.
 * @param data: es la lista de las compras que devuelve el endpoint.
 * @return: Array con las compras no aprobadas del mes.
 */
const getUnapprovedExpenses = (data) => {
  const currentMonth = new Date().getMonth() + 1; // Mes actual (de 0 a 11)
  const pendingExpenses = data.filter(
    (item) =>
      item.status &&
      item.status.id === 1 &&
      new Date(item.updated_at).getMonth() + 1 === currentMonth
  );
  return pendingExpenses;
};

const DashboardManager = () => {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [data, setData] = useState([]);
  const [expensesData, setExpensesData] = useState([]);
  const [unapprovedExpenses, setUnapprovedExpenses] = useState([]);

  // Obtener los datos de gastos cuando el componente se monta
  useEffect(() => {
    const fetchAndProcessData = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
      const { ApprovedExpenses, total } = getApprovedExpenses(fetchedData);
      setExpensesData(ApprovedExpenses);
      setTotalExpenses(total);

      const unapproved = getUnapprovedExpenses(fetchedData);
      setUnapprovedExpenses(unapproved);
    };

    fetchAndProcessData();
  }, []);

  return (
    // Contenedor principal con flex para el layout
    <div className="min-h-screen h-2 justify-center bg-gray-100 overflow-y-auto">
      {/* Drawer que se puede alternar */}
      <MainLayout>
        {/* Contenedor principal que ajusta su margen según el estado del drawer */}
        <Container>
          <hr className="my-5" />
          {/* Carrusel de peticiones del mes sin revisar */}
          <RequestsCarousel requestsData={unapprovedExpenses} />
          <hr className="my-5" />
          {/* Componente de gastos mensuales */}
          <Text texto="ESTADISTICAS" color="blue-secondary" type="header" />
          <div className="flex flex-row space-x-4 pt-8 w-full">
            <CircularDiagram className="w-1/2" type={"month"} data={data} />
            <MonthlyExpenses
              className="w-1/2"
              total={totalExpenses}
              data={expensesData}
            />
          </div>
          <hr className="my-5" />
          {/* Tabla de seguimiento de peticiones */}
          <TrackingTable data={data} />
        </Container>
      </MainLayout>
    </div>
  );
};

// Envuelve DashboardManager con PrivateRoute para proteger la ruta
export default PrivateRoute(DashboardManager);
