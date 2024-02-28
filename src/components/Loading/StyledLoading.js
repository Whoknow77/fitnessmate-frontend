// Styles.js
import styled from "styled-components";
import theme from "../../styles/theme";

export const Background = styled.div`
	width: 183px;
	height: 62px;
	padding: 18px 39px;
  display: flex;
	gap: 10px;
  align-items: center;
  justify-content: center;
  display: flex;
  img {
    width: 60px;
    height: 60px;
  }
	border-radius: 10px;
	background: ${theme.BrandNon};

	/* ------------------- SPINNER ------------------- */

	.spinner {
		width: 22px;
		height: 22px;
	}
	
	.svg {
		display: block;
	}
	
	.border {
		fill: none;
		stroke: ${theme.Gray20};
		stroke-width: 3;
	}
	
	.progress {
		fill: none;
		stroke: ${theme.BrandMid};
		stroke-width: 3;
		stroke-dasharray: 48; /* 전체 길이보다 크게 설정 */
		stroke-dashoffset: -48; /* 음수로 설정하여 선이 끊어지지 않도록 함 */
		animation: spinning 1.5s linear infinite;
	
		transform-origin: center;
	}
	
	@keyframes spinning {
		from {
			transform: rotate(0);
		}
		to {
			transform: rotate(360deg);
		}
	}
	
	
	
	
	
	
	
	

`;

export const LoadingText = styled.div`
  color: #FFF;
	font-size: 22px;
	font-weight: 600;
	letter-spacing: -0.44px;
`;
