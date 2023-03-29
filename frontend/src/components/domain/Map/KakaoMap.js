/* global kakao */

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './map.css';
import marker from 'assets/images/marker_img.png';
import proj4 from 'proj4';

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

    const imageSrc = marker, // 마커이미지의 주소입니다
      imageSize = new kakao.maps.Size(25, 40), // 마커이미지의 크기입니다
      imageOption = { offset: new kakao.maps.Point(30, 40) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    const geocoder = new kakao.maps.services.Geocoder();

    // 기존에 생성된 마커 제거
    // markers.forEach((marker) => marker.setMap(null));
    markers.forEach((item) => {
      item.overlay.setMap(null);
      item.marker.setMap(null);
    });
    setMarkers([]);
    const newMarkers = data.map((item, index) => {
      const content = document.createElement('div');
      content.className = 'label';
      content.innerHTML = `<span class="center">"로딩 중"</span>`;
      // const center = document.createElement('span');
      // center.className = 'center';
      // center.textContent = '로딩 중';
      // content.appendChild(center);

      // 거리 정보를 계산하여 content에 추가합니다.
      setTimeout(() => {
        geocoder.transCoord(
          item.x,
          item.y,
          (result, status) => {
            transCoordCB(result, status, content);
          },
          {
            input_coord: kakao.maps.services.Coords.WGS84, // 변환을 위해 입력한 좌표계 입니다
            output_coord: kakao.maps.services.Coords.WTM, // 변환 결과로 받을 좌표계 입니다
          }
        );
      }, Math.floor(index / 20) * 200);

      return {
        overlay: new kakao.maps.CustomOverlay({
          map: kakaoMap,
          position: new kakao.maps.LatLng(item.y, item.x),
          content: content,
          yAnchor: 1,
        }),
        marker: new kakao.maps.Marker({
          map: kakaoMap,
          position: new kakao.maps.LatLng(item.y, item.x),
          // image: markerImage,
        }),
      };
    });

    setMarkers(newMarkers);
  }, [kakaoMap, data]);

  function transCoordCB(result, status, content) {
    // WGS84 좌표를 UTM 좌표로 변환
    proj4.defs('EPSG:4326', '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs');
    // EPSG:5179 좌표계 정의 추가
    proj4.defs(
      'EPSG:5181',
      '+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs'
    );

    const wtmCoords = proj4('EPSG:4326', 'EPSG:5181', [userX, userY]);
    console.log(wtmCoords);
    // 정상적으로 검색이 완료됐으면
    if (status === kakao.maps.services.Status.OK) {
      let distance = calculateDistance(
        result[0].x,
        result[0].y,
        wtmCoords[0],
        wtmCoords[1]
      );

      content.innerHTML = `<div>${distance}</div>`;
    }
  }

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
