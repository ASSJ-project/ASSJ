import "../static/css/Admin.css";
import React from "react";
import AdminUserInfo from "./AdminUserInfo";
import AdminStats from "./AdminStats";
import Header from "./Header";
import { useState } from "react";

function Admin() {
  const [adminUserPage, SetAdminUserPage] = useState(true);
  const [adminStatsPage, SetStatsAdminPage] = useState(false);

  return (
    <>
      <Header title="Admin" />
      <div className="menu_container">
        <div>
          {/* 회원정보 / 통계 메뉴 버튼 */}
          <div>
            <button
              style={{
                backgroundColor: adminUserPage
                  ? "var(--main-color)"
                  : "var(--soft-color)",
              }}
              className="admin_btn"
              onClick={() => (SetAdminUserPage(true), SetStatsAdminPage(false))}
            >
              회원정보
            </button>
            <button
              style={{
                backgroundColor: adminStatsPage
                  ? "var(--main-color)"
                  : "var(--soft-color)",
              }}
              className="admin_btn"
              onClick={() => (SetAdminUserPage(false), SetStatsAdminPage(true))}
            >
              통계
            </button>
          </div>
        </div>
        {adminUserPage == true ? <AdminUserInfo /> : <AdminStats />}
      </div>
    </>
  );
}

export default Admin;
