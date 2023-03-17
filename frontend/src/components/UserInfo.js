import "../static/css/UserInfo.css";

function UserInfo() {
  return (
    <div className="user_info_container">
      {/* 전체상자 (IdBox | InfoBox) */}
      <div className="user_info_box" id="id_box">
        ID
      </div>
      <div className="user_info_box" id="info_box">
        {/* InfoBox: user_box (항목 | 상세)*3 */}
        <div className="user_box">
          <div>이름</div>
          <div>이지선</div>
        </div>
        <div className="user_box">
          <div>메일</div>
          <div>dkfjdlfjs@naver.com</div>
        </div>
        <div className="user_box">
          <div>주소</div>
          <div>
            서울시 ㅇㅇ구 ㅇㅇ동 ㅇㅇㅇ길 20-901 휴먼시아 아파트 102동 999호
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserInfo;
