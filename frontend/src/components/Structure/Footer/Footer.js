import styled from "styled-components";
import { Link } from "react-router-dom";

const FooterContainer = styled.div`
  margin: 0;
  padding: 0;
`;

const FooterLinks = styled.div`
  margin: 0 10px;
  border-top: solid 1px #dfe2d5;
`;

const LinksLists = styled.ol`
  list-style-type: none;
  margin: 0.8em auto;
  padding: 10px;
`;

const LinksList = styled.li`
  text-align: center;
  margin: 5px auto;
  color: #878982;
  font-size: 0.8em;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterLinks>
        <LinksLists>
          <div>
            <LinksList>© 2023 KOSMO. All rights reserved.</LinksList>
          </div>
          <div
            className="footer_menu"
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <LinksList>
              <StyledLink to="/">개인정보 처리방침</StyledLink>
            </LinksList>
            <LinksList>
              <StyledLink to="/">이용약관</StyledLink>
            </LinksList>
            <LinksList>
              <StyledLink to="/">사이트맵</StyledLink>
            </LinksList>
            <LinksList>
              <StyledLink to="/">회사 세부정보</StyledLink>
            </LinksList>
            <LinksList>
              <StyledLink to="/">고객센터</StyledLink>
            </LinksList>
          </div>
        </LinksLists>
      </FooterLinks>
    </FooterContainer>
  );
}

export default Footer;
