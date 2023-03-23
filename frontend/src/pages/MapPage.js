import CompanyList from '../components/domain/Map/CompanyList';
import MapData from '../components/domain/Map/MapData';
import { TailSpin } from 'react-loader-spinner';
import styled from 'styled-components';
import useFetchData from '../hooks/useFetchData';
import KakaoMapTest from '../components/domain/Map/KakaoMapTest';
import KakaoMap from '../components/domain/Map/KakaoMap';
import Footer from '../components/domain/Map/Footer';

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

function MapPage() {
  const { data, loading, error } = useFetchData();

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
      <MainContainer>main</MainContainer>
      <Container>
        <MapBoundary>
          <KakaoMapTest data={data} />
          {/* <MapData data={data} /> */}
        </MapBoundary>
        <CompanyList data={data} />
      </Container>
      <Footer />
    </>
  );
}

export default MapPage;
