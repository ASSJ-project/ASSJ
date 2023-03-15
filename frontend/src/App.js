import { callApi } from "./functions";
import { useState, useEffect } from "react";
import ErrorPage from "./components/ErrorPage";
import MapData from "./components/Map/MapData";
import React from "react";

function App() {
  const url = "api/getCorpData";
  const [addrData, setAddrData] = useState();
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  /* DB에 데이터 요청하는 함수 */

  useEffect(() => {
    async function fetchData() {
      try {
        const dataList = await callApi(url);
        //console.log(dataList);
        const addr = await dataList
          .filter((item) => item.basicAddr.includes("서초"))
          // .filter((item) => item.jobsCd.startsWith("01")) // 지역 필터
          .map((item) => {
            return {
              company: item.company,
              x: item.x,
              y: item.y,
              address: item.basicAddr,
            };
          });
        setAddrData(addr);
        setLoading(true);
      } catch (error) {
        setError(true);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {isError && <ErrorPage />}
      {isLoading && <MapData addrdata={addrData} />}
    </div>
  );
}

export default App;
