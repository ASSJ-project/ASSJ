// coding by 'ikki'
import React from "react";
import "./Admin.css";
import UserInfo from "./UserInfo";

function AdminUserInfo() {
  return (
    <>
      <div className="info_container">
        <UserInfo />
        <UserInfo />
        <UserInfo />
      </div>
    </>
  );
}

export default AdminUserInfo;
