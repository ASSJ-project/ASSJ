// useGetCompany.js
import { useState, useEffect } from 'react';

const useGetCompany = (region, jobsCd, page) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const resetItems = () => {
    setItems([]);
    setHasMore(true);
  };

  useEffect(() => {
    if (!hasMore) return;

    setLoading(true);
    fetch(
      `/api/company/items?region=${region}&jobsCd=${jobsCd}&page=${page}&size=10`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          setHasMore(false);
        } else {
          setItems((prevItems) => [...prevItems, ...data]);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [region, jobsCd, page]);

  return { items, loading, error, resetItems, hasMore };
};

export default useGetCompany;