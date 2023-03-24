/* global kakao */

import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

const KakaoMapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export default function KakaoMapTest(props) {
  const { data } = props;
  const [kakaoMap, setKakaoMap] = useState();
  // console.log(`clusterer: ${clusterer}`, clusterer);
  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://dapi.kakao.com/v2/maps/sdk.js?appkey=a8f261db701c3d43d7424b62afca4d55&autoload=false&libraries=services,clusterer,drawing';
    document.head.appendChild(script);
    script.onload = () => {
      kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          // 사용자 현재 주소 좌표를 받아옴
          center: new kakao.maps.LatLng(37.4954330863648, 126.88750531451),
          level: 9,
        };
        const map = new kakao.maps.Map(container, options);

        // clusterer.clear();

        const clusterer = new kakao.maps.MarkerClusterer({
          map: map,
          averageCenter: true,
          minLevel: 4,
          calculator: [10, 30, 50],
          minClusterSize: 1,
        });
        
        console.log(`clusterer: ${clusterer}`, clusterer);
        const markers = [];
        for (const item of data) {
          const marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(item.y, item.x),
          });
          markers.push(marker);
        }

        clusterer.addMarkers(markers);
        setKakaoMap(map);
      });
    };
  }, [data]);

  return <KakaoMapContainer id="map" />;
}
