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
  const [content, setContent] = useState('');
  const [overlays, setOverlays] = useState([]);
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

    // 기존에 생성된 마커 제거
    // markers.forEach((marker) => marker.setMap(null));
    markers.forEach((item) => {
      item.overlay.setMap(null);
      item.marker.setMap(null);
    });
    setMarkers([]);
    const newMarkers = data.map((item, index) => {
      // WTM 좌표를 WGS84 좌표계의 좌표로 변환합니다

      var content = `<div class ="label"><span class="left"></span><span class="center">${index}</span><span class="right"></span></div>`;

      return {
        overlay: new kakao.maps.CustomOverlay({
          map: kakaoMap,
          position: new kakao.maps.LatLng(item.y, item.x),
          content: content,
        }),
        marker: new kakao.maps.Marker({
          map: kakaoMap,
          position: new kakao.maps.LatLng(item.y, item.x),
        }),
      };
    });

    setMarkers(newMarkers);
  }, [kakaoMap, data]);

  return (
    <KakaoMapContainer id="map">
      {kakaoMap && <p>Kakao Map is loaded.</p>}
    </KakaoMapContainer>
  );
}
