import React, { useState } from "react";
import KakaoMap from "./KakaoMap";

export default function MapData({ addrdata }) {
  const mapSize = [100, 80];

  // 차트찍기
  return (
    <div className="App">
      <div id="wrap">
        <KakaoMap size={mapSize} data={addrdata} />
      </div>
    </div>
  );
}
