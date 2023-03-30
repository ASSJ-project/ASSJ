// coding by 'ikki'
import { getUser } from "@/apis/admin/getUser";
import { useEffect, useState } from "react";
import "./Admin.css";

import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

function InfoTable() {
  const [userData, setUserData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    const getUserData = async () => {
      const data = await getUser();
      setUserData(data);
      setSearchData(data);
    };
    getUserData();
  }, []);

  const filteredData = (data) => {
    return data.filter((i) => i.userName.includes(searchText));
  };

  return (
    <div className="user_info_container">
      <div className="search_input_btn">
        <input
          className="search_input"
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
        ></input>{" "}
        <Button
          className="search_btn"
          onClick={() => setSearchData(filteredData(userData))}
        >
          검색
        </Button>
        <Button className="user_delete_btn" variant="contained">
          삭제
        </Button>
      </div>
      <table className="user_table">
        <thead>
          {/* head : id, name, email, adress */}
          <tr className="head_title">
            <th>ID</th>
            <th>이름</th>
            <th>메일</th>
            <th>주소</th>
            <th>선택</th>
          </tr>
        </thead>
        <tbody>
          {searchData.map(({ uuid, userName, userEmail, userAddress }) => (
            <tr key={uuid}>
              <td>{uuid}</td>
              <td>{userName}</td>
              <td>{userEmail}</td>
              <td>{userAddress}</td>
              <td>
                <Checkbox />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default InfoTable;
