// coding by 'ikki'
import React from "react";
import DatePicker from "react-datepicker";
import "./Admin.css";
import GraphPage from "./GraphPage";

function AdminStats() {
  return (
    <>
      <div>
        {/* 일간 주간 월간 라디오박스 생성-> 버튼처럼 보이도록'ㅅ'  */}
        <form className="stats_radio_box">
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
            월간
          </label>
        </form>
      </div>
      <div>
        <div className="stats_container">
          <GraphPage />
        </div>
      </div>
    </>
  );
}

export default AdminStats;
