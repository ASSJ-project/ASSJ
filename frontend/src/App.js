import { callApi } from "./functions";
// import { useState } from "react";
import React from "react";

function App() {
  const url = "api/getCorpData/address=gangnam/jobsCode=1";
  async function fetchData() {
    const dataList = await callApi(url);
    const addr = await dataList.map((item) => {
      return { title: item.title, address: item.basicAddr };
    });
    console.log(addr);

    // return addr;
  }
  fetchData();
  return <div> </div>;
}

export default App;
