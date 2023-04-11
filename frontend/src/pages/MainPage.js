import useApiFetch from '@/hooks/useApiFetch';
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
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

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

const ToolBox = styled.div`
  width: 90%;
  height auto;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1em;

  @media (max-width: 480px) {
    text-align: left;

  }
`;

const ToolBar = styled.div`
  display: inline;
  @media (max-width: 480px) {
    display: flexbox;
  }
`;


function MainContainer() {
  const [selected, setSelected] = useState('map');
  const [mapData, setMapData] = useState('');
  const [region, setRegion] = useState('');
  const [jobsCd, setJobsCd] = useState('');
  //const [loading, setLoading] = useState(true);

  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const setFilterRegion = useSelector(
    (state) => state.dataFilter.setFilterRegion
  );
  const setFilterJob = useSelector((state) => state.dataFilter.setFilterJob);

  const setMarkerAddress = useSelector(
    (state) => state.dataInfo.setMarkerAddress
  );

  const handleButtonClick = () => {
    setRegion(setFilterRegion);
    setJobsCd(setFilterJob);
    handleClick({ vertical: 'bottom', horizontal: 'center' })();
  };

  useEffect(() => {
    setRegion(setMarkerAddress);
  }, [setMarkerAddress]);

  const { data, isLoading, error } = useApiFetch(
    `/api/company/getItems?region=${region}&jobsCd=${jobsCd}`
  );

  useEffect(() => {
    if (data) {
      setMapData(data);
    }
  }, [data]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Header />

      <ToolBox>
        <ToolBar>
          <RegionFilter />
          <JobFilter />
        </ToolBar>
        <Button variant="contained" onClick={handleButtonClick}>
          검색
        </Button>
      </ToolBox>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={`${mapData.length} 건이 검색되었습니다.`}
        key={vertical + horizontal}
      />
      <Content className="Content">
        <ToggleBoundary className="App">
          <MapToggle setSelected={setSelected} />
        </ToggleBoundary>

        {selected === 'map' ? (
          <MapBoundary className="MapBoundary">
            {mapData && isLoading ? (
              <LoadingContainer>
                <TailSpin color="#9588e0" height={80} width={80} />
              </LoadingContainer>
            ) : (
              <KakaoMap data={mapData} />
            )}
          </MapBoundary>
        ) : (
          <>
            {mapData && isLoading ? (
              <LoadingContainer>
                <TailSpin color="#9588e0" height={80} width={80} />
              </LoadingContainer>
            ) : (
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
          <>
            {mapData && isLoading ? (
              <LoadingContainer>
                <TailSpin color="#9588e0" height={80} width={80} />
              </LoadingContainer>
            ) : (
              <CompanyList
                className="companyList"
                data={mapData}
                region={region}
                jobsCd={jobsCd}
              />
            )}
          </>
        </List>
      </Content>
      <Footer />
    </>
  );
}

export default MainContainer;
