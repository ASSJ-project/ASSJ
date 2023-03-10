import { callApi, dataSet } from "./functions";

function App() {
  const url = "api/getCorpData/address=gangnam/jobsCode=1";
  callApi(url);

  console.log(dataSet);

  // const titleList = dataSet.map((data) => data.title);
  // const addressList = dataSet.map((data) => data.basicAddr);

  // let result;
  // for (let i; i < titleList.length; i++) {
  //   result[i] = { title: titleList[i], address: addressList[i] };
  // }

  // console.log(result);

  return <div></div>;
}

export default App;
