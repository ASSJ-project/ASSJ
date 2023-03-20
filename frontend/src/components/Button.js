import React, { useState } from "react";
import styled from "styled-components";

const StyleButton = styled.button`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  text: ${(props) => props.text};
  onclick: ${(props) => props.onClick};
  classname: ${(props) => props.className};

  padding: 0.4em;
  background: #e2dff8;
  border-radius: 20px;
  border: none;
  align-item: center;

  &:onclick {
    background: #9588e0;
    color: #000;
  }
`;

function Button(props) {
  return (
    <>
      <StyleButton width={props.width} height={props.height}>
        {props.text}
      </StyleButton>
    </>
  );
}

export default Button;
