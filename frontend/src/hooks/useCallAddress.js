import { callApi } from '../functions';
import { useState, useEffect } from 'react';

function useCallAddress() {
  const url = '/api/getCorpData';
  const [addrData, setAddrData] = useState();
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const dataList = await callApi(url);
        const addr = await dataList
          .filter((item) => item.region.includes('강남구'))
          .map((item) => {
            return {
              company: item.company,
              x: item.x,
              y: item.y,
              address: item.basicAddr,
            };
          });
        setAddrData(addr);
        setLoading(true);
      } catch (error) {
        setError(true);
      }
    }
    fetchData();
  }, []);

  return [addrData, isLoading, isError];
}

export default useCallAddress;
