// < nav modal 스타일 >

import styled from "styled-components";
import theme from "./../../styles/theme";


// nav modal button

export const NavButton = styled.button`
  font-size: 15px;
  padding: 10px 24px;
  border-radius: 12px;
	font-weight: 700;
  color: ${theme.Black};
  cursor: pointer;
  &:hover {
    background-color: ${theme.Gray10};
  }

	position: relative;
`;

export const AppWrap = styled.div`
  text-align: center;
  margin: 10px auto;
`;


// modal

export const ModalWrap = styled.div`
  width: 200px;
  border-radius: 16px;
	box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
	border: 1px solid ${theme.Gray30};
  background-color: ${theme.Gray10};
  position: absolute;
  top: 240%;
  left: 89%;
  transform: translate(-50%, -50%);
`;

export const Contents = styled.div`
	padding-top: 23px;
	padding-bottom: 13px;
	display: flex;
	gap: 16px;
	flex-direction: column;
  p {
    font-size: 16px;
		color: ${theme.Black};
		letter-spacing: -0.02em;
		font-family: Pretendard;
		text-align: center;
		text-align: center;
		font-weight: 500;
  }

`;


export const Button = styled.button`
	width: 100%;
	height: 40px;
  font-size: 16px;
  padding: 8px 12px;
	color: ${theme.Black};
	letter-spacing: -0.02em;
  &:hover {
    background-color: ${theme.Gray20};
  }
`;