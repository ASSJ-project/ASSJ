import { useEffect, useState } from "react";

export default function InputBox({ text, inputText = (f) => f }) {
  const [input, setInput] = useState("");
  return (
    <>
      <span>{text} </span>
      <input
        type="text"
        className="input"
        onChange={(e) => {
          setInput(e.target.value);
          inputText(input);
        }}
      />
    </>
  );
}
