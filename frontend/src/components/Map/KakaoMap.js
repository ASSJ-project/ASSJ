/* global kakao */

import React, { useEffect, useState, useRef } from "react";

export default function KakaoMap(props) {
  const { markerPositions, size, company } = props;
  const [kakaoMap, setKakaoMap] = useState(null);
  const [, setMarkers] = useState([]);

  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=a8f261db701c3d43d7424b62afca4d55&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        const center = new kakao.maps.LatLng(37.50802, 127.062835);
        const options = {
          center,
          level: 3,
        };
        const map = new kakao.maps.Map(container.current, options);
        //setMapCenter(center);
        setKakaoMap(map);
      });
    };
  }, [container]);

  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }

    // save center position
    const center = kakaoMap.getCenter();

    // change viewport size
    const [width, height] = size;
    // container.current.style.width = `${width}px`;
    // container.current.style.height = `${height}px`;
    container.current.style.width = `${width}%`;
    container.current.style.height = `${height}vh`;

    // relayout and...
    kakaoMap.relayout();
    // restore
    kakaoMap.setCenter(center);
  }, [kakaoMap, size]);

  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }

    console.log(`markerPositions: ${markerPositions}, markerPositions`);
    const positions = markerPositions.map((pos) => {
      return new kakao.maps.LatLng(...pos);
    });

    console.log(`positions: ${positions}`, positions);

    // console.log(positions[0]['La']);

    setMarkers((markers) => {
      // clear prev markers
      markers.forEach((marker) => marker.setMap(null));

      // let response;
      // 마커 이미지 생성
      var imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png", // 마커이미지의 주소입니다
        imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
        imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );

      console.log(positions);
      console.log(company);
      // var iwContent = `<div style="padding:5px;">${company}</div>`;
      // assign new markers
      return positions.map((position, index) => {
        var marker = new kakao.maps.Marker({
          map: kakaoMap,
          position,
          image: markerImage,
        });

        var infowindow = new kakao.maps.InfoWindow({
          map: kakaoMap,
          position,
          content: `<div style="padding:5px;">${company[index]}</div>`,
        });
        infowindow.open(kakaoMap, marker);
        return marker;
      });
    });

    if (positions.length > 0) {
      const bounds = positions.reduce(
        (bounds, latlng) => bounds.extend(latlng),
        new kakao.maps.LatLngBounds()
      );

      kakaoMap.setBounds(bounds);
    }
  }, [kakaoMap, markerPositions]);

  return <div id="container" ref={container} />;
}
