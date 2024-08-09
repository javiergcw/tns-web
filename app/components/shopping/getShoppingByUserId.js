import React, { useEffect, useState } from "react";
import { getShoppingsByUserId } from "@/app/services/shoppingService"; // Asegúrate de que la ruta sea correcta
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ShoppingTable = ({ userId }) => {
    const [shoppings, setShoppings] = useState([]);
    const [filteredShoppings, setFilteredShoppings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [itemFilter, setItemFilter] = useState("");
    const [leaderFilter, setLeaderFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    useEffect(() => {
        const fetchShoppings = async () => {
            try {
                const fetchedShoppings = await getShoppingsByUserId(localStorage.getItem('userId'));
                setShoppings(fetchedShoppings);
                setFilteredShoppings(fetchedShoppings);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchShoppings();
    }, [userId]);

    useEffect(() => {
        filterShoppings();
    }, [itemFilter, leaderFilter, statusFilter]);

    const filterShoppings = () => {
        let filtered = shoppings;

        if (itemFilter) {
            filtered = filtered.filter(shopping =>
                shopping.products.some(product =>
                    product.name.toLowerCase().includes(itemFilter.toLowerCase())
                )
            );
        }

        if (leaderFilter) {
            filtered = filtered.filter(shopping =>
                shopping.user.profile.name.toLowerCase().includes(leaderFilter.toLowerCase())
            );
        }

        if (statusFilter) {
            filtered = filtered.filter(shopping =>
                shopping.status.name.toLowerCase().includes(statusFilter.toLowerCase())
            );
        }

        setFilteredShoppings(filtered);
    };

    const clearFilters = () => {
        setItemFilter("");
        setLeaderFilter("");
        setStatusFilter("");
        setFilteredShoppings(shoppings);
    };

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="app-container">
            <h1>Compras</h1>
            <div className="filters-container">
                <h2>Filtros</h2>
                <div className="filter-inputs">
                    <input
                        type="text"
                        placeholder="Nombre de item"
                        value={itemFilter}
                        onChange={e => setItemFilter(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Líder de área"
                        value={leaderFilter}
                        onChange={e => setLeaderFilter(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Estado"
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value)}
                    />
                    <button onClick={clearFilters} className="clear-filters-button">
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            </div>
            <div className="table-container">
                <div className="table-wrapper">
                    <table className="shopping-table">
                        <thead>
                            <tr>
                                <th>ITEM</th>
                                <th>LÍDER DE ÁREA</th>
                                <th>ESTADO</th>
                                <th>FECHA PETICIÓN</th>
                                <th>FECHA APROBADO</th>
                                <th>FECHA FINALIZACIÓN</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredShoppings.length === 0 ? (
                                <tr>
                                    <td colSpan="6">No hay compras</td>
                                </tr>
                            ) : (
                                filteredShoppings.map((shopping) => (
                                    <tr key={shopping.id}>
                                        <td>
                                            <ul>
                                                {shopping.products.map((product) => (
                                                    <li key={product.id}>{product.name}</li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td>{shopping.user.profile.name}</td>
                                        <td>{shopping.status.name}</td>
                                        <td>{new Date(shopping.request_date).toLocaleDateString()}</td>
                                        <td>{new Date(shopping.date_approval).toLocaleDateString()}</td>
                                        <td>{new Date(shopping.pending_date).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ShoppingTable;
