import { callApi } from "./functions";
import { useState, useEffect } from "react";
import MapData from "./components/Map/MapData";
import React from "react";

function App() {
  const url = "api/getCorpData/address=gangnam/jobsCode=1";
  const [addrData, setAddrData] = useState();
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const dataList = await callApi(url);
        const addr = await dataList.map((item) => {
          return { company: item.company, address: item.basicAddr };
        });
        setAddrData(addr);
        setLoading(true);
      } catch (error) {
        setError(true);
      }
    }
    fetchData();
  }, []);

  console.log(addrData);
  return <div>{isLoading && <MapData add={addrData} />}</div>;
 
}

export default App;
