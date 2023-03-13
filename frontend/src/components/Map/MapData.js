import React, { useState, useEffect } from 'react';
import KakaoMap from './KakaoMap';
import { xmlToJson } from './Function';

export default function MapData() {
  const [visible, setVisible] = useState(true);

  const [markerPositions, setMarkerPositions] = useState([]);

  const [axis, setAxis] = useState([]);

  //   const [company, setCompany] = useState([]);

  //   const [test, setTest] = useState([{ address: '' }]);

  useEffect(() => {
    async function getXMLfromAPI() {
      // const url =
      //   'https://cors-anywhere.herokuapp.com/http://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList';
      // const authKey =
      //   'kKpMWs==========v1Tfvrckn9d3DoT0vWO0EjY5xN06%2BP53Po%2FaGkNo193gHjU8SuGkE2%2Fu65phwcW6NA%3D%3D';
      // const reqURL =
      //   url +
      //   '?serviceKey=' +
      //   authKey +
      //   '&numOfRows=10&pageNo=1&dataCd=ASOS&dateCd=DAY&startDt=20100101&endDt=20100102&stnIds=108';
      const reqURL =
        '/opi/opi/opia/wantedApi.do?authKey=WNLEZKDC8ZBGBIZXCMBHQ2VR1HJ&callTp=L&returnType=XML&startPage=1&display=10&region=27000';

      // // async와 await을 통해 바로 XML을 JSON으로 변환
      const response = await fetch(reqURL, {
        method: 'GET',
      });
      const xmlString = await response.text();
      var XmlNode = new DOMParser().parseFromString(xmlString, 'text/xml');
      let data = xmlToJson(XmlNode);
      // console.log(data);
      data.wantedRoot.wanted.forEach((address) => {
        // setAddress(address.basicAddr);
        // getData(address.basicAddr, address.company);
        getData(address.basicAddr, address.company);
      });
      // console.log(data.wantedRoot.wanted[0].basicAddr);
    }

    // 주소로 좌표 변환
    async function getData(address, company) {
      
      let aa = [];
      let bb = [];
      let response = await fetch(
        // 'https://dapi.kakao.com/v2/local/search/address.json?analyze_type=similar&page=1&size=10&query=' +
        'https://dapi.kakao.com/v2/local/search/address.json?&query=' + address,
        {
          method: 'GET',
          headers: {
            Authorization: 'KakaoAK 50bbb5205dc8fcc9c2611542015a54d5',
          },
        }
      );
      let data = await response.json();
      let x = parseFloat(data.documents[0].x);
      let y = parseFloat(data.documents[0].y);
      // aa.push(y, x, company, address);
      aa.push(y, x);
      bb.push(company);
      setAxis((axis) => [...axis, aa]);
      //   setCompany((company) => [...company, bb]);

      // setCompany(...company, [...company, bb])
      // setTest((test) => {
      //   return { ...test, address: company };
      // });

      console.log(x);
      //   setTest([...test, { address: company }]);
    }

    getXMLfromAPI();
  }, []);

  const markerPositions2 = [
    [37.499590490909185, 127.0263723554437],
    [37.499427948430814, 127.02794423197847],
    [37.498553760499505, 127.02882598822454],
    [37.497625593121384, 127.02935713582038],
    [37.49629291770947, 127.02587362608637],
    [37.49754540521486, 127.02546694890695],
    [37.49646391248451, 127.02675574250912],
  ];

  const [mapSize, setMapSize] = useState([400, 400]);

  //   console.log(test);
  // 차트찍기
  return (
    <div className="App">
      <button onClick={() => setMapSize([100, 80])}>Resize (100%x100%)</button>
      <button
        onClick={() => {
          setMarkerPositions(axis);
          console.log(axis);
        }}
      >
        Marker Set 1
      </button>
      <button
        onClick={() => {
          setMarkerPositions(markerPositions2);
          console.log(markerPositions2);
        }}
      >
        Marker Set 2
      </button>
      <div id="wrap">
        {visible && (
          <>
            <h2>Kakao Map</h2>
            <KakaoMap markerPositions={markerPositions} size={mapSize} />
          </>
        )}
      </div>
      <section>
        {/* <button onClick={getData}>call api</button> */}
        {/* <button onClick={getXMLfromAPI}>get JSON</button> */}
      </section>
      <section>
        <button onClick={() => setVisible(!visible)}>
          Toggle(Mount/Unmount)
        </button>
      </section>
      <section>
        <button onClick={() => setMapSize([0, 0])}>Hide</button>
        <button onClick={() => setMapSize([200, 200])}>Resize (200x200)</button>
        <button onClick={() => setMapSize([400, 400])}>Resize (400x400)</button>
        <button onClick={() => setMapSize([1200, 1200])}>
          Resize (1200x1200)
        </button>
        <button onClick={() => setMapSize([100, 80])}>
          Resize (100%x100%)
        </button>
      </section>
      <section>
        <button
          onClick={() => {
            setMarkerPositions(axis);
            console.log(axis);
          }}
        >
          Marker Set 1
        </button>
        <button
          onClick={() => {
            setMarkerPositions(markerPositions2);
            console.log(markerPositions2);
          }}
        >
          Marker Set 2
        </button>
        <button onClick={() => setMarkerPositions([])}>
          Marker Set 3 (empty)
        </button>
      </section>
    </div>
  );
}
