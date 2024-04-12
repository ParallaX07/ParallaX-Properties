import { useState, useEffect } from 'react';
import db from '../assets/db.json';

const useFetchData = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(db);
      }, 2000); // Simulating an async operation
    });
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const properties = await fetchData();
        setData(properties);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return { data, isLoading };
};

export default useFetchData;