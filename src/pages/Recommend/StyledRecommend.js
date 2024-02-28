import { styled } from "styled-components";
import theme from "./../../styles/theme";

export const RecommendResultBackground = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  background: ${theme.Gray10};
  z-index: -999;
`;

export const RecommendContainer = styled.div`
  max-width: 842px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  padding: 78px 25px 0 25px;
  gap: 80px;

  .recommendTitleArea {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .goodImg {
    width: 328px;
    height: 232px;
    display: inline-block;
    margin: 0 auto;
    margin-bottom: 100px;
  }
`;

export const RecommendHomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  gap: 48px;
  position: absolute;
  left: 50%;
  top: 50%;
  align-items: center;
  transform: translate(-50%, 50%);
  .recommendBtnWrapper {
    display: flex;
    width: 182px;
    height: 77px;
    padding: 24px 28px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 10px;
    background: ${theme.Brand};
    .recommendBtnText {
      color: ${theme.White};
      font-size: 24px;
      letter-spacing: -0.48px;
    }
    .recommendBtnImg {
      width: 29px;
      height: 29px;
    }
  }
`;

export const RecommendTitle = styled.span`
  font-size: ${({ ftsize }) => ftsize};
  color: ${({ ftcolor }) => ftcolor};
  font-weight: ${({ ftweight }) => ftweight};
  letter-spacing: -0.64px;
  .hide {
    @media screen and (max-width: 800px) {
      display: none;
    }
`;

export const RecommendTitleHide = styled(RecommendTitle)`
  color: ${theme.Gray50};
  font-size: 24px;
  font-weight: 500;
  letter-spacing: -0.48px;

  @media screen and (max-width: 660px) {
    display: none;
  }
`;

export const RecommendButtonContainer = styled.div`
  margin-bottom: 80px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .readyWarning {
    display: ${({ isover }) => (isover ? "bloack" : "none")};
    color: ${theme.Error};
    font-size: 22px;
    letter-spacing: -0.44px;
  }
`;

export const RecommendImgContainer = styled.div`
  display: flex;
  gap: 40px;
  // 이미지 세로 한 줄로
  @media (max-width: 830px) {
    flex-direction: column;
  }
`;

export const RecommendTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  .allSelectButton {
    width: 87px;
    text-align: center;
    padding: 10px;
    border-radius: 8px;
    background: ${theme.BrandLight};
    color: ${theme.Brand};
    font-size: 18px;
    margin-left: auto;
    margin-right: 0;
  }
  .allClearButton {
    color: ${theme.Brand};
    font-size: 18px;
    font-weight: 600;
    padding: 10px;
    text-align: right;
  }
`;

export const TextCheckboxContainer = styled.div`
  padding-top: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
  gap: 24px;
`;

export const BorderTextCheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  position: relative;
`;

export const BorderTextCheckboxInnerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 22px;
`;

export const ButonWrapper = styled.div`
  margin: 0 auto;
`;

export const RecommendNavbarItem = styled.button`
  font-size: 20px;
  line-height: 150%; /* 30px */
  letter-spacing: -0.4px;
  color: ${({ isSelected }) => (isSelected ? theme.Brand : theme.Gray50)};
  &:hover {
    opacity: 0.8;
  }
`;

export const RecommendMachineList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 16px;
  position: absolute;
  top: 373px;
  left: 427px;
`;
export const RecommendMachine = styled.button`
  color: ${({ isSelected }) => (isSelected ? theme.Brand : theme.Gray50)};
  font-size: 20px;
  line-height: 150%; /* 30px */
  letter-spacing: -0.4px;
  &:hover {
    opacity: 0.5;
  }
`;

export const BudgetContainer = styled.div`
  width: 100%;
  height: 330px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  gap: 24px;
  .warningText {
    color: #eb444c;
    text-align: center;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.36px;
    display: flex;
    justify-content: center;
  }
`;

export const BudgetBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-direction: column;

  .bugetText {
    color: ${theme.Black};
    text-align: center;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.36px;
  }

  .bugetContent {
    display: flex;
    align-items: center;
    gap: 36px;

    .budgetWrapper {
      min-width: 316px;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      border: 2px solid ${theme.Gray30};
      ${({ warnBudget }) => (warnBudget ? theme.Error : theme.Gray10)};
      border-radius: 16px;
      background: ${theme.Gray10};
    }
    .budget {
      color: ${({ warnBudget }) => (warnBudget ? theme.Error : theme.Black)};
      font-size: 49px;
      font-weight: 700;
      letter-spacing: -0.98px;
    }
  }

  .plusButton {
    padding: 26px;
  }
  img {
    cursor: pointer;
  }
`;

export const RecommendMain = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  gap: 24px;
  max-width: 553px;
  width: 100%;
  position: relative;
  .fitnessImg {
    border-radius: 5px;
  }
  .recommendNavbarWrapper {
    z-index: 900;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 24px;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    width: 193px;
    left: -250px;
    .recommendNavbarTitle {
      color: ${theme.Gray80};
      font-size: 18px;
      line-height: 150%; /* 27px */
      letter-spacing: -0.36px;
    }
  }
`;

// 보조제

export const MiddleContainer = styled.div`
  display: flex;
  gap: 31px;
  margin: 24px;

  .supplementImg {
    border-radius: 12px;
    border: 1px solid ${theme.Gray30};
    width: 235px;
    height: fit-content;
  }
`;

export const InformationContainer = styled.div`
  width: 447px;
  display: flex;
  flex-direction: column;

  .goToBuy {
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
`;

export const SpplementInformationTop = styled.div`
  margin-bottom: 46px;
  display: grid;
  grid-template-columns: 40px 1fr;
  grid-column-gap: 12px;
  grid-row-gap: 12px;

  .smallTitle {
    grid-column: 1;
    font-size: 16px;
    font-weight: 600;
    color: ${theme.Gray50};
    letter-spacing: -0.32px;
    display: flex;
    align-items: center;
    padding: 0;
  }

  p {
    grid-column: 2;
    font-size: 16px;
    font-weight: 500;
    color: ${theme.Black};
    letter-spacing: -0.32px;
  }
`;

export const InformationToggle = styled.div`
  position: relative;

  .toggleButton {
    padding: 0px 12px;
    display: flex;
    gap: 12px;
    position: relative;
  }

  .toggleValue {
    min-width: 71px;
    font-size: 16px;
    font-weight: 500;
    color: ${theme.Black};
    letter-spacing: -0.32px;
    line-height: 24px;
    text-align: center;
  }
`;

export const ToggleModal = styled.div`
  position: absolute;
  top: 30px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background: ${theme.Gray10};
  box-shadow: 0px 1px 5px #00000040;
  z-index: 999;

  .toggleModalContent {
    padding: 3px 10px;
    font-size: 16px;
    font-weight: 500;
    color: ${theme.Gray70};
    letter-spacing: -0.32px;
    line-height: 24px;
  }
`;

export const SpplementInformationMiddle = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 12px;

  .total {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    color: ${theme.Gray80};
    letter-spacing: -0.28px;
  }
`;

export const SpplementInformationBottom = styled.div`
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-size: 16px;
    font-weight: 600;
    color: ${theme.Gray50};
    letter-spacing: -0.32px;
    display: flex;
    align-items: center;
    padding: 0;
  }

  p {
    font-size: 24px;
    font-weight: 600;
    left: 0;
    letter-spacing: -0.48px;
  }
`;

export const RecommendMainBottom = styled.div`
  display: flex;
  gap: 6px;
  flex-direction: column;

  .bottomTitle {
    font-size: 18px;
    font-weight: 600;
    letter-spacing: -0.36px;
    line-height: 27px;
    color: ${theme.Gray80};
  }

  .bottomDescription {
    background: ${theme.Gray10};
    padding: 24px;
    font-size: 16px;
    font-weight: 500;
    color: ${theme.Gray80};
    letter-spacing: -0.32px;
    line-height: 24px;
    border-radius: 10px;
  }

  .PerServing {
    grid-column: 2;
    display: flex;
    gap: 24px 32px;
    flex-wrap: wrap;
    padding: 15px 0;
    border-radius: 10px;
    background: ${theme.Gray10};
    justify-content: center;
  }
`;

export const PerServing = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;

  .TitleSpan {
    grid-row: 1;
    font-size: 16px;
    font-weight: 500;
    color: ${theme.Gray50};
    letter-spacing: -0.32px;
    display: flex;
    align-items: center;
  }

  .ContentP {
    grid-row: 2;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: -0.32px;
    color: ${theme.Gray80};
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

// --------------------- 운동 결과 ---------------------

export const RecommendMachineResultContainer = styled.div`
  padding: 57px 0 130px 0;
  display: flex;
  justify-content: center;

  .RecommendMachineResultArea {
    width: 716px;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
`;

export const RecommendTitleContainer = styled.div`
  display: flex;
	flex-direction: column;
	gap: 5px;

	.starImg {
		width: 48px;
		height: 48px;
	}

	.recommendTopArea {
		display: flex;
		justify-content: space-between;

		.recommendTitleArea {
			display: flex;
			flex-direction: column;
			padding-left: 4px;
			margin-bottom: 9px;
	
			.recommendTitle {
				display: flex;
				color: ${theme.Black};
				font-size: 25px;
				font-weight: 500;
				line-height: 140%;
				letter-spacing: -0.5px;
				
				.workoutNum {
					font-weight: 700;
				}
			}
		}

		.goToHome {
			display: flex;
			gap: 5px;
			align-items: center;
			height: 24px;
			
			.goToHomeText {
				color: ${theme.Gray50};
				font-size: 16px;
				font-weight: 500;
				line-height: 140%;
				letter-spacing: -0.32px;
			}
			.goToHomeImg {
				width: 24px;
				height: 24px;
			}
		}
	}

	.recommendKeywordArea {
		margin-top: 9px;
		display: flex;
		align-items: center;
		padding-left: 4px;
		gap: 12px;

		.recommendKeywordTitle {
			color: ${theme.Gray50};
			font-size: 15px;
			font-weight: 500;l
			ine-height: 140%;
			letter-spacing: -0.3px;
		}
		.recommendKeywordContainer {
			display: flex;
			gap: 5px;
			
			.recommendKeyword {
				display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 6px;
			border: 1px solid ${theme.Gray40};
			background: ${theme.Gray30};
			padding: 4px 6px;
			color: ${theme.Gray80};
			font-size: 12px;
			font-weight: 600;
			line-height: 140%;
			letter-spacing: -0.24px;
		}
	}
	}

	.
`;

export const RecommendCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .recommendCard {
    display: flex;
    flex-direction: column;
    width: 716px;
    border-radius: 18px;
    background: #fff;
    box-shadow: 0px 4px 8.1px 0px rgba(0, 0, 0, 0.03);

    .recommendCardContent {
      padding: 24px 22px 0 22px;
    }
  }
`;

export const RecommendMainTopWrapper = styled.div`
  margin-bottom: 18px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const RecommendMainTopLeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-left: 4px;
`;

// 이거 없애고 싶음
export const RecommendMainTopTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-left: 4px;
`;

export const RecommendMainWorkout = styled.span`
  color: ${theme.Gray80};
  font-size: 22px;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.44px;
`;

// 이거 이름 바꾸고 싶음
export const RecommendMainMachine = styled.span`
  color: ${theme.Gray80};
  font-size: 22px;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.44px;
`;

export const RecommendMainBodyPart = styled.div`
  display: flex;
  align-items: center;
  .recommendbodyPart {
    color: ${theme.BrandDark};
    font-size: 15px;
    font-weight: 600;
    line-height: 140%;
    letter-spacing: -0.3px;
  }
`;

export const RecommendMainTopRightWrapper = styled.button`
  display: flex;
  gap: 10px;
  align-items: center;

  .alreadyRoutine {
    color: ${theme.Gray80};
    font-size: 14px;
    font-weight: 500;
    line-height: 140%;
    letter-spacing: -0.28px;
  }

  .recommendMainBtn {
    display: flex;
    padding: 8px 12px 8px 8px;
    align-items: center;
    gap: 2px;
    border-radius: 38px;
    background: ${theme.Brand};

    .recommendMainBtnImg {
      width: 20px;
      height: 20px;
    }

    .recommendMainBtnText {
      color: #fff;
      font-size: 13px;
      font-weight: 500;
      line-height: 140%;
      letter-spacing: -0.26px;
    }
  }
`;

// 없애고 싶음
export const RecommendMainBtn = styled.button`
  height: 47px;
  display: flex;
  padding: 14px;
  align-items: center;
  border-radius: 36px;
  background: ${theme.Brand};
  color: ${theme.White};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.32px;
`;

export const RecommendMainMiddleWrapper = styled.div`
  padding-top: 6px;
  width: 100%;
  // 대충 최대치 넣고 그 안에서는 열릴거니까. 높이값을 지정해주지 않으면 transition이 안 먹거든.
  max-height: ${({ isOpenArray }) => (isOpenArray ? "1000px" : 0)};
  opacity: ${({ isOpenArray }) => (isOpenArray ? 1 : 0)};
  transition:
    max-height 0.7s ease,
    opacity 0.7s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 30px;

  .recommendMainContent {
    display: flex;
    gap: 20px;
  }
`;

export const RecommendVideoWrapper = styled.div`
  position: relative;
  border-radius: 12px;
  width: 219px;
  height: 267px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  .fitnessImg {
    width: auto;
    height: 100%;
  }
  .goTopRecommendVideo {
    cursor: pointer;
    position: absolute;
    left: 13px;
    bottom: 15px;
    display: flex;
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    background: #191f28;
    box-shadow: 0px 4px 6.8px 0px rgba(0, 0, 0, 0.4);

    .videoArrow {
      width: 32px;
      height: 32px;
    }
  }
`;

export const RecommendDescriptionWrapper = styled.div`
  padding: 0 12px;
  color: ${theme.Gray70};
  font-size: 16px;
  font-weight: 500;
  line-height: 165%;
  letter-spacing: -0.16px;
  width: 409px;
`;

export const RecommendAmountWrapper = styled.div`
  margin-bottom: 26px;
  display: Flex;
  justify-content: center;
  align-items: center;
  // 여기에다가 그라데이션 적용

  .recommendAmountContainer {
    width: 100%;
    height: 52px;
    border: 2px solid #0b98ff;
    // 위에껀 추후 border px 고려해서 수정
    display: flex;
    padding: 14px 16px;
    align-items: center;
    gap: 32px;
    border-radius: 10px;
    background: #eef7ff;

    .amountTitleArea {
      display: flex;
      align-items: center;
      gap: 4px;

      .starImg {
        width: 24px;
        height: 24px;
      }
      .amountTitle {
        color: ${theme.Brand};
        font-size: 15px;
        font-weight: 500;
        letter-spacing: -0.3px;
      }
    }

    .amountContent {
      display: flex;
      align-items: center;
      gap: 14px;

      .amountText {
        color: ${theme.Brand};
        font-size: 18px;
        font-weight: 600;
        letter-spacing: -0.36px;
      }
    }
  }
`;

export const RecommendMoreButton = styled.button`
  display: flex;
  width: 100%;
  height: 48px;
  padding: 14px 0px;
  justify-content: center;
  align-items: center;
  border-radius: 0px 0px 18px 18px;
  border-top: 1px solid ${theme.Gray20};
  // 글씨 바뀌는 딜레이

  .informationText {
    color: ${theme.Gray70};
    font-size: 14px;
    font-weight: 500;
    line-height: 140%;
    letter-spacing: -0.28px;
    transition-delay: ${({ isOpenArray }) => (isOpenArray ? "0.5s" : "0.5s")};
  }
`;
