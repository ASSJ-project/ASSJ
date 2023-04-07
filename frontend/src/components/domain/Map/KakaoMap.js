/* global kakao */

import React, { useEffect, useState, useRef } from 'react';
import { userBasedtransCoordCB } from '@/libs/utils/mapUtils';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '@/components/domain/Map/css/style_addMouseOver.css';

export default function KakaoMap(props) {
  const { data, location } = props;
  const [kakaoMap, setKakaoMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const activeOverlayContent = useRef(null);
  const apiKey = process.env.REACT_APP_KAKAO_API_KEY;
  const navigate = useNavigate();

  const center = useSelector((state) => state.map.center);

  const [userY, setUserY] = useState(37.495423523338);
  const [userX, setUserX] = useState(126.823532587);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=services,clusterer,drawing`;
    document.head.appendChild(script);
    script.onload = () => {
      // 지도를 렌더링 합니다.
      kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const mapOptions = {
          center: new kakao.maps.LatLng(userY, userX),
          level: 9,
        };
        const map = new kakao.maps.Map(mapContainer, mapOptions);

        // 마커를 생성합니다.
        var marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(userY, userX),
        });

        // 마커가 지도 위에 표시되도록 설정합니다.
        marker.setMap(map);

        setKakaoMap(map);
      });
    };
  }, []);

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

      // // overlayContent에 이벤트 추가
      // if (!isMobileResolution()) {
      //   overlayContent.onmouseover = () => {
      //     showMoreInfo(overlayContent, item);
      //     setCoverdOverlayZIndex(overlay);
      //   };
      //   overlayContent.onmouseout = () => {
      //     hideMoreInfo(overlayContent);
      //     setHideOverlayZIndex(overlay);
      //   };
      // } else {
      //   overlayContent.ontouchstart = () => setCoverdOverlayZIndex(overlay);
      //   overlayContent.ontouchend = () => {
      //     showMoreInfo(overlayContent, item);
      //     setHideOverlayZIndex(overlay);
      //   };
      //   overlayContent.onmouseover = () => {
      //     showMoreInfo(overlayContent, item);
      //     setCoverdOverlayZIndex(overlay);
      //   };
      //   overlayContent.onmouseout = () => {
      //     hideMoreInfo(overlayContent);
      //     setHideOverlayZIndex(overlay);
      //   };
      //   // overlayContent
      // }

      overlayContent.onmouseover = () => {
        showMoreInfo(overlayContent, item);
        setCoverdOverlayZIndex(overlay);
      };
      overlayContent.onmouseout = () => {
        hideMoreInfo(overlayContent);
        setHideOverlayZIndex(overlay);
      };

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

        const isMobile = window.matchMedia('(max-width: 779px)').matches;
        let moreInfoContent;

        moreInfoContent = document.createElement('div');
        moreInfoContent.classList.add('overlay_info');
        moreInfoContent.classList.add('clicked');

        if (isMobile) {
          // 모바일 화면 (해상도 780px 미만)에 표시할 내용을 정의합니다
          moreInfoContent.style.position = 'fixed';
          moreInfoContent.style.bottom = '0';
          moreInfoContent.style.width = '100%';
          moreInfoContent.style.zIndex = '1000'; // z-index 값을 1000으로 설정
        } else {
          // 데스크톱 화면에 표시할 내용을 정의합니다
          moreInfoContent.style.position = 'absolute';
          moreInfoContent.style.bottom = '100%';
        }

        const companyLink = document.createElement('a');
        companyLink.href = 'https://place.map.kakao.com/17600274';
        companyLink.target = '_blank';
        companyLink.innerHTML = `<strong>${item.company}</strong>`;
        moreInfoContent.appendChild(companyLink);

        const descDiv = document.createElement('div');
        descDiv.classList.add('desc');
        descDiv.innerHTML = `${distance}<span class="address">${item.basicAddr}</span>`;
        moreInfoContent.appendChild(descDiv);

        if (isMobile) {
          document.body.appendChild(moreInfoContent);
          overlayContent.moreInfoContent = moreInfoContent; // 참조를 저장합니다
        } else {
          overlayContent.appendChild(moreInfoContent);
        }
      }

      function hideMoreInfo(overlayContent) {
        const moreInfo =
          overlayContent.moreInfoContent ||
          overlayContent.querySelector('.overlay_info.clicked');
        if (moreInfo) {
          if (moreInfo.parentElement === document.body) {
            document.body.removeChild(moreInfo); // body에서 moreInfoContent를 제거합니다
          } else {
            overlayContent.removeChild(moreInfo);
          }
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

      function isMobileResolution() {
        return window.matchMedia('(max-width: 780px)').matches;
      }

      return {
        overlay,
      };
    });

    setMarkers(newMarkers);
  }, [kakaoMap, data]);

  useEffect(() => {
    if (!kakaoMap || !data) {
      return;
    }

    const newPosition = new kakao.maps.LatLng(
      center.latitude,
      center.longitude
    );
    kakaoMap.panTo(newPosition);
  }, [kakaoMap, center]);

  return (
    <div style={{ width: '100%', height: '100%' }} id="map">
      {kakaoMap && <p>Kakao Map is loaded.</p>}
    </div>
  );
}
