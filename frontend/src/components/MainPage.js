import React, { useEffect } from 'react';

const { kakao } = window;

var positions = [
  {
    title: '카카오',
    latlng: new kakao.maps.LatLng(33.450705, 126.570677),
  },
  {
    title: '생태연못',
    latlng: new kakao.maps.LatLng(33.450936, 126.569477),
  },
  {
    title: '텃밭',
    latlng: new kakao.maps.LatLng(33.450879, 126.56994),
  },
  {
    title: '근린공원',
    latlng: new kakao.maps.LatLng(33.451393, 126.570738),
  },
];

const MainPage = () => {
  useEffect(() => {
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    var imageSrc =
      'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

    for (var i = 0; i < positions.length; i++) {
      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new kakao.maps.Size(24, 35);

      // 마커 이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });
    }

    var geocoder = new kakao.maps.services.Geocoder();

    var callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        console.log(result);
      }
    };
    geocoder.addressSearch('해남군 송지면', callback);
    
  }, []);

  return (
    <div
      id="myMap"
      style={{
        width: '100%',
        height: '100vh',
      }}
    ></div>
  );
};

export default MainPage;
