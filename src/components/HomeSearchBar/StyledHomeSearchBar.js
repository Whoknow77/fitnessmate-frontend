import styled from "styled-components";
import theme from "../../styles/theme";

export const SearchContainer = styled.div`
	width: 627px;
	margin: 0 auto;
  display: flex;
  flex-direction: column;
	gap: 40px;
`;

export const SearchBarContainer = styled.div`
	width: 627px;
  height: 58px;
  padding: 8px 12px 8px 18px;
	background: ${theme.Gray10};
  border-radius: 16px;
	border: ${({ isClicked, theme }) =>
		isClicked ? `2px solid ${theme.Brand}` : '1px solid #eaeef1'};
  display: flex;
  align-items: center;

	.iconArea {
		display: flex;
		gap: 18px;
		
		.searchIcon {
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
		font-weight: 500;
		font-size: 20px;
		letter-spacing: -0.4px;
		line-height: 26px;
  }
  border: none;
  width: 100%;
  color: ${theme.Black};
	font-size: 20px;
  font-weight: 500;
	letter-spacing: -0.4px;
	line-height: 26px;
`;

export const SearchBottomContainer = styled.div`
	margin-left: 6px;
	display: flex;
  flex-direction: column;
	gap: 12px;

	.searchBottomTitle {
		font-weight: 500;
		font-size: 16px;
		letter-spacing: -0.32px;
		color: ${theme.Gray50};
	}

	.searchBottomContent {
		display: flex;
		gap: 10px;

		.popularKeyword {
			display: flex;
			align-items: center;
			gap: 6px;
			padding: 8px 12px;
			background: ${theme.Gray20};
			border-radius: 8px;
			cursor: pointer;
		}
		.popularKeyword p {
			color: ${theme.Gray70};
			font-weight: 500;
			font-size: 16px;
			letter-spacing: -0.32px;
		}
	}
`