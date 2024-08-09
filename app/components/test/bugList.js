// components/BugList.js
import React, { useEffect, useState } from 'react';
import { getAllBugs } from '@/app/services/bugService';

const BugList = () => {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const bugs = await getAllBugs();
        setBugs(bugs);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBugs();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Bug List</h1>
      <ul>
        {bugs.map((bug) => (
          <li key={bug.id}>
            <h2>{bug.title}</h2>
            <p>{bug.description}</p>
            <p>Reported by: {bug.user ? bug.user.email : 'Unknown'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BugList;
