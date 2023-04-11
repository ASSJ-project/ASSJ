import useFetch from '@/hooks/useFetch';
import useApiFetch from '@/hooks/useApiFetch';
import useCookie from '@/hooks/useCookie';
import styled from 'styled-components';
import { TailSpin } from 'react-loader-spinner';
import KakaoMap from '@/components/domain/Map/KakaoMap';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import MapToggle from '@/components/domain/Map/ToggleButton';
import CompanyList from '@/components/domain/Map/CompanyList';
import Footer from '@/components/Structure/Footer/Footer';
import Header from '@/components/Structure/Header/Header';
import RegionFilter from '@/components/domain/Map/AddressSelect/RegionFilter';
import JobFilter from '@/components/domain/Map/AddressSelect/JobFilter';

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
    display: inline;
    width: 10%;
    position: fixed;
    bottom: 20%;
    left 38%;
    text-align: center;
    z-index 2;
  }
`;

const SearchContainer = styled.div`
  width: 100%;
  text-align: right;
  margin-top: 0.3em;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 768px) {
    width: 60%;
    display: inline;
    float: right;
    margin-right: 0;
  }
`;

const SearchInput = styled.input`
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-right: 5px;
  @media (max-width: 768px) {
    width: 120px;
    height: 18px;
    font-size: 13px;
  }
`;

const SearchButton = styled.button`
  font-size: 16px;
  padding: 10px;
  border: none;
  border-radius: 6px;
  background-color: #b4c0d3;
  color: white;
  cursor: pointer;
  @media (max-width: 768px) {
    height: 40px;
    font-size: 13px;
  }
`;

function MainContainer() {
  const [selected, setSelected] = useState('map');
  const [searchText, setSearchText] = useState('');
  const [mapData, setMapData] = useState('');

  const setFilterRegion = useSelector(
    (state) => state.dataFilter.setFilterRegion
  );
  const setFilterJob = useSelector((state) => state.dataFilter.setFilterJob);

  const setMarkerAddress = useSelector(
    (state) => state.dataInfo.setMarkerAddress
  );

  const [region, setRegion] = useState('');
  const [jobsCd, setJobsCd] = useState('');

  useEffect(() => {
    setRegion(setFilterRegion);
    setJobsCd(setFilterJob);
  }, [setFilterRegion, setFilterJob]);

  useEffect(() => {
    setRegion(setMarkerAddress);
  }, [setMarkerAddress]);

  const { data, loading, error } = useApiFetch(
    `/api/company/getItems?region=${region}&jobsCd=${jobsCd}`
  );

  useEffect(() => {
    if (data) {
      setMapData(data);
    }
  }, [data]);

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
        </SearchContainer>
      </ToolBar>
      <Content className="Content">
        <ToggleBoundary className="App">
          <MapToggle setSelected={setSelected} />
        </ToggleBoundary>

        {selected === 'map' ? (
          <MapBoundary className="MapBoundary">
            {mapData && <KakaoMap data={mapData} />}
          </MapBoundary>
        ) : (
          <>
            {mapData && (
              <CompanyList
                className="companyList"
                data={mapData}
                region={region}
                jobsCd={jobsCd}
              />
            )}
          </>
        )}

        <List className="List">
          <RegionFilter />
          <JobFilter />
          {mapData && (
            <CompanyList
              className="companyList"
              data={mapData}
              region={region}
              jobsCd={jobsCd}
            />
          )}
        </List>
      </Content>
      <Footer />
    </>
  );
}

export default MainContainer;