import { callApi } from '../functions';
import { useState, useEffect } from 'react';
import MapData from '../components/Map/MapData';
import React from 'react';

/* DB에 데이터 요청하는 함수 */

function MapPage() {
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
          //.filter((item) => item.jobsCd.startsWith("01")) // 지역 필터
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

  return <div>{isLoading && <MapData addrdata={addrData} />}</div>;
}

export default MapPage;
