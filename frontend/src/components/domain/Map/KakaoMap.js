/* global kakao */

import React, { useEffect, useState, useRef } from 'react';
import useFetch from '@/hooks/useFetch';
import { userBasedtransCoordCB } from '@/libs/utils/mapUtils';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import '@/components/domain/Map/css/style_addMouseOver.css';
import { setMarkerAddress } from '@/actions/dataInfoAction';

export default function KakaoMap(props) {
  const { data } = props;
  const [kakaoMap, setKakaoMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const activeOverlayContent = useRef(null);
  const dispatch = useDispatch();
  const apiKey = process.env.REACT_APP_KAKAO_API_KEY;
  const restApiKey = process.env.REACT_APP_KAKAO_REST_API_KEY;

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

        // kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
        //   // 클릭한 위도, 경도 정보를 가져옵니다
        //   var latlng = mouseEvent.latLng;

        //   // 마커 위치를 클릭한 위치로 옮깁니다
        //   marker.setPosition(latlng);

        //   setUserY(latlng.getLat());
        //   setUserX(latlng.getLng());
        // });

        // 마우스 드래그로 지도 이동이 완료되었을 때 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
        kakao.maps.event.addListener(map, 'dragend', function () {
          // 지도 중심좌표를 얻어옵니다
          var latlng = map.getCenter();

          setUserY(latlng.getLat());
          setUserX(latlng.getLng());
        });

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

      overlayContent.onclick = () => {
        if (isMobileResolution()) {
          if (overlayContent.style.opacity === '1') {
            hideMoreInfo(overlayContent);
            setHideOverlayZIndex(overlay);
          } else {
            showMoreInfo(overlayContent, item);
            setCoverdOverlayZIndex(overlay);
          }
        }
      };

      // 마우스 오버/아웃 이벤트 대신 터치 이벤트를 사용하여 모바일에서도 오버레이 추가 정보 표시/숨기기 구현
      if (!isMobileResolution()) {
        overlayContent.onmouseover = () => {
          showMoreInfo(overlayContent, item);
          setCoverdOverlayZIndex(overlay);
        };
        overlayContent.onmouseout = () => {
          hideMoreInfo(overlayContent);
          setHideOverlayZIndex(overlay);
        };
      }

      // overlayContent에 이벤트 추가
      if (!isMobileResolution()) {
        overlayContent.onmouseover = () => {
          showMoreInfo(overlayContent, item);
          setCoverdOverlayZIndex(overlay);
        };
        overlayContent.onmouseout = () => {
          hideMoreInfo(overlayContent);
          setHideOverlayZIndex(overlay);
        };
      } else {
        overlayContent.ontouchstart = () => setCoverdOverlayZIndex(overlay);
        overlayContent.ontouchend = () => {
          showMoreInfo(overlayContent, item);
          setHideOverlayZIndex(overlay);
        };
      }

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
  }, [kakaoMap, data, userX, userY]);

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

  // useEffect(() => {
  //   if (!kakaoMap || !data) {
  //     return;
  //   }

  //   var geocoder = new kakao.maps.services.Geocoder();

  //   var coord = new kakao.maps.LatLng(userY, userX);
  //   var callback = function (result, status) {
  //     if (status === kakao.maps.services.Status.OK) {
  //       console.log(result);
  //       const [first, second, third] = result[0].address.address_name.split(
  //         ' ',
  //         3
  //       );
  //       const clickedMarkerAddress = `${first} ${second} ${third}`;
  //       const testAddress = `${first} ${second} ${third}`;
  //       dispatch(setMarkerAddress(testAddress));
  //     }
  //   };

  //   geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  // }, [userX, userY]);

  const queryParam = {
    x: userX,
    y: userY,
    input_coord: 'WGS84',
  };

  const header = {
    Authorization: `KakaoAK ${restApiKey}`,
  };

  const { result, loading, error } = useFetch(
    'https://dapi.kakao.com/v2/local/geo/coord2address.json',
    queryParam,
    header
  );

  return (
    <div style={{ width: '100%', height: '100%' }} id="map">
      {kakaoMap && <p>Kakao Map is loaded.</p>}
    </div>
  );
}
