import React, { useState } from 'react';
import styled from 'styled-components';

const ToggleButton = styled.button`
  color: #fff;
  background-color: ${({ selected }) => (selected ? '#5c6bc0' : '#5c6bc0')};
  border: none;
  border-radius: 20px;
  width: 100px;
  height: 40px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: ${({ selected }) => (selected ? '#3949ab' : '#3949ab')};
  }
`;

function MapToggle({ setSelected }) {
  const [selectedTab, setSelectedTab] = useState('map');

  const handleToggle = () => {
    const tab = selectedTab === 'map' ? 'list' : 'map';
    setSelectedTab(tab);
    setSelected(tab);
  };

  return (
    <ToggleButton selected={selectedTab === 'map'} onClick={handleToggle}>
      {selectedTab === 'map' ? '목록 보기' : '지도 보기'}
    </ToggleButton>
  );
}

export default MapToggle;
