/* global kakao */

import React, { useEffect, useState, useRef } from 'react';

export default function KakaoMap(props) {
  const { data, size } = props;
  const [kakaoMap, setKakaoMap] = useState(null);

  const container = useRef();

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://dapi.kakao.com/v2/maps/sdk.js?appkey=a8f261db701c3d43d7424b62afca4d55&autoload=false&libraries=services,clusterer,drawing';
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        let markers_for_clusterer = [];
        // 사용자 주소 좌표 넣기
        const center = new kakao.maps.LatLng(37.50802, 127.062835);
        const options = {
          center,
          level: 5,
        };
        const map = new kakao.maps.Map(container.current, options);
        // 주석 추가
        const clusterer = new kakao.maps.MarkerClusterer({
          map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
          averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
          minLevel: 4, // 클러스터 할 최소 지도 레벨
          calculator: [10, 30, 50],
          minClusterSize: 1,
        });

        let content =
          '<div class="wrap">' +
          '    <div class="info">' +
          '        <div class="title">' +
          '            카카오 스페이스닷원' +
          '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' +
          '        </div>' +
          '        <div class="body">' +
          '            <div class="img">' +
          '                <img src="https://cfile181.uf.daum.net/image/250649365602043421936D" width="73" height="70">' +
          '           </div>' +
          '            <div class="desc">' +
          '                <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>' +
          '                <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>' +
          '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' +
          '            </div>' +
          '        </div>' +
          '    </div>' +
          '</div>';

        for (let i = 0; i < data.length; i++) {
          let coords = new kakao.maps.LatLng(data[i].y, data[i].x);
          /* 맵 마커 등록 -좌표기반*/
          let marker = new kakao.maps.Marker({
            map: map,
            position: coords,
          });

          let customOverlay = new kakao.maps.CustomOverlay({
            content: content,
            position: coords,
          });

          // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
          kakao.maps.event.addListener(marker, 'click', function () {
            customOverlay.setMap(map);
          });

          markers_for_clusterer.push(marker);
        }

        console.log(`test: ${markers_for_clusterer}`, markers_for_clusterer);
        clusterer.addMarkers(markers_for_clusterer);
        setKakaoMap(map);
        // 마커에 클릭이벤트를 등록
      });
    };
  }, [container, data]);

  // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다
  function closeOverlay(customOverlay) {
    customOverlay.setMap(null);
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

  return <div id="container" ref={container} />;
}
