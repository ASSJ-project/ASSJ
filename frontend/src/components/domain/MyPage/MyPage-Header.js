import { useState } from 'react';
import '@/components/domain/MyPage/MyPage-Header.css';

export default function MyPageHeader(props) {
  const [tab, setTab] = useState(false);

  //나의 정보 클릭시 나의 정보 색깔 바뀌게하는 함수
  const mypage1 = () => {
    props.getMyPage1(false);
    setTab(false);
  };

  //최근 조회 클릭시 최근조회 색깔 바뀌게하는 함수
  const mypage2 = () => {
    props.getMyPage2(true);
    setTab(true);
  };

  return (
    <>
      <div className="MyPage-Header">MY PAGE</div>
      <div className="MyPage-ClickMenu">
        <button
          className={tab ? 'MyPage-MyInfo2' : 'MyPage-MyInfo1'}
          onClick={mypage1}
        >
          나의 정보
        </button>
        <button
          className={tab ? 'MyPage-MyInfo1' : 'MyPage-MyInfo2'}
          style={{ textDecoration: 'none' }}
          onClick={mypage2}
        >
          최근 조회 기록
        </button>
      </div>
    </>
  );
}
