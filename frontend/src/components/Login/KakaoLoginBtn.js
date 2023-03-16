import React, { useEffect } from "react";
import KakaoLogin from "react-kakao-login";
import KakaoImg from "../../static/images/kakaobtn.png";

export default function KakaoLoginBtn() {
  const clientId = "5308bfd7191289f8e5ccd2c1224835eb";

  const responseKakao = (response) => {
    console.log(response);
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
