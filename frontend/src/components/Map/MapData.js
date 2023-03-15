import React, { useState, useEffect } from "react";
import KakaoMap from "./KakaoMap";
import { callApi } from "../../functions";

export default function MapData({ addrdata }) {
  const [visible, setVisible] = useState(true);
  // const [markerPositions, setMarkerPositions] = useState([]);
  // const [axis, setAxis] = useState([]);
  // const [company, setCompany] = useState([]);

  // useEffect(() => {
  //   // 주소로 좌표 변환

  //   async function getData() {
  //     let url;
  //     let data;
  //     let x, y;
  //     let axisList = [];
  //     const header = {
  //       Authorization: "KakaoAK 50bbb5205dc8fcc9c2611542015a54d5",
  //     };

  //     try {
  //       //console.log(addrdata);
  //       // for (let addr in addrdata) {
  //       //   url =
  //       //     "https://dapi.kakao.com/v2/local/search/address.json?&query=" +
  //       //     addr["address"];
  //       //   data = await callApi(url, header);
  //       //   x = parseFloat(await data.documents[0].x);
  //       //   y = parseFloat(await data.documents[0].y);
  //       //   axisList.push(y, x);
  //       //   setAxis((axis) => [...axis, axisList]);
  //       //   setCompany((comp) => [...comp, addr.company]);
  //       //   // console.log(data);
  //       // }
  //       // let dataList = [data, ...dataList];
  //       // addrdata.forEach(async (add) => {
  //       //   console.log(add);
  //       //   url =
  //       //     "https://dapi.kakao.com/v2/local/search/address.json?&query=" +
  //       //     add["address"];
  //       //   const data = await callApi(url, header);
  //       //   // const x = parseFloat(await data.documents[0].x);
  //       //   // const y = parseFloat(await data.documents[0].y);
  //       //   // //console.log(addrdata);
  //       //   // axisList.push(y, x);
  //       //   // setAxis(async (axis) => [...axis, axisList]);
  //       //   // setCompany(async (comp) => [...comp, add.company]);
  //       //   // //console.log(axisList);
  //       // });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }

  //   getData();
  // }, [addrdata]);

  const [mapSize, setMapSize] = useState([100, 80]);

  // 차트찍기
  return (
    <div className="App">
      <button
        onClick={() => {
          setMapSize([100, 80]);
          // setCompany((comp) => [...comp, addrdata[0].company]);
          // setMarkerPositions((poisit) => [poisit, ...addrdata[0].address]);
        }}
      >
        주변 회사 불러오기
      </button>
      <div id="wrap">
        {visible && (
          <>
            <h2>Kakao Map</h2>
            <KakaoMap size={mapSize} data={addrdata} />
          </>
        )}
      </div>
    </div>
  );
}
