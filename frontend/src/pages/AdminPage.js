import "../components/domain/Admin/Admin.css";
import React from "react";
import InfoTable from "../components/domain/Admin/InfoTable";
import Header from "../components/Structure/Header/Header";

function Admin() {
  return (
    <>
      <Header />
      <div className="admin_container">
        {/* 회원정보 / 통계 메뉴 버튼 */}
        <button className="user_info_btn">회원정보</button>
        <InfoTable />
      </div>
    </>
  );
}

export default Admin;
