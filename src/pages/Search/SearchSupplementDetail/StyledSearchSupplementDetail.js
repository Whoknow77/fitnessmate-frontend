import { styled } from "styled-components";
import theme from "../../../styles/theme";

export const SearchWorkoutContainer = styled.div`
	width: 842px;
`

export const BeforeButton = styled.button`
	padding: 10px 10px 10px 0;
	display: flex;
	gap: 10px;
	margin-bottom: 20px;

	span {
		font-size: 20px;
		font-weight: 700;
		color: ${theme.Brand};
	}
`

export const TopContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 24px;

	button {
		background: ${theme.Brand};
		border-radius: 36px;
		padding: 14px;
		font-size: 16px;
		font-weight: 600;
		letter-spacing: -0.32px;
		margin-top: -1px;
		color: ${theme.White};

		&:hover {
			opacity: 0.5;
		}
	}
`

export const TopLeft = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`

// export const BodyPartContainer = styled.div`
// 	display: flex;
// 	gap: 4px;

// 	span {
// 		font-size: 18px;
// 		font-weight: 600;
// 		color: ${theme.Gray30};
// 		letter-spacing: -0.36px;
// 	}

// 	p {
// 		font-size: 18px;
// 		font-weight: 600;
// 		color: #d9d9d9;
// 		letter-spacing: -0.36px;
// 	}
// `

export const SpplementName = styled.div`
	font-size: 40px;
	font-weight: 700;
	letter-spacing: -0.8px;
	color: ${theme.Black};
`

export const MiddleContainer = styled.div`
	display: flex;
	gap: 30px;
	margin-bottom: 30px;
	
	img {
		border-radius: 12px;
		border: 1px solid ${theme.Gray30};
		width: 353px;
		height: fit-content;
	}
`
export const InformationContainer = styled.div`
	width: 447px;
	display: flex;
	padding: 24px;
	flex-direction: column;

	button {
		margin-top: 40px;
		display: flex;
		background: ${theme.BrandLight};
		border-radius: 12px;
		justify-content: center;
		align-items: center;
		height: 49px;
		font-size: 18px;
		font-weight: 600;
		color: ${theme.Brand};
		letter-spacing: -0.36px;

		&:hover {
			opacity: 0.5;
		}
	}
`
export const SpplementInformationTop = styled.div`
	margin: 10.5px 0;
	display: grid;
	grid-template-columns: 28px 1fr;
  grid-column-gap: 24px;
  grid-row-gap: 33px;

	span {
		font-size: 16px;
		font-weight: 400;
		color: ${theme.Gray50};
		letter-spacing: -0.32px;
	}

	p {
		font-size: 16px;
		font-weight: 500;
		color: ${theme.Black};
		letter-spacing: -0.32px;
	}
`

export const SpplementInformationMiddle = styled.div`
	margin-top: 12px;
	display: grid;
	grid-template-columns: 28px 1fr;
  grid-column-gap: 24px;
  grid-row-gap: 12px;

	span {
		font-size: 16px;
		font-weight: 400;
		color: ${theme.Gray50};
		letter-spacing: -0.32px;
	}

	.DescriptionP {
		grid-column: 2;
		display: flex;
		padding: 18px;
		border-radius: 10px;
		background: ${theme.Gray10};
		font-size: 16px;
		font-weight: 500;
		color: ${theme.Gray80};
		letter-spacing: -0.32px;
		line-height: 24px;
	}

	.PerServing {
		grid-column: 2;
		display: flex;
		gap: 10px 32px;
		flex-wrap: wrap;
		padding: 15px 0;
		border-radius: 10px;
		background: ${theme.Gray10};
		justify-content: center;
	}
`
export const PerServing = styled.div`
	display: flex;
	gap: 4;
	flex-direction: column;
	justify-content: center;

	.TitleSpan {
		grid-row: 1;
		font-size: 16px;
		font-weight: 500;
		color: ${theme.Gray70};
		letter-spacing: -0.32px;
		line-height: normal;
		display: flex;
		align-items: center;
	}

	.ContentP {
		grid-row: 2;
		font-size: 18px;
		font-weight: 600;
		letter-spacing: -0.32px;
		color: ${theme.Black};
		display: flex;
		justify-content: center;
		align-items: center;
	}
`

export const SpplementInformationBottom = styled.div`
	margin-top: 23px;
	display: flex;
	align-items: center;
	justify-content: space-between;

	span {
		display: flex;
		align-items: center;
		font-size: 16px;
		font-weight: 400;
		color: ${theme.Gray50};
		letter-spacing: -0.32px;
	}

	p {
		font-size: 24px;
		font-weight: 600;
		left: 0;
		letter-spacing: -0.48px;
	}
`