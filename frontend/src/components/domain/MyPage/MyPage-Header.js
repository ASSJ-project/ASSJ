import { useState } from 'react';
import '@/components/domain/MyPage/MyPage.css';

export default function MyPageHeader(props) {
  const [tab, setTab] = useState(false);

  const mypage1 = () => {
    props.getMyPage1(false);
    setTab(false);
  };

  const mypage2 = () => {
    props.getMyPage2(true);
    setTab(true);
  };

  return (
    <>
      <div className="mypage-mypage">MY PAGE</div>
      <div className="mypage-clickmenu">
        <button
          className={tab ? 'mypage-myinfo2' : 'mypage-myinfo1'}
          onClick={mypage1}
        >
          나의 정보
        </button>
        <button
          className={tab ? 'mypage-myinfo1' : 'mypage-myinfo2'}
          style={{ textDecoration: 'none' }}
          onClick={mypage2}
        >
          최근 조회 기록
        </button>
      </div>
    </>
  );
}
