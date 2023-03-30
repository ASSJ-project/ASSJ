import useFetch from '@/hooks/useFetch';
import styled from 'styled-components';
import CompanyList from '@/components/domain/Map/CompanyList';
import { TailSpin } from 'react-loader-spinner';
import KakaoMap from '@/components/domain/Map/KakaoMap';
import MapToggle from '@/components/domain/Map/ToggleButton';

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
  const { data, isLoading, error } = useFetch(
    '/api/company/getItems',
    { filteredData: '구로구' },
    { 'Content-Type': 'application/json' }
  );

  if (isLoading) {
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
    </>
  );
}

export default MainContainer;
