// < layout 스타일 >

import styled from "styled-components";
import theme from "./../../styles/theme";

// < 스크롤이 있는 nav 아래 container 스타일 >

// export const ScrollContainerWrapper = styled.div`
//   width: 100%;
//   display: flex;
//   margin-top: 64px;
//   margin-left: auto;
//   margin-right: auto;
//   padding-bottom: 200px;
// `;

// < 스크롤이 없는 nav 아래 container 스타일 >

// export const NoneScrollContainerWrapper = styled.div`
//   width: 100%;
//   min-height: calc(100vh - 64px);
//   display: flex;
//   align-items: center;
//   margin: 0 auto;
//   justify-content: center;
// `;

export const NavbarContainer = styled.div`
  max-width: 1440px;
  width: 100%;
  height: 64px;
  padding: 10px 40px;
  font-size: 15px;
  font-weight: 700;
  display: flex;
  position: sticky;
  top: 0;
  z-index: 999;
  justify-content: space-between;
  align-items: center;
  background: ${theme.White};
  .nav-logo {
    background-color: #ff7373;
    width: 110px;
    height: 20px;
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
  border-radius: 12px;
  color: ${theme.Black};
  display: flex;
  padding: 10px 14px;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-weight: 700;
  line-height: 150%; /* 22.5px */
  letter-spacing: -0.3px;
  @media (max-width: 1000px) {
    display: none;
  }
`;

export const NavLoginButtonContainer = styled(NavButton)`
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 0;
  position: relative;
  .profileName {
    color: #000;
    font-size: 18px;
    line-height: 150%;
    letter-spacing: -0.36px;
  }
`;

export const NavProfileBox = styled.div`
  transition: transform 0.2s ease-in-out 0s;
  transform-origin: center top;
  transform: scaleY(${({ isprofileBox }) => (isprofileBox ? "1" : "0")});
  position: absolute;
  top: 50px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  border: 1px solid ${theme.Gray30};
  background: #f8f8f8;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
  width: 150px;
  height: 220px;
  .profileBoxTitle {
    color: #000;
    text-align: center;
    font-size: 16px;
    line-height: 150%; /* 24px */
    letter-spacing: -0.32px;
  }
  .profileBoxItem {
    color: ${theme.Black};
    text-align: center;
    font-size: 16px;
    line-height: 150%; /* 24px */
    letter-spacing: -0.32px;
  }
`;
