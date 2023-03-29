import styled from 'styled-components';
import { TailSpin } from 'react-loader-spinner';
import useFetchData from '@/hooks/useFetchData';
import KakaoMap from '@/components/domain/Map/KakaoMap';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import proj4 from 'proj4';

const SearchBox = styled.div`
  top: 5%;
  width: 100%;
  max-width: 300px;
  padding: 10px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: absolute;

  z-index: 2;
  @media (max-width: 767px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 20px;
  padding-left: 10px;
  border: none;
  outline: none;
  font-size: 18px;
`;

const SearchButton = styled.button`
  width: 150px;
  height: 50px;
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 18px;
  cursor: pointer;

  @media (max-width: 767px) {
    margin-top: 10px;
  }
`;
const LoadingContainer = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const MapBoundary = styled.div`
  margin: 20px;
  height: 80vh;
  width: 100vw;
  border: 1px solid black;
`;

function LayoutPage() {
  const { data, loading, error } = useFetchData();
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [selected, setSelected] = useState('map');
  const selectedSubcategory = useSelector((state) => state.selectedSubcategory);

  // WGS84 좌표
  const wgs84Lon = 126.88750531451;
  const wgs84Lat = 37.4954330863648;

  // WGS84 좌표를 UTM 좌표로 변환
  proj4.defs('EPSG:4326', '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs');
  // EPSG:5179 좌표계 정의 추가
  proj4.defs(
    'EPSG:5181',
    '+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs'
  );

  const wtmCoords = proj4('EPSG:4326', 'EPSG:5181', [wgs84Lon, wgs84Lat]);

  console.log(wtmCoords);
  // [ 947120.7550287388, 4141486.3516311397 ]

  const handleSearch = () => {
    let filtered = data.filter((item) => {
      // if (salary && item.salary !== salary) {
      //   return false;
      // }
      if (selectedSubcategory && item.jobsCd !== selectedSubcategory) {
        return false;
      }
      if (searchText && !item.basicAddr.includes(searchText)) {
        return false;
      }
      return true;
    });
    setFilteredData(filtered);
  };

  if (loading) {
    return (
      <LoadingContainer>
        <TailSpin color="#9588e0" height={80} width={80} />
      </LoadingContainer>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <>
      <SearchBox>
        <SearchInput
          type="text"
          placeholder="검색"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <SearchButton onClick={handleSearch}>검색</SearchButton>
      </SearchBox>
      <MapBoundary>
        <KakaoMap data={filteredData} />
      </MapBoundary>
    </>
  );
}

export default LayoutPage;
