import logo_img from "../../../assets/images/nuki02.png";
import styled from "styled-components";

// const ImgHeaderContainer = styled.div`
//   width: 479px;
//   min-width: 479px;
//   height: 10vh;
//   margin: 1em auto 1.9em;
//   padding: 0;
//   text-align: center;
// `;

const ImgHeader = styled.img`
  margin: 1em auto 1.9em;
  padding: 0;
  text-align: center;
`;

export default function ImgHeaderContainer() {
  return (
    <>
      <ImgHeader src={logo_img} alt="logo_img" />
    </>
  );
}
