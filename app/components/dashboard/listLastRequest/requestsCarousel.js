"use client";
import "/app/globals.css";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LastRequests from "@/app/components/dashboard/lastRequest/lastRequest";
import Text from "@/app/components/others/text/text";
import { getLatestStatisticalRequestsOfTheMonth } from "@/app/services/shoppingService";

/**
 * RequestsCarousel Component
 *
 * Este componente muestra una lista de componentes LastRequests en un carrusel que se puede desplazar.
 *
 * @component
 */
const RequestsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [requestsData, setRequestsData] = useState([]);

  const updateItemsPerPage = () => {
    const width = window.innerWidth;
    if (width < 640) {
      setItemsPerPage(1);
    } else if (width < 768) {
      setItemsPerPage(2);
    } else {
      setItemsPerPage(3);
    }
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const requests = await getLatestStatisticalRequestsOfTheMonth();
        console.log("Fetched requests:", requests); // Log para depuración
        setRequestsData(requests);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const next = () => {
    if (currentIndex + itemsPerPage < requestsData.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const prev = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  return (
    <div className="w-full">
      <Text
        texto="ÚLTIMAS PETICIONES DE COMPRA"
        color="blue-secondary"
        type="header"
      />
      <div className="flex justify-between items-center mt-2">
        <button
          onClick={prev}
          disabled={currentIndex === 0}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          &lt;
        </button>
        <div className="flex flex-1 overflow-x-hidden">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="flex flex-1 justify-between"
            >
              {requestsData
                .slice(currentIndex, currentIndex + itemsPerPage)
                .map((request, index) => (
                  <LastRequests
                    key={index}
                    area={request.category.name || "N/A"}
                    leader={request.user && request.user.profile && request.user.profile.name ? request.user.profile.name : "N/A"}
                    description={request.description || "N/A"}
                    className="flex-grow min-w-0"
                  />
                ))}
            </motion.div>
          </AnimatePresence>
        </div>
        <button
          onClick={next}
          disabled={currentIndex + itemsPerPage >= requestsData.length}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          &gt;
        </button>
      </div>

      {/* <div className="flex justify-between items-center mt-2">
        <button
          onClick={prev}
          disabled={currentIndex === 0}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          &lt;
        </button>
        <div className="flex overflow-x-hidden">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="flex space-x-4"
            >
              {requestsData
                .slice(currentIndex, currentIndex + itemsPerPage)
                .map((request, index) => (
                  <LastRequests
                    key={index}
                    area={request.category.name || "N/A"} // Categoría de la compra
                    leader={request.user.profile.name || "N/A"} // Nombre del usuario que hizo la solicitud
                    description={request.description || "N/A"} // Descripción de la compra
                  />
                ))}
            </motion.div>
          </AnimatePresence>
        </div>
        <button
          onClick={next}
          disabled={currentIndex + itemsPerPage >= requestsData.length}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          &gt;
        </button>
      </div> */}
    </div>
  );
};

export default RequestsCarousel;
