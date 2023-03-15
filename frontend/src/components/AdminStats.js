import React from "react";
import "../static/css/Admin.css";
import { useState } from "react";
import Admin from "./Admin";

function AdminStats() {
  const [select, setSelect] = useState("");

  return (
    <>
      <div>
        <ul className="menu">
          <li onClick={() => setSelect("일간")}>일간</li>
          <li onClick={() => setSelect("주간")}>주간</li>
          <li onClick={() => setSelect("월간")}>월간</li>
        </ul>
      </div>
      <div>
        <div className="stats">{select}</div>
      </div>
    </>
  );
}

export default AdminStats;
