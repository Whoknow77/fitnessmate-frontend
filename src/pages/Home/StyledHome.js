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

		@keyframes mouseBounce {
			0%, 100% {
				transform: translateY(0); /* 원래 위치 */
			}
			50% {
				transform: translateY(-15px); /* 위로 10px 올라감 */
			}
		}

		.mouse {
			z-index: 3;
			padding-top: 60px;
			position: absolute;
			margin: 0 auto;
			bottom: 10vh;
			cursor: pointer;
		}
		.mouse span {
			position: absolute;
			top: 0;
			left: 50%;
			width: 40px;
			height: 70px;
			margin-left: -15px;
			border: 3px solid #FFFFFF80;
			border-radius: 50px;
			box-sizing: border-box;
			animation: mouseBounce 1s infinite; /* 애니메이션 반복 */
			transition: transform 0.3s; /* 부드러운 애니메이션 전환 */
		}
		.mouse span::before {
			position: absolute;
			top: 2vh;
			left: 50%;
			content: '';
			width: 8px;
			height: 8px;
			margin-left: -4px;
			background-color: #FFFFFF80;
			border-radius: 100%;
			box-sizing: border-box;
		}
		.mouse span::after {
			position: absolute;
			bottom: -3vh;
			left: 50%;
			width: 20px;
			height: 20px;
			content: '';
			margin-left: -10px;
			border-left: 3px solid #FFFFFF80;
			border-bottom: 3px solid #FFFFFF80;
			-webkit-transform: rotate(-45deg);
			transform: rotate(-45deg);
			box-sizing: border-box;
		}
  }

  // 2
  .secondContent {
    height: 545px;
    display: flex;
    align-items: center;
    text-align: center;
    font-size: 44px;
    font-weight: 600;
    line-height: 130%; /* 57.2px */
    letter-spacing: -0.88px;
    color: ${theme.Black};
  }

  // 3
  .thirdContent {
    display: flex;
		padding: 270px 0 311px 0;
		flex-direction: column;
		gap: 159px;

		.thirdHeader {
			padding-left: 43.5px;
			width: 100%;
			// justify-self를 flex에서는 지원하지 않는다.

			.thirdTitle {
				display: flex;
				flex-direction: column;
				gap: 48px;

				.thirdTitleText {
					color: ${theme.Black};
					font-size: 58px;
					font-weight: 600;
					line-height: 130%; /* 75.4px */
					letter-spacing: -1.16px;
				}
				.myFitnessBtn {
					padding: 10px;
					gap: 10px;
					display: flex;
					align-items: center;
					color: ${theme.Brand};
					.myFitnessBtnText {
						font-size: 32px;
						font-weight: 700;
						letter-spacing: -0.64px;
					}
					.myFitnessBtnImg {
						width: 29px;
						height: 29px;
					}
				}
			}
		}

		.thirdBody {
			display: flex;
			flex-direction: column;
			gap: 125px;

			.thirdFirstContent {
				display: flex;
				gap: 199px;
				flex-wrap: wrap;
			}

			.thirdSecondContent {
				display: flex;
				gap: 233px;
				flex-wrap: wrap-reverse;
			}

			.thirdThirdContent {
				display: flex;
				gap: 546px;
				flex-wrap: wrap;
			}

			.thirdFirstImg {
				width: 500px;
				height: auto;
			}
		}
  }

	//4
	.fourthContent {
		display: flex;
		padding: 221.5px 335px;
		flex-direction: column;
		gap: 138px;

		.fourthTitle {
			display: flex;
			flex-direction: column;
			gap: 12px;

			.fourthTitleText {
				font-size: 52px;
				font-weight: 700;
				letter-spacing: -1.04px;
				color: ${theme.Black};
				text-align: center;
			}
		}

		.fourthBody {
			display: flex;
			gap: 100px;
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

