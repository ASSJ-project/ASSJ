import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import '../MyPage/MyPage-Test.css';
//
//나의 정보를 눌렀을 때 나오는 페이지입니다.
const MyPageTest = (data) => {
  const [isSocial, setIsSocial] = useState(''); // 소셜인지 확인하기 위함
  const [isLogin, setIsLogin] = useState(''); //로그인 상태인지 확인하기 위함
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    setIsSocial(localStorage.getItem('role')); // 로컬에 있는 role 값 가져옴
    setIsLogin(localStorage.getItem('login')); // 로컬에 있는 login값 가져옴
  }, []);

  const MypageboxInfo = ({ data, name }) => {
    return (
      <div className="MyPagebox-Info">
        <p style={{ marginLeft: '15px' }}>{name}</p>
        {isLogin ? (
          isSocial == 'ROLE_SOCIAL' ? (
            <p style={{ marginRight: '15px' }}>조회할 수 없습니다. </p>
          ) : (
            <p style={{ marginRight: '15px' }}>{data}</p>
          )
        ) : (
          <p style={{ marginRight: '15px' }}>로그인이 필요합니다. </p>
        )}
      </div>
    );
  };

  const mypagedelete = () => {
    setIsDelete(true);
  };

  const mypagenodelete = () => {
    setIsDelete(false);
  };

  return (
    <div className="MyPagebox">
      <MypageboxInfo data={data['data'].userName} name={'이름'} />
      <MypageboxInfo data={data['data'].userEmail} name={'이메일'} />
      <MypageboxInfo data={data['data'].userAddress} name={'주소'} />
      <Button
        variant="contained"
        style={{ marginTop: '10px', fontSize: '20px' }}
        onClick={() => {
          window.location.href = 'findpassword';
        }}
      >
        비밀번호 변경
      </Button>
      {!isDelete ? (
        <Button
          variant="contained"
          style={{ marginTop: '10px', fontSize: '20px' }}
          onClick={mypagedelete}
        >
          회원탈퇴
        </Button>
      ) : (
        <Button
          variant="contained"
          style={{ marginTop: '10px', fontSize: '20px' }}
          onClick={mypagenodelete}
        >
          취소
        </Button>
      )}
      <div className={isDelete ? 'MyPagebox-delete' : 'MyPagebox-none'}>
        <p>
          회원탈퇴시 복구 불가능합니다.
          <br />
          정말 탈퇴하시겠습니까?
        </p>
        <Button
          variant="contained"
          style={{ marginTop: '10px', fontSize: '20px' }}
        >
          네, 탈퇴하겠습니다.
        </Button>
      </div>
    </div>
  );
};

export default MyPageTest;
