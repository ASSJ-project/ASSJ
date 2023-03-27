/* global kakao */

import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import proj4 from 'proj4';

const KakaoMapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export default function KakaoMapTest(props) {
  const { data } = props;
  const [kakaoMap, setKakaoMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  const WGS84 = 'EPSG:4326'; // WGS84 좌표 체계의 EPSG 코드
  const WTM = 'EPSG:5179'; // WTM 좌표 체계의 EPSG 코드

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://dapi.kakao.com/v2/maps/sdk.js?appkey=a8f261db701c3d43d7424b62afca4d55&autoload=false&libraries=services,clusterer,drawing';
    document.head.appendChild(script);
    script.onload = () => {
      kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const mapOption = {
          center: new kakao.maps.LatLng(37.4954330863648, 126.88750531451),
          level: 3,
        };
        const map = new kakao.maps.Map(mapContainer, mapOption);
        var firstProjection =
          'PROJCS["NAD83 / Massachusetts Mainland",GEOGCS["NAD83",DATUM["North_American_Datum_1983",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],AUTHORITY["EPSG","6269"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4269"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Lambert_Conformal_Conic_2SP"],PARAMETER["standard_parallel_1",42.68333333333333],PARAMETER["standard_parallel_2",41.71666666666667],PARAMETER["latitude_of_origin",41],PARAMETER["central_meridian",-71.5],PARAMETER["false_easting",200000],PARAMETER["false_northing",750000],AUTHORITY["EPSG","26986"],AXIS["X",EAST],AXIS["Y",NORTH]]';
        var secondProjection =
          '+proj=gnom +lat_0=90 +lon_0=0 +x_0=6300000 +y_0=6300000 +ellps=WGS84 +datum=WGS84 +units=m +no_defs';
        var result = proj4(firstProjection, secondProjection, [37.4954330863648, 126.88750531451]);
        // [-2690666.2977344505, 3662659.885459918]
        console.log(result);
        setKakaoMap(map);
      });
    };
  }, []);

  useEffect(() => {
    if (!kakaoMap || !data) {
      return;
    }

    // 기존에 생성된 마커 제거
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);
    const newMarkers = data.map((item) => {
      return new kakao.maps.Marker({
        map: kakaoMap,
        position: new kakao.maps.LatLng(item.y, item.x),
      });
    });
    setMarkers(newMarkers);
  }, [kakaoMap, data]);

  return <KakaoMapContainer id="map" />;
}
