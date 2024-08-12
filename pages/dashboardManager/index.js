import { useState, useEffect } from "react";
import RequestsCarousel from "@/app/components/dashboard/listLastRequest/requestsCarousel";
import Container from "@/app/components/dashboard/container/container";
import TrackingTable from "@/app/components/dashboard/trackingTable/trackingTable";
import MonthlyExpenses from "@/app/components/dashboard/monthlyExpenses/monthlyExpenses";
import CircularDiagram from "@/app/components/others/graph/circularDiagram";
import { getLatestStatisticalRequestsOfTheMonth } from "@/app/services/shoppingService";
import { getProfileById } from "@/app/services/profileService";
import Text from "@/app/components/others/text/text";
import MainLayout from "@/app/components/layout/drawerLayout";
import PrivateRoute from "@/app/components/privateRoute";
import ShoppingTable from "@/app/components/shopping/getShoppingByUserId";
import "/app/App.css";
import ContactInfo from "../contact-info";
import AdmissionsView from "@/app/components/admisiones/admissionesView";

const fetchData = async () => {
  try {
    const res = await getLatestStatisticalRequestsOfTheMonth();
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const getApprovedExpenses = (data) => {
  const currentMonth = new Date().getMonth() + 1;
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
      name: product.name,
    }))
  );
  return { ApprovedExpenses: flattenedExpenses, total };
};

const getUnapprovedExpenses = (data) => {
  const currentMonth = new Date().getMonth() + 1;
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
  const [userRole, setUserRole] = useState(""); // Estado para el rol del usuario

  // Obtener los datos de gastos y rol del usuario cuando el componente se monta
  useEffect(() => {
    const fetchAndProcessData = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
      const { ApprovedExpenses, total } = getApprovedExpenses(fetchedData);
      setExpensesData(ApprovedExpenses);
      setTotalExpenses(total);

      const unapproved = getUnapprovedExpenses(fetchedData);
      setUnapprovedExpenses(unapproved);

      try {
        const profile = await getProfileById(localStorage.getItem('userId')); // Llama al endpoint para obtener el perfil del usuario
        setUserRole(profile.rol?.name || "Sin Rol"); // Accede al nombre del rol desde el objeto `rol` o asigna "Sin Rol" si no hay rol
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchAndProcessData();
  }, []);

  // Renderiza un componente alternativo si el usuario no tiene rol
  if (userRole === "Sin rol") {
    return (
      <div className="min-h-screen h-2 justify-center bg-gray-100 overflow-y-auto">
        <MainLayout>
          <Container>
            <ContactInfo></ContactInfo>
          </Container>
        </MainLayout>
      </div>
    );
  }
  else if (userRole === "Secretariado") {
    return (
      <div className="min-h-screen h-2 justify-center bg-gray-100 overflow-y-auto">
        <MainLayout>
          <Container>
            <AdmissionsView></AdmissionsView>
          </Container>
        </MainLayout>
      </div>
    );
  }

  else {

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
            {userRole === "Jefe de area" && (
              <ShoppingTable userId={localStorage.getItem('userId')} />
            )}
            {userRole === "admin" && (
              <TrackingTable data={data} />
            )}
          </Container>
        </MainLayout>
      </div>
    );
  };
};

export default PrivateRoute(DashboardManager);
