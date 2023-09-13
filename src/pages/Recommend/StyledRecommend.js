import { styled } from "styled-components";
import theme from "./../../styles/theme";

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
  }
`;

export const RecommendTitleHide = styled(RecommendTitle)`
  color: ${theme.Gray80};
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

export const RecommendMachineResultContainer = styled.div`
  padding-top: 59px;
  gap: 28px;
  display: flex;
  flex-direction: column;
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
export const RecommendMainTopWrapper = styled.div`
  margin: 0 -18px;
  top: 64px;
  position: sticky;
  display: flex;
  padding: ${({ showShadow }) => (showShadow ? "18px" : 0)};
  border: ${({ showShadow }) =>
    showShadow ? `1px solid ${theme.Gray20}` : "none"};
  box-shadow: ${({ showShadow }) =>
    showShadow ? `0px 11px 9px 0px rgba(0, 0, 0, 0.05)` : "none"};
  background: ${({ showShadow }) => (showShadow ? theme.White : "none")};
  border-radius: ${({ showShadow }) => (showShadow ? "8px" : "0")};
  justify-content: space-between;
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
    color: ${theme.Gray30};
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
  background: ${theme.Brand};
  color: ${theme.White};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.32px;
`;

export const RecommendAmountWrapper = styled.div`
  display: Flex;
  flex-direction: column;
  gap: 6px;
  .amountTitle {
    color: ${theme.Gray80};
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
    border: ${theme.White};
    background: ${theme.Gray10};
    .amountBox {
      display: flex;
      gap: 8px;
      align-items: center;
      .amountText1 {
        color: ${theme.Gray50};
        font-size: 16px;
        letter-spacing: -0.32px;
      }
      .amountText2 {
        color: ${theme.Gray80};
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
    color: ${theme.Gray80};
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
    border: 1px solid ${theme.White};
    background: ${theme.Gray10};
    color: ${theme.Gray80};
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
    color: ${theme.Gray80};
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
