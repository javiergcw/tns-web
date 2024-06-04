import "/app/globals.css";
import InfoCard from '@/app/components/others/container/infoCard'
import React from 'react'


const data = [
    { title: "Sistemas:<br /> compra computador xpt", amount: 1000000 },
    { title: "Marketing:<br /> campaña publicitaria", amount: 2000000 },
    { title: "Operaciones:<br /> maquinaria nueva", amount: 1500000 },
    { title: "Finanzas:<br /> inversión capital", amount: 2500000 },
    { title: "Recursos Humanos:<br /> capacitación", amount: 300000 },
    { title: "Investigación:<br /> desarrollo de producto", amount: 1200000 }
];

const Others = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((item, index) => (
                <InfoCard key={index} title={item.title} amount={item.amount} />
            ))}
        </div>
    )
}

export default Others