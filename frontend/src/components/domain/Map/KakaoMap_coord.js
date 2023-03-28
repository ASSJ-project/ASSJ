/* global kakao */

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const KakaoMapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export default function KakaoMap(props) {
  const { data } = props;
  const [kakaoMap, setKakaoMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://dapi.kakao.com/v2/maps/sdk.js?appkey=a8f261db701c3d43d7424b62afca4d55&autoload=false&libraries=services,clusterer,drawing';
    document.head.appendChild(script);
    script.onload = () => {
      kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const mapOptions = {
          center: new kakao.maps.LatLng(37.4954330863648, 126.88750531451),
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
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);
    const newMarkers = data.map((item, index) => {
      // WTM 좌표를 WGS84 좌표계의 좌표로 변환합니다
      setTimeout(() => {
        geocoder.transCoord(item.x, item.y, transCoordCB, {
          input_coord: kakao.maps.services.Coords.WGS84, // 변환을 위해 입력한 좌표계 입니다
          output_coord: kakao.maps.services.Coords.WTM, // 변환 결과로 받을 좌표계 입니다
        });
      }, Math.floor(index / 20) * 200);

      function transCoordCB(result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          console.log(item.y + ' ' + item.x + ' ' + item.basicAddr);
          console.log(result[0].y + ' ' + result[0].x);
          console.log(
            calculateDistance(
              result[0].x,
              result[0].y,
              183800.30000010456,
              441987.4999991781
            )
          );
        }
      }

      return new kakao.maps.Marker({
        map: kakaoMap,
        position: new kakao.maps.LatLng(item.y, item.x),
      });
    });

    setMarkers(newMarkers);
  }, [kakaoMap, data]);

  function calculateDistance(x1, y1, x2, y2) {
    const xDiff = x2 - x1;
    const yDiff = y2 - y1;
    const distance = Math.sqrt(xDiff ** 2 + yDiff ** 2) / 1000;
    return `${distance.toFixed(2)}km`;
  }

  return <KakaoMapContainer id="map" />;
}
