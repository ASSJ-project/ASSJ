import { useState, useEffect } from 'react';

function useFetch(url, queryParams = {}, headers = {}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const urlWithQueryParams = new URLSearchParams(queryParams)
      ? `${url}?${new URLSearchParams(queryParams)}`
      : url;

    console.log(urlWithQueryParams);
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(urlWithQueryParams, {
          method: 'GET',
          headers,
        });
        const json = await response.json();
        setData(json);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
}

export default useFetch;
