import MyPageInfo from '../components/domain/MyPage/MyPage-Info';
import MyPageCheck from '../components/domain/MyPage/MyPage-Check';
import MyPageHeader from '../components/domain/MyPage/MyPage-Header';
import { useState } from 'react';
import '../components/domain/MyPage/MyPage.css';
import Header from './Header';
import Footer from '@/components/Structure/Footer/Footer';

export default function(){
const getMyPage2 = (text) => {
    setValue(text);
    };
    
    return (
        <>
          <Header />
          <div className="mypage-main">
            <MyPageHeader getMyPage1={getMyPage1} getMyPage2={getMyPage2} />
            {value == true ? <MyPageCheck /> : <MyPageInfo />}
          </div>
          <Footer />
        </>
    );
}