import CompanyList from '@/components/domain/Map/CompanyList';
import MapData from '@/components/domain/Map/MapData';
import { TailSpin } from 'react-loader-spinner';
import styled from 'styled-components';
import useFetchData from '@/hooks/useFetchData';
// import KakaoMapTest from '@/components/domain/Map/KakaoMap_example';
import KakaoMapTest from '@/components/domain/Map/KakaoMapTest';
import KakaoMap from '@/components/domain/Map/KakaoMap';
import Footer from '@/components/Structure/Footer/Footer';
import CategoryDropdown from '@/components/domain/Map/CategoryDropdown';
import { useState } from 'react';
import backbtn from 'assets/images/backbtn.png';
import { Provider, useSelector } from 'react-redux';
import store from '@/store/store';

const LoadingContainer = styled.div`
  // display: flex;

  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const MainContainer = styled.div``;

const Container = styled.section`
  display: flex;
  flex-direction: row-reverse;
  @media (max-width: 780px) {
    flex-direction: column;
    justify-content: space-between;
  }
  border: 1px solid black;
  justify-content: center;
  align-items: center;
`;

const Header = styled.header`
  color: white;
  width: 100%;
  height: 60px;
  background-color: #333;
`;

const Nav = styled.nav`
  color: white;
  width: 100%;
  height: 40px;
  background-color: #444;
`;

const MapContainer = styled.div`
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

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
`;

const SearchInput = styled.input`
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
`;

const SearchButton = styled.button`
  font-size: 16px;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
`;

function MapPage() {
  const { data, loading, error } = useFetchData();
  const [searchText, setSearchText] = useState('');
  const [salary, setSalary] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [filteredData, setFilteredData] = useState(data);

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
      <Header>Header</Header>
      <Nav>Navigation</Nav>
      <img src={backbtn} className="backbtn" />
      <MainContainer>main</MainContainer>
      <Provider store={store}>
        <p>{selectedSubcategory}</p>
      </Provider>
      <Container>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <SearchButton onClick={handleSearch}>검색</SearchButton>
          <CategoryDropdown />
        </SearchContainer>

        <MapBoundary>
          <KakaoMapTest data={filteredData} />
        </MapBoundary>
        <CompanyList data={data} />
      </Container>
      <Footer />
    </>
  );
}

export default MapPage;
