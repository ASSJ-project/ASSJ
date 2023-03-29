import React from "react";
import KakaoLogin from "react-kakao-login";
import KakaoImg from "../../../assets/images/kakaobtn.png";

export default function KakaoLoginBtn() {
  const clientId = "5308bfd7191289f8e5ccd2c1224835eb";

  const responseKakao = (response) => {
    sessionStorage.removeItem("access_token");
    if (response) {
      sessionStorage.setItem("access_token", response.response.access_token);
      window.location.href = "map";
    }
    //차후 refresh token 적용 필요
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
