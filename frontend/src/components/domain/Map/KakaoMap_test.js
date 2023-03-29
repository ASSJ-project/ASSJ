/* global kakao */

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './map.css';

const KakaoMapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export default function KakaoMap(props) {
  const { data } = props;
  const [kakaoMap, setKakaoMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const userY = 37.4954330863648;
  const userX = 126.88750531451;

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://dapi.kakao.com/v2/maps/sdk.js?appkey=a8f261db701c3d43d7424b62afca4d55&autoload=false&libraries=services,clusterer,drawing';
    document.head.appendChild(script);
    script.onload = () => {
      kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const mapOptions = {
          center: new kakao.maps.LatLng(userY, userX),
          level: 7,
        };
        const map = new kakao.maps.Map(mapContainer, mapOptions);

        setKakaoMap(map);
      });
    };
  }, []);

  useEffect(() => {
    if (!kakaoMap || !data) {
      return;
    }

    const geocoder = new kakao.maps.services.Geocoder();

    // 기존에 생성된 마커 제거
    // markers.forEach((marker) => marker.setMap(null));
    markers.forEach((item) => {
      item.overlay.setMap(null);
      item.marker.setMap(null);
    });
    setMarkers([]);
    const newMarkers = data.map((item, index) => {
      let newContent = null; // newContent 변수를 초기화합니다.
      // WTM 좌표를 WGS84 좌표계의 좌표로 변환합니다
      geocoder.transCoord(item.x, item.y, transCoordCB, {
        input_coord: kakao.maps.services.Coords.WGS84, // 변환을 위해 입력한 좌표계 입니다
        output_coord: kakao.maps.services.Coords.WTM, // 변환 결과로 받을 좌표계 입니다
      });

      function transCoordCB(result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          let distance = calculateDistance(
            result[0].x,
            result[0].y,
            187803.21000005602,
            451046.9699993003
          );
        }
      }

      // return (newContent = `<div>${distance}</div>`);
      console.log(`거리: ${newContent}`);
      return {
        overlay: new kakao.maps.CustomOverlay({
          map: kakaoMap,
          position: new kakao.maps.LatLng(item.y, item.x),
          content: newContent,
        }),
        marker: new kakao.maps.Marker({
          map: kakaoMap,
          position: new kakao.maps.LatLng(item.y, item.x),
        }),
      };
    });

    setMarkers(newMarkers);
  }, [kakaoMap, data]);

  function calculateDistance(x1, y1, x2, y2) {
    const xDiff = x2 - x1;
    const yDiff = y2 - y1;
    const distance = Math.sqrt(xDiff ** 2 + yDiff ** 2) / 1000;
    return `${distance.toFixed(2)}km`;
  }

  return (
    <KakaoMapContainer id="map">
      {kakaoMap && <p>Kakao Map is loaded.</p>}
    </KakaoMapContainer>
  );
}
