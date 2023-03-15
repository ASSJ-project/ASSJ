/* global kakao */

import React, { useEffect, useState, useRef } from "react";
export default function KakaoMap(props) {
  const { data, size } = props;
  const [kakaoMap, setKakaoMap] = useState(null);
  const [, setMarkers] = useState([]);

  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=a8f261db701c3d43d7424b62afca4d55&autoload=false&libraries=services";
    document.head.appendChild(script);
    let marker;
    let infowindow;
    script.onload = () => {
      console.log(data);
      kakao.maps.load(() => {
        // 사용자 주소 좌표 넣기
        const center = new kakao.maps.LatLng(37.50802, 127.062835);
        const options = {
          center,
          level: 3,
        };
        const map = new kakao.maps.Map(container.current, options);

        for (let i = 0; i < data.length; i++) {
          let coords = new kakao.maps.LatLng(data[i].y, data[i].x);
          marker = new kakao.maps.Marker({
            map: map,
            position: coords,
            clickable: true,
          });
          infowindow = new kakao.maps.InfoWindow({
            position: coords,
            content: `<div style="padding:5px;">${data[i].company}</div>`,
          });
          kakao.maps.event.addListener(
            marker,
            "mouseover",
            makeOverListener(map, marker, infowindow)
          );
          kakao.maps.event.addListener(
            marker,
            "mouseout",
            makeOutListener(infowindow)
          );
        }

        setKakaoMap(map);
        // 마커에 클릭이벤트를 등록합니다
      });
    };
  }, [container]);

  // 인포윈도우를 여는 함수입니다
  function makeOverListener(map, marker, infowindow) {
    return function () {
      infowindow.open(map, marker);
    };
  }

  // 인포윈도우를 닫는 클로저를 만드는 함수입니다
  function makeOutListener(infowindow) {
    return function () {
      infowindow.close();
    };
  }

  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }

    // save center position
    const center = kakaoMap.getCenter();

    // change viewport size
    const [width, height] = size;
    container.current.style.width = `${width}%`;
    container.current.style.height = `${height}vh`;

    // relayout and...
    kakaoMap.relayout();
    // restore
    kakaoMap.setCenter(center);
  }, [kakaoMap, size]);

  useEffect(() => {}, [data]);

  return <div id="container" ref={container} />;
}
