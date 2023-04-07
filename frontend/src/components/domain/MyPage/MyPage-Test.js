import React from 'react';
import Button from '@mui/material/Button';
import '../MyPage/MyPage-Test.css';

//나의 정보를 눌렀을 때 나오는 페이지입니다.
const MyPageTest = (data) => {
  return (
    <div className="MyPagebox">
      <div className="MyPagebox-Info">
        <p style={{ marginLeft: '15px' }}>이름</p>
        {/* <p style={{ marginRight: '15px' }}>{data['data'].userName}</p> */}
        <p style={{ marginRight: '15px' }}>이진범</p>
      </div>
      <div className="MyPagebox-Info">
        <p style={{ marginLeft: '15px' }}>이메일</p>
        {/* <p style={{ marginRight: '15px' }}>{data['data'].userEmail}</p> */}
        <p style={{ marginRight: '15px' }}>ahso0@Naver.com</p>
      </div>
      <div className="MyPagebox-Info">
        <p style={{ marginLeft: '15px' }}>주소</p>
        {/* <p style={{ marginRight: '15px' }}>{data['data'].userAddress}</p> */}
        <p style={{ marginRight: '15px' }}>인천시 효서로 145</p>
      </div>

      {/* <div className="MyPagebox-Header">
        <p>
          <span style={{ fontSize: '25px', color: '#9588E0' }}>
            {data['data'].userName}
          </span>
          님, 안녕하세요!
          <span style={{ fontSize: '25px' }}>이름</span>
          님, 안녕하세요!
        </p>
        <p>{data['data'].userEmail}</p>
        <p>이메일</p>
        <p>{data['data'].userAddress}</p>
        <p>주소</p>
      </div> */}
      {/* <div className="MyPagebox-event">
        <div className="yam">
          <p style={{ marginLeft: '10px', fontSize: '20px' }}>
            <span className="MyPageSpan-right">
              <RiCoupon2Fill />
            </span>
            쿠폰함 :
          </p>
          <p className="MyPagebox-event-right ">
            사용가능 쿠폰 0개
            <span style={{ marginLeft: '10px' }}>
              <AiOutlineRight
                onClick={() => alert('사용가능 쿠폰이 없습니다.')}
              />
            </span>
          </p>
        </div>
        <div
          style={{
            textAlign: 'center',
            alignItems: 'center',
          }}
        >
          <p style={{ marginLeft: '10px', fontSize: '20px' }}>
            <span className="MyPageSpan-right">
              <MdOutlineEventAvailable />
            </span>
            이벤트 :
          </p>
          <p className="MyPagebox-event-right ">
            진행중 이벤트 0개
            <span style={{ marginLeft: '10px' }}>
              <AiOutlineRight
                onClick={() => alert('진행중인 이벤트가 없습니다..')}
              />
            </span>
          </p>
        </div>
      </div> */}

      <Button
        variant="contained"
        style={{ marginTop: '10px', fontSize: '20px' }}
      >
        비밀번호 변경
      </Button>
      <Button
        variant="contained"
        style={{ marginTop: '10px', fontSize: '20px' }}
      >
        회원탈퇴
      </Button>
    </div>
  );
};

export default MyPageTest;
