import React, { useEffect } from "react";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import GoogleImg from "../../../assets/images/googlebtn.png";
import { snsLoginDo } from "@/apis/login/sns_login";

import "@/components/domain/Login/LoginPage.css";

export default function GoogleLoginBtn() {
  const clientId =
    "425382057029-f821f5ddsd40pnji9uvpj3u1ndipaoq1.apps.googleusercontent.com";

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId: clientId });
    });
  }, []);

  const responseGoogle = (response) => {
    if (response) {
      snsLoginDo(response.googleId).then((result) => {
        if (!result) sessionStorage.setItem("sns_inDB", result);
      });
    }
  };

  return (
    <GoogleLogin
      clientId={clientId}
      render={(renderProps) => (
        <img
          src={GoogleImg}
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          style={{ marginRight: 10 }}
        />
      )}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
    />
  );
}
