// < nav modal 스타일 >

import styled from "styled-components";
import theme from "./../../styles/theme";


// nav modal button

export const NavButton = styled.button`
	width: 237px;
  height: 56px;
  font-size: 18px;
  padding: 10px 24px;
  border-radius: 35px;
	background-color: ${theme.Brand};
	box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
	border: 1px solid ${theme.BrandLight};
	font-weight: 500;
  color: ${theme.White};
  cursor: pointer;
  &:hover {
    background-color: ${theme.BrandDark};
  }
`;

export const AppWrap = styled.div`
  text-align: center;
  margin: 10px auto;
	width: 100%
	display: flex;
  align-items: center;
  justify-content: center;
`;


// modal

export const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 9999;
`;

export const ModalWrap = styled.div`
  width: 470px;
  height: 583px;
  border-radius: 15px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
	display: flex;
	align-items: center;
	flex-direction: column;
`;

export const Header = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width: 100%;

h1 {
	display: flex;
	justify-content: center;
	font-size: 24px;
	font-weight: 500;
	color: ${theme.Black};
	font-family: Pretendard;
}
`

export const CloseButton = styled.div`
  float: right;
  width: 40px;
  height: 40px;
  margin: 20px;
  cursor: pointer;
  i {
    color: ${theme.Black};
    font-size: 30px;
  }
`;

export const Contents = styled.div`
	display: flex;
  justify-content: center;
	flex-direction: column;
	width: 90%;
	margin-bottom: 10px;
`;
export const Button = styled.button`
  font-size: 14px;
  padding: 10px 20px;
  border: none;
  background-color: #ababab;
  border-radius: 10px;
  color: white;
  font-style: italic;
  font-weight: 200;
  cursor: pointer;
  &:hover {
    background-color: #898989;
  }
`;