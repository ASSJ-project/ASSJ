import "../static/css/LoginPage.css";
import googlebtn from "../static/images/googlebtn.png"
import applebtn from "../static/images/applebtn.png"
import facebookbtn from "../static/images/facebookbtn.png"
import KakaoLogin from "./LoginApi/KakaoLogin";

function LoginPage() {
  return (
    <>
    
    <div class="container">

      <p class="logintext">Login</p>
      <div class="id-container">
        <p class="id-text">Email</p>
        <input class="id-input" placeholder="   Email Address" />
      </div>

      <div class="pw-container">
        <p class="pw-text">Password</p>
        <input class="pw-input" placeholder="   Password" />
      </div>
      <div class="onoff-switch-container">
        <input type="checkbox" name="onoff-switch" id="onoff-switch1" />
        <label for="onoff-switch1"></label>
        <span class="toggle-text">Remember me</span>
        <a class="find-pw">forgot password?</a>
      </div>
      <div>
      <button class="login-btn">Login</button>
      </div>
      
      <div class="api-btn">
        <button><img src={googlebtn}></img></button>
        <button><img src={applebtn}></img></button>
        <button onClick={KakaoLogin}><img src={facebookbtn}></img></button>
      </div>

      <div class="signup-div">
        <p>Don't have an account? <span><a class="signup-btn"> Sign up</a></span></p>
      </div>
    </div>
    </>
  );
}

export default LoginPage;
