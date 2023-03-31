import React, { useState, useEffect } from 'react';
import '@/components/domain/MyPage/MyPage.css';
import axios from 'axios';

sessionStorage.setItem('key1', 10); //로그인이 성공했다 가정하고 세션스토리지에 저장되있는 값을 불러옵니다.
const ok = sessionStorage.getItem('key1'); //로그인 성공했을 떄 유저DB에 있는 기본키값이나 아이디값을 가져와서 세션이나 로컬에 저장해야할거같습니다. 현재는 ok가 10이라고 가정

const MyPageInfo = () => {
  const [users, setUsers] = useState([]); // 유저정보를 담기위한 useState훅을 사용했습니다.
  const [company] = useState([
    '구글',
    '네이버',
    '배민',
    '요기요',
    '사람인',
    '잡코리아',
    '카리나',
    '윈터',
    '송하영',
  ]); // 지도클릭가정하기 위해 만들었습니다 추후 지울예정인 코드 조회기록 테스트용코드입니다.
  const [number, setNumber] = useState(0); //  위와 동일합니다.
  const [pw, setPw] = useState(''); //  현재 비밀번호를 입력할떄 인풋값을 가져오기 위해 만들었습니다.
  const [stat, setStat] = useState(false); //  정보가 안보이게 해놨다가 비밀번호 맞으면 보이도록 하기위해 만들었습니다
  const [showPswd, setShowPswd] = useState(false); //  기본상태 ***** 로 보이게 누르면 보이고 또 누르면 ****로 보이게하기
  const [changPswd, setChangePswd] = useState(false);

  useEffect(() => {
    // 마이페이지(내정보)상태로 들어오면 api를 요청하여 아이디정보를 가져온다
    axios
      .get('https://jsonplaceholder.typicode.com/users/' + ok) //여기에 api요청하면 될거같습니다.
      .then((response) => {
        setUsers(response.data); //
      });
  }, []);

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
        // 최대 8개까지만
        get_local.shift();
      }
    }
    localStorage.setItem('data', JSON.stringify(get_local));
  };

  const onChange = (e) => {
    setPw(e.target.value);
  };

  const checkPw = () => {
    if (pw === users.phone) {
      return setStat(true);
    } else {
      alert('비밀번호를 확인해주세요');
    }
  };

  const maskingPw = (pw) => {
    var stringpw = '' + pw;
    var stringpwleft = stringpw.substring(0, 3);
    var stringpwright = stringpw.substring(
      stringpw.length - 4,
      stringpw.length
    );
    return stringpwleft + '****' + stringpwright;
  };

  function Woo() {
    return (
      <div
        className={
          !stat
            ? 'mypage-none'
            : changPswd
            ? 'mypage-myinformation'
            : 'mypage-none'
        }
      ></div>
    );
  }

  return (
    <div className="mypage-myinformations">
      <div className={!stat ? 'mypage-myinformation-pwcheck' : 'mypage-none'}>
        <div>※ 현재 비밀번호를 입력해주시길 바랍니다. ※</div>
        <div>
          <input
            placeholder="비밀번호를 입력해주세요"
            type={showPswd ? 'text' : 'password'}
            onChange={onChange}
            className="mypage-input"
          ></input>
          <div className="mypage-pwcheckbox">
            <div>
              {showPswd ? (
                <button
                  className="mypage-pwcheck"
                  onClick={() => setShowPswd(false)}
                >
                  숨김
                </button>
              ) : (
                <button
                  className="mypage-pwcheck"
                  onClick={() => setShowPswd(true)}
                >
                  보임
                </button>
              )}
            </div>
            <div>
              <button className="mypage-pwcheck" onClick={checkPw}>
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={!stat ? 'mypage-none' : 'mypage-myinformation'}>
        <span style={{ 'margin-left': '20px' }}>이름 : </span>
        <span style={{ 'margin-right': '20px' }}>{users.name}</span>
      </div>
      <div className={!stat ? 'mypage-none' : 'mypage-myinformation'}>
        <span style={{ 'margin-left': '20px' }}>메일 : </span>
        <span style={{ 'margin-right': '20px' }}>{users.email}</span>
      </div>
      <div className={!stat ? 'mypage-none' : 'mypage-myinformation'}>
        <span style={{ 'margin-left': '20px' }}>주소 : </span>
        {/* <span style={{ 'margin-right': '50px' }}>{users.id}</span> */}
        <span style={{ 'margin-right': '20px' }}>
          경기 성남시 분당구 성남분당우체국사서함 1 ~ 200
        </span>
      </div>
      <div className={!stat ? 'mypage-none' : 'mypage-myinformation'}>
        <div style={{ 'margin-left': '20px' }}>현재비밀번호 :</div>
        <div style={{ 'margin-right': '20px' }}>
          <span style={{ 'margin-right': '20px' }}>
            {maskingPw(users.phone)}
          </span>
          <span>
            {changPswd ? (
              <button onClick={() => setChangePswd(false)}>취소</button>
            ) : (
              <button onClick={() => setChangePswd(true)}>변경</button>
            )}
          </span>
        </div>
      </div>
      <div
        className={
          !stat
            ? 'mypage-none'
            : changPswd
            ? 'mypage-myinformation'
            : 'mypage-none'
        }
      >
        <span style={{ 'margin-left': '20px' }}>비밀번호 변경:</span>
        <div style={{ 'margin-right': '100px' }}>
          <input
            placeholder="비밀번호를 입력해주세요"
            type="password"
            onChange={onChange}
            className="mypage-input2"
          ></input>
        </div>
      </div>
      <Woo>
        <span style={{ 'margin-left': '20px' }}>비밀번호 확인:</span>
        <span style={{ 'margin-right': '20px' }}>(예정 안할지도)</span>
      </Woo>
      {/* <div
        className={
          !stat
            ? 'mypage-none'
            : changPswd
            ? 'mypage-myinformation'
            : 'mypage-none'
        }
      >
        <span style={{ 'margin-left': '20px' }}>비밀번호 확인:</span>
        <span style={{ 'margin-right': '20px' }}>(예정 안할지도)</span>
      </div> */}

      <button onClick={fix1} id="my_company1" value={company[number]}>
        날 클릭해봐(지도클릭이라고 가정이요^0^)
      </button>
      <div>비밀번호는 현재 024-648-3804입니다.</div>
    </div>
  );
};

export default MyPageInfo;
