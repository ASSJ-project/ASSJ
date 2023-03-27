import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Footer() {
  const FooterContainer = styled.div`
    margin: 0;
    padding: 0;
  `;

  const FooterLinks = styled.div`
    margin: 0 10px;
    border-top: solid 1px #dfe2d5;
  `;

  const LinksLists = styled.ol`
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
  `;

  const LinksList = styled.li`
    padding: 5px 0 0 20px;
    color: #878982;
    font-size: 0.8em;
  `;

  const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
  `;

  return (
    <FooterContainer>
      <FooterLinks>
        <LinksLists>
          <LinksList>© 2023 KOSMO. All rights reserved.</LinksList>
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
        </LinksLists>
      </FooterLinks>
    </FooterContainer>
  );
}

export default Footer;
