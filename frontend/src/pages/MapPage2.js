import styled from 'styled-components';
import { TailSpin } from 'react-loader-spinner';
import useFetchData from '@/hooks/useFetchData';
import KakaoMap from '@/components/domain/Map/KakaoMap';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import proj4 from 'proj4';
import InfiniteScroll from '@/components/domain/Map/InfiniteScroll';

function LayoutPage() {
  const { data, loading, error } = useFetchData();
  console.log(data);

  return (
    <>
      <InfiniteScroll data={data} />
    </>
  );
}

export default LayoutPage;
