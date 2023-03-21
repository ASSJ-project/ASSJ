import { callApi } from '../functions';
import { useState, useEffect } from 'react';
import MapData from '../components/Map/MapData';
import React from 'react';
import Button from '../apis/map/Button';
import useCallAddress from '../hooks/useCallAddress';

/* DB에 데이터 요청하는 함수 */

function MapPage() {
  const [addrData, isLoading, isError] = useCallAddress();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occured!</div>;
  }

  return (
    <ul>
      {addrData.map((addr, index) => (
        <li key={index}>
          <p>{addr.company}</p>
          <p>{addr.address}</p>
        </li>
      ))}
    </ul>
  );
}

//   return (
//     <div>
//       {isLoading && <MapData addrdata={addrData} />}
//       <Button />
//     </div>
//   );
// }

export default MapPage;
