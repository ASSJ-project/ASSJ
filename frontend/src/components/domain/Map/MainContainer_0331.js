import useApiFetch from '@/hooks/useFetch';
import styled from 'styled-components';
import { TailSpin } from 'react-loader-spinner';
import KakaoMap from '@/components/domain/Map/KakaoMap_0331';
import CompanyList from '@/components/domain/Map/CompanyList';
import { useState } from 'react';
import { useSelector } from 'react-redux';

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

function MainContainer(props) {
  const { filteredData } = props;
  const [selected, setSelected] = useState('map');

  const selectedSubcategory = useSelector((state) => state.selectedSubcategory);
  console.log('하위 컴포넌트', selectedSubcategory);

  const queryParam = {
    filteredData: filteredData,
    jobs: selectedSubcategory,
  };
  const header = {
    'X-Custom-Header': 'YourCustomHeaderValue',
  };

  const { data, loading, error } = useApiFetch(
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
      <MapBoundary>{data && <KakaoMap data={data} />}</MapBoundary>
    </>
  );
}

export default MainContainer;
