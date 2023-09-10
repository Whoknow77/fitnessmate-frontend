import { styled } from "styled-components";
import theme from "../../../styles/theme";

export const SearchWorkoutContainer = styled.div`
	width: 842px;

	iframe {
		width: 100%;
		height: 470px;
	}
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

export const WorkoutName = styled.div`
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
		height: 226px;
		width: 327px;
	}
`
export const InformationContainer = styled.div`
	width: 485px;
	display: flex;
	gap: 38px;
	border-radius: 10px;
	background: ${theme.Gray10};
	padding: 24px;
	flex-direction: column;

	span {
		font-size: 20px;
		font-weight: 600;
	}

	.TopInformation {
		display: flex;
		gap: 11px;
		flex-direction: column;
	}

	.description {
		font-size: 15px;
		font-weight: 500;
		color: ${theme.Gray80};
		letter-spacing: -0.3px;
		line-height: 22.5px;
	}

	.BottomInformation {
		display: flex;
		gap: 11px;
	}
`
export const BodyPartContainer = styled.div`
	display: flex;
	gap: 11px;
	align-items: center;

	div {
		display: flex;
		gap: 8px;
	}

	p {
		padding: 6px 13px;
		background: ${theme.BrandLight};
		color: ${theme.Brand};
		font-size: 12px;
		font-weight: 700;
		letter-spacing: -0.24px;
		border-radius: 4px;
		margin-top: -1px;
	}
`
