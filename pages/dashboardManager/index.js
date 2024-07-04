"use client";
import "/app/globals.css";
import RequestsCarousel from "@/app/components/dashboard/listLastRequest/requestsCarousel";
import Drawer from "@/app/components/others/drawer/drawer";
import Container from "@/app/components/dashboard/container/container";
import { useState, useEffect } from "react";
import TrackingTable from "@/app/components/dashboard/trackingTable/trackingTable";
import MonthlyExpenses from "@/app/components/dashboard/monthlyExpenses/monthlyExpenses";
import CircularDiagram from "@/app/components/others/graph/circularDiagram";
/**
 * dashboardManager Page
 *
 * Esta página es el área de trabajo general del administrador que aprueba o niega las peticiones de compras.
 * Aquí se muestra un dashboard con un drawer navegable, un carrusel de peticiones recientes,
 * un componente de gastos mensuales y una tabla de seguimiento de peticiones.
 *
 * @page
 */
const localData = [
  {
    id: 1,
    user_id: 10,
    created_at: "2024-07-18T13:45:00.000Z",
    updated_at: "2024-07-18T13:45:00.000Z",
    request_date: "2024-07-18T00:00:00.000Z",
    pending_date: "2024-07-19T00:00:00.000Z",
    date_approval: "2024-07-20T00:00:00.000Z",
    category: {
      id: 1,
      name: "Electronics",
    },
    status: {
      id: 2,
      name: "aprobado",
    },
    products: [
      {
        id: 1,
        name: "Laptop Dell",
        description: "High-performance laptop for work and gaming.",
        price: 1500.0,
      },
      {
        id: 2,
        name: "Wireless Mouse",
        description: "Ergonomic wireless mouse.",
        price: 50.0,
      },
    ],
  },
  {
    id: 2,
    user_id: 15,
    created_at: "2024-07-18T13:45:00.000Z",
    updated_at: "2024-07-18T13:45:00.000Z",
    request_date: "2024-07-18T00:00:00.000Z",
    pending_date: "2024-07-19T00:00:00.000Z",
    date_approval: "2024-07-20T00:00:00.000Z",
    category: {
      id: 2,
      name: "Books",
    },
    status: {
      id: 2,
      name: "aprobado",
    },
    products: [
      {
        id: 3,
        name: "Data Science Book",
        description: "Comprehensive guide to data science.",
        price: 80.0,
      },
      {
        id: 4,
        name: "Mathematics Textbook",
        description: "Textbook for advanced mathematics.",
        price: 100.0,
      },
    ],
  },
  {
    id: 3,
    user_id: 20,
    created_at: "2024-07-18T13:45:00.000Z",
    updated_at: "2024-07-18T13:45:00.000Z",
    request_date: "2024-07-18T00:00:00.000Z",
    pending_date: "2024-07-19T00:00:00.000Z",
    date_approval: "2024-07-20T00:00:00.000Z",
    category: {
      id: 3,
      name: "Psychological Services",
    },
    status: {
      id: 1,
      name: "pendiente",
    },
    products: [
      {
        id: 5,
        name: "Therapy Session",
        description: "Individual psychological therapy session.",
        price: 200.0,
      },
    ],
  },
  {
    id: 4,
    user_id: 25,
    created_at: "2024-07-18T13:45:00.000Z",
    updated_at: "2024-07-18T13:45:00.000Z",
    request_date: "2024-07-18T00:00:00.000Z",
    pending_date: "2024-07-19T00:00:00.000Z",
    date_approval: "2024-07-20T00:00:00.000Z",
    category: {
      id: 4,
      name: "Structural Services",
    },
    status: {
      id: 1,
      name: "pendiente",
    },
    products: [
      {
        id: 6,
        name: "Home Renovation",
        description: "Complete home renovation service.",
        price: 5000.0,
      },
    ],
  },
  {
    id: 5,
    user_id: 30,
    created_at: "2024-07-18T13:45:00.000Z",
    updated_at: "2024-07-18T13:45:00.000Z",
    request_date: "2024-07-18T00:00:00.000Z",
    pending_date: "2024-07-19T00:00:00.000Z",
    date_approval: "2024-07-20T00:00:00.000Z",
    category: {
      id: 5,
      name: "Training",
    },
    status: {
      id: 1,
      name: "pendiente",
    },
    products: [
      {
        id: 7,
        name: "Project Management Course",
        description: "Online project management certification course.",
        price: 300.0,
      },
    ],
  },
  {
    id: 6,
    user_id: 35,
    created_at: "2024-06-18T13:45:00.000Z",
    updated_at: "2024-06-18T13:45:00.000Z",
    request_date: "2024-06-18T00:00:00.000Z",
    pending_date: "2024-06-19T00:00:00.000Z",
    date_approval: "2024-06-20T00:00:00.000Z",
    category: {
      id: 6,
      name: "Office Supplies",
    },
    status: {
      id: 1,
      name: "pendiente",
    },
    products: [
      {
        id: 8,
        name: "Office Chairs",
        description: "Ergonomic office chairs.",
        price: 150.0,
      },
      {
        id: 9,
        name: "Whiteboards",
        description: "Large whiteboards for office use.",
        price: 100.0,
      },
    ],
  },
  {
    id: 7,
    user_id: 40,
    created_at: "2024-07-10T14:30:00.000Z",
    updated_at: "2024-07-10T14:30:00.000Z",
    request_date: "2024-07-10T00:00:00.000Z",
    pending_date: "2024-07-11T00:00:00.000Z",
    date_approval: "2024-07-12T00:00:00.000Z",
    category: {
      id: 7,
      name: "Education",
    },
    status: {
      id: 2,
      name: "aprobado",
    },
    products: [
      {
        id: 10,
        name: "Online Course Subscription",
        description: "Annual subscription to online courses.",
        price: 200.0,
      },
    ],
  },
  {
    id: 8,
    user_id: 45,
    created_at: "2024-08-25T15:00:00.000Z",
    updated_at: "2024-08-25T15:00:00.000Z",
    request_date: "2024-08-25T00:00:00.000Z",
    pending_date: "2024-08-26T00:00:00.000Z",
    date_approval: "2024-08-27T00:00:00.000Z",
    category: {
      id: 1,
      name: "Electronics",
    },
    status: {
      id: 3,
      name: "denegada",
    },
    products: [
      {
        id: 11,
        name: "Tablet",
        description: "High-resolution display tablet.",
        price: 400.0,
      },
    ],
  },
  {
    id: 9,
    user_id: 50,
    created_at: "2024-09-12T16:00:00.000Z",
    updated_at: "2024-09-12T16:00:00.000Z",
    request_date: "2024-09-12T00:00:00.000Z",
    pending_date: "2024-09-13T00:00:00.000Z",
    date_approval: "2024-09-14T00:00:00.000Z",
    category: {
      id: 2,
      name: "Books",
    },
    status: {
      id: 1,
      name: "pendiente",
    },
    products: [
      {
        id: 12,
        name: "Fiction Novel",
        description: "Bestselling fiction novel.",
        price: 25.0,
      },
      {
        id: 13,
        name: "Non-fiction Book",
        description: "Informative non-fiction book.",
        price: 30.0,
      },
    ],
  },
  {
    id: 10,
    user_id: 55,
    created_at: "2024-10-01T17:15:00.000Z",
    updated_at: "2024-10-01T17:15:00.000Z",
    request_date: "2024-10-01T00:00:00.000Z",
    pending_date: "2024-10-02T00:00:00.000Z",
    date_approval: "2024-10-03T00:00:00.000Z",
    category: {
      id: 3,
      name: "Psychological Services",
    },
    status: {
      id: 2,
      name: "aprobado",
    },
    products: [
      {
        id: 14,
        name: "Group Therapy",
        description: "Group psychological therapy session.",
        price: 500.0,
      },
    ],
  },
  {
    id: 11,
    user_id: 60,
    created_at: "2024-11-15T18:00:00.000Z",
    updated_at: "2024-11-15T18:00:00.000Z",
    request_date: "2024-11-15T00:00:00.000Z",
    pending_date: "2024-11-16T00:00:00.000Z",
    date_approval: "2024-11-17T00:00:00.000Z",
    category: {
      id: 4,
      name: "Structural Services",
    },
    status: {
      id: 1,
      name: "pendiente",
    },
    products: [
      {
        id: 15,
        name: "Office Renovation",
        description: "Complete office renovation service.",
        price: 10000.0,
      },
    ],
  },
  {
    id: 12,
    user_id: 65,
    created_at: "2024-12-30T19:15:00.000Z",
    updated_at: "2024-12-30T19:15:00.000Z",
    request_date: "2024-12-30T00:00:00.000Z",
    pending_date: "2024-12-31T00:00:00.000Z",
    date_approval: "2024-01-01T00:00:00.000Z",
    category: {
      id: 5,
      name: "Training",
    },
    status: {
      id: 3,
      name: "denegada",
    },
    products: [
      {
        id: 16,
        name: "Language Course",
        description: "Online language learning course.",
        price: 150.0,
      },
    ],
  },
  {
    id: 13,
    user_id: 70,
    created_at: "2024-02-14T20:00:00.000Z",
    updated_at: "2024-02-14T20:00:00.000Z",
    request_date: "2024-02-14T00:00:00.000Z",
    pending_date: "2024-02-15T00:00:00.000Z",
    date_approval: "2024-02-16T00:00:00.000Z",
    category: {
      id: 6,
      name: "Office Supplies",
    },
    status: {
      id: 2,
      name: "aprobado",
    },
    products: [
      {
        id: 17,
        name: "Desk Organizers",
        description: "Set of desk organizers.",
        price: 75.0,
      },
      {
        id: 18,
        name: "Printer",
        description: "All-in-one office printer.",
        price: 200.0,
      },
    ],
  },
  {
    id: 14,
    user_id: 75,
    created_at: "2024-03-05T21:30:00.000Z",
    updated_at: "2024-03-05T21:30:00.000Z",
    request_date: "2024-03-05T00:00:00.000Z",
    pending_date: "2024-03-06T00:00:00.000Z",
    date_approval: "2024-03-07T00:00:00.000Z",
    category: {
      id: 7,
      name: "Education",
    },
    status: {
      id: 1,
      name: "pendiente",
    },
    products: [
      {
        id: 19,
        name: "Science Kit",
        description: "Educational science kit for kids.",
        price: 50.0,
      },
      {
        id: 20,
        name: "Art Supplies",
        description: "Set of art supplies for students.",
        price: 30.0,
      },
    ],
  },
  {
    id: 15,
    user_id: 80,
    created_at: "2024-04-10T22:15:00.000Z",
    updated_at: "2024-04-10T22:15:00.000Z",
    request_date: "2024-04-10T00:00:00.000Z",
    pending_date: "2024-04-11T00:00:00.000Z",
    date_approval: "2024-04-12T00:00:00.000Z",
    category: {
      id: 1,
      name: "Electronics",
    },
    status: {
      id: 3,
      name: "denegada",
    },
    products: [
      {
        id: 21,
        name: "Smart Watch",
        description: "Smart watch with fitness tracking.",
        price: 250.0,
      },
    ],
  },
  {
    id: 16,
    user_id: 85,
    created_at: "2024-05-20T23:45:00.000Z",
    updated_at: "2024-05-20T23:45:00.000Z",
    request_date: "2024-05-20T00:00:00.000Z",
    pending_date: "2024-05-21T00:00:00.000Z",
    date_approval: "2024-05-22T00:00:00.000Z",
    category: {
      id: 2,
      name: "Books",
    },
    status: {
      id: 1,
      name: "pendiente",
    },
    products: [
      {
        id: 22,
        name: "Cooking Book",
        description: "Comprehensive guide to cooking.",
        price: 40.0,
      },
      {
        id: 23,
        name: "History Book",
        description: "Detailed history book.",
        price: 35.0,
      },
    ],
  },
  {
    id: 17,
    user_id: 90,
    created_at: "2024-06-14T00:30:00.000Z",
    updated_at: "2024-06-14T00:30:00.000Z",
    request_date: "2024-06-14T00:00:00.000Z",
    pending_date: "2024-06-15T00:00:00.000Z",
    date_approval: "2024-06-16T00:00:00.000Z",
    category: {
      id: 3,
      name: "Psychological Services",
    },
    status: {
      id: 2,
      name: "aprobado",
    },
    products: [
      {
        id: 24,
        name: "Family Counseling",
        description: "Family counseling session.",
        price: 300.0,
      },
    ],
  },
  {
    id: 18,
    user_id: 95,
    created_at: "2024-07-04T01:15:00.000Z",
    updated_at: "2024-07-04T01:15:00.000Z",
    request_date: "2024-07-04T00:00:00.000Z",
    pending_date: "2024-07-05T00:00:00.000Z",
    date_approval: "2024-07-06T00:00:00.000Z",
    category: {
      id: 4,
      name: "Structural Services",
    },
    status: {
      id: 1,
      name: "pendiente",
    },
    products: [
      {
        id: 25,
        name: "Roof Repair",
        description: "Complete roof repair service.",
        price: 6000.0,
      },
    ],
  },
  {
    id: 19,
    user_id: 100,
    created_at: "2024-08-15T02:00:00.000Z",
    updated_at: "2024-08-15T02:00:00.000Z",
    request_date: "2024-08-15T00:00:00.000Z",
    pending_date: "2024-08-16T00:00:00.000Z",
    date_approval: "2024-08-17T00:00:00.000Z",
    category: {
      id: 5,
      name: "Training",
    },
    status: {
      id: 3,
      name: "denegada",
    },
    products: [
      {
        id: 26,
        name: "Photography Workshop",
        description: "Weekend photography workshop.",
        price: 250.0,
      },
    ],
  },
  {
    id: 20,
    user_id: 105,
    created_at: "2024-09-20T03:30:00.000Z",
    updated_at: "2024-09-20T03:30:00.000Z",
    request_date: "2024-09-20T00:00:00.000Z",
    pending_date: "2024-09-21T00:00:00.000Z",
    date_approval: "2024-09-22T00:00:00.000Z",
    category: {
      id: 6,
      name: "Office Supplies",
    },
    status: {
      id: 1,
      name: "pendiente",
    },
    products: [
      {
        id: 27,
        name: "Conference Table",
        description: "Large conference table for office meetings.",
        price: 1000.0,
      },
      {
        id: 28,
        name: "Office Lighting",
        description: "Energy-efficient office lighting.",
        price: 500.0,
      },
    ],
  },
  {
    id: 21,
    user_id: 110,
    created_at: "2024-10-05T04:00:00.000Z",
    updated_at: "2024-10-05T04:00:00.000Z",
    request_date: "2024-10-05T00:00:00.000Z",
    pending_date: "2024-10-06T00:00:00.000Z",
    date_approval: "2024-10-07T00:00:00.000Z",
    category: {
      id: 7,
      name: "Education",
    },
    status: {
      id: 2,
      name: "aprobado",
    },
    products: [
      {
        id: 29,
        name: "Educational Software",
        description: "Annual license for educational software.",
        price: 150.0,
      },
    ],
  },
  {
    id: 22,
    user_id: 115,
    created_at: "2024-11-15T05:30:00.000Z",
    updated_at: "2024-11-15T05:30:00.000Z",
    request_date: "2024-11-15T00:00:00.000Z",
    pending_date: "2024-11-16T00:00:00.000Z",
    date_approval: "2024-11-17T00:00:00.000Z",
    category: {
      id: 1,
      name: "Electronics",
    },
    status: {
      id: 3,
      name: "denegada",
    },
    products: [
      {
        id: 30,
        name: "Gaming Console",
        description: "Latest gaming console with accessories.",
        price: 500.0,
      },
    ],
  },
  {
    id: 23,
    user_id: 120,
    created_at: "2024-12-10T06:00:00.000Z",
    updated_at: "2024-12-10T06:00:00.000Z",
    request_date: "2024-12-10T00:00:00.000Z",
    pending_date: "2024-12-11T00:00:00.000Z",
    date_approval: "2024-12-12T00:00:00.000Z",
    category: {
      id: 2,
      name: "Books",
    },
    status: {
      id: 1,
      name: "pendiente",
    },
    products: [
      {
        id: 31,
        name: "Travel Guide",
        description: "Comprehensive travel guide for Europe.",
        price: 30.0,
      },
      {
        id: 32,
        name: "Biography",
        description: "Biography of a famous historical figure.",
        price: 25.0,
      },
    ],
  },
  {
    id: 24,
    user_id: 125,
    created_at: "2024-01-05T07:15:00.000Z",
    updated_at: "2024-01-05T07:15:00.000Z",
    request_date: "2024-01-05T00:00:00.000Z",
    pending_date: "2024-01-06T00:00:00.000Z",
    date_approval: "2024-01-07T00:00:00.000Z",
    category: {
      id: 3,
      name: "Psychological Services",
    },
    status: {
      id: 2,
      name: "aprobado",
    },
    products: [
      {
        id: 33,
        name: "Online Therapy",
        description: "Monthly subscription to online therapy sessions.",
        price: 100.0,
      },
    ],
  },
  {
    id: 25,
    user_id: 130,
    created_at: "2024-02-10T08:00:00.000Z",
    updated_at: "2024-02-10T08:00:00.000Z",
    request_date: "2024-02-10T00:00:00.000Z",
    pending_date: "2024-02-11T00:00:00.000Z",
    date_approval: "2024-02-12T00:00:00.000Z",
    category: {
      id: 4,
      name: "Structural Services",
    },
    status: {
      id: 1,
      name: "pendiente",
    },
    products: [
      {
        id: 34,
        name: "Landscape Design",
        description: "Complete landscape design service.",
        price: 7000.0,
      },
    ],
  },
];

/*
 * NOMBRE: fetchData
 * DESCRIPCIÓN: Función para obtener todas las compras.
 * @return: arreglo con todas las compras
 */
const fetchData = async () => {
  try {
    const res = await fetch(
      "https://peaceful-basin-91811-0bab38de372b.herokuapp.com/api/v1/products"
    );
    if (!res.ok) {
      throw new Error("Error fetching data");
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [data];
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

  console.log("Approved: ");
  console.log(ApprovedExpenses);
  console.log("total: " + total);

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

export default function dashboardManager() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [data, setData] = useState([]);
  const [expensesData, setExpensesData] = useState([]);
  const [unapprovedExpenses, setUnapprovedExpenses] = useState([]);

  // Función para alternar el estado del drawer
  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Obtener los datos de gastos cuando el componente se monta
  useEffect(() => {
    const fetchAndProcessData = async () => {
      const fetchedData = await fetchData();
      const dataToUse = fetchedData.length > 0 ? fetchedData : localData;
      setData(Array.isArray(dataToUse) ? dataToUse : [dataToUse]);
      const { ApprovedExpenses, total } = getApprovedExpenses(dataToUse);
      setExpensesData(ApprovedExpenses);
      setTotalExpenses(total);

      const unapproved = getUnapprovedExpenses(dataToUse);
      setUnapprovedExpenses(unapproved);
    };

    fetchAndProcessData();
  }, []);

  // Se ejecuta cada vez que `data` cambia
  useEffect(() => {
    if (data.length > 0) {
    }
  }, [data]);

  return (
    // Contenedor principal con flex para el layout
    <div className="flex h-screen overflow-hidden">
      {/* Drawer que se puede alternar */}
      <Drawer isOpen={isDrawerOpen} onToggle={handleDrawerToggle} />
      {/* Contenedor principal que ajusta su margen según el estado del drawer */}
      <Container isDrawerOpen={isDrawerOpen}>
        <hr className="my-5" />
        {/* Carrusel de peticiones del mes sin revisar */}
        <RequestsCarousel requestsData={unapprovedExpenses} />
        <hr className="my-5" />
        {/* Componente de gastos mensuales */}
          <CircularDiagram type={"month"} data={data} />
          <MonthlyExpenses total={totalExpenses} data={expensesData} />

        <hr className="my-5" />
        {/* Tabla de seguimiento de peticiones */}
        <TrackingTable data={data} />
      </Container>
    </div>
  );
}
