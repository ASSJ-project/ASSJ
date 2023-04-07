import React from "react";
import KakaoLogin from "react-kakao-login";
import KakaoImg from "../../../assets/images/kakaobtn.png";
import { snsLoginDo } from "@/apis/login/sns_login";

export default function KakaoLoginBtn() {
  const clientId = "5308bfd7191289f8e5ccd2c1224835eb";

  const responseKakao = (response) => {
    sessionStorage.removeItem("access_token");
    if (response) {
      snsLoginDo(response.id).then((result) => console.log("결과 :", result));
    }
  };

  return (
    <KakaoLogin
      token={clientId}
      render={(renderProps) => (
        <img
          src={KakaoImg}
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          style={{ marginRight: 10 }}
        />
      )}
      onSuccess={responseKakao}
      onFailure={responseKakao}
    />
  );
}
