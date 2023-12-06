// < 홈 스타일 >

import styled from "styled-components";
import theme from "./../../styles/theme";

// 화면 가리기

// 홈
export const HomeContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 36px;
	override: hidden;

  // 1
  .firstContent {
		width: 100%;
		height: 100vh;
		padding: 0 169px 0 194px;
		position: relative;
		display: flex;
		justify-content: center;

		.firstArea {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

    .firstCotntentItem {
			z-index: 3;
      display: flex;
      flex-direction: column;
      gap: 12px;

      .firstTitle1 {
        color: ${theme.Gray80};
        font-size: 32px;
        line-height: 120%; /* 38.4px */
        letter-spacing: -0.64px;
				font-weight: 600;
				padding-left: 4px;
      }

      .firstTitle2 {
        color: ${theme.Gray80};
        font-size: 82px;
        font-weight: 600;
        line-height: 120%; /* 98.4px */
        letter-spacing: -1.64px;
      }
      .recommendBtn {
        margin-top: 46px;
        width: 176px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        font-size: 24px;
        padding: 18px 24px;
        background: ${({ theme }) => theme.Brand};
        color: ${({ theme }) => theme.White};
        letter-spacing: -0.48px;

        &:hover {
          opacity: 0.5;
        }
      }
    }

		.homebanner { 
			z-index: 3;
			width: 766px;
			height: 765px;
		}

		.firstContentBack {
			position:absolute;
			top:0;
			left:0;
			bottom:0;
			right:0;
			box-sizing:border-box;
			padding:0;
			border:none;
			margin:auto;
			display:block;
			width:0;
			height:0; 
			min-width:100%; 
			max-width:100%; 
			min-height:100%; 
			max-height:100%; 
			object-fit:cover; 
		}
  }

  // 2
  .secondContent {
		position: relative;
    height: 596px;
    display: flex;
		flex-direction: column;
		gap: 4px;
    align-items: center;
		justify-content: center;
    text-align: center;

		.secondItems {
			display: flex;
			gap: 4px;
			align-items: center;
		}

		.secondItems img {
			width: 136.5px;
		}

		.secondItems p {
			font-weight: 600;
			font-size: 34px;
			letter-spacing: -0.68px;
			line-height: 47.6px;
			color: ${theme.Gray80};
		}
  }

	.secondContent p {
		color: ${theme.Gray80};
		font-weight: 500;
		font-size: 24px;
		letter-spacing: -0.96px;
		line-height: 33.6px;
	}

	@keyframes mouseBounce {
		0%, 100% {
			transform: translateY(0); /* 원래 위치 */
		}
		50% {
			transform: translateY(-15px); /* 위로 10px 올라감 */
		}
	}

	.mouse {
		background: ${theme.White};
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 104px;
		height: 94px;
		z-index: 3;
		padding-top: 18px;
		position: absolute;
		margin: 0 auto;
		bottom: 0;
		cursor: pointer;
		border-radius: 18px;
		animation: mouseBounce 1s infinite; /* 애니메이션 반복 */
		transition: transform 0.3s; /* 부드러운 애니메이션 전환 */
		&:hover {
			background: ${theme.Gray10};
		}
	}
	.mouse span {
		font-weight: 600;
		font-size: 20px;
		letter-spacing: -0.4px;
		line-height: 28px;
		white-space: nowrap;
		color: ${theme.Brand};
	}

  // 3
  .thirdContent {
		background: ${theme.Gray10};
		width: 100%;
		height: 100vh;
    display: flex;
		gap: 69px;
		flex-direction: column;
		justify-content: center;
		
		.slideButton {
			position: relative;
			align-self: center;
		}
  }

	//4
	.fourthContent {
		width: 100%;
		height: 656px;
		display: flex;
		flex-direction: column;
		gap: 81px;

		.fourthTitle {
			margin-top: 139px;
			display: flex;
			flex-direction: column;
			gap: 4px;

			.firstTitleText {
				font-weight: 500;
				font-size: 24px;
				letter-spacing: -0.48px;
				line-height: 31.2px;
				color: ${theme.BrandDark};
				text-align: center;
			}

			.secondTitleText {
				font-weight: 600;
				font-size: 48px;
				letter-spacing: -1.44px;
				line-height: 62.4px;
				color: ${theme.Black};
				text-align: center;
			}
		}

		.fourthBody {
			display: flex;
			flex-direction: column;
			gap: 138px;
		}
	}

  //5
  .fifthContent {
    display: flex;
    gap: 48px;
    align-items: center;
		flex-direction: column;
		padding: 206px 0 205px 0;
		background: ${theme.Gray20};
		max-width: 1920px;
    width: 100%;

    .fifthTitle {
      display: flex;
      flex-direction: column;
      gap: 12px;

			.fifthFirstText {
				font-size: 32px;
				font-weight: 600;
				line-height: 130%;
				letter-spacing: -0.64px;
				color: ${theme.Gray50};
				text-align: center;
			}

      .fifthSecondText {
        font-size: 68px;
				font-weight: 600;
				line-height: 130%; /* 88.4px */
				letter-spacing: -2.04px;
				color: ${theme.Black};
				text-align: center;
      }
    }

    .searchBtn {
      gap: 10px;
      margin: 0 auto;
      padding: 10px;
      color: ${theme.Brand};
      display: flex;
      align-items: center;
      .searchBtnText {
        color: ${theme.Brand};
        font-size: 26px;
        font-weight: 600;
        letter-spacing: -0.52px;
      }
      .searchBtnImg {
        width: 29px;
        height: 29px;
      }
    }
  }
`;

export const HomeContent = styled.li`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ThirdContentTitle = styled.div`
	display: flex;
	flex-direction: column;
	gap: 32px;

	.thirdContentTitleNum{
		display: flex;
		width: 64px;
		height: 64px;
		padding: 10px;
		justify-content: center;
		align-items: center;
		border-radius: 62px;
		color: ${theme.Gray80};
		background: ${theme.Gray20};
		font-size: 36px;
		font-weight: 600;
		line-height: 130%;
		letter-spacing: -0.72px;
	}

	.thirdContentTitleText {
		color: ${theme.Black};
		font-size: 42px;
		font-weight: 600;
		line-height: 140%;
		letter-spacing: -0.84px;
	}
`;

export const FourthBodyItem = styled.div`
	display: flex;
	flex-direction: column;
	gap: 43px;

	.itemLogo {
		display: flex;
		width: 350px;
		height: 280px;
		justify-content: center;
		align-items: center;
		border-radius: 22px;
		background: ${theme.BrandLighter};
	}

	.itemText {
		display: flex;
		flex-direction: column;
		gap: 32px;

		.itemTextTitle {
			text-align: center;
			color: ${theme.Black};
			font-size: 40px;
			font-weight: 600;
			letter-spacing: -0.8px;
			padding-bottom: 24px;
			border-bottom: 2px solid ${theme.Gray30};
		}

		.itemTextContent {
			font-size: 24px;
			color: ${theme.Gray70};
			font-weight: 500;
			line-height: 150%;
			letter-spacing: -0.48px;
			text-align: center;
		}
	}
`;

export const Slide = styled.div`
	display: flex;
  width: 3402px;
  height: 602px;
  gap: 24px;
  margin-left: 400px;
  transition: transform 0.3s ease-in-out;
  transform: ${(props) => `translateX(-${props.transformPosition}px)`};

	#slideItem {
		width: 1118px;
		height: 602px;
		// background: ${theme.Brand};
		font-size: 100px;
	}

	.firstSlide {
	}
`