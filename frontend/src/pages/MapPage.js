/* global kakao */

import { callApi } from '../functions';
import { useState, useEffect } from 'react';
import MapData from '../components/Map/MapData';
import React from 'react';
import Button from '../apis/map/Button';
import '../components/domain/Map/map.css';
import styled from 'styled-components';

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

  return (
    <>
      <GpsContainer>
        <div className="map">
          {isLoading && <MapData addrdata={addrData} />}
        </div>
        <div className="button">
          <Button />
          <Button />
          <Button />
        </div>
      </GpsContainer>
    </>
  );
}

export default MapPage;

const GpsContainer = styled.div`
  position: relative;
  margin-top: 1rem;
  gap: 1.2rem;
`;
