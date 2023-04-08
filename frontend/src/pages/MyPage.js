import "@/components/domain/MyPage/MyPage.css";
// import MyPageInfo from '@/components/domain/MyPage/MyPage-Info';
import MyPageCheck from "@/components/domain/MyPage/MyPage-Check";
import MyPageHeader from "@/components/domain/MyPage/MyPage-Header";
import { useState, useEffect } from "react";
import Header from "@/components/Structure/Header/Header";
import Footer from "@/components/Structure/Footer/Footer";
import styled from "styled-components";
import { getUser } from "@/apis/mypage/mypage";
import MyPageTest from "@/components/domain/MyPage/MyPage-Test";

const Main = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export default function MyPage() {
  const [value, setValue] = useState(false);
  const [userData, setUserData] = useState([]);

  const getMyPage1 = (text) => {
    setValue(text);
  };

  const getMyPage2 = (text) => {
    setValue(text);
  };

  useEffect(() => {
    if (sessionStorage.getItem("role") !== "ROLE_SNS") {
      getUser().then((result) => {
        setUserData(result);
      });
    }
  }, []);

  return (
    <>
      <Header />
      <Main>
        <div className="mypage-main">
          <MyPageHeader getMyPage1={getMyPage1} getMyPage2={getMyPage2} />
          {/* {value === true ? <MyPageCheck /> : <MyPageInfo data={userData} />} */}
          {value === true ? <MyPageCheck /> : <MyPageTest data={userData} />}
        </div>
      </Main>
      <Footer />
    </>
  );
}
