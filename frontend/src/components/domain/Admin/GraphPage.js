import { BiCaretLeft, BiCaretRight } from "react-icons/bi";
import ReactDatePicker from "./Calendar";
import "./Calendar.css";

function GraphPage() {
  return (
    <div className="graph_container">
      {/* 날짜 (기간) , 달력 */}
      <div className="graph_date">
        <BiCaretLeft />
        <ReactDatePicker />
        <BiCaretRight />
      </div>
      {/* 꺾은선 그래프 */}
      <div></div>
      {/* 일자별 수치 표 */}
      <div></div>
    </div>
  );
}

export default GraphPage;
