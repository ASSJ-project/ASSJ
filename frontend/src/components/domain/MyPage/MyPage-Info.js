import React, { useState } from 'react';
import '@/components/domain/MyPage/MyPage-Info.css';
import Button from '@mui/material/Button';

//나의 정보를 눌렀을 때 나오는 페이지입니다.
const MyPageInfo = (data) => {
  const [company] = useState([
    '구글',
    '네이버',
    '배민',
    '요기요',
    '사람인',
    '잡코리아',
    '사람인',
    '알바몬',
    '알바천국',
  ]); // 지도클릭가정하기 위해 만들었습니다 추후 지울예정인 코드 조회기록 테스트용코드입니다.
  const [number, setNumber] = useState(0); //  위와 동일합니다.
  const [pw, setPw] = useState(''); //  현재 비밀번호를 입력할떄 인풋값을 가져오기 위해 만들었습니다.
  const [changPswd, setChangePswd] = useState(false);
  const [newPw, setNewPw] = useState('');
  const [newPwCheck, setNewPwCheck] = useState('');

  const SearchedCompany = () => {
    // 메인페이지에서 마커 클릭했을 때 로컬스토리지에 저장한다는 가정 마이페이지 테스트용
    setNumber(number + 1);
    let textbox1 = document.getElementById('my_company1').value; ////버튼 클릭했을 때 로컬스토리지에 저장하는거
    let get_local = localStorage.getItem('data'); //get_local은 로컬에 키가 data로 저장된 value값을 가져온다.
    if (get_local == null) {
      get_local = [];
    } else {
      get_local = JSON.parse(get_local); // 값이 있다면 배열로만들어준다 로컬스토리지에는 key,value로 밖에 저장되지 않아서 JSON.parse 를 이용해야 한다.
    }
    get_local.push(textbox1);
    get_local = new Set(get_local); // 두번 눌러도 한번만 나오도록
    get_local = [...get_local];
    if (get_local.length > 8) {
      for (let i = 0; i < get_local.length - 8; i++) {
        get_local.shift(); //최대 8개의 회사 이름이 나오게 이거 쓰시면 될거같습니다
      }
    }
    localStorage.setItem('data', JSON.stringify(get_local));
  };

  const onChange = (e) => {
    setPw(e.target.value);
  };

  const onChange2 = (e) => {
    setNewPw(e.target.value);
  };

  const onChange3 = (e) => {
    setNewPwCheck(e.target.value);
  };

  const checkPw = () => {
    if (pw === '1234') {
      return setChangePswd(true);
    } else {
      alert('비밀번호를 확인해주세요');
    }
  };

  const Pwchange = () => {
    const regExpPw =
      /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/; //정규식
    if (!regExpPw.test(newPw)) {
      alert('숫자,영문,특수문자를 포함하여 8글자 이상이여야 합니다.');
    } else if (newPw != newPwCheck) {
      alert('새비밀번호와 새비밀번호가 동일하지가 않습니다.');
    } else {
      alert('비밀번호가 수정되었습니다.');
      window.location.reload(true);
    }
  };

  return (
    <div className="MyPage-MyInformations">
      <div className={'MyPage-Myinfo'}>
        <span style={{ marginLeft: '20px' }}>이름 : </span>
        {/* <span style={{ marginRight: "20px" }}>{data["data"].userName}</span> */}
      </div>
      <div className={'MyPage-Myinfo'}>
        <span style={{ marginLeft: '20px' }}>메일 : </span>
        {/* <span style={{ marginRight: "20px" }}>{data["data"].userEmail}</span> */}
      </div>
      <div className={'MyPage-Myinfo'}>
        <span style={{ marginLeft: '20px' }}>주소 : </span>
        {/* <span style={{ marginRight: "20px" }}>{data["data"].userAddress}</span> */}
      </div>
      <div className={'MyPage-Myinfo'}>
        <div style={{ marginLeft: '20px' }}>비밀번호변경 :</div>
        <div style={{ marginRight: '10px' }}>
          <input
            placeholder="현재 비밀번호"
            type="password"
            onChange={onChange}
            className="MyPage-Input"
          ></input>
          <span>
            {changPswd ? (
              <Button
                variant="contained"
                size="small"
                onClick={() => setChangePswd(false)}
                style={{ marginLeft: '5px' }}
              >
                취소
              </Button>
            ) : (
              <Button
                variant="contained"
                size="small"
                onClick={checkPw}
                style={{ marginLeft: '5px' }}
              >
                변경
              </Button>
            )}
          </span>
        </div>
      </div>
      <div className={changPswd ? 'MyPage-Myinfo' : 'MyPage-None'}>
        <span style={{ marginLeft: '20px' }}>새 비밀번호 :</span>
        <div style={{ marginRight: '80px' }}>
          <input
            placeholder="비밀번호를 입력해주세요"
            type="password"
            onChange={onChange2}
            className="MyPage-Input"
          ></input>
        </div>
      </div>

      <div className={changPswd ? 'MyPage-Myinfo' : 'MyPage-None'}>
        <span style={{ marginLeft: '20px' }}>비밀번호 확인 :</span>
        <div style={{ marginRight: '10px' }}>
          <input
            placeholder="비밀번호를 확인해주세요"
            type="password"
            onChange={onChange3}
            className="MyPage-Input"
          ></input>
          <Button
            variant="contained"
            size="small"
            onClick={Pwchange}
            style={{ marginLeft: '5px' }}
          >
            수정
          </Button>
        </div>
      </div>

      <button
        onClick={SearchedCompany}
        id="my_company1"
        value={company[number]}
      >
        날 클릭해봐(지도회사클릭이라고 가정이요^0^)
      </button>
      <div>비밀번호는 현재 1234입니다.</div>
    </div>
  );
};

export default MyPageInfo;
