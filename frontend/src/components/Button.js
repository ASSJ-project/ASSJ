import React from "react";
import styled from "styled-components";

const Button = ({ type = "button", width, height, onClick, text }) => {
  return (
    <button type={type} width={width} height={height}>
      {text}
    </button>
  );
};

const StyledButton =
  styled.button <
  ButtonType >
  `
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  text: ${(props) => props.text};

  padding: 0.4em;
  background: var(--soft-color);
  border-radius: 20px;
  border: none;
  align-item: center;
`;

export default Button;
