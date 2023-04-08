import styled from "styled-components";
import Swal from "sweetalert2";

const FooterContainer = styled.div`
  margin: 0;
  padding: 0;
`;

const FooterLinks = styled.div`
  width: 100%;
  height: 40px;
  margin: 0 auto;
  border-top: solid 1px #dfe2d5;

  @media screen and (max-width: 768px) {
    width: 420px;
    margin: 0 auto;
    border-top: solid 1px #dfe2d5;
  }

  @media screen and (max-width: 480px) {
    width: 350px;
    margin: 0 auto;
    border-top: solid 1px #dfe2d5;
  }
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
  font-size: 0.7em;
`;

const StyledButton = styled.button`
  text-decoration: none;
  color: inherit;
  border: none;
  background-color: white;
`;

const ButtonDiv = styled.div`
  display: flex;
  justifycontent: space-around;
  font-size: 20px;

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }

  @media screen and (max-width: 480px) {
    font-size: 12px;
  }
`;

function Footer() {
  const Customer = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "고객센터는 현재 준비중입니다.",
    });
  };

  const Company = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "회사세부정보는 현재 준비중입니다.",
    });
  };

  const SiteMap = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "사이트맵은 현재 준비중입니다.",
    });
  };

  const Kosmo = () => {
    Swal.fire({
      icon: "info",
      title: "알쓸신잡",
      text: "© 2023 KOSMO. All rights reserved.",
    });
  };

  const Terms = () => {
    Swal.fire({
      title: "이용약관",
      text: "본 페이지에서는 본 웹사이트(이하 “사이트”)의 이용에 관하여 적용되는 이용 약관을 설명 합니다. 본 사이트를 이용하실 경우, 본 이용약관을 상세하게 확인하시기 바랍니다."
    });
  };


  const Privacy = () => {
    Swal.fire({
      title: "개인정보 처리방침",
      text:"알쓸신잡 코스모는 개인정보보호법을 준수하며, 관련 법령에 의거한 개인정보처리방침을 정하여 이용자 권익 보호에 최선을 다하고 있습니다.",
    })
  }

  return (
    <FooterContainer>
      <FooterLinks>
        <ButtonLists>
          <ButtonDiv>
            <ButtonList>
              <StyledButton onClick={Privacy}>개인정보 처리방침</StyledButton>
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
            <ButtonList onClick={Kosmo}>
              © 2023 KOSMO. All rights reserved.
            </ButtonList>
          </div>
        </ButtonLists>
      </FooterLinks>
    </FooterContainer>
  );
}

export default Footer;
