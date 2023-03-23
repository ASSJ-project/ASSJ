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
  const markers = [];

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://dapi.kakao.com/v2/maps/sdk.js?appkey=a8f261db701c3d43d7424b62afca4d55&autoload=false&libraries=services,clusterer,drawing';
    document.head.appendChild(script);
    script.onload = () => {
      kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const options = {
          // 사용자 현재 주소 좌표를 받아옴
          center: new kakao.maps.LatLng(37.4954330863648, 126.88750531451),
          level: 9,
        };
        const map = new kakao.maps.Map(mapContainer, options);

        setKakaoMap(map);
      });
    };
  }, []);

  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }
    const clusterer = new kakao.maps.MarkerClusterer({
      map: kakaoMap,
      averageCenter: true,
      minLevel: 4,
      calculator: [10, 30, 50],
      minClusterSize: 1,
    });

    console.log(`clusterer: ${clusterer}`, clusterer);

    for (const item of data) {
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(item.y, item.x),
      });
      markers.push(marker);
    }
    clusterer.removeMarkers(markers);
    clusterer.addMarkers(markers);
  }, [kakaoMap, data]);

  // 지도 위에 표시되고 있는 마커를 모두 제거합니다
  function removeMarker() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = [];
  }

  return <KakaoMapContainer id="map" />;
}

// https://codesandbox.io/s/gifted-wescoff-77nwu?file=/src/KakaoMap.js
