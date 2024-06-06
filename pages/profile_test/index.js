import ProfileForm from "@/app/components/others/container/profileForm";
import "/app/globals.css";
import React from 'react'
import BarChart from "@/app/components/others/graph/linealProviderDiagram";
import StatusBuy from "@/app/components/others/graph/statusCircularDiagram";
import FilterBar from "@/app/components/others/container/filterBar";
import Table from "@/app/components/others/table/table";
import { useState } from 'react';
import ProfileImage from "@/app/components/others/container/profileImage";

const items = [
    {
        item: "computation",
        liderDeArea: "Mateo Lopez",
        estado: "Aprobado",
        fechaPeticion: "01/01/1999",
        fechaAprobado: "02/01/1999",
        fechaFinalizacion: "03/01/1999",
    },
    {
        item: "libro la trova",
        liderDeArea: "Bibliotecaria",
        estado: "cancelado",
        fechaPeticion: "05/05/20223",
        fechaAprobado: "",
        fechaFinalizacion: "05/06/2024",
    },
    {
        item: "libro la guerra",
        liderDeArea: "Bibliotecaria",
        estado: "rechazado",
        fechaPeticion: "05/05/20223",
        fechaAprobado: "",
        fechaFinalizacion: "05/06/2024",
    },
];


const Profile = () => {
    const [filteredItems, setFilteredItems] = useState(items);

    const columns = ["ITEM", "LÍDER DE ÁREA", "ESTADO", "FECHA PETICIÓN", "FECHA APROBADO", "FECHA FINALIZACIÓN"];
    const data = filteredItems.map(item => [
        item.item,
        item.liderDeArea,
        item.estado,
        item.fechaPeticion,
        item.fechaAprobado,
        item.fechaFinalizacion
    ]);
    return (
        <>
            <div className="min-h-screen  justify-center bg-gray-100">
                <ProfileImage/>
                <ProfileForm/>
                <br></br>
                <BarChart />
                <StatusBuy />
                <br></br>
                <FilterBar items={items} setFilteredItems={setFilteredItems} />
                <Table columns={columns} data={data} />
            </div>

        </>

    )

}

export default Profile