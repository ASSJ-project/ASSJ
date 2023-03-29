import styled from 'styled-components';
import Header from './Header';
import CompanyList from '@/components/domain/Map/CompanyList';
import { TailSpin } from 'react-loader-spinner';
import useFetchData from '@/hooks/useFetchData';
import KakaoMap from '@/components/domain/Map/KakaoMap';
import Footer from '@/components/Structure/Footer/Footer';
import CategoryDropdown from '@/components/domain/Map/CategoryDropdown';
import MapToggle from '@/components/domain/Map/ToggleButton';
import { useState } from 'react';
import { useSelector } from 'react-redux';

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

  flex-direction: row-reverse;
  @media (max-width: 780px) {
    flex-direction: column;
  }
`;

const MapBoundary = styled.div`
  margin: 20px;
  height: 80vh;
  width: 100vw;
  border: 1px solid black;
`;

const ToggleBoundary = styled.div`
  position: absolute;
  bottom: 5%;
  z-index: 2;
`;

function LayoutPage() {
  const { data, loading, error } = useFetchData();
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [selected, setSelected] = useState('map');
  const selectedSubcategory = useSelector((state) => state.selectedSubcategory);

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
      <Header />
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

        <ToggleBoundary className="App">
          <MapToggle setSelected={setSelected} />
        </ToggleBoundary>
        {selected === 'map' ? (
          <MapBoundary>
            <KakaoMap data={filteredData} />
          </MapBoundary>
        ) : (
          <CompanyList data={data} />
        )}
      </Main>
      <Footer />
    </>
  );
}

export default LayoutPage;
