import { useState } from 'react';
import '@/components/domain/MyPage/MyPage-Header.css';
import { ToggleButtonGroup } from '@mui/material';
import { ToggleButton } from '@mui/material';

export default function MyPageHeader(props) {
  const [alignment, setAlignment] = useState('my-info');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  //나의 정보 클릭시 Mypage-info 보이도록
  const mypage1 = () => {
    props.getMyPage1(false);
  };

  //최근 조회 클릭시 MyPage-Check 보이도록
  const mypage2 = () => {
    props.getMyPage2(true);
  };

  return (
    <>
      {/* <div className="MyPage-Header">MY PAGE</div>
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
      </div> */}
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        style={{ width: '100%', marginTop: '10px' }}
      >
        <ToggleButton
          value="my-info"
          onClick={mypage1}
          style={{ width: '50%' }}
        >
          나의 정보
        </ToggleButton>
        <ToggleButton
          value="my-check"
          onClick={mypage2}
          style={{ width: '50%' }}
        >
          최근 조회 기록
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}
