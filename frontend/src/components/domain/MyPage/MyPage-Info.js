import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import "../MyPage/MyPage-Info.css";
import { deleteUser } from "@/apis/resign/resign";
import Swal from "sweetalert2"; // alert 꾸미기 위해 import 함

//나의 정보를 눌렀을 때 나오는 페이지입니다.
const MyPageTest = (data) => {
  const [isSocial, setIsSocial] = useState(""); // 소셜인지 확인하기 위한 State
  const [isLogin, setIsLogin] = useState(""); //로그인 상태인지 확인하기 위한 State
  const [isDelete, setIsDelete] = useState(false); // 회원탈퇴 누르면 네,탈퇴하겠습니다 생성을 위한 State
  const [yesDelete, setYesDelete] = useState(true); // 정말 삭제할건지 확인하기 위한 State
  const [pw, setPw] = useState(""); // 비밀번호를 입력해주세요 input 값을 가져오기 위한 State

  useEffect(() => {
    setIsSocial(sessionStorage.getItem("role")); // 로컬에 있는 role 값 가져옴 => sns유저인지 일반유저인지 admin유저인지 알기위함
    setIsLogin(sessionStorage.getItem("login")); // 로컬에 있는 login값 가져옴 => login 상태인지 아닌지 알기 위함
  }, []);

  const MypageboxInfo = ({ data, name }) => {
    // 이름 이메일 주소를 담기위한 컴포넌트
    return (
      <div className="MyPagebox-Info">
        <p style={{ color: "var(--text-color)" }}>
          <b>{name}</b>
        </p>
        {isLogin ? (
          isSocial === "ROLE_SNS" ? (
            <p style={{ marginRight: "15px", padding: "1em" }}>
              소셜로그인 회원은 이용할 수 없습니다.
            </p>
          ) : (
            <p>{data}</p>
          )
        ) : (
          <p>로그인이 필요합니다. </p>
        )}
      </div>
    );
  };

  const mypagedelete = () => {
    // 회원탈퇴 눌렀을 때 실행되는 onclick 이벤트입니다
    setIsDelete(true);
  };

  const mypagenodelete = () => {
    // 회원탈퇴 누르면 생기는 취수버튼을 눌렀을 때 실행되는 onclick 이벤트입니다
    setIsDelete(false);
    setYesDelete(true);
  };

  const onPasswordChange = (e) => {
    // 비밀번호 입력할때 값을 가져오기 위해 만든 onchage 이벤트입니다.
    setPw(e.target.value);
  };

  return (
    <div className="MyPagebox">
      <MypageboxInfo data={data["data"].userName} name={"이름"} />
      <MypageboxInfo data={data["data"].userEmail} name={"이메일"} />
      <MypageboxInfo data={data["data"].userAddress} name={"주소"} />

      {isSocial === "ROLE_SNS" ? (
        <div className="MyPagebox-none"></div>
      ) : (
        <Button
          variant="contained"
          style={{ marginTop: "10px", fontSize: "20px" }}
          onClick={() => {
            window.location.href = "findpassword";
          }}
        >
          {isLogin ? "비밀번호 수정" : "비밀번호 찾기"}
        </Button>
      )}

      {!isLogin || isSocial === "ROLE_SNS" ? (
        <div className="MyPagebox-none"></div>
      ) : !isDelete ? (
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
            회원 탈퇴 시 복구가 불가능합니다.
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
                if (result === true) {
                  Swal.fire({
                    icon: "success",
                    text: "정상적으로 회원 탈퇴되었습니다.",
                  }).then(function () {
                    sessionStorage.clear();
                    window.location.href = "/";
                  });
                } else {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "비밀번호 확인바랍니다.",
                  });
                }
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
