/* global kakao */

import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

const KakaoMapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export default function KakaoMapTest(props) {
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
        const mapOption = {
          center: new kakao.maps.LatLng(37.4954330863648, 126.88750531451),
          level: 9,
        };
        const map = new kakao.maps.Map(mapContainer, mapOption);
        setKakaoMap(map);
      });
    };
  }, []);

  useEffect(() => {
    if (!kakaoMap || !data) {
      return;
    }
    // 기존에 생성된 마커 제거
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);
    const point1 = new kakao.maps.LatLng(37.500095, 127.026491);
    const services = new kakao.maps.services.Places();
    const addListener = () => {
      const newMarkers = data.map((item) => {
        const point2 = new kakao.maps.LatLng(item.y, item.x);
        const distance = kakao.maps.geometry.distance(point1, point2);
        console.log(distance);

        return new kakao.maps.Marker({
          map: kakaoMap,
          position: point2,
        });
      });
      setMarkers(newMarkers);
    };

    if (kakao.maps.services.Status.OK) {
      addListener();
    } else {
      services.events.addListener(services, 'status_changed', () => {
        if (services.getStatus() === kakao.maps.services.Status.OK) {
          addListener();
        }
      });
    }
  }, [kakaoMap, data]);

  return <KakaoMapContainer id="map" />;
}
