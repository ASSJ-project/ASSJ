import { useState, useEffect } from 'react';
import axios from 'axios';

function useGetCompany(region, jobsCd, page) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      const token = sessionStorage.getItem('access_token');

      const queryParam = {
        page: page,
        size: 10,
        region: region,
        jobsCd: jobsCd,
      };

      const header = {
        'X-Custom-Header': 'YourCustomHeaderValue',
        authorization: 'Bearer ' + token,
      };

      try {
        const { data } = await axios.get('/api/company/items', {
          params: queryParam,
          headers: header,
        });

        setItems((prev) => [...prev, ...data]);
      } catch (error) {
        setError(error);
      }

      setLoading(false);
    }

    fetchData();
  }, [region, jobsCd, page]);

  return { items, loading, error };
}

export default useGetCompany;
