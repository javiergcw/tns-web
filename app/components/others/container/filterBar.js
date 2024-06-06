import { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa'; // Importar el ícono de basura

const FilterBar = ({ items, setFilteredItems }) => {
  const [filter, setFilter] = useState('');
  const [selectedLeader, setSelectedLeader] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    applyFilters();
  }, [filter, selectedLeader, selectedStatus]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleLeaderChange = (e) => {
    setSelectedLeader(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const applyFilters = () => {
    let filtered = items;

    if (filter) {
      filtered = filtered.filter(item =>
        item.item.toLowerCase().includes(filter.toLowerCase())
      );
    }

    if (selectedLeader) {
      filtered = filtered.filter(item => item.liderDeArea === selectedLeader);
    }

    if (selectedStatus) {
      filtered = filtered.filter(item => item.estado === selectedStatus);
    }

    setFilteredItems(filtered);
  };

  const resetFilters = () => {
    setFilter('');
    setSelectedLeader('');
    setSelectedStatus('');
    setFilteredItems(items);
  };

  const uniqueLeaders = [...new Set(items.map(item => item.liderDeArea))];
  const uniqueStatuses = [...new Set(items.map(item => item.estado))];

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Filtros
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Nombre de ítem"
            className="border p-2 rounded-lg flex-grow"
            value={filter}
            onChange={handleFilterChange}
          />
          <select
            className={`border p-2 rounded-lg ${selectedLeader ? 'bg-blue-100' : ''}`}
            value={selectedLeader}
            onChange={handleLeaderChange}
          >
            <option value="">Líder de área</option>
            {uniqueLeaders.map((leader, index) => (
              <option key={index} value={leader}>{leader}</option>
            ))}
          </select>
          <select
            className={`border p-2 rounded-lg ${selectedStatus ? 'bg-blue-100' : ''}`}
            value={selectedStatus}
            onChange={handleStatusChange}
          >
            <option value="">Estado</option>
            {uniqueStatuses.map((status, index) => (
              <option key={index} value={status}>{status}</option>
            ))}
          </select>
          <button
            className="border p-2 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
            onClick={resetFilters}
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
