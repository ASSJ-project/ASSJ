import React, { useState } from 'react';
import '@/components/domain/MyPage/MyPage.css';

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

  const fix1 = () => {
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
    <div className="mypage-myinformations">
      <div className={'mypage-myinformation'}>
        <span style={{ marginLeft: '20px' }}>이름 : </span>
        <span style={{ marginRight: '20px' }}>{data['data'].userName}</span>
      </div>
      <div className={'mypage-myinformation'}>
        <span style={{ marginLeft: '20px' }}>메일 : </span>
        <span style={{ marginRight: '20px' }}>{data['data'].userEmail}</span>
      </div>
      <div className={'mypage-myinformation'}>
        <span style={{ marginLeft: '20px' }}>주소 : </span>
        <span style={{ marginRight: '20px' }}>{data['data'].userAddress}</span>
      </div>
      <div className={'mypage-myinformation'}>
        <div style={{ marginLeft: '20px' }}>비밀번호변경 :</div>
        <div style={{ marginRight: '20px' }}>
          <input
            placeholder="현재 비밀번호"
            type="password"
            onChange={onChange}
            className="mypage-input2"
          ></input>
          <span>
            {changPswd ? (
              <button
                className="mypage-mypagecheckbutton"
                onClick={() => setChangePswd(false)}
              >
                취소
              </button>
            ) : (
              <button className="mypage-mypagecheckbutton" onClick={checkPw}>
                변경
              </button>
            )}
          </span>
        </div>
      </div>
      <div className={changPswd ? 'mypage-myinformation' : 'mypage-none'}>
        <span style={{ marginLeft: '20px' }}>새 비밀번호 :</span>
        <div style={{ marginRight: '60px' }}>
          <input
            placeholder="비밀번호를 입력해주세요"
            type="password"
            onChange={onChange2}
            className="mypage-input2"
          ></input>
        </div>
      </div>

      <div className={changPswd ? 'mypage-myinformation' : 'mypage-none'}>
        <span style={{ marginLeft: '20px' }}>비밀번호 확인 :</span>
        <div style={{ marginRight: '20px' }}>
          <input
            placeholder="비밀번호를 확인해주세요"
            type="password"
            onChange={onChange3}
            className="mypage-input2"
          ></input>
          <button className="mypage-mypagecheckbutton " onClick={Pwchange}>
            수정
          </button>
        </div>
      </div>

      <button onClick={fix1} id="my_company1" value={company[number]}>
        날 클릭해봐(지도회사클릭이라고 가정이요^0^)
      </button>
      <div>비밀번호는 현재 1234입니다.</div>
    </div>
  );
};

export default MyPageInfo;
