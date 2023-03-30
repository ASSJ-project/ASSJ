import { useState, useEffect } from 'react';

function useFetch(url, headers, queryParams) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // URL, 헤더, 쿼리 파라미터 등을 동적으로 설정
        const response = await fetch(url, { headers, queryParams });
        const json = await response.json();
        setData(json);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, headers, queryParams]);

  return { data, isLoading, error };
}
