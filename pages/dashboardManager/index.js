/** servicios */
"use client";
import { useState, useEffect } from "react";
import { getAllShoppings } from "@/app/services/shoppingService";

/** Componentes */
import "/app/globals.css";

import TrackingTable from "@/app/components/dashboard/trackingTable/trackingTable";
import MonthlyExpenses from "@/app/components/dashboard/monthlyExpenses/monthlyExpenses";
import CircularDiagram from "@/app/components/others/graph/circularDiagram";
import RequestsCarousel from "@/app/components/dashboard/listLastRequest/requestsCarousel";
import Container from "@/app/components/dashboard/container/container";
import Text from "@/app/components/others/text/text";
import MainLayout from "@/app/components/layout/drawerLayout";
import PrivateRoute from "@/app/components/privateRoute"; // Importa el HOC PrivateRoute

import { getLatestStatisticalRequestsOfTheMonth } from "@/app/services/shoppingService"; // Importa el nuevo servicio
import Text from "@/app/components/others/text/text";
import MainLayout from "@/app/components/layout/drawerLayout";
import PrivateRoute from "@/app/components/privateRoute"; // Importa el HOC PrivateRoute

const fetchData = async () => {
  try {
    const res = await getLatestStatisticalRequestsOfTheMonth(); // Usa el nuevo servicio
    return res;


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
    if (res) {
      console.log(res)
      return res;
    }

  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

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
      name: product.name, // Asegúrate de que sea el campo correcto
    }))
  );
  return { ApprovedExpenses: flattenedExpenses, total };
};

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
    <div className="min-h-screen h-2 justify-center bg-gray-100 overflow-y-auto">
      <MainLayout>
        <Container>
          <hr className="my-5" />
          <RequestsCarousel requestsData={unapprovedExpenses} />
          <hr className="my-5" />
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
          <TrackingTable data={data} />
        </Container>
      </MainLayout>
    </div>
  );
};

export default PrivateRoute(DashboardManager);
