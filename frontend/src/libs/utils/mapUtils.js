import proj4 from 'proj4';
/**
 * GSR80 좌표를 WTM으로 변경
 * 거리 계산하는데 필요한 함수
 * @param y GSR80 좌표의 위도값
 * @param x GSR80 좌표의 경도값
 * @param userY 사용자 GSR80 좌표의 위도값
 * @param userX 사용자 GSR80 좌표의 경도값
 * @return WTM 좌표값
 */
export function userBasedtransCoordCB(y, x, userY, userX) {
  proj4.defs('EPSG:4326', '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs');
  // EPSG:5179 좌표계 정의 추가
  proj4.defs(
    'EPSG:5181',
    '+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs'
  );

  const wtmCoords = proj4('EPSG:4326', 'EPSG:5181', [userX, userY]);
  let distance = calculateDistance(x, y, wtmCoords[0], wtmCoords[1]);
  return distance;
}

/**
 * 기준 위치와 비교할 위치의 거리 계산
 * @param x1 기준 위치의 WTM 좌표 경도값
 * @param y1 기준 위치의 WTM 좌표 위도값
 * @param x2 비교할 위치의 WTM 좌표 경도값
 * @param y2 비교할 위치의 WTM 좌표 위도값
 * @return 측정된 거리km
 */
export function calculateDistance(x1, y1, x2, y2) {
  const xDiff = x2 - x1;
  const yDiff = y2 - y1;
  const distance = Math.sqrt(xDiff ** 2 + yDiff ** 2) / 1000;
  return `${distance.toFixed(2)}km`;
}
