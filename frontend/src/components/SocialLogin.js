import NaverLogin from "react-naver-login";
import KakaoLogin from "react-kakao-login";
import GoogleLogin from "react-google-login";
import GoogleImg from "../static/images/googlebtn.png";
import NaverImg from "../static/images/naverbtn.png";
import KakaoImg from "../static/images/kakaobtn.png";

export default function SocialLogin() {
  const _clickSnsLoginKakao = (e) => {
    let kakaoid = e.profile.id; // 카카오에서 제공한 ID
  };
  const _clickSnsLoginNaver = (e) => {
    let naverid = e.id; // 네이버에서 제공한 ID
  };
  const _clickSnsLoginGoogle = (e) => {
    let googleid = e.Ft.NT; // 구글에서 제공한 ID
  };

  return (
    <>
      <GoogleLogin
        clientId={
          "1002547614037-1v1oe3v7oh13dfpv3hh7b6culcf46e2s.apps.googleusercontent.com"
        }
        render={(renderProps) => (
          <img
            src={GoogleImg}
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            style={{ marginRight: 10 }}
          />
        )}
        onSuccess={(e) => _clickSnsLoginGoogle(e)}
        onFailure={console.log}
        cookiePolicy={"single_host_origin"}
      />

      <KakaoLogin
        token={"86721e61827aeb8e34d2fe1de5812eca"}
        render={(renderProps) => (
          <img
            src={KakaoImg}
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            style={{ marginRight: 10 }}
          />
        )}
        onSuccess={(e) => _clickSnsLoginKakao(e)}
        onFail={console.error}
        onLogout={console.info}
      />

      <NaverLogin
        clientID={"Y5zyEYtILlNk1RvdxNa9"}
        callbackUrl="http://www.localhost:3000/"
        render={(renderProps) => (
          <img
            src={NaverImg}
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            style={{ marginRight: 10 }}
          />
        )}
        onSuccess={(e) => _clickSnsLoginNaver(e)}
        onFailure={(result) => console.error(result)}
      />
    </>
  );
}
