import '@/components/domain/MyPage/MyPage.css';
import MyPageInfo from '@/components/domain/MyPage/MyPage-Info';
import MyPageCheck from '@/components/domain/MyPage/MyPage-Check';
import MyPageHeader from '@/components/domain/MyPage/MyPage-Header';
import { useState } from 'react';
import Header from './Header';
import Footer from '@/components/Structure/Footer/Footer';
import styled from 'styled-components';

const Main = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export default function () {
  const [value, setValue] = useState(false);

  const getMyPage1 = (text) => {
    setValue(text);
  };

  const getMyPage2 = (text) => {
    setValue(text);
  };

  return (
    <>
      <Header />
      <Main>
        <div className="mypage-main">
          <MyPageHeader getMyPage1={getMyPage1} getMyPage2={getMyPage2} />
          {value === true ? <MyPageCheck /> : <MyPageInfo />}
        </div>
      </Main>
      <Footer />
    </>
  );
}
