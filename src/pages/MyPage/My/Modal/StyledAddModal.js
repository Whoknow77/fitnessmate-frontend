// < nav modal 스타일 >

import styled from "styled-components";
import theme from "./../../../../styles/theme";


export const AppWrap = styled.div`
  text-align: center;
  margin: 10px auto;
	width: 100%
	display: flex;
  align-items: center;
  justify-content: center;
`;

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
`

export const ModalTitle = styled.div`

	display: grid;
  grid-template-columns: 24px 1fr 24px;
  grid-template-rows: 24px;
	width: 100%;
	margin-bottom: 32px;

h1 {
	grid-column: 2;
	display: flex;
	justify-content: center;
	font-size: 24px;
	font-weight: 500;
	color: ${theme.Black};
	font-family: Pretendard;
	margin-bottom: 32px;
}
`;

export const CloseButton = styled.div`
	grid-column: 3;
  border-radius: 23.5px;
	display: flex;
	justify-content: center;
	align-items: center;
  cursor: pointer;
  img {
    color: ${theme.Black};
    font-size: 30px;
		width: 17px;
		height: 17px;

		&:hover {
			opacity: 0.5;
		}
  }
`;

export const SerchArea = styled.div`
	display: flex;
  justify-content: center;
	width: 422px;
`

export const Contents = styled.div`
	display: flex;
  justify-content: center;
	width: 422px;
	height: 332px;
	margin-bottom: 10px;
	gap: 8px;

	.ScrollArea {
		overflow: auto; // 필요할 때만 스크롤 영역 생김
	}
	.ScrollArea::-webkit-scrollbar {
		width: 35px;
	}
	.ScrollArea::-webkit-scrollbar-track {
		background: ${({ theme }) => theme.White};
	}
	.ScrollArea::-webkit-scrollbar-thumb {
		background: #ebedef; 
		background-clip: padding-box;
		border-left: 20px solid transparent;
	}
`;

export const CheckboxArea = styled.div`
	display: flex;
	gap: 8px;
	width: 100%;
	flex-direction: column;
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

export const SaveButton = styled.button`
  width: 433px;
  height: 68px;
  padding: 22px 24px;

  background: ${({ theme }) => theme.Brand};
  color: ${({ theme }) => theme.White};

	display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  border-radius: 12px;
  font-family: Pretendard;
  font-size: 22px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`;