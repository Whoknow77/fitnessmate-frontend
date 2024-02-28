// < nav modal 스타일 >

import styled from "styled-components";
import theme from "./../../styles/theme";

// nav modal button

export const NavButton = styled.button`
  font-size: 18px;
  padding: 10px 24px;
  border-radius: 12px;
  font-weight: 700;
  color: ${theme.Brand};
  cursor: pointer;
  &:hover {
    background-color: ${theme.Gray10};
  }
`;

export const AppWrap = styled.div`
  text-align: center;
	position: relative;
`;

// modal

export const ModalWrap = styled.div`
  width: 200px;
	height: 220px;
  border-radius: 16px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid ${theme.Gray30};
  background-color: ${theme.Gray10};
  position: absolute;
  top: 57px;
  left: -11px;
`;

export const Contents = styled.div`
  padding-top: 23px;
  padding-bottom: 13px;
  display: flex;
  gap: 16px;
  flex-direction: column;
  p {
    font-size: 16px;
    color: #000;
    letter-spacing: -0.02em;
    font-family: Pretendard;
    text-align: center;
    text-align: center;
    font-weight: 500;
		font-size: 16px;
		letter-spacing: -0.02em;
  }
	.modalButton {
		display: flex;
		flex-direction: column;
		gap: 1px;
	}
`;

export const Button = styled.button`
  width: 100%;
  height: 40px;
  font-size: 16px;
  padding: 8px 12px;
  color: ${theme.Black};
  letter-spacing: -0.02em;
	background-color: ${theme.White};
  &:hover {
    background-color: ${theme.Gray20};
  }
`;
