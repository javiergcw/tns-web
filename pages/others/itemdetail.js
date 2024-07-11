import React from 'react';
import "/app/globals.css";
import DetailPetition from '@/app/components/others/container/detailPetition';
import MonthlyExpenses from '@/app/components/others/container/monthlyExpenses';
import ProveedorForm from '@/app/components/others/fields/proveedorForm';

const petitionData = {
  title: "Petición Ejemplo",
  category: "Categoría Seleccionada",
  description: "Esta es una descripción de ejemplo para la petición.",
  date: "2024-06-05",
  leader: "Líder Ejemplo",
  stage: "Etapa Ejemplo"
};

const ItemDetail = () => {
  const totalGastos = "14’500,345";
  const listaGastos = [
    { value: "456,100", title: "Compra computador" },
    { value: "456,100", title: "Compra computador" },
    { value: "456,100", title: "Compra computador" },
    { value: "456,100", title: "Compra computador" },
    { value: "456,100", title: "Compra computador" }
  ];
  return (
    <div className="container  px-6">
      <DetailPetition
        title={petitionData.title}
        category={petitionData.category}
        description={petitionData.description}
        date={petitionData.date}
        leader={petitionData.leader}
        stage={petitionData.stage}
      />
      <MonthlyExpenses
        total={totalGastos} expenses={listaGastos}
      />
      <ProveedorForm></ProveedorForm>
    </div>
  );
}

export default ItemDetail;
