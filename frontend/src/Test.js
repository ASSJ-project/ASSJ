import "./test.css";
import InputBox from "./InputBox";
import { useState } from "react";
import { loginDo, registerDo } from "./functions";
export default function Test() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [add, setAdd] = useState("");

  return (
    <>
      <div className="testcontainer">
        <div className="idbox">
          <InputBox text="email" inputText={(email) => setEmail(email)} />
        </div>
        <div className="pwbox">
          <InputBox text="password" inputText={(pw) => setPw(pw)} />
        </div>
        <div className="addressbox">
          <InputBox text="address" inputText={(add) => setAdd(add)} />
        </div>
        <button onClick={() => loginDo(email, pw)}>로그인</button>
        <button onClick={() => registerDo(email, pw, add)}>회원가입</button>
        <p>{email}</p>
        <p>{pw}</p>
        <p>{add}</p>
      </div>
    </>
  );
}
