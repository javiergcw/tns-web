import React, { useState, useEffect } from 'react';
import { getAllBugs } from '@/app/services/bugService'; // Asegúrate de ajustar la ruta según tu estructura de carpetas

const BugsList = () => {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const bugsData = await getAllBugs();
        setBugs(bugsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBugs();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Bugs List</h1>
      <ul>
        {bugs.map(bug => (
          <li key={bug.title}>
            <h2>{bug.title}</h2>
            <p>{bug.description}</p>
            <p>Category ID: {bug.category_id}</p>
            <p>User ID: {bug.user_id}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BugsList;
