// useApiFetch.js
import { useState, useEffect } from 'react';
// import fetch from 'node-fetch';

const useFetch = (url, queryParam, header) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams(queryParam).toString();
        const response = await fetch(`${url}?${queryParams}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...header,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setData(data);
        } else {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, JSON.stringify(queryParam), JSON.stringify(header)]);

  return { data, loading, error };
};

export default useFetch;
