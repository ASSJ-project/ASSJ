import "../components/domain/Admin/Admin.css";
import React from "react";
import AdminUserInfo from "../components/domain/Admin/AdminUserInfo";
import AdminStats from "../components/domain/Admin/AdminStats";
import Header from "../components/domain/Admin/Header";
import { useState } from "react";

function Admin() {
  const [adminUserPage, SetAdminUserPage] = useState(true);
  const [adminStatsPage, SetStatsAdminPage] = useState(false);

  // const [search, setSearch] = useState("");
  // const onChangeSearch = (e) => {
  //   setSearch(e.target.value);
  // };
  // const onSearch = (e) => {
  //   e.prevntDefault();
  //   (search == null || search == '') ? '' :
  // };
  // 데이터 어디잇냥냥ㅇㅇㅇㅇ...

  return (
    <div className="admin_container">
      <Header title="Admin" />
      <div className="menu_container">
        <div>
          {/* 회원정보 / 통계 메뉴 버튼 */}
          <div className="button_container">
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
          {/* <form onSubmit={(e) => onSearch(e)}>
            <input
              type="text"
              value={search}
              placeholder="메일주소 입력"
              onChange={onChangeSearch}
            />
            <button type="submit">검색</button>
          </form> */}
        </div>
        <AdminUserInfo />
        {/* {adminUserPage == true ? <AdminUserInfo /> : <AdminStats />} */}
      </div>
    </div>
  );
}

export default Admin;
