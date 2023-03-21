// coding by 'ikki'
import { BiCaretLeft, BiCaretRight } from "react-icons/bi";
import DatePicker from "react-datepicker";
import Calendar from "./Calendar";
import "./Calendar.css";

function StatsGraph() {
  return (
    <>
      <div className="date">
        <BiCaretLeft />
        <Calendar />
        <BiCaretRight />
      </div>
      <div></div>
    </>
  );
}

export default StatsGraph;
