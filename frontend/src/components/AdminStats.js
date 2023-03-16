import React from "react";
import "../static/css/Admin.css";
import { useState } from "react";
import Admin from "./Admin";

function AdminStats() {
  return (
    <>
      <div className="null">
        <br />
      </div>
      <div>
        {/* 일간 주간 월간 라디오박스 생성-> 버튼처럼 보이도록'ㅅ'  */}
        <form className="radio_box">
          <input
            type="radio"
            id="day"
            name="stats_slt"
            value="day"
            defaultChecked="checked"
          />
          <label htmlFor="day" className="radio">
            일간
          </label>
          <input type="radio" id="week" name="stats_slt" value="week" />
          <label htmlFor="week" className="radio">
            주간
          </label>
          <input type="radio" id="month" name="stats_slt" value="month" />
          <label htmlFor="month" className="radio">
            일간
          </label>
        </form>
      </div>
      <div></div>
    </>
  );
}

export default AdminStats;
