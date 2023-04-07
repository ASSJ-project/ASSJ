import useFetch from '@/hooks/useFetch';
import styled from 'styled-components';
import { TailSpin } from 'react-loader-spinner';
import KakaoMap from '@/components/domain/Map/KakaoMap';
import { useSelector } from 'react-redux';
import JobFilter from '@/components/domain/Map/DataFilter/JobFilter';
import RegionFilter from '@/components/domain/Map/DataFilter/RegionFilter';
import { useState, useEffect } from 'react';
import MapToggle from '@/components/domain/Map/ToggleButton';
import CompanyList from '@/components/domain/Map/CompanyList';
import Footer from '@/components/Structure/Footer/Footer';
import Header from '@/components/Structure/Header/Header';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const MapBoundary = styled.div`
  height: 80vh;
  width: 90%;
  border: 1px solid #b4c0d3;

  @media (max-width: 768px) {
    width: 100%;
    height: 70vh;
  }
`;

const List = styled.div`
  width: 40%;
  height: 80vh;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #b4c0d3;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Content = styled.div`
  display: flex;
  width: 90%;
  height auto;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1em;
  border: 1px solid #b4c0d3;

  @media (max-width: 768px) {
    margin-top: 0;
  }
`;
const ToolBar = styled.div`
  width: 90%;
  display: flex;
  margin-left: auto;
  margin-right: auto;
`;

const ToolBox = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: inline;
    width: auto;
  }
`;

const ToggleBoundary = styled.div`
  display: none;
  @media (max-width: 768px) {
    width: 60px;
    display: inline;
    position: fixed;
  }
`;

const SearchContainer = styled.div`
  width: 100%;
  text-align: right;
  margin-top: 1em;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 768px) {
    display: inline;
    width: auto;
  }
`;

const SearchInput = styled.input`
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-right: 5px;
`;

const SearchButton = styled.button`
  font-size: 16px;
  padding: 10px;
  border: none;
  border-radius: 6px;
  background-color: #b4c0d3;
  color: white;
  cursor: pointer;
`;

function MainContainer() {
  const [filteredData, setFilteredData] = useState('');
  const [selected, setSelected] = useState('map');
  const selectedSubcategory = useSelector((state) => state.selectedSubcategory);
  const [searchText, setSearchText] = useState('');

  const setFilterRegion = useSelector(
    (state) => state.dataFilter.setFilterRegion
  );
  const setFilterJob = useSelector((state) => state.dataFilter.setFilterJob);

  const [region, setRegion] = useState('서울 금천구');
  const [jobsCd, setJobsCd] = useState(133300);

  useEffect(() => {
    setRegion(setFilterRegion);
    setJobsCd(setFilterJob);
  }, [setFilterRegion, setFilterJob]);

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

  const queryParam = {
    region,
    jobsCd,
  };

  const header = {
    'X-Custom-Header': 'YourCustomHeaderValue',
  };

  const { data, loading, error } = useFetch(
    '/api/company/getItems',
    queryParam,
    header
  );

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
      <ToolBar>
        <ToolBox>
          <RegionFilter />
          <JobFilter />
        </ToolBox>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <SearchButton onClick={handleSearch}>검색</SearchButton>
        </SearchContainer>
      </ToolBar>
      <Content className="Content">
        <ToggleBoundary className="App">
          <MapToggle setSelected={setSelected} />
        </ToggleBoundary>

        {selected === 'map' ? (
          <MapBoundary className="MapBoundary">
            {data && <KakaoMap data={data} />}
          </MapBoundary>
        ) : (
          <CompanyList
            className="companyList"
            region={region}
            jobsCd={jobsCd}
          />
        )}

        <List className="List">
          <RegionFilter />
          <JobFilter />
          <CompanyList
            className="companyList"
            region={region}
            jobsCd={jobsCd}
          />
        </List>
      </Content>
      <Footer />
    </>
  );
}

export default MainContainer;
