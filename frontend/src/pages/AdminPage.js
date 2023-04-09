import "../components/domain/Admin/Admin.css";
import React from "react";
import InfoTable from "../components/domain/Admin/InfoTable";
import Header from "../components/Structure/Header/Header";
import Footer from "../components/Structure/Footer/Footer";

function Admin() {
  return (
    <div className="admin_full_container">
      <Header />
      <div className="admin_container">
        {/* 회원정보 / 통계 메뉴 버튼 */}
        <button className="user_info_btn">회원정보</button>
        <InfoTable />
      </div>
      <Footer />
    </div>
  );
}

export default Admin;
