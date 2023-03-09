import logintext from "./static/login-text.png";
import "./stylesheets/login.css";

function LoginPage() {
  return (
    <>
      <p class="logintext">Login</p>
      <div>
        <p class="id-text">Email</p>
        <input class="id-input" placeholder="   Email Address" />
      </div>
      <img src="" />
      <div>
        <p class="pw-text">Password</p>
        <input class="pw-input" placeholder="   Password" />
      </div>
      <div class="onoff-switch-container">
        <input type="checkbox" name="onoff-switch" id="onoff-switch1" />
        <label for="onoff-switch1"></label>
        <span class="toggle-text">Remember me</span>
        <a>forgot password?</a>
      </div>
      <div>
      <button class="login-btn">Login</button>
    </div>
    
    <div class="api-btn">
      <button></button>
      <button></button>
      <button></button>
    </div>

    <div class="signup-div">
      <p>Don't have an account? <span class="signup"> Sign up</span></p>
    </div>
    </>
  );
}

export default LoginPage;
