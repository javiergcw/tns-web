import React, { useEffect, useState } from "react";
import { getShoppingsByUserId } from "@/app/services/shoppingService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ShoppingTable = ({ userId }) => {
  const [shoppings, setShoppings] = useState([]);
  const [filteredShoppings, setFilteredShoppings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [itemFilter, setItemFilter] = useState("");
  const [leaderFilter, setLeaderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [leaderOptions, setLeaderOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);

  useEffect(() => {
    const fetchShoppings = async () => {
      try {
        const fetchedShoppings = await getShoppingsByUserId(
          localStorage.getItem("userId")
        );
        setShoppings(fetchedShoppings);
        setFilteredShoppings(fetchedShoppings);

        // Obtener opciones únicas para los dropdowns
        const leaders = [
          ...new Set(
            fetchedShoppings.map((shopping) => shopping.user.profile.name)
          ),
        ];
        const statuses = [
          ...new Set(fetchedShoppings.map((shopping) => shopping.status.name)),
        ];
        setLeaderOptions(leaders);
        setStatusOptions(statuses);
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
      filtered = filtered.filter((shopping) =>
        shopping.products.some((product) =>
          product.name.toLowerCase().includes(itemFilter.toLowerCase())
        )
      );
    }

    if (leaderFilter) {
      filtered = filtered.filter(
        (shopping) =>
          shopping.user.profile.name.toLowerCase() ===
          leaderFilter.toLowerCase()
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(
        (shopping) =>
          shopping.status.name.toLowerCase() === statusFilter.toLowerCase()
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
        <h2>Nombre del item</h2>
        <div className="filter-inputs">
          <input
            type="text"
            placeholder="Item"
            value={itemFilter}
            onChange={(e) => setItemFilter(e.target.value)}
          />
          <select
            value={leaderFilter}
            onChange={(e) => setLeaderFilter(e.target.value)}
          >
            <option value="">Todos los Líderes</option>
            {leaderOptions.map((leader) => (
              <option key={leader} value={leader}>
                {leader}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Todos los Estados</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <button
            onClick={clearFilters}
            className="bg-red-500 text-white p-2 rounded"
          >
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
                    <td>
                      {new Date(shopping.request_date).toLocaleDateString()}
                    </td>
                    <td>
                      {new Date(shopping.date_approval).toLocaleDateString()}
                    </td>
                    <td>
                      {new Date(shopping.pending_date).toLocaleDateString()}
                    </td>
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
