import styled from 'styled-components';
import Header from './Header';
import CompanyList from '@/components/domain/Map/CompanyList';
import useFetchData from '@/hooks/useFetchData';
import KakaoMap from '@/components/domain/Map/KakaoMap_backup';
import Footer from '@/components/Structure/Footer/Footer';
import MapToggle from '@/components/domain/Map/ToggleButton';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import JobFilter from '@/components/domain/Map/DataFilter/JobFilter';
import RegionFilter from '@/components/domain/Map/DataFilter/RegionFilter';
import MainContainer from './MainPage';

const Main = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const SearchBox = styled.div`
  top: 5%;
  width: 100%;
  max-width: 300px;
  padding: 10px;
  background-color: white;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;

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
  background-color: #ff5a5f;
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

const CompanyBoundary = styled.div`
  margin: 20px;
  height: 80vh;
  width: 100vw;
`;

const ToggleBoundary = styled.div`
  position: fixed;
  bottom: 5%;
  z-index: 2;
`;

function LayoutPage() {
  const { data, loading, error } = useFetchData();
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [selected, setSelected] = useState('map');
  const selectedSubcategory = useSelector((state) => state.selectedSubcategory);

  const setFilterRegion = useSelector((state) => state.setFilterRegion);
  const setFilterJob = useSelector((state) => state.setFilterJob);

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

  return (
    <>
      <Header />

      <div style={{fontFamily: "Lato"}}>안녕하세요</div>
      <Main>
        <SearchBox>
          <SearchInput
            type="text"
            placeholder="검색"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <SearchButton onClick={handleSearch}>검색</SearchButton>
        </SearchBox>

        <div>
          <h2>Selected Subcategory: {setFilterRegion}</h2>
          <h2>Selected Job: {setFilterJob}</h2>
        </div>
        <JobFilter />
        <RegionFilter />

        <ToggleBoundary className="App">
          <MapToggle setSelected={setSelected} />
        </ToggleBoundary>
        {selected === 'map' ? (
          <MapBoundary>
            {data && <MainContainer data={(setFilterRegion, setFilterJob)} />}
          </MapBoundary>
        ) : (
          <CompanyList />
        )}
      </Main>
      <Footer />
    </>
  );
}

export default LayoutPage;
