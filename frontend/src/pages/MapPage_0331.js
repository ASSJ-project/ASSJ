import styled from 'styled-components';
import Header from './Header';
import Footer from '@/components/Structure/Footer/Footer';
import { useState } from 'react';
import MainContainer from '@/components/domain/Map/MainContainer_0331';
import CategoryDropdown from '@/components/domain/Map/CategoryDropdown';
import { useSelector } from 'react-redux';

const Main = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const SearchBox = styled.div`
  top: 5%;
  width: 100%;
  max-width: 300px;
  padding: 10px;
  background-color: white;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: absolute;

  z-index: 2;
  @media (max-width: 767px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 20px;
  padding-left: 10px;
  border: none;
  outline: none;
  font-size: 18px;
`;

const SearchButton = styled.button`
  width: 150px;
  height: 50px;
  background-color: #ff5a5f;
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 18px;
  cursor: pointer;

  @media (max-width: 767px) {
    margin-top: 10px;
  }
`;

function LayoutPage() {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState('');
  const handleSearch = (e) => {
    setFilteredData(searchText);
  };

  return (
    <>
      <Header />
      <Main>
        <SearchBox>
          <SearchInput
            type="text"
            placeholder="검색"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <SearchButton onClick={handleSearch}>검색</SearchButton>
          <CategoryDropdown />
        </SearchBox>
        {filteredData && <MainContainer filteredData={filteredData} />}
      </Main>
      <Footer />
    </>
  );
}

export default LayoutPage;
