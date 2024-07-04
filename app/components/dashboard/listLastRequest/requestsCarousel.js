import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LastRequests from "@/app/components/dashboard/lastRequest/lastRequest";
import Text from "@/app/components/others/text/text";

/**
 * RequestsCarousel Component
 *
 * Este componente muestra una lista de componentes LastRequests en un carrusel que se puede desplazar.
 *
 * @param {Array} requestsData - Lista de datos para las últimas peticiones.
 *
 * @component
 */
const RequestsCarousel = ({ requestsData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

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
      <Text texto="ÚLTIMAS PETICIONES" color="blue" type="header" className="text-left mb-1 font-bold" />

      <div className="flex justify-between items-center mt-8">
        <button
          onClick={prev}
          disabled={currentIndex === 0}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          &lt;
        </button>
        <div className="relative w-full flex space-x-4 overflow-hidden">
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
                    area={request.category.name}
                    leader={request.user_id}
                    description={request.products.map(product => product.name).join(", ")}
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
    </div>
  );
};

export default RequestsCarousel;
