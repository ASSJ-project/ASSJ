import React, { useState, useEffect } from 'react';
import KakaoMap from './KakaoMap';

export default function MapData({ add }) {
  const [visible, setVisible] = useState(true);
  const [markerPositions, setMarkerPositions] = useState([]);
  const [axis, setAxis] = useState([]);
  const [company, setCompany] = useState([]);

  useEffect(() => {
    // 주소로 좌표 변환
    async function getData(address) {
      let aa = [];
      let response = await fetch(
        'https://dapi.kakao.com/v2/local/search/address.json?&query=' +
          address.address,
        {
          method: 'GET',
          headers: {
            Authorization: 'KakaoAK 50bbb5205dc8fcc9c2611542015a54d5',
          },
        }
      );
      let data = await response.json();
      let x = parseFloat(data.documents[0].x);
      let y = parseFloat(data.documents[0].y);

      aa.push(y, x);
      setAxis((axis) => [...axis, aa]);
      setCompany((comp) => [...comp, address.company]);

      console.log(x);
    }

    add.forEach((address) => {
      getData(address);
    });
  }, [add]);

  const [mapSize, setMapSize] = useState([100, 80]);

  // 차트찍기
  return (
    <div className="App">
      <button
        onClick={() => {
          setMapSize([100, 80]);
          setMarkerPositions(axis);
        }}
      >
        주변 회사 불러오기
      </button>
      <div id="wrap">
        {visible && (
          <>
            <h2>Kakao Map</h2>
            <KakaoMap
              markerPositions={markerPositions}
              size={mapSize}
              company={company}
            />
          </>
        )}
      </div>
    </div>
  );
}
