import React, { useState } from 'react';
import KakaoMap from './KakaoMap';

export default function MapData({ data }) {
  const mapSize = [100, 60];

  // 차트찍기
  return (
    <div className="App">
      <div id="wrap">
        <KakaoMap size={mapSize} data={data} />
      </div>
    </div>
  );
}
