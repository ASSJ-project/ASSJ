import "../static/css/Admin.css";
import frame from "../static/images/Error-Frame1.png";
import { Link } from "react-router-dom";
import React from "react";
import AdminMemberInfo from "./AdminMemberInfo";
import title_img from "../static/images/title-nuki.png";
import { FiMenu } from "react-icons/fi";
import { BiHomeHeart } from "react-icons/bi";
import { useState } from "react";
import AdminStats from "./AdminStats";

function Admin() {
  const [adminMemberPage, SetAdminMemberPage] = useState(true);
  const [adminStatsPage, SetStatsAdminPage] = useState(false);

  return (
    <>
      <div className="container">
        {/* 햄버거 메뉴아이콘, 타이틀 */}
        <div className="header">
          <FiMenu />
          <Link to="/">
            <img id="title_img" src={title_img} alt="title_img" />
            <BiHomeHeart className="home_icon" />
          </Link>
        </div>
        <div>
          <div className="admin-title">&nbsp;&nbsp;Admin</div>

          {/* 회원정보 / 통계 메뉴 버튼 */}
          <div>
            <button
              style={{
                backgroundColor: adminMemberPage
                  ? "var(--main-color)"
                  : "var(--soft-color)",
              }}
              className="admin_btn"
              onClick={() => (
                SetAdminMemberPage(true), SetStatsAdminPage(false)
              )}
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
              onClick={() => (
                SetAdminMemberPage(false), SetStatsAdminPage(true)
              )}
            >
              통계
            </button>
          </div>
        </div>
        {adminMemberPage == true ? <AdminMemberInfo /> : <AdminStats />}
      </div>
    </>
  );
}

export default Admin;
