// < nav modal 스타일 >

import styled from "styled-components";
import theme from "./../../../../styles/theme";


// nav modal button

export const NavButton = styled.button`
	width: 237px;
  height: 56px;
  border-radius: 35px;
	background-color: ${theme.Brand};
	box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
	border: 1px solid ${theme.BrandLight};
  cursor: pointer;
	display: flex;
  align-items: center;
	justify-content: center;
	gap: 12px;

  &:hover {
    background-color: ${theme.BrandDark};
  }

	img {
		width: 24px;
		height: 24px;
	}

	p {
		font-weight: 500;
		color: ${theme.White};
		font-size: 18px;
		letter-spacing: -0.36px;
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
  background: #00000033;
  z-index: 9999;
`;

export const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

export const ModalWrap = styled.div`
  width: 470px;
  height: 620px;
	margin-bottom: 53px;
  border-radius: 15px;
  background-color: #fff;
	display: flex;
	align-items: center;
	flex-direction: column;
	padding: 24px;
	justify-content: space-between;
`;

export const Header = styled.div`
display: flex;
align-items: center;
justify-content: center;
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

export const SerchArea = styled.div`
	display: flex;
  justify-content: center;
	width: 422px;
`

export const Contents = styled.div`
	display: flex;
  justify-content: center;
	flex-direction: column;
	width: 422px;
	margin-bottom: 10px;
	gap: 8px;
`;

export const CheckboxArea = styled.div`
	display: flex;
  justify-content: center;
	width: 422px;
	height: 60px;
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

export const CloseButton = styled.div`
  float: right;
  width: 47px;
  height: 47px;
  border-radius: 23.5px;
	background-color: ${theme.Gray20};
	display: flex;
	justify-content: center;
	align-items: center;
  cursor: pointer;
  img {
    color: ${theme.Black};
    font-size: 30px;
		width: 17px;
		height: 17px;
  }
`;