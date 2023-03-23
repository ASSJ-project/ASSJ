import CompanyList from '../components/domain/Map/CompanyList';
import MapData from '../components/domain/Map/MapData';
import { TailSpin } from 'react-loader-spinner';
import styled from 'styled-components';
import useFetchData from '../hooks/useFetchData';
import KakaoMapTest from '../components/domain/Map/KakaoMapTest';

const LoadingContainer = styled.div`
  // display: flex;

  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Root = styled.section``;

const Container = styled.section`
  display: flex;
  flex-direction: row-reverse;
  @media (max-width: 780px) {
    flex-direction: column;
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

const Footer = styled.footer`
  color: white;
  width: 100%;
  height: 60px;
  background-color: #555;
`;

const MapContainer = styled.div`
  display: flex;

  flex-direction: row-reverse;
  @media (max-width: 780px) {
    flex-direction: column;
  }
`;

const MapBorder = styled.div`
  height: 500px;
  width: 500px;
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
      {/* <Container>
        <MapBorder className="map">
          <KakaoMapTest />
        </MapBorder>
        <CompanyList data={data} />
      </Container> */}
      <Footer>Footer</Footer>
    </>
  );
}

export default MapPage;
