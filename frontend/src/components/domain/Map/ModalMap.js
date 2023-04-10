/* global kakao */
import React, { useState, useEffect } from "react";

export default function ModalMap(user) {
  const [kakaoMap, setKakaoMap] = useState(null);
  const apiKey = process.env.REACT_APP_KAKAO_API_KEY;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=services,clusterer,drawing`;
    document.head.appendChild(script);
    script.onload = () => {
      // 지도를 렌더링 합니다.
      kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        const mapOptions = {
          center: new kakao.maps.LatLng(user.userY, user.userX),
          level: 4,
        };
        const map = new kakao.maps.Map(mapContainer, mapOptions);

        setKakaoMap(map);
      });
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }} id="map">
      {kakaoMap && <p>Kakao Map is loaded.</p>}
    </div>
  );
}
