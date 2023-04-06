import useFetch from '@/hooks/useFetch';
import styled from 'styled-components';
import { TailSpin } from 'react-loader-spinner';
import KakaoMap from '@/components/domain/Map/KakaoMap_0403';
import { useSelector } from 'react-redux';
import JobFilter from '@/components/domain/Map/DataFilter/JobFilter';
import RegionFilter from '@/components/domain/Map/DataFilter/RegionFilter';
import { useState, useEffect } from 'react';
import MapToggle from '@/components/domain/Map/ToggleButton';
import CompanyList from '@/components/domain/Map/CompanyList';
import Footer from '@/components/Structure/Footer/Footer';
import Header from '@/components/Structure/Header/Header';
import Chip from '@mui/material/Chip';
import DoneIcon from '@mui/icons-material/Done';

const LoadingContainer = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const MapBoundary = styled.div`
  margin: 20px;
  height: 80vh;
  width: 75%;
  border: 1px solid black;
`;

// const ToggleBoundary = styled.div`
//   position: absolute;
//   bottom: 5%;
//   z-index: 2;
// `;

const Filter = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  border: 1px solid #b4c0d3;
  @media (max-width: 1110px) {
    width: 90%;
  }
`;

const Content = styled.div`
  display: flex;
  width: 90%;
  height 100vh;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1em;
  
`;

function MainContainer() {
  const [selected, setSelected] = useState('map');

  const setFilterRegion = useSelector((state) => state.setFilterRegion);
  const setFilterJob = useSelector((state) => state.setFilterJob);

  const [region, setRegion] = useState('서울 금천구');
  const [jobsCd, setJobsCd] = useState(133300);

  const filterRegionlist = setFilterRegion.split(',');
  const filterJoblist = setFilterJob.split(',');

  const handleClick = () => {};
  const handleDelete = () => {};

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
