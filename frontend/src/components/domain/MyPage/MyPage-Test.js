import React from 'react';
import Button from '@mui/material/Button';
import '../MyPage/MyPage-Test.css';
import { MdOutlineEventAvailable } from 'react-icons/md';
import { RiCoupon2Fill } from 'react-icons/ri';
import { AiOutlineRight } from 'react-icons/ai';

//나의 정보를 눌렀을 때 나오는 페이지입니다.
const MyPageTest = (data) => {
  return (
    <div className="MyPagebox">
      <div className="MyPagebox-Header">
        <p>
          <span style={{ 'font-size': '25px' }}>이진범</span>
          님, 안녕하세요!
        </p>
        <p>ahso0@naver.com</p>
        <p>인천시 계양구 효서로 145</p>
      </div>
      <div className="MyPagebox-event">
        <div>
          <p style={{ marginLeft: '10px', fontSize: '20px' }}>
            <span style={{ marginRight: '5px' }}>
              <RiCoupon2Fill />
            </span>
            쿠폰함 :
          </p>
          <p className="MyPagebox-event-right ">
            사용가능 쿠폰 0개
            <span style={{ marginLeft: '5px' }}>
              <AiOutlineRight
                onClick={() => alert('사용가능 쿠폰이 없습니다.')}
              />
            </span>
          </p>
        </div>
        <div>
          <p style={{ marginLeft: '10px', fontSize: '20px' }}>
            <span style={{ marginRight: '5px' }}>
              <MdOutlineEventAvailable />
            </span>
            이벤트 :
          </p>
          <p className="MyPagebox-event-right ">
            진행중 이벤트 0개
            <span style={{ marginLeft: '5px' }}>
              <AiOutlineRight
                onClick={() => alert('진행중인 이벤트가 없습니다..')}
              />
            </span>
          </p>
        </div>
      </div>
      <Button variant="contained">고객센터</Button>
      <Button variant="contained">신고하기</Button>

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
