"use client";
import "/app/globals.css";
import RequestsCarousel from "@/app/components/dashboard/listLastRequest/requestsCarousel";
import Container from "@/app/components/dashboard/container/container";
import { useState, useEffect, useCallback } from "react";
import TrackingTable from "@/app/components/dashboard/trackingTable/trackingTable";
import MonthlyExpenses from "@/app/components/dashboard/monthlyExpenses/monthlyExpenses";
import CircularDiagram from "@/app/components/others/graph/circularDiagram";
import { getAllShoppings } from "@/app/services/shoppingService";
import Text from "@/app/components/others/text/text";
import MainLayout from "@/app/components/layout/drawerLayout";
import PrivateRoute from "@/app/components/privateRoute";

/*
 * NOMBRE: fetchData
 * DESCRIPCIÓN: Función para obtener todas las compras.
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
 * DESCRIPCIÓN: Filtrar las compras aprobadas del mes.
 */
const getApprovedExpenses = (data) => {
  const currentMonth = new Date().getMonth() + 1;
  const approved = data.filter(
    (item) =>
      item.status?.id === 2 &&
      new Date(item.updated_at).getMonth() + 1 === currentMonth
  );

  const total = approved.reduce((acc, item) => {
    return (
      acc +
      item.products.reduce((sum, product) => sum + product.price, 0)
    );
  }, 0);

  const flattenedExpenses = approved.flatMap((item) =>
    item.products.map((product) => ({
      price: product.price,
      name: product.description,
    }))
  );

  return { ApprovedExpenses: flattenedExpenses, total };
};

/*
 * NOMBRE: getUnapprovedExpenses
 * DESCRIPCIÓN: Filtrar las compras no aprobadas del mes.
 */
const getUnapprovedExpenses = (data) => {
  const currentMonth = new Date().getMonth() + 1;
  return data.filter(
    (item) =>
      item.status?.id === 1 &&
      new Date(item.updated_at).getMonth() + 1 === currentMonth
  );
};

const DashboardPurchasing = () => {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [allData, setAllData] = useState([]); // Todas las compras
  const [approvedExpensesData, setApprovedExpensesData] = useState([]); // Compras aprobadas del mes
  const [unapprovedExpenses, setUnapprovedExpenses] = useState([]); // Compras no aprobadas del mes

  useEffect(() => {
    const fetchAndProcessData = async () => {
      const fetchedData = await fetchData();
      console.log("Todas las compras:", fetchedData); // Verificar todas las compras

      setAllData(fetchedData); // Guardar todas las compras

      const { ApprovedExpenses, total } = getApprovedExpenses(fetchedData);
      setApprovedExpensesData(ApprovedExpenses); // Guardar solo las aprobadas del mes
      setTotalExpenses(total); // Total de aprobadas

      const unapproved = getUnapprovedExpenses(fetchedData);
      setUnapprovedExpenses(unapproved); // Guardar las no aprobadas del mes
    };

    fetchAndProcessData();
  }, []);

  const memoizedAllData = useCallback(() => allData, [allData]); // Memoriza todas las compras

  return (
    <div className="min-h-screen h-2 justify-center bg-gray-100 overflow-y-auto">
      <MainLayout>
        <Container>
          <hr className="my-5" />
          {/* Carrusel con las compras no aprobadas del mes */}
          <RequestsCarousel requestsData={unapprovedExpenses} />
          <hr className="my-5" />
          <Text texto="ESTADISTICAS" color="blue-secondary" type="header" />
          <div className="flex flex-row space-x-4 pt-8 w-full">
            {/* CircularDiagram muestra todas las compras */}
            <CircularDiagram className="w-1/2" type={"month"} data={allData} />
            {/* MonthlyExpenses muestra solo las aprobadas del mes */}
            <MonthlyExpenses
              className="w-1/2"
              total={totalExpenses}
              data={approvedExpensesData}
            />
          </div>
          <hr className="my-5" />
          {/* La tabla recibe todas las compras */}
          <TrackingTable data={memoizedAllData()} />
        </Container>
      </MainLayout>
    </div>
  );
};

export default PrivateRoute(DashboardPurchasing);
