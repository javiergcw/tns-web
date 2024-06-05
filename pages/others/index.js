import "/app/globals.css";
import InfoCard from '@/app/components/others/container/infoCard'
import React from 'react'
import Table from "@/app/components/others/table/table";
import PeticionCard from "@/app/components/others/container/petitionCard";
import AnualChart from "@/app/components/others/graph/circularDiagram";

const data = [
    { title: "Sistemas:<br /> compra computador xpt", amount: 1000000 },
    { title: "Marketing:<br /> campaña publicitaria", amount: 2000000 },
    { title: "Operaciones:<br /> maquinaria nueva", amount: 1500000 },
    { title: "Finanzas:<br /> inversión capital", amount: 2500000 },
    { title: "Recursos Humanos:<br /> capacitación", amount: 300000 },
    { title: "Investigación:<br /> desarrollo de producto", amount: 1200000 }
];
const dataTable = [
    ["Item", "Líder de área", "Estado", "Fecha petición", "Fecha aprobado", "Fecha finalización"],
    ["Tarea 1", "Juan Pérez", "En progreso", "2024-06-04", "2024-06-04", null],
    ["Tarea 2", "Ana Gómez", "Pendiente", "2024-06-03", null, null],
    ["Tarea 3", "Pedro Rodríguez", "Completado", "2024-06-02", "2024-06-02", "2024-06-04"],
    ["Tarea 1", "Juan Pérez", "En progreso", "2024-06-04", "2024-06-04", null],
    ["Tarea 2", "Ana Gómez", "Pendiente", "2024-06-03", null, null],
    ["Tarea 3", "Pedro Rodríguez", "Completado", "2024-06-02", "2024-06-02", "2024-06-04"],
    ["Tarea 1", "Juan Pérez", "En progreso", "2024-06-04", "2024-06-04", null],
    ["Tarea 2", "Ana Gómez", "Pendiente", "2024-06-03", null, null],
    ["Tarea 3", "Pedro Rodríguez", "Completado", "2024-06-02", "2024-06-02", "2024-06-04"],
    ["Tarea 1", "Juan Pérez", "En progreso", "2024-06-04", "2024-06-04", null],
    ["Tarea 2", "Ana Gómez", "Pendiente", "2024-06-03", null, null],
    ["Tarea 3", "Pedro Rodríguez", "Completado", "2024-06-02", "2024-06-02", "2024-06-04"],
    ["Tarea 1", "Juan Pérez", "En progreso", "2024-06-04", "2024-06-04", null],
    ["Tarea 2", "Ana Gómez", "Pendiente", "2024-06-03", null, null],
    ["Tarea 3", "Pedro Rodríguez", "Completado", "2024-06-02", "2024-06-02", "2024-06-04"],
    ["Tarea 1", "Juan Pérez", "En progreso", "2024-06-04", "2024-06-04", null],
    ["Tarea 2", "Ana Gómez", "Pendiente", "2024-06-03", null, null],
    ["Tarea 3", "Pedro Rodríguez", "Completado", "2024-06-02", "2024-06-02", "2024-06-04"],
    // ... more items
];

const Others = () => {
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((item, index) => (
                    <InfoCard key={index} title={item.title} amount={item.amount} />
                ))}


            </div>

            <div className="container mx-auto">
                <Table columns={dataTable[0]} data={dataTable.slice(1)} />
            </div>
            <div>
                <PeticionCard/>
            </div>
            <div>
                <AnualChart/>
            </div>
        </>

    )

}

export default Others