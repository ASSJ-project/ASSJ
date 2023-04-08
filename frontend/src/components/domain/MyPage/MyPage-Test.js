import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import "../MyPage/MyPage-Test.css";
import { deleteUser } from "@/apis/resign/resign";
//
//나의 정보를 눌렀을 때 나오는 페이지입니다.
const MyPageTest = (data) => {
  const [isSocial, setIsSocial] = useState(""); // 소셜인지 확인하기 위함
  const [isLogin, setIsLogin] = useState(""); //로그인 상태인지 확인하기 위함
  const [isDelete, setIsDelete] = useState(false);
  const [yesDelete, setYesDelete] = useState(true);
  const [pw, setPw] = useState("");
  const [resignSuccess, setResignSuccess] = useState(false);

  useEffect(() => {
    setIsSocial(sessionStorage.getItem("role")); // 로컬에 있는 role 값 가져옴
    setIsLogin(sessionStorage.getItem("login")); // 로컬에 있는 login값 가져옴
  }, []);

  const MypageboxInfo = ({ data, name }) => {
    return (
      <div className="MyPagebox-Info">
        <p style={{ marginLeft: "15px" }}>{name}</p>
        {isLogin ? (
          isSocial === "ROLE_SNS" ? (
            <p style={{ marginRight: "15px" }}>소셜은 이용 불가합니다.</p>
          ) : (
            <p style={{ marginRight: "15px" }}>{data}</p>
          )
        ) : (
          <p style={{ marginRight: "15px" }}>로그인이 필요합니다. </p>
        )}
      </div>
    );
  };

  const mypagedelete = () => {
    isLogin
      ? isSocial === "ROLE_SNS"
        ? alert("소셜은 이용 불가능합니다.")
        : setIsDelete(true)
      : alert("로그인 후 이용 가능합니다");
  };

  const mypagenodelete = () => {
    setIsDelete(false);
    setYesDelete(true);
  };

  const onPasswordChange = (e) => {
    setPw(e.target.value);
  };

  const Woo = () => {
    if (pw !== 1234) {
      alert("비밀번호를 확인해주세요");
    } else {
      alert("탈퇴완료되었습니다.");
    }
  };

  return (
    <div className="MyPagebox">
      <MypageboxInfo data={data["data"].userName} name={"이름"} />
      <MypageboxInfo data={data["data"].userEmail} name={"이메일"} />
      <MypageboxInfo data={data["data"].userAddress} name={"주소"} />
      <Button
        variant="contained"
        style={{ marginTop: "10px", fontSize: "20px" }}
        onClick={() => {
          isSocial === "ROLE_SNS"
            ? alert("이용 불가능 합니다")
            : (window.location.href = "findpassword");
        }}
      >
        {isLogin ? "비밀번호 수정" : "비밀번호 찾기"}
      </Button>
      {!isDelete ? (
        <Button
          variant="contained"
          style={{ marginTop: "10px", fontSize: "20px" }}
          onClick={mypagedelete}
        >
          회원탈퇴
        </Button>
      ) : (
        <Button
          variant="contained"
          style={{ marginTop: "10px", fontSize: "20px" }}
          onClick={mypagenodelete}
        >
          취소
        </Button>
      )}
      {yesDelete ? (
        <div className={isDelete ? "MyPagebox-delete" : "MyPagebox-none"}>
          <p>
            회원탈퇴시 복구 불가능합니다.
            <br />
            정말 탈퇴하시겠습니까?
          </p>
          <Button
            variant="contained"
            style={{ fontSize: "20px" }}
            onClick={() => {
              setYesDelete(false);
            }}
          >
            네, 탈퇴하겠습니다.
          </Button>
        </div>
      ) : (
        <div className="MyPagebox-delete">
          <input
            placeholder="비밀번호를 입력해주세요"
            type="password"
            onChange={onPasswordChange}
            className="MyPage-Input"
          ></input>
          <Button
            variant="contained"
            style={{ marginTop: "10px", fontSize: "20px" }}
            onClick={() => {
              deleteUser(data["data"].userEmail, pw).then((result) => {
                setResignSuccess(result);
              });
            }}
          >
            탈퇴
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyPageTest;
