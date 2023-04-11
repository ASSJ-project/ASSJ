import useApiFetch from '@/hooks/useApiFetch';
import tip from '../assets/images/tip.png';
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
import Swal from 'sweetalert2';


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
  width: 20%;
  height: 80vh;
  margin-left: 20px;
  margin-right: auto;
  border: none;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Tip = styled.div`
  width: 100%;
  height: auto;
  border: none;
  margin-left: auto;
  margin-right: auto;
  padding: 30px;
  justify-content: center;  
  border: 1px solid #b4c0d3;
  background-color: rgba(25, 100, 225, 0.2);
  color: #0e183c;

  @media (max-width: 480px) {
    margin-bottom: 10em;
  }
`;

const Content = styled.div`
  display: flex;
  width: 90%;
  height auto;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1em;
  border: none;

`;

const ToggleBoundary = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: inline;
    width: 10%;
    position: fixed;
    bottom: 15%;
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
    text-align: right;
  }
`;

const ToolBar = styled.div`
  display: inline;
  @media (max-width: 480px) {
    display: block;
    text-align: left;
    margin-bottom: 5px;

    .search-btn {
      float: right;
    }
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

  const tip = () =>{
    Swal.fire("TIP !" , "1. 자신의 위치는 우클릭으로 표시 할 수 있습니다. <br> 2. 지역, 업종을 선택하고 검색을 해야 합니다.  <br>    3. 오른쪽 회사 목록 클릭시 상세정보를 볼 수있습니다." ,  )
  }

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
        <ToolBar><RegionFilter /></ToolBar> 
        <ToolBar>
          <JobFilter/> 
          <Button variant="contained" onClick={handleButtonClick} style={{marginRight: '5px'}}
          className='search-btn'>검색</Button>
        </ToolBar>
        
          <Button variant="contained" onClick={tip} className='search-btn' style={{backgroundColor:"Red", float: 'right'}}>TIP</Button> 
        
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
            {mapData.length === 0 && (
              <Tip>
                <strong style={{fontSize: '22px'}}>Tip</strong>
                <div style={{marginTop: '20px', fontSize: '18px'}}>현재 목록에 회사가 없습니다.</div>
                <div style={{marginTop: '20px', fontSize: '18px'}}>필터를 사용하여 업종 및 직업을 입력해주세요.</div>
                <div style={{marginTop: '20px', fontSize: '17px', paddingBottom: '20px'}}>추가 사항은 왼쪽 상단의 TIP 버튼을 눌러주세요</div>
              </Tip>
            )}

            {mapData.length !== 0 && (
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
          {mapData.length === 0 && (
            <Tip>
              <strong style={{fontSize: '22px'}}>Tip</strong>
              <div style={{marginTop: '20px', fontSize: '18px'}}>현재 목록에 회사가 없습니다.</div>
              <div style={{marginTop: '20px', fontSize: '18px'}}>필터를 사용하여 업종 및 직업을 입력해주세요.</div>
              <div style={{marginTop: '20px', fontSize: '17px', paddingBottom: '20px'}}>추가 사항은 왼쪽 상단의 TIP 버튼을 눌러주세요</div>
            </Tip>
          )}
        
          {mapData.length !== 0 && (
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
