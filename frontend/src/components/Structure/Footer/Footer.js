import styled from "styled-components";
import Swal from "sweetalert2";

const FooterContainer = styled.div`
  margin: 0;
  padding: 0;
`;

const FooterLinks = styled.div`
  margin: 0 10px;
  border-top: solid 1px #dfe2d5;
`;

const ButtonLists = styled.ol`
  list-style-type: none;
  margin: 0.8em auto;
  padding: 10px;
`;

const ButtonList = styled.li`
  text-align: center;
  margin: 5px auto;
  color: #878982;
  font-size: 0.8em;
`;

const StyledButton = styled.button`
  text-decoration: none;
  color: inherit;
  border : none;
  background-color: white;
`;

const ButtonDiv = styled.div`
  display: flex; 
  justifyContent: space-around;
  font-size:20px;

  @media screen and (max-width: 768px){
    font-size: 16px;
  }

  @media screen and (max-width: 480px){
    font-size: 12px;
  }
`

function Footer() {

  const Customer = () =>{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: '고객센터는 현재 준비중입니다.',
    })
  }

  const Company = () =>{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: '회사세부정보는 현재 준비중입니다.',
    })
  }

  const SiteMap = () =>{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: '사이트맵은 현재 준비중입니다.',
    })
  }

  const Kosmo = () =>{
    Swal.fire({
      icon: 'info',
      title: '알쓸신잡',
      text: '© 2023 KOSMO. All rights reserved.'
    })
  }

  const Terms = () => {
    Swal.fire({
      title: "이용약관",
      text : "본 약관은 알쓸신잡이 운영하는 국가통계포털(KOSIS), 마 이크로데이터서비스(MDIS), 지표누리(구 e-나라지표, 구 국가주요지표), 통계지리정보서비스(SGIS+plus),<br/>통계데이터센터의 통계정보 사이트에서 제공하는 모든 서비스(이하 “서비스”)의 이용조건 및 절차, 이용자와 각 사이트의 권리, 의무, 책임사항과 기타 필요한"
    })
  }

  return (
    <FooterContainer>
      <FooterLinks>
        <ButtonLists>
          
          <ButtonDiv>
            <ButtonList>
              <StyledButton>개인정보 처리방침</StyledButton>
            </ButtonList>
            <ButtonList>
              <StyledButton onClick={Terms}>이용약관</StyledButton>
            </ButtonList>
            <ButtonList>
              <StyledButton onClick={SiteMap}>사이트맵</StyledButton>
            </ButtonList>
            <ButtonList>
             <StyledButton onClick={Company}>회사 세부정보</StyledButton>
            </ButtonList>
            <ButtonList>
              <StyledButton onClick={Customer}>고객센터</StyledButton>
            </ButtonList>
          </ButtonDiv>
          <div>
            <ButtonList onClick={Kosmo}>© 2023 KOSMO. All rights reserved.</ButtonList>
          </div>
        </ButtonLists>
      </FooterLinks>
    </FooterContainer>
  );
}

export default Footer;
