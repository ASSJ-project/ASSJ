// import Address from "./SignupApi/SignupAddress";
import "../components/domain/Register/register.css";
import { postalSeach } from "../components/domain/Register/RegisterApi";
import { useEffect } from "react";

function Register() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    document.head.appendChild(script);
  }, []);
  return (
    <>
      <p class="signuptext">Signup</p>
      <div>
        <p class="text_box">User name</p>
        <input class="total_input" placeholder="   User name" type="text" />
      </div>
      <div>
        <p class="text_box">Email</p>
        <input class="total_input" placeholder="Email Address" type="email" />
      </div>
      <div>
        <p class="text_box">User Address</p>
        <input
          id="address"
          placeholder="User Address"
          onClick={() => postalSeach()}
        />
      </div>
      <div>
        <p class="text_box">Detailed Address</p>
        <input id="address_detail" placeholder="Detailed Address" />
      </div>
      <img src="" />
      <div>
        <p class="text_box">Password</p>
        <input class="total_input" placeholder="Password" type="password" />
      </div>
      <div>
        <p class="text_box">Confirm password</p>
        <input
          class="total_input"
          placeholder="   Confirm password"
          type="password"
        />
      </div>
      <div>
        <button class="Signup-btn">Signup</button>
      </div>
      <div>
        <a href="">
          <p class="Login">
            Already have an account! <span id="login_purple">Login</span>
          </p>
        </a>
      </div>
    </>
  );
}

export default Register;
