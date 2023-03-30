import { useState, useEffect } from 'react';

const useCoordData = (x, y) => {
  const [data1, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchData(y, x) {
    try {
      const headers = new Headers();
      headers.append(
        'Authorization',
        'KakaoAK 50bbb5205dc8fcc9c2611542015a54d5'
      );
      const params = new URLSearchParams();
      params.append('x', x);
      params.append('y', y);
      params.append('input_coord', 'WGS84');
      params.append('output_coord', 'WTM');

      const url = `https://dapi.kakao.com/v2/local/geo/transcoord.json?${params}`;

      const response = await fetch(url, { headers });
      const result = await response.json();

      console.log(result);
      setData(result);
    } catch (error) {
      setError('데이터 fetch 중 에러 발생');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [x, y]);

  return { data1, loading, error };
};

export default useCoordData;
