import React, { useEffect, useState } from "react";
import axios from "axios";
import corp from "./corpcode.json";

function App() {
  const [hello, setHello] = useState("");

  // useEffect(() => {
  //   axios
  //     .get("/api/user")
  //     .then((response) => setHello(response.data))
  //     .catch((error) => console.log(error));
  // }, []);

  const [corpData, setCorpData] = useState(null);
  useEffect(() => {
    axios
      .get(
        `/api/company.json?crtfc_key=683816e5ca9b6b18ebab4894215d989420708fa3&corp_code={corp.result.list[0].corp_code}`
      )
      .then((response) => setCorpData(response.data))
      .catch((error) => console.log(error));
  }, []);
  console.log(corpData);
  return <div>백엔드에서 가져온 데이터입니다 : {}</div>;
}

export default App;
