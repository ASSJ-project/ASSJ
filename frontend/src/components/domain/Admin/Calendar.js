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
      locale={ko}
      popperModifiers={{
        preventOverflow: { enabled: true },
      }}
      popperPlacement="auto"
    />
  );
};

export default ReactDatePicker;
