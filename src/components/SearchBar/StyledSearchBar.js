import styled from "styled-components";
import theme from "../../styles/theme";

export const SearchContainer = styled.div`
	width: 633px;
  height: 56px;
  padding: 18px 20px;
	margin: 0 auto;
	background: ${({ theme }) => theme.Gray20};
  border-radius: 10px;
  border: 2px solid
    ${({ theme, isClicked }) => (isClicked ? theme.Brand : '#ecf0f3')};
  display: flex;
  align-items: center;

	.iconArea {
		display: flex;
		gap: 18px;
		
		.searchIcon {
			width: 24px;
			height: 24px;
			cursor: pointer;
		}

		.closeIcon {
			width: 24px;
			height: 24px;
			cursor: pointer;
		}
	}
`;

export const SearchInputContent = styled.input`
  &::-webkit-input-placeholder {
    color: ${theme.Gray40};
  }
  border: none;
  width: 100%;
  color: ${theme.Black};
  font-size: 18px;
  font-weight: 500;
	letter-spacing: -0.36px;
`;
