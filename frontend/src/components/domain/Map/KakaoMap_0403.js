/* global kakao */

import React, { useEffect, useState } from 'react';
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
    });
    setMarkers([]);
    const newMarkers = data.map((item) => {
      let content,
        distance = userBasedtransCoordCB(item.wtmY, item.wtmX);
      if (distance === null) {
        content =
          '<div class="label"><span class="left"></span><span class="center">로딩중!</span><span class="right"></span></div>';
      } else {
        content = `<div class="label"><span class="left"></span><span class="center">${distance}</span><span class="right"></span></div>`;
      }
      const overlayContent = document.createElement('div');
      overlayContent.innerHTML = content;
      overlayContent.onmouseover = () => showMoreInfo(overlayContent, item);
      overlayContent.onmouseout = () => hideMoreInfo(overlayContent);

      const overlay = new kakao.maps.CustomOverlay({
        position: new kakao.maps.LatLng(item.wgsY, item.wgsX),
        content: overlayContent,
        yAnchor: 1,
      });

      // 커스텀 오버레이를 클릭했을 때 원하는 내용을 표시하는 함수입니다
      function showMoreInfo(overlayContent, item) {
        // 원하는 내용을 표시하는 코드를 작성하세요
        const moreInfoContent = `
        <div class="overlay_info" style="position: absolute; bottom: 100%;">
          <a href="https://place.map.kakao.com/17600274" target="_blank"><strong>${item.company}</strong></a>
          <div class="desc">${distance}<span class="address">${item.basicAddr}</span></div>
        </div>`;
        overlayContent.insertAdjacentHTML('beforeend', moreInfoContent);
      }

      // 마우스가 오버레이에서 벗어났을 때 원래의 내용으로 돌아가도록 하는 함수입니다.
      function hideMoreInfo(overlayContent) {
        const moreInfo = overlayContent.querySelector('.overlay_info');
        if (moreInfo) {
          overlayContent.removeChild(moreInfo);
        }
      }

      // 마커와 오버레이를 지도에 표시합니다
      // marker.setMap(kakaoMap);
      overlay.setMap(kakaoMap);

      return {
        overlay,
      };
    });

    setMarkers(newMarkers);
  }, [kakaoMap, data]);

  /**
   * GSR80 좌표를 WTM으로 변경
   * 거리 계산하는데 필요한 함수
   * @param y GSR80 좌표의 위도값
   * @param x GSR80 좌표의 경도값
   * @return 측정된 거리
   */
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

  /**
   * 기준 위치와 비교할 위치의 거리 계산
   * @param x1 기준 위치의 WTM 좌표 경도값
   * @param y1 기준 위치의 WTM 좌표 위도값
   * @param x2 비교할 위치의 WTM 좌표 경도값
   * @param y2 비교할 위치의 WTM 좌표 위도값
   * @return "측정된 거리km"
   */
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