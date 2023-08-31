// < nav modal 스타일 >

import styled from "styled-components";
import theme from "./../../../../styles/theme";


// nav modal button

export const NavButton = styled.button`
	width: 109px;
  height: 48px;
  border-radius: 6px;
	background-color: ${theme.BrandLighter};
	box-shadow: 0px 4px 8px #0000000d;
  cursor: pointer;
	display: flex;
  align-items: center;
	justify-content: center;
	gap: 10px;

	img {
		width: 28px;
		height: 28px;
	}

	p {
		font-weight: 500;
		color: ${theme.Brand};
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
	flex-direction: column;
	width: 100%;
	margin-bottom: 32px;

h1 {
	display: flex;
	justify-content: center;
	font-size: 24px;
	font-weight: 500;
	color: ${theme.Black};
	font-family: Pretendard;
	margin-bottom: 32px;
}

span {
	color: ${theme.BrandMid};
	font-size: 16px;
	font-weight: 500;
	width: 100%;
	display: flex;
	justify-content: start;
	margin-bottom: 8px;
}
`


export const Contents = styled.div`
	display: flex;
  justify-content: center;
	flex-direction: column;
	width: 422px;
	margin-bottom: 10px;
	gap: 14px;

	div {
		display: flex;
		align-items: center;
		background-color: ${theme.Gray10};
		border: 1px solid ${theme.Gray20};
		border-radius: 10px;
		gap: 14px;
		height: 56px;
		padding: 14px;
	}

	p {
		font-size: 18px;
		font-weight: 500;
		width: 368px;
		display: flex;
		justify-content: start;
		cursor: pointer;
	}

	img {
		cursor: pointer;
	}

	input {
		font-size: 18px;
		font-weight: 500;
		width: 368px;
		display: flex;
	}
`;

export const AddButton = styled.button`
  height: 34px;
	width: 34px;
	border-radius: 8px;
	background-color: ${theme.BrandLighter};
	display: flex;
	justify-content: center;
	align-items: center;
	img {
		height: 14px;
		width: 14px;
	}
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