/* global kakao */

import React, { useEffect, useState, useRef } from "react";
import { userBasedtransCoordCB } from "@/libs/utils/mapUtils";
import { useSelector } from "react-redux";
import "@/components/domain/Map/css/map.css";
import json from "@/libs/json/job_code.json";
import { BsBuildingsFill } from "react-icons/bs";

export default function KakaoMap(props) {
  const { data } = props;
  const [kakaoMap, setKakaoMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const activeOverlayContent = useRef(null);
  const apiKey = process.env.REACT_APP_KAKAO_API_KEY;

  const center = useSelector((state) => state.map.center);

  const [userY, setUserY] = useState(37.495423523338);
  const [userX, setUserX] = useState(126.823532587);

  const [onMarker, setOnMarker] = useState(false);

  const json1 = json;

  const colors = {
    "022": "#e53935",
    "023": "#039be5",
    "024": "#43a047",
    "025": "#fdd835",
    "026": "#8e24aa",
    "033": "#fb8c00",
    "056": "#d81b60",
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=services,clusterer,drawing`;
    document.head.appendChild(script);
    script.onload = () => {
      // 지도를 렌더링 합니다.
      kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        const mapOptions = {
          center: new kakao.maps.LatLng(userY, userX),
          level: 9,
        };
        const map = new kakao.maps.Map(mapContainer, mapOptions);

        kakao.maps.event.addListener(map, 'rightclick', function (mouseEvent) {
          // 클릭한 위도, 경도 정보를 가져옵니다
          var latlng = mouseEvent.latLng;

          // 마커 위치를 클릭한 위치로 옮깁니다

          marker.setPosition(latlng);
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
      const distance = userBasedtransCoordCB(
        item.wtmY,
        item.wtmX,
        userY,
        userX
      );

      const color = findColorById(item.jobsCd);
      const iconHTML = `<i class="fas fa-building" style="color: white;"></i>`;
      // 지도에 띄우는 기본적인 마커 내용
      const content = `
        <div class="label" id="remove-default-browser-effect" style="border: 2px solid ${color}">
          <div class="icon-circle" style="background-color: ${color};">${iconHTML}</div>
          <div class="text-container">
            <div>${item.company}</div>
            <div class="small-text">${distance}</div>
          </div>
        </div>`;

      const overlayContent = document.createElement("div");
      overlayContent.innerHTML = content;
      overlayContent.classList.add("overlay_content"); // 클래스 추가

      // overlayContent에 이벤트 추가
      overlayContent.onmouseover = () => {
        setCoverdOverlayZIndex(overlay);
      };

      overlayContent.onmouseout = () => {
        setHideOverlayZIndex(overlay);
      };

      const overlay = new kakao.maps.CustomOverlay({
        position: new kakao.maps.LatLng(item.wgsY, item.wgsX),
        content: overlayContent,
      });

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
  }, [kakaoMap, data, userY, userX, onMarker]);

  function findColorById(jobsCd) {
    for (const category of json1) {
      for (const subcategory of category.subcategories) {
        if (subcategory.id === jobsCd) {
          return colors[category.id];
        }
      }
    }

    return null;
  }

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
    <div style={{ width: "100%", height: "100%" }} id="map">
      {kakaoMap && <p>Kakao Map is loaded.</p>}
    </div>
  );
}
