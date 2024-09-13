import { useState, useEffect } from "react";
import RequestsCarousel from "@/app/components/dashboard/listLastRequest/requestsCarousel";
import Container from "@/app/components/dashboard/container/container";
import TrackingTable from "@/app/components/dashboard/trackingTable/trackingTable";
import MonthlyExpenses from "@/app/components/dashboard/monthlyExpenses/monthlyExpenses";
import CircularDiagram from "@/app/components/others/graph/circularDiagram";
import { getLatestStatisticalRequestsOfTheMonth, getUserByLatestStatisticalRequestsOfTheMonth } from "@/app/services/shoppingService";
import { getProfileById } from "@/app/services/profileService";
import Text from "@/app/components/others/text/text";
import MainLayout from "@/app/components/layout/drawerLayout";
import PrivateRoute from "@/app/components/privateRoute";
import ShoppingTable from "@/app/components/shopping/getShoppingByUserId";
import "/app/App.css";
import ContactInfo from "../contact-info";
import AdmissionsView from "@/app/components/admisiones/admissionesView";




const fetchData = async (role) => {
  try {
    let res;
    if (role === "Lider de area") {
      res = await getUserByLatestStatisticalRequestsOfTheMonth(localStorage.getItem("userId"));
    } else {
      res = await getLatestStatisticalRequestsOfTheMonth();
    }
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const getApprovedExpenses = (shoppingData) => {
  const currentMonth = new Date().getMonth() + 1;
  const approvedExpenses = shoppingData.filter(
    (item) =>
      item.status &&
      item.status.id === 2 &&
      new Date(item.updated_at).getMonth() + 1 === currentMonth
  );

  const total = approvedExpenses.reduce((accumulator, item) => {
    const productTotal = item.products.reduce(
      (sum, product) => sum + product.price,
      0
    );
    return accumulator + productTotal;
  }, 0);

  const flattenedExpenses = approvedExpenses.flatMap((item) =>
    item.products.map((product) => ({
      price: product.price,
      name: product.name,
    }))
  );

  return { flattenedExpenses, total };
};

const getUnapprovedExpenses = (shoppingData) => {
  const currentMonth = new Date().getMonth() + 1;
  const pendingExpenses = shoppingData.filter(
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
  const [allShoppingData, setAllShoppingData] = useState([]);

  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const fetchAndProcessData = async () => {
      try {
        const profile = await getProfileById(localStorage.getItem("profileId"));
        setUserRole(profile.rol?.name || "Sin Rol");

        let allShoppingData = [];
        let approvedShoppingData = [];

        const fetchedData = await fetchData(profile.rol?.name);
        console.log("Datos recuperados:", fetchedData);

        if (profile.rol?.name === "Lider de area") {
          allShoppingData = fetchedData.recentShoppings || [];
          approvedShoppingData = allShoppingData.filter(item => item.status.id === 2);
        } else {
          allShoppingData = fetchedData || [];
          approvedShoppingData = allShoppingData;
        }

        setAllShoppingData(allShoppingData);
        setData(approvedShoppingData);

        const { flattenedExpenses, total } = getApprovedExpenses(approvedShoppingData);
        setExpensesData(flattenedExpenses);
        setTotalExpenses(total);

        const unapproved = getUnapprovedExpenses(approvedShoppingData);
        setUnapprovedExpenses(unapproved);
      } catch (error) {
        console.error("Error fetching user profile or data:", error);
      }
    };

    fetchAndProcessData();
  }, []);

  if (userRole === "Sin rol") {
    return (
      <div className="min-h-screen flex justify-center bg-gray-100">
        <MainLayout>
          <Container>
            <ContactInfo />
          </Container>
        </MainLayout>
      </div>
    );
  } else if (userRole === "Secretariado") {
    return (
      <div className="min-h-screen flex justify-center bg-gray-100">
        <MainLayout>
          <Container>
            <AdmissionsView />
          </Container>
        </MainLayout>
      </div>
    );
  } else if (userRole === "Lider de area") {
    return (
      <div className="min-h-screen bg-gray-100 ">
        <MainLayout>
          <Container>
            <hr className="my-5" />
            {/* Encabezado */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-5">
              <h2 className="text-2xl md:text-3xl font-bold text-blueSecundary">
                Últimas Compras Aprobadas
              </h2>
            </div>

            {/* Sección Principal con Desplazamiento Horizontal y Vertical */}
            <div className="overflow-x-auto">

              {/* Grid de Compras Aprobadas */}
              {data.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {data.map((expense, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 md:p-6 rounded-lg shadow-md flex flex-col justify-between"
                    >
                      <p className="text-gray-500 text-sm md:text-lg">
                        {expense.products.map((product) => product.name).join(', ')}
                      </p>
                      <p className="text-green-500 text-xl md:text-2xl font-bold">
                        ${expense.products.reduce((sum, product) => sum + product.price, 0).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center">
                  No hay compras aprobadas para mostrar.
                </p>
              )}

              {/* Tabla de Compras y Peticiones */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
                {/* Tabla de Compras */}
                <div className="lg:col-span-2 bg-white p-4 md:p-6 rounded-lg shadow-md">
                  <div className="my-5">
                    <ShoppingTable userId={localStorage.getItem("userId")} />
                  </div>
                </div>

                {/* Sección de Peticiones y Gráfico Circular */}
                <div className="space-y-6">
                  {/* Peticiones */}
                  <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
                    <h3 className="text-lg md:text-xl font-bold text-blueSecundary mb-4">
                      Peticiones
                    </h3>
                    <a
                      href="mailto:example@example.com?subject=Crear%20Petición"
                      className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-full text-center hover:bg-blue-700 transition duration-300 block"
                    >
                      Crear petición
                    </a>
                  </div>

                  {/* Gráfico Circular Anual */}
                  <div className="bg-white p-4 md:p-6 rounded-lg shadow-md w-full">
                    <h3 className="text-lg md:text-xl font-bold text-blueSecundary mb-5">
                      Estadísticas Anuales
                    </h3>
                    {allShoppingData.length > 0 ? (
                      <CircularDiagram type={"year"} data={allShoppingData} />
                    ) : (
                      <p className="text-gray-500 text-center">No hay compras disponibles</p>
                    )}
                  </div>

                </div>
              </div>

            </div>
          </Container>
        </MainLayout>
      </div>
    );
  }

  else if (userRole === "admin") {
    return (
      <div className="min-h-screen  bg-gray-100">
        <MainLayout>
          <Container>
            <hr className="my-5" />
            <RequestsCarousel requestsData={unapprovedExpenses} />
            <hr className="my-5" />
            <Text texto="ESTADISTICAS" color="blue-secondary" type="header" />
            <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-4 space-y-4 lg:space-y-0 pt-8 w-full">
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-md w-full">
                <h3 className="text-lg md:text-xl font-bold text-blueSecundary mb-5">
                  Estadísticas Anuales
                </h3>
                {allShoppingData.length > 0 ? (
                  <CircularDiagram type={"year"} data={allShoppingData} />
                ) : (
                  <p className="text-gray-500 text-center">No hay compras disponibles</p>
                )}
              </div>

              <div className="bg-white p-4 md:p-6 rounded-lg shadow-md w-full lg:w-full">
                <MonthlyExpenses
                  total={totalExpenses}
                  data={expensesData}
                />
              </div>
            </div>
            <hr className="my-5" />
            <TrackingTable data={data} role={userRole} />

          </Container>
        </MainLayout>
      </div>
    );
  }
  else if (userRole === "Compras") {
    return (
      <div className="min-h-screen  bg-gray-100">
        <MainLayout>
          <Container>
            <hr className="my-5" />
            <RequestsCarousel requestsData={unapprovedExpenses} />
            <hr className="my-5" />
            <Text texto="ESTADISTICAS" color="blue-secondary" type="header" />
            <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-4 space-y-4 lg:space-y-0 pt-8 w-full">
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-md w-full">
                <h3 className="text-lg md:text-xl font-bold text-blueSecundary mb-5">
                  Estadísticas Anuales
                </h3>
                {allShoppingData.length > 0 ? (
                  <CircularDiagram type={"year"} data={allShoppingData} />
                ) : (
                  <p className="text-gray-500 text-center">No hay compras disponibles</p>
                )}
              </div>

              <div className="bg-white p-4 md:p-6 rounded-lg shadow-md w-full  lg:w-1/2">
                <MonthlyExpenses
                  total={totalExpenses}
                  data={expensesData}
                />
              </div>
            </div>
            <hr className="my-5" />
            
            <TrackingTable data={data} role={userRole} />

          </Container>
        </MainLayout>
      </div>
    );
  }
  else {
    return (

      
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h2 className="text-2xl font-bold text-red-600">
          Rol de usuario no reconocido.
        </h2>
      </div>
      </MainLayout>
    );
  }
};

export default PrivateRoute(DashboardManager);

