// < layout 스타일 >

import styled from "styled-components";
import theme from "./../../styles/theme";

export const NavSection = styled.div`
  width: 100%;
  position: ${({ isHomePage }) => (isHomePage ? "fixed" : "sticky")};
  top: 0;
  max-width: 1920px;
  z-index: 1000;

  #navbar {
    width: 100%;
    height: 64px;
    display: flex;
    padding: 0 calc((100% - 1440px) / 2);
    justify-content: space-between;
    align-items: center;
    background-color: ${({ isHomePage }) =>
      isHomePage ? "transparent" : theme.Neutral0};
    transition: background-color 0.5s ease; // 스크롤할 때 부드럽게 색 변화
    backdrop-filter: ${({ isLoginModal, isCancleModal, isRecommend }) =>
      isLoginModal || isCancleModal || isRecommend ? "none" : "blur(4px)"};
    .nav-logo {
      width: 93px;
      cursor: pointer;
    }
  }

  #navbar.fixed {
    background-color: ${theme.Neutral0};
  }
`;

export const NavLink = styled.div`
  display: flex;
  gap: 24px;
`;

export const NavTextContainer = styled.div`
  display: flex;
  gap: 8px;
  .fa-bars {
    display: none;
    align-items: center;
    font-size: 25px;
    cursor: pointer;
    @media (max-width: 1000px) {
      display: flex;
    }
  }
`;

export const NavButton = styled.button`
  color: ${theme.Neutral990};
  display: flex;
  padding: 10px 14px;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  line-height: 150%; /* 22.5px */
  letter-spacing: -0.3px;
  @media (max-width: 1000px) {
    display: none;
  }
  border-radius: 12px;
  // 그냥 아예 class를 추가하는 게 나을라나?
  &:hover {
    background-color: ${theme.Neutral200};
  }
`;

export const NavLoginButton = styled(NavButton)`
  background-color: ${({ isScrolled }) =>
    isScrolled ? theme.BrandLight : "#E5F4FF80"};
  color: ${theme.Brand600};
  padding: 10px 24px;
  display: block;
  border-radius: 8px;
`;
export const navbar = styled.div`
  .likes__wrapper {
    display: flex;
    align-content: center;
    justify-content: center;
  }

  .likes__relavance {
    position: relative;
    padding: 0 80px;
  }

  .likes__list {
    position: absolute;
    box-sizing: border-box;
    overflow-y: scroll;
    max-height: 150px;
    left: 0%;
    background: ${theme.Neutral0};
    padding: 10px;
    border: 1px solid grey;
    box-shadow: 0 0 2px 2px grey;
  }
`;
