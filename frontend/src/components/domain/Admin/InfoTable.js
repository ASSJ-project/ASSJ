// coding by 'ikki'
import { getUser } from "@/apis/admin/getUser";
import { useEffect, useState, useReducer } from "react";
import "./Admin.css";

import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";

function InfoTable() {
  const [userData, setUserData] = useState([]); // 받은 유저 데이터
  const [searchData, setSearchData] = useState([]); // 검색을 위한 복제 데이터
  const [pageSize, setpageSize] = useState(0); // 페이지 상태
  const [searchText, setSearchText] = useState(""); // 검색어 (현재는 이름)
  const [page, setPage] = useReducer(pageReducer, 1); // 페이지수 조절을 위한 리듀서
  const [limit, setLimit] = useState(10); // 한 페이지에 보여줄 회원의 수
  const [dataSize, setDataSize] = useState(0); // 현재 받은 리스트 사이즈 limit 사이즈보다 클수 없음

  useEffect(() => {
    const getUserData = async () => {
      const data = await getUser(page, limit);
      setUserData(data.user_list);
      setSearchData(data.user_list);
      setDataSize(data.user_list.length); // 현재 들어온 리스트의 사이즈

      // 전체 페이지 수는 전체 회원수 / 한페이지에 보여줄 수 + 1 에서 소수점을 없앤 수
      setpageSize(Math.floor(data.count / limit + 1));
    };
    getUserData();
  }, [page]); // page 를 바꿀때 마다 렌더링

  const filteredData = (data) => {
    return data.filter((i) => i.userName.includes(searchText));
  };

  // 현재 페이지 수 변경 리듀서
  function pageReducer(state, action) {
    switch (action) {
      case "Increment":
        return state + 1;
      case "Decrement":
        return state - 1;
      default:
        return state;
    }
  }

  // 페이지 action
  const onIncrease = () => {
    if (dataSize < limit) return; // 마지막 페이지 이면 return
    setPage("Increment");
  };
  const onDecrease = () => {
    if (page <= 1) return; // 첫번째 페이지 이면 return
    setPage("Decrement");
  };

  return (
    <div className="user_info_container">
      <div className="search_input_title">
        <div className="search_input_btn_container">
          <input
            className="search_input"
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSearchData(filteredData(userData));
              }
            }}
          ></input>{" "}
          <Button
            className="search_btn"
            variant="contained"
            onClick={() => setSearchData(filteredData(userData))}
          >
            검색
          </Button>
        </div>
        <div className="iconbtn-container">
          <IconButton onClick={onDecrease}>
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          <span id="page-num">
            {page}/{pageSize}
          </span>
          <IconButton onClick={onIncrease}>
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
      <table className="user_table">
        <thead>
          {/* head : id, name, email, adress */}
          <tr className="head_title">
            <th>ID</th>
            <th>이름</th>
            <th>메일</th>
            <th>주소</th>
          </tr>
        </thead>
        <tbody>
          {searchData &&
            searchData.map(({ uuid, userName, userEmail, userAddress }) => (
              <tr key={uuid}>
                <td>{uuid}</td>
                <td>{userName}</td>
                <td>{userEmail}</td>
                <td>{userAddress}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export default InfoTable;
