import { useState, useEffect, useCallback } from 'react';

const useFetchData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('/api/company/get');
      const result = await response.json();
      const filteredData = result
        .filter((item) => item.region === '서울 구로구')
        .map((data) => {
          return {
            company: data.company,
            x: data.x,
            y: data.y,
            address: data.basicAddr,
            title: data.title,
            sal: data.sal,
          };
        });
      setData(filteredData);
    } catch (error) {
      setError('데이터 fetch 중 에러 발생');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
};

export default useFetchData;
