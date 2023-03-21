import React from "react";
import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  height: 40%;
  border: none;
  background: #d8d8dd;
  border-radius: 10px;
  font-size: 1.1em;
  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
`;

const inputprops = ({ placeholder, type, inputText = (f) => f }) => (
  <>
    <Input
      placeholder={placeholder}
      type={type}
      onChange={(e) => {
        inputText(e.target.value);
      }}
    />
  </>
);

export default inputprops;
