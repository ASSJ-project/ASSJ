import useFetch from '@/hooks/useFetch';
import styled from 'styled-components';
import { TailSpin } from 'react-loader-spinner';
import KakaoMap from '@/components/domain/Map/KakaoMap_0331';
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

function MainContainer() {
  const [selected, setSelected] = useState('map');

  const setFilterRegion = useSelector((state) => state.setFilterRegion);
  const setFilterJob = useSelector((state) => state.setFilterJob);

  const [region, setRegion] = useState('서울 강남구');
  const [jobsCd, setJobsCd] = useState(550104);

  useEffect(() => {
    setRegion(setFilterRegion);
    setJobsCd(setFilterJob);
  }, [setFilterRegion, setFilterJob]);

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
        <MapBoundary>{data && <KakaoMap data={data} />}</MapBoundary>
      ) : (
        <CompanyList region={region} jobsCd={jobsCd} />
      )}
      <Footer />
    </>
  );
}

export default MainContainer;
