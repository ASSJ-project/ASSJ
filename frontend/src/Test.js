import "./test.css";
import InputBox from "./InputBox";
import { useState } from "react";
import { loginDo } from "./functions";
export default function Test() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  return (
    <>
      <div className="testcontainer">
        <div className="idbox">
          <InputBox text="id" inputText={(id) => setId(id)} />
        </div>
        <div className="pwbox">
          <InputBox text="pw" inputText={(pw) => setPw(pw)} />
        </div>
        <button onClick={() => loginDo(id, pw)}>입력</button>
        <p>{id}</p>
        <p>{pw}</p>
      </div>
    </>
  );
}
