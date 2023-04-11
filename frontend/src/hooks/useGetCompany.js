// useGetCompany.js
import { useState, useEffect } from 'react';

const useGetCompany = (region, jobsCd, page) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const url = `/api/company/getItems?region=${region}&jobsCd=${jobsCd}&page=${page}&size=10`;
  console.log(url);

  const resetItems = () => {
    setItems([]);
    setHasMore(true);
  };

  useEffect(() => {
    if (!hasMore) return;

    setLoading(true);
    fetch(
      `/api/company/getItems?region=${region}&jobsCd=${jobsCd}&page=${page}&size=10`
    )
      .then((response) => response.json())
      .then((data) => {
        setItems((prevItems) => [...prevItems, ...data]);
      })
      .catch((error) => {
        setError(error);
      });
    setLoading(false);
  }, [region, jobsCd, page]);

  return { items, loading, error };
};

export default useGetCompany;
