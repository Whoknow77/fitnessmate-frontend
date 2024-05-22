import { styled } from "styled-components";
import theme from "../../../styles/theme";

export const RecommendContainer = styled.div`
  max-width: 842px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  gap: 80px;
  padding: 78px 25px 0 25px;

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
    background: ${theme.Brand600};
    .recommendBtnText {
      color: ${theme.Neutral100};
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
  }
`;

export const RecommendTitleHide = styled(RecommendTitle)`
  color: ${theme.Neutral900};
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.48px;

  @media screen and (max-width: 660px) {
    display: none;
  }
`;

export const RecommendTitleContainer = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
`;

export const RecommendButtonContainer = styled.div`
  margin-top: 186px;
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
    color: ${theme.Brand600};
    font-size: 18px;
    margin-left: auto;
    margin-right: 0;
  }
  .allClearButton {
    color: ${theme.Brand600};
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

export const RecommendMachineResultContainer = styled.div`
  padding-top: 59px;
  gap: 28px;
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
`;

export const RecommendNavbarItem = styled.button`
  font-size: 20px;
  line-height: 150%; /* 30px */
  letter-spacing: -0.4px;
  color: ${({ isSelected }) =>
    isSelected ? theme.Brand600 : theme.Neutral600};
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
  color: ${({ isSelected }) =>
    isSelected ? theme.Brand600 : theme.Neutral600};
  font-size: 20px;
  line-height: 150%; /* 30px */
  letter-spacing: -0.4px;
  &:hover {
    opacity: 0.5;
  }
`;

export const BudgetContainer = styled.div`
  width: 100%;
  height: 540px;
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
  width: 100%;
  max-width: 588px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .budgetWrapper {
    min-width: 317px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    border: 3px solid
      ${({ warnBudget }) => (warnBudget ? theme.Error : theme.Neutral200)};
    border-radius: 16px;
    background: ${theme.Neutral200};
  }
  .budget {
    color: ${({ warnBudget }) => (warnBudget ? theme.Error : theme.Neutral990)};
    font-size: 49px;
    font-weight: 700;
    letter-spacing: -0.98px;
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
      color: ${theme.Neutral900};
      font-size: 18px;
      line-height: 150%; /* 27px */
      letter-spacing: -0.36px;
    }
  }
`;
export const RecommendMainTopWrapper = styled.div`
  margin: 0 -18px;
  top: 62px;
  position: sticky;
  display: flex;
  padding: ${({ showShadow }) => (showShadow ? "18px" : 0)};
  border: ${({ showShadow }) =>
    showShadow ? `1px solid ${theme.Neutral300}` : "none"};
  box-shadow: ${({ showShadow }) =>
    showShadow ? `0px 11px 9px 0px rgba(0, 0, 0, 0.05)` : "none"};
  background: ${({ showShadow }) => (showShadow ? theme.Neutral0 : "none")};
  border-radius: ${({ showShadow }) => (showShadow ? "8px" : "0")};
  justify-content: space-between;
  z-index: 999;
`;
export const RecommendMainTopTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const RecommendMainBodyPart = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  .recommendbodyPart {
    color: ${theme.Neutral400};
    font-size: 18px;
    font-weight: 600;
    letter-spacing: -0.36px;
  }
`;
export const RecommendMainMachine = styled.span`
  color: #333d4b;
  font-size: 30px;
  font-weight: 700;
  letter-spacing: -0.6px;
`;

export const RecommendMainBtn = styled.button`
  height: 47px;
  display: flex;
  padding: 14px;
  align-items: center;
  border-radius: 36px;
  background: ${theme.Brand600};
  color: ${theme.Neutral0};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.32px;
`;

export const RecommendAmountWrapper = styled.div`
  display: Flex;
  flex-direction: column;
  gap: 6px;
  .amountTitle {
    color: ${theme.Neutral900};
    font-size: 18px;
    font-weight: 600;
    line-height: 150%; /* 27px */
    letter-spacing: -0.36px;
  }
  .amountContent {
    display: flex;
    padding: 24px 48px;
    justify-content: center;
    align-items: center;
    gap: 32px;
    border-radius: 10px;
    border: ${theme.Neutral0};
    background: ${theme.Neutral200};
    .amountBox {
      display: flex;
      gap: 8px;
      align-items: center;
      .amountText1 {
        color: ${theme.Neutral600};
        font-size: 16px;
        letter-spacing: -0.32px;
      }
      .amountText2 {
        color: ${theme.Neutral900};
        font-size: 18px;
        font-weight: 600;
        letter-spacing: -0.36px;
      }
    }
  }
`;

export const RecommendDescriptionWrapper = styled.div`
  display: Flex;
  flex-direction: column;
  gap: 6px;
  .descriptionTitle {
    color: ${theme.Neutral900};
    font-size: 18px;
    font-weight: 600;
    line-height: 150%; /* 27px */
    letter-spacing: -0.36px;
  }
  .description {
    display: flex;
    padding: 24px;
    align-items: center;
    border-radius: 10px;
    border: 1px solid ${theme.Neutral0};
    background: ${theme.Neutral200};
    color: ${theme.Neutral900};
    font-size: 16px;
    line-height: 150%; /* 24px */
    letter-spacing: -0.32px;
  }
`;

export const RecommendVideoWrapper = styled.div`
  display: Flex;
  flex-direction: column;
  gap: 6px;
  .recommendVideoTitle {
    color: ${theme.Neutral900};
    font-size: 18px;
    font-weight: 600;
    line-height: 150%; /* 27px */
    letter-spacing: -0.36px;
  }
  .recommendVideo {
    width: 100%;
    height: 283px;
  }
`;

// 보조제

export const MiddleContainer = styled.div`
  display: flex;
  gap: 31px;
  margin: 24px;

  .supplementImg {
    border-radius: 12px;
    border: 1px solid ${theme.Neutral400};
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
    color: ${theme.Brand600};
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
    color: ${theme.Neutral600};
    letter-spacing: -0.32px;
    display: flex;
    align-items: center;
    padding: 0;
  }

  p {
    grid-column: 2;
    font-size: 16px;
    font-weight: 500;
    color: ${theme.Neutral990};
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
    color: ${theme.Neutral990};
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
  background: ${theme.Neutral200};
  box-shadow: 0px 1px 5px #00000040;
  z-index: 999;

  .toggleModalContent {
    padding: 3px 10px;
    font-size: 16px;
    font-weight: 500;
    color: ${theme.Neutral800};
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
    color: ${theme.Neutral900};
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
    color: ${theme.Neutral600};
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
    color: ${theme.Neutral900};
  }

  .bottomDescription {
    background: ${theme.Neutral200};
    padding: 24px;
    font-size: 16px;
    font-weight: 500;
    color: ${theme.Neutral900};
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
    background: ${theme.Neutral200};
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
    color: ${theme.Neutral600};
    letter-spacing: -0.32px;
    display: flex;
    align-items: center;
  }

  .ContentP {
    grid-row: 2;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: -0.32px;
    color: ${theme.Neutral900};
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
