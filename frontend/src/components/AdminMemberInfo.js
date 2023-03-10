import "../static/css/AdminMemberInfo.css";
import frame from "../static/images/Error-Frame1.png";
import { Link } from "react-router-dom";
import React from "react";

function AdminMemberInfo() {
  // 적용이 안댕 ㅠㅠ 다시보기
  const clickMemberInfo = () => {
    return <button className="focus_btn">회원정보</button>;
  };

  return (
    <>
      <div className="container">
        {/* 햄버거 메뉴아이콘, 타이틀 */}
        <div className="header">
          <img src={frame} alt="menu-icon" className="menu-icon" />
          알쓸신잡
        </div>

        <div>
          <div className="admin-title">&nbsp;&nbsp;Admin</div>

          {/* 회원정보 / 통계 메뉴 버튼 */}
          <div>
            <Link to="/admin_member">
              <button className="admin_btn" onClick={clickMemberInfo}>
                회원정보
              </button>
            </Link>
            <Link to="/admin_stats">
              <button className="admin_btn">통계</button>
            </Link>
          </div>

          <div className="member_info">개인정보 data * n명</div>
          <div className="member_info">개인정보 data * n명</div>
          <div className="member_info">개인정보 data * n명</div>
        </div>
      </div>
    </>
  );
}

export default AdminMemberInfo;
