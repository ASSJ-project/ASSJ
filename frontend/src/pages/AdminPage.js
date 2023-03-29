import "../components/domain/Admin/Admin.css";
import React from "react";
import AdminUserInfo from "../components/domain/Admin/AdminUserInfo";
import Graph from "../components/domain/Admin/Graph";
import Header from "./Header";
import { useState } from "react";

function Admin() {
  const [adminUserPage, SetAdminUserPage] = useState(true);
  const [adminStatsPage, SetStatsAdminPage] = useState(false);

  return (
    <>
      <Header />
      <div className="admin_container">
        {/* 회원정보 / 통계 메뉴 버튼 */}
        <div className="button_container">
          <button
            style={{
              backgroundColor: adminUserPage
                ? "var(--button-color)"
                : "var(--input-color)",
            }}
            className="admin_btn"
            onClick={() => (SetAdminUserPage(true), SetStatsAdminPage(false))}
          >
            회원정보
          </button>
          <button
            style={{
              backgroundColor: adminStatsPage
                ? "var(--button-color)"
                : "var(--input-color)",
            }}
            className="admin_btn"
            onClick={() => (SetAdminUserPage(false), SetStatsAdminPage(true))}
          >
            통계
          </button>
        </div>
        <div>{adminUserPage == true ? <AdminUserInfo /> : <Graph />}</div>
      </div>
    </>
  );
}

export default Admin;
