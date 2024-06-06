import '/app/globals.css'

import DetailPetition from "@/app/components/others/container/detailPetition";

const petitionData = {
  title: "Petición Ejemplo",
  category: "Categoría Ejemplo",
  description: "Esta es una descripción de ejemplo para la petición.",
  date: "2024-06-05",
  leader: "Líder Ejemplo",
  stage: "Etapa Ejemplo"
};


const itemdetail = () => {
  return (
    <div className="container mx-auto p-6">
      <DetailPetition
        title={petitionData.title}
        category={petitionData.category}
        description={petitionData.description}
        date={petitionData.date}
        leader={petitionData.leader}
        stage={petitionData.stage}
      />
    </div>
  );
}
export default itemdetail;