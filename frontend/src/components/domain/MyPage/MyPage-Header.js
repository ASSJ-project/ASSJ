import { useState } from "react";
import { ToggleButtonGroup } from "@mui/material";
import { ToggleButton } from "@mui/material";
import "./MyPage.css";

export default function MyPageHeader(props) {
  const [alignment, setAlignment] = useState("my-info");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  //나의 정보 클릭시 Mypage-info 보이도록
  const mypage1 = () => {
    props.getMyPage1(false);
  };

  //최근 조회 클릭시 MyPage-Check 보이도록
  const mypage2 = () => {
    props.getMyPage2(true);
  };

  return (
    <>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        style={{ width: "100%", marginTop: "10px" }}
      >
        <ToggleButton
          value="my-info"
          onClick={mypage1}
          style={{ width: "50%" }}
        >
          <h2 className="mypage_header-menu">나의 정보</h2>
        </ToggleButton>
        <ToggleButton
          value="my-check"
          onClick={mypage2}
          style={{ width: "50%" }}
        >
          <h2 className="mypage_header-menu">최근 조회 기록</h2>
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}
