import { apiXmlToJson } from "./functions";

function App() {
  const url = `opi/opi/opia/wantedApi.do?authKey=WNLEZKDC8ZBGBIZXCMBHQ2VR1HJ&callTp=L&returnType=XML&startPage=1&display=10&region=11000`;
  apiXmlToJson(url);
  return <div></div>;
}

export default App;
