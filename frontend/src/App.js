import { callApi } from "./functions";
import { useState, useEffect } from "react";
import React from "react";

function App() {
  const url = "api/getCorpData/address=gangnam/jobsCode=1";
  const [addrData, setAddrData] = useState();
  const [isError, setError] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const dataList = await callApi(url);
        const addr = await dataList.map((item) => {
          return { title: item.title, address: item.basicAddr };
        });
        setAddrData(addr);
      } catch (error) {
        setError(true);
      }
    }
    fetchData();
  }, []);

  console.log(addrData);
  return <div> </div>;
}

export default App;
