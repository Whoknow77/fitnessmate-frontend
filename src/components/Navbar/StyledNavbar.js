// < layout 스타일 >

import styled from "styled-components";
import theme from "./../../styles/theme";

export const NavSection = styled.div`
	width: 100%;
	position: ${({ isHomePage }) => isHomePage ? 'fixed' : 'sticky'};
	top: 0;
	max-width: 1920px;
	z-index: 999;

	#navbar {
		width: 100%;
		height: 64px;
		display: flex;
		padding: 0 calc((100% - 1440px) / 2);
		justify-content: space-between;
		align-items: center;
		background-color: ${({ isHomePage }) => isHomePage ? 'transparent' : '#FFFFFF'};
		transition: background-color 0.5s ease; // 스크롤할 때 부드럽게 색 변화
		backdrop-filter: ${({ isLoginModal, isCancleModal, isRecommend }) =>
		isLoginModal || isCancleModal || isRecommend ? "none" : "blur(4px)"};
		.nav-logo {
			width: 93px;
			cursor: pointer;
		}
	}

	#navbar.fixed {
		background-color: #FFFFFF;
	}
`

export const NavbarContainer = styled.div`
	#navbar {
		position: ${({ isHomePage }) => isHomePage ? 'fixed' : 'sticky'};
		top: 0;
		max-width: 1920px;width: 100%;
		z-index: 999;
		height: 64px;
		display: flex;
		padding: 0 calc((100% - 1440px) / 2);
		justify-content: space-between;
		align-items: center;
		background-color: ${({ isHomePage }) => isHomePage ? 'transparent' : '#FFFFFF'};
		transition: all ${theme.White} ease-in; // 스크롤링할 때 자연스럽게 색이 입혀지도록 애니메이션추가
		backdrop-filter: ${({ isLoginModal, isCancleModal, isRecommend }) =>
		isLoginModal || isCancleModal || isRecommend ? "none" : "blur(4px)"};
		.nav-logo {
			width: 93px;
			cursor: pointer;
		}
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
  color: ${theme.Black};
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
    background-color: #F2F4F670;
  }
`;

export const NavLoginButton = styled(NavButton)`
	background-color: ${({ isScrolled }) => isScrolled ? '#E5F4FF' : '#E5F4FF80'};
	color: ${theme.Brand};
  padding: 10px 24px;
  display: block;
  border-radius: 5px;
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
    background: white;
    padding: 10px;
    border: 1px solid grey;
    box-shadow: 0 0 2px 2px grey;
  }
`;