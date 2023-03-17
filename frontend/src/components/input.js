import React from "react";
import styled from "styled-components";

const Input = styled.input`    
  width: 100%;
  left: 3em;
  border: 0;
  height: 120px;
  background: #d8d8dd;
  border-radius: 20px;
  font-size: 2em;
  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
  padding-left: 30px; 
  `

const inputprops = (props) => {
    return(
    <>
        <Input placeholder={props.placeholder} type={props.type} />
    </>
    )
}

export default inputprops

 

