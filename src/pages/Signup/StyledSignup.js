import styled from "styled-components";
import theme from "./../../styles/theme";

export const SignupContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 70px;
  width: 474px;

  .recommendText {
    color: ${theme.Neutral900};
    font-size: 22px;
    font-weight: 600;
    letter-spacing: -0.44px;
  }
  .buttonContainer {
    display: flex;
    flex-direction: column;
  }
  .congratuImg {
    display: inline-block;
    margin: 0 auto;
    padding-top: 60px;
  }

  .profileForm {
    display: flex;
    gap: 12px;
    flex-direction: column;
  }

  .buttonCompleteContainer {
    margin: 0 auto;
  }
  .signupCompleteNavBox {
    padding-top: 33px;
    display: flex;
    flex-direction: column;
    gap: 18px;
    width: 100%;
    .signupCompleteTitle {
      color: ${theme.Neutral900};
      font-size: 22px;
      font-weight: 600;
      letter-spacing: -0.44px;
    }
    .signupCompleteNavItem {
      width: 100%;
      display: flex;
      padding: 24px;
      justify-content: space-between;
      align-items: center;
      border-radius: 10px;
      background: ${theme.Neutral200};
      text-align: left;
      .signupCompleteNavItemText {
        color: ${theme.Neutral900};
        font-size: 20px;
        letter-spacing: -0.4px;
        font-weight: 600;
      }
      .signupCompleteNavItemText2 {
        color: ${theme.Neutral900};
        font-size: 16px;
        letter-spacing: -0.32px;
      }
    }
  }
`;

export const SignupTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SignupTitle = styled.span`
  text-align: ${({ flex }) => (flex ? "center" : "left")};
  display: ${({ flex }) => (flex ? "flex" : "")};
  flex-direction: ${({ flex }) => (flex ? "column" : "")};
  align-items: center;
  width: 100%;
  color: ${theme.Neutral900};
  font-size: 30px;
  font-weight: 600;
  letter-spacing: -0.6px;
  .warningNoWrite {
    display: inline-block;
    color: ${theme.Neutral900};
    font-size: 22px;
    padding-top: 12px;
  }

  .statusBar {
    position: relative;
    height: 4px;
    background: ${theme.BrandLight};
    margin-bottom: 36px;

    .statusBar2 {
      position: absolute;
      width: ${({ status }) => `${(100 / 4) * status}%`};
      height: 4px;
      background: ${theme.Brand600};
    }
  }
  .signupCompleteTitle {
    color: ${theme.Neutral900};
    font-size: 22px;
    font-weight: 600;
    letter-spacing: -0.44px;
  }
`;

export const TitleEmphasis = styled.span`
  color: ${theme.Neutral990};
  font-size: 28px;
  font-weight: 700;
`;

export const BodyInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  .sexSelect {
    display: flex;
    flex-direction: column;
    gap: 8px;
    .bodyInfoWarning {
      color: ${theme.Error};
      font-size: 16px;
    }
  }

  .sexList {
    display: flex;
    gap: 5px;
  }
`;

export const ProfileInputcontainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
export const SexName = styled.span`
  transition: all 0.3s ease-out;
  color: ${({ sex }) => (sex ? theme.BrandDark : theme.Neutral600)};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.32px;
`;

export const SexItem = styled.button`
  transition: all 0.3s ease-out;
  border-radius: 16px;
  background: ${({ sex }) => (sex ? theme.Neutral200 : theme.Neutral0)};
  border: ${({ sex, theme }) =>
    sex ? `2px solid ${theme.Brand600}` : `2px solid transparent`};
  display: flex;
  width: 126px;
  height: 126px;
  padding: 18px 32px 19px 31px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 8px;
  .sexImg {
    width: 60px;
    height: 60px;
  }
  &:hover {
    background: ${theme.Neutral200};
    border: 2px solid
      ${({ sex }) => (sex ? `2px solid ${theme.Brand600}` : theme.Gray30)};
  }
  &:hover ${SexName} {
    color: ${({ sex }) => (sex ? theme.BrandDark : theme.Neutral990)};
  }
`;

export const SignupTextContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  width: 100%;
`;

export const BodyCompositionInputList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 917px;
`;

export const SignupUpdonwBalanceWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 48px;
  .updownBalanceBox {
    display: flex;
    flex-direction: column;
    gap: 24px;
    .updownBalanceTitle {
      color: ${theme.Neutral900};
      font-size: 20px;
      font-weight: 600;
      letter-spacing: -0.4px;
    }
    .updownBalanceBar {
      display: flex;
      flex-direction: column;
      gap: 4px;
      .updownBalanceBarTitle {
        color: ${theme.Neutral900};
        font-size: 14px;
        text-align: center;
      }
      .updownBalanceBarContent {
        justify-content: space-between;
        height: 58px;
        display: flex;
        align-items: center;
        .balanceRatioBox {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 4px;
          .balanceRatio {
            color: ${theme.Neutral900};
            font-size: 18px;
          }
          .balanceRatioPercent {
            color: ${theme.Neutral900};
            font-size: 18px;
            font-weight: 700;
          }
          .balanceRatioPercent2 {
            color: ${theme.Brand600};
            font-size: 18px;
            font-weight: 700;
          }
        }
      }
    }
    .bodyfigureText {
      padding-bottom: 10px;
      color: ${theme.Neutral900};
      font-size: 20px;
      font-weight: 600;
      letter-spacing: -0.4px;
    }
  }
  .directButtonContainer {
    display: flex;
    justify-content: flex-end;
    .directbutton {
      /* 자식 크기에 width 맞추기 */
      padding: 10px;
      justify-content: center;
      display: flex;
      align-items: center;
      gap: 10px;
      color: ${theme.Brand600};
      font-size: 20px;
      font-weight: 600;
      margin-top: -30px;
      .rightArrow {
        width: 24px;
        height: 24px;
      }
    }
  }
`;
