import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import "./Calendar.css";

const ReactDatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      className="date_picker"
      selected={startDate}
      dateFormat={"  yyyy년  MM월  dd일"}
      onChange={(date) => setStartDate(date)}
      locale={ko} // 한글화 ( 상단 import )
      popperModifiers={{
        // 모바일 웹 화면에서 벗어나지 않게 함
        preventOverflow: { enabled: true },
      }}
      popperPlacement="auto" // 달력을 중앙에 띄움
    />
  );
};

// () => {
//   const [startDate, setStartDate] = useState(new Date());
//   return (
//     <DatePicker
//       className="date_picker"
//       selected={startDate}
//       dateFormat={"  yyyy년  MM월  dd일"}
//       onChange={(date) => setStartDate(date)}
//       locale={ko} // 한글화 ( 상단 import )
//       popperModifiers={{
//         // 모바일 웹 화면에서 벗어나지 않게 함
//         preventOverflow: { enabled: true },
//       }}
//       popperPlacement="auto" // 달력을 중앙에 띄움
//     />
//   );
// };

export default ReactDatePicker;
