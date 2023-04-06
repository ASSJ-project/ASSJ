/* global kakao */

import React, { useEffect, useState, useRef } from 'react';
import { userBasedtransCoordCB } from '@/libs/utils/mapUtils';
import { useNavigate } from 'react-router-dom';
import './style_addMouseOver.css';

export default function KakaoMap(props) {
  const { data } = props;
  const [kakaoMap, setKakaoMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const activeOverlayContent = useRef(null);
  const apiKey = process.env.REACT_APP_KAKAO_API_KEY;
  const navigate = useNavigate();

  // 유저의 현재 GSR80 좌표 위치
  const userY = 37.4954330863648;
  const userX = 126.88750531451;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=services,clusterer,drawing`;
    document.head.appendChild(script);
    script.onload = () => {
      // 지도를 렌더링 합니다.
      kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const mapOptions = {
          center: new kakao.maps.LatLng(37.4954330863648, 126.88750531451),
          level: 9,
        };
        const map = new kakao.maps.Map(mapContainer, mapOptions);

        // 마커를 생성합니다.
        var marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(37.4954330863648, 126.88750531451),
        });

        // 마커가 지도 위에 표시되도록 설정합니다.
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
      let content;
      const distance = userBasedtransCoordCB(
        item.wtmY,
        item.wtmX,
        userY,
        userX
      );

      // 지도에 띄우는 기본적인 마커 내용
      content = `<div class="label" id="remove-default-browser-effect">${distance}</div>`;
      const overlayContent = document.createElement('div');
      overlayContent.innerHTML = content;
      overlayContent.classList.add('overlay_content'); // 클래스 추가

      // overlayContent에 이벤트 추가
      overlayContent.onmouseover = () => setCoverdOverlayZIndex(overlay);
      overlayContent.onmouseleave = () => setHideOverlayZIndex(overlay);
      overlayContent.ontouchstart = () => setCoverdOverlayZIndex(overlay);
      overlayContent.ontouchend = () => setCoverdOverlayZIndex(overlay);
      overlayContent.onclick = () => showMoreInfo(overlayContent, item);

      const overlay = new kakao.maps.CustomOverlay({
        position: new kakao.maps.LatLng(item.wgsY, item.wgsX),
        content: overlayContent,
      });
      // 커스텀 오버레이를 클릭했을 때 원하는 내용을 표시하는 함수입니다
      function showMoreInfo(overlayContent, item) {
        // 활성화된 moreInfoContent가 있다면 제거합니다
        if (activeOverlayContent.current) {
          hideMoreInfo(activeOverlayContent.current);
        }

        // 새로운 moreInfoContent를 활성화합니다
        activeOverlayContent.current = overlayContent;

        // 원하는 새로운 내용을 추가하십시오.
        const newContent = '채용확인';
        const labelElement = overlayContent.querySelector('.label');
        labelElement.innerHTML = newContent;

        const moreInfoContent = `
                  <div class="overlay_info clicked" style="position: absolute; bottom: 100%;">
                    <a href="https://place.map.kakao.com/17600274" target="_blank"><strong>${item.company}</strong></a>
                    <div class="desc">${distance}<span class="address">${item.basicAddr}</span></div>
                  </div>`;
        overlayContent.insertAdjacentHTML('beforeend', moreInfoContent);
      }

      function hideMoreInfo(overlayContent) {
        const moreInfo = overlayContent.querySelector('.overlay_info.clicked');
        if (moreInfo) {
          moreInfo.classList.remove('clicked'); // 클릭한 moreInfoContent에서 clicked 클래스를 제거합니다
          overlayContent.removeChild(moreInfo);
        }
      }

      // 마우스를 올릴 때 CustomOverlay의 zIndex의 값을 올립니다.
      function setCoverdOverlayZIndex(overlay) {
        overlay.setZIndex(1);
      }

      // 마우스가 떠날 때 CustomOverlay의 zIndex를 원래 값으로 되돌립니다.
      function setHideOverlayZIndex(overlay) {
        overlay.setZIndex(0);
      }
      overlay.setMap(kakaoMap);

      return {
        overlay,
      };
    });

    setMarkers(newMarkers);
  }, [kakaoMap, data]);

  return (
    <div style={{ width: '100%', height: '100%' }} id="map">
      {kakaoMap && <p>Kakao Map is loaded.</p>}
    </div>
  );
}
