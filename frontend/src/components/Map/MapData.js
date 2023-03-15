import React, { useState, useEffect } from "react";
import KakaoMap from "./KakaoMap";

export default function MapData({ addrdata }) {
  const [visible, setVisible] = useState(true);
  const [mapSize, setMapSize] = useState([100, 80]);

  // 차트찍기
  return (
    <div className="App">
      <button
        onClick={() => {
          setMapSize([100, 80]);
        }}
      >
        주변 회사 불러오기
      </button>
      <div id="wrap">
        {visible && (
          <>
            <h2>Kakao Map</h2>
            <KakaoMap size={mapSize} data={addrdata} />
          </>
        )}
      </div>
    </div>
  );
}
