// < 홈 스타일 >

import styled, { keyframes, css } from "styled-components";
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
		background: linear-gradient(180deg, rgb(220, 233, 242) 0%, rgb(187, 203, 228) 88.45%);

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
  }

  // 2
  .secondContent {
		position: relative;
    height: 100vh;
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
		bottom: 142px;
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
		border-top: 1px solid ${theme.Gray30};
		border-bottom: 1px solid ${theme.Gray30};
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
			gap: 12px;

			.firstTitleText {
				font-weight: 500;
				font-size: 20px;
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

const firstmoveLeftAndReturn = keyframes`
  0% {
    transform: translateX(0);
  }
  15% {
    transform: translateX(-474px);
  }
  25% {
    transform: translateX(-464px); /* 중간 지점에서 멈추도록 추가 */
  }
	70% {
    transform: translateX(-464px);
  }
  100% {
    transform: translateX(-464px);
  }
`;

const firstmoveTopAndReturn = keyframes`
  0% {
    transform: translateY(0);
  }
  15% {
    transform: translateY(-314px);
  }
  25% {
    transform: translateY(-304px); /* 중간 지점에서 멈추도록 추가 */
  }
	70% {
    transform: translateY(-304px);
  }
  100% {
    transform: translateY(-304px);
  }
`;

const secondmoveTopAndReturn = keyframes`
  0% {
    transform: translateY(0);
  }
  15% {
    transform: translateY(-354px);
  }
  25% {
    transform: translateY(-344px); /* 중간 지점에서 멈추도록 추가 */
  }
	70% {
    transform: translateY(-344px);
  }
  100% {
    transform: translateY(-344px);
  }
`;

const thirdmoveTopAndReturn = keyframes`
  0% {
    transform: translateY(0);
  }
  15% {
    transform: translateY(-322px);
  }
  35% {
    transform: translateY(-312px); /* 중간 지점에서 멈추도록 추가 */
  }
	70% {
    transform: translateY(-312px);
  }
  100% {
    transform: translateY(-312px);
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
		font-size: 100px;
		border-radius: 32px;
		overflow: hidden;
		position: relative;

		.slideButton {
		position: absolute;
		bottom: 62px;
		display: flex;
		gap: 4px;
		align-items: center;
		height: 62px;
		padding: 20px;
		background: ${theme.Brand};
		border-radius: 10px;
		cursor: pointer;

		.slideButtonText {
			font-weight: 600;
			color: ${theme.White};
			font-size: 22px;
			letter-spacing: -0.44px;
		}
	}
	}

	.opacity {
		opacity: 0.4;
	}

	.firstSlide {
		background: ${theme.White};
		padding-left: 70px;

		.firstSlideTitle {
			position: absolute;
			top: 62px;
			font-weight: 600;
			color: ${theme.Black};
			font-size: 47px;
			letter-spacing: -0.94px;
			line-height: 61.1px;
		}

		.firstSlideImg1 {
			position: absolute;
			top: 109px;
			left: 866px;
			height: 128px;
		}
		.firstSlideImg1.active {
			animation: ${firstmoveLeftAndReturn} 4.9s ease-in-out 0.1s; // 지속시간 ? 지연시간
		}

		.firstSlideImg2 {
			position: absolute;
			top: 558px;
			left: 435px;
			height: 379px;
		}
		.firstSlideImg2.active {
			animation: ${firstmoveTopAndReturn} 4.9s ease-in-out 0.1s; // 지속시간 ? 지연시간
		}
	}

	.secondSlide {
		background: #29353d;
		padding-left: 70px;

		.secondSlideTitle {
			position: absolute;
			top: 62px;
			display: flex;
			flex-direction: column;
			gap: 21px;
		}
		.secondSlideTitleTop {
			font-weight: 600;
			color: ${theme.White};
			font-size: 47px;
			letter-spacing: -0.94px;
			line-height: 61.1px;
		}
		.secondSlideTitleBottom {
			font-weight: 600;
			color: ${theme.BrandLighter};
			font-size: 24px;
			letter-spacing: -0.48px;
			line-height: 32.6px;
		}

		.secondSlideImg {
			position: absolute;
			top: 416px;
			left: 465px;
			width: 588px;
		}
		.secondSlideImg.active {
			animation: ${secondmoveTopAndReturn} 4.9s ease-in-out 0.1s forwards; // 지속시간 ? 지연시간
		}
	}
	.secondSlide.opacity {
		background: ${theme.Gray30};
	}

	.thirdSlide {
		background: #f9fafc;
		padding-left: 70px;

		.thirdSlideTitle {
			position: absolute;
			top: 62px;
			display: flex;
			flex-direction: column;
			gap: 21px;
			font-weight: 600;
			color: #000000;
			font-size: 47px;
			letter-spacing: -0.94px;
			line-height: 61.1px;
		}

		.thirdSlideImg {
			position: absolute;
			top: 371px;
			left: 451px;
			width: 927px;
			box-shadow: 0px 4px 48.5px #FFFFFF33
		}
		.thirdSlideImg.active {
			animation: ${thirdmoveTopAndReturn} 4.9s ease-in-out 0.1s; // 지속시간 ? 지연시간
		}
	}
`

export const Footer = styled.div`
	margin-top: 100px;
  width: 100%;
	height: 589px;
	bottom: 0;
	background: ${theme.Gray20};

	.frame {
		position: relative;
		width: 1920px;
		height: 589px;
		background-color: var(--text-color-gray10);
		}
		.frame .div {
		display: inline-flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 18px;
		position: absolute;
		top: 161px;
		left: 637px;
		}
		.frame .text-wrapper {
		position: relative;
		width: fit-content;
		margin-top: -1px;
		font-weight: 600;
		color: ${theme.Black};
		font-size: 15px;
		letter-spacing: -0.3px;
		line-height: 19.5px;
		white-space: nowrap;
		}
		.frame .div-2 {
		display: inline-flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 12px;
		position: relative;
		flex: 0 0 auto;
		}
		.frame .text-wrapper-2 {
		position: relative;
		width: fit-content;
		margin-top: -1px;
		font-weight: 400;
		color: v${theme.Gray70};
		font-size: 14px;
		letter-spacing: -0.28px;
		line-height: 18.2px;
		white-space: nowrap;
		}
		.frame .text-wrapper-3 {
		width: fit-content;
		font-weight: 400;
		color: ${theme.Gray70};
		white-space: nowrap;
		position: relative;
		font-size: 14px;
		letter-spacing: -0.28px;
		line-height: 18.2px;
		}
		.frame .div-3 {
		display: inline-flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 18px;
		position: absolute;
		top: 161px;
		left: 818px;
		}
		.frame .div-4 {
		display: inline-flex;
		flex-wrap: wrap;
		align-items: flex-start;
		gap: 8px 8px;
		position: relative;
		flex: 0 0 auto;
		}
		.frame .div-wrapper {
		display: inline-flex;
		align-items: flex-start;
		gap: 26px;
		position: relative;
		flex: 0 0 auto;
		}
		.frame .text-wrapper-4 {
		width: 36px;
		margin-top: -1px;
		font-weight: 400;
		color: ${theme.Gray40};
		position: relative;
		font-size: 14px;
		letter-spacing: -0.28px;
		line-height: 18.2px;
		}
		.frame .text-wrapper-5 {
		width: fit-content;
		margin-top: -1px;
		font-weight: 400;
		color: ${theme.Gray40};
		white-space: nowrap;
		position: relative;
		font-size: 14px;
		letter-spacing: -0.28px;
		line-height: 18.2px;
		}
		.frame .div-5 {
		display: inline-flex;
		align-items: flex-start;
		gap: 32px;
		position: absolute;
		top: 161px;
		left: 400px;
		}
		.frame .div-6 {
		display: inline-flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 18px;
		position: relative;
		flex: 0 0 auto;
		}
		.frame .text-wrapper-6 {
		width: fit-content;
		margin-top: -1px;
		font-weight: 600;
		color:${theme.Black};
		white-space: nowrap;
		position: relative;
		font-size: 14px;
		letter-spacing: -0.28px;
		line-height: 18.2px;
		}
		.frame .group {
		top: 112px;
		left: 400px;
		position: absolute;
		width: 60px;
		height: 13px;
		}
		.frame .overlap {
		position: relative;
		height: 13px;
		}
		.frame .group-2 {
		top: 0;
		left: 0;
		background-size: 100% 100%;
		position: absolute;
		width: 60px;
		height: 13px;
		}
		.frame .overlap-group {
		position: absolute;
		width: 5px;
		height: 13px;
		top: 0;
		left: 11px;
		}
		.frame .rectangle {
		position: absolute;
		width: 2px;
		height: 13px;
		top: 0;
		left: 1px;
		background-color: ${theme.Gray80};
		border-radius: 0px 0.52px 0px 0px;
		}
		.frame .rectangle-2 {
		position: absolute;
		width: 5px;
		height: 2px;
		top: 3px;
		left: 0;
		background-color: ${theme.Gray80};
		}
		.frame .overlap-2 {
		position: absolute;
		width: 5px;
		height: 13px;
		top: 0;
		left: 45px;
		}
		.frame .div-7 {
		display: flex;
		flex-direction: column;
		width: 5px;
		height: 13px;
		align-items: center;
		justify-content: space-between;
		position: absolute;
		top: 0;
		left: 6px;
		}
		.frame .rectangle-3 {
		position: relative;
		width: 6.23px;
		height: 2.08px;
		margin-left: -0.5px;
		margin-right: -0.5px;
		background-color: #0a98ff;
		border-radius: 0.52px 0.52px 0px 0px;
		}
		.frame .vector {
		position: relative;
		width: 2.62px;
		height: 8.31px;
		}
		
`;