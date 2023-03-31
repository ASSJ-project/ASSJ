/* global kakao */

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import proj4 from 'proj4';
import './style.css';

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
          center: new kakao.maps.LatLng(37.4954330863648, 126.88750531451),
          level: 9,
        };
        const map = new kakao.maps.Map(mapContainer, mapOptions);

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(37.4954330863648, 126.88750531451),
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);

        setKakaoMap(map);
      });
    };
  }, [data]);

  useEffect(() => {
    if (!kakaoMap || !data) {
      return;
    }

    // 기존에 생성된 마커 제거
    markers.forEach((item) => {
      item.overlay.setMap(null);
      // item.marker.setMap(null);
    });
    setMarkers([]);
    const newMarkers = data.map((item) => {
      let content,
        distance = userBasedtransCoordCB(item.wtmY, item.wtmX);
      if (distance === null) {
        content =
          '<div class ="label"><span class="left"></span><span class="center">로딩중!</span><span class="right"></span></div>';
      } else {
        content = `<div class ="label"><span class="left"></span><span class="center">${distance}</span><span class="right"></span></div>`;
      }
      return {
        overlay: new kakao.maps.CustomOverlay({
          map: kakaoMap,
          position: new kakao.maps.LatLng(item.wgsY, item.wgsX),
          content: content,
          yAnchor: 1,
        }),
        // marker: new kakao.maps.Marker({
        // map: kakaoMap,
        // position: new kakao.maps.LatLng(item.wgsY, item.wgsX),
        // }),
      };
    });

    setMarkers(newMarkers);
  }, [kakaoMap, data]);

  // let distance;
  function userBasedtransCoordCB(y, x) {
    proj4.defs('EPSG:4326', '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs');
    // EPSG:5179 좌표계 정의 추가
    proj4.defs(
      'EPSG:5181',
      '+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs'
    );

    const wtmCoords = proj4('EPSG:4326', 'EPSG:5181', [userX, userY]);
    let distance = calculateDistance(x, y, wtmCoords[0], wtmCoords[1]);
    return distance;
  }

  function calculateDistance(x1, y1, x2, y2) {
    const xDiff = x2 - x1;
    const yDiff = y2 - y1;
    const distance = Math.sqrt(xDiff ** 2 + yDiff ** 2) / 1000;
    return `${distance.toFixed(2)}km`;
  }

  return (
    <div style={{ width: '100%', height: '100%' }} id="map">
      {kakaoMap && <p>Kakao Map is loaded.</p>}
    </div>
  );
}
