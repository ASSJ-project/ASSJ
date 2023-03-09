import axios from "axios";
import XMLParser from "react-xml-parser";

export function apiXmlToJson(url) {
  axios
    .get(url)
    .then((response) => {
      const xmlData = response.data;
      const dataSet = xmlToJson(xmlData);
      // const fs = require("fs");
      // fs.writeFileSync("./coprdata.json", dataSet, "utf-8");
      console.log(dataSet); // 여기에 JSON 파일로 아웃풋 하게 할것
    })
    .catch((error) => console.log(error));
}

function xmlToJson(xmlData) {
  const result = new XMLParser().parseFromString(xmlData).children;
  return result;
}
