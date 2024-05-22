import styled from "styled-components";
import theme from "./../../../styles/theme";

export const SignupContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 70px;
  width: 474px;
  margin-bottom: 200px;

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
  text-align: ${({ flex }) => (flex ? "center" : "")};
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
    margin-bottom: 24px;

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
  color: ${({ theme }) => theme.Neutral990};
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
    padding-top: 34px;
    .bodyInfoWarning {
      color: ${({ theme }) => theme.Error};
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
  color: ${({ sex, theme }) => (sex ? theme.BrandDark : theme.Neutral600)};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.32px;
`;

export const SexItem = styled.button`
  transition: all 0.3s ease-out;
  border-radius: 16px;
  background: ${({ sex, theme }) => (sex ? theme.Neutral200 : theme.Neutral0)};
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
    background: ${({ theme }) => theme.Neutral200};
    border: 2px solid
      ${({ sex, theme }) =>
        sex ? `2px solid ${theme.Brand600}` : theme.Gray30};
  }
  &:hover ${SexName} {
    color: ${({ sex, theme }) => (sex ? theme.BrandDark : theme.Neutral990)};
  }
`;

export const SignupTextContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  .bodyfigureText {
    padding-bottom: 24px;
    color: ${theme.Neutral900};
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.4px;
  }

  .categoryButton {
    display: flex;
    width: 474px;
    height: 60px;
    padding: 6px 18px 6px 6px;
    border-radius: 12px;
    border: 1px solid ${theme.Brand600};
    background: #ecf7ff;
    align-items: center;
    color: ${theme.Neutral950};
    text-align: center;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.32px;
    margin-bottom: 64px;

    img {
      padding: 8px;
    }
  }

  .informationBodyComposition {
    margin-left: 14px;
    margin-bottom: 36px;
    display: flex;
    width: 460px;
    padding: 21px 24px;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
    border-radius: 12px;
    background: ${theme.Neutral200};

    .titleInformation {
      color: ${theme.Neutral950};
      font-family: Pretendard;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 150%; /* 24px */
      letter-spacing: -0.32px;
    }
    .contentInformation {
      color: ${theme.Neutral800};
      font-family: Pretendard;
      font-size: 15px;
      font-style: normal;
      font-weight: 500;
      line-height: 150%; /* 22.5px */
      letter-spacing: -0.3px;
    }
  }

  .categoryNoneButton {
    height: 60px;
    display: flex;
    width: 474px;
    padding: 6px 18px 6px 6px;
    border-radius: 12px;
    border: 1px solid ${theme.Neutral500};
    background: #fff;
    align-items: center;
    color: ${theme.Neutral950};
    text-align: center;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.32px;
    margin-bottom: 8px;

    img {
      padding: 8px;
    }
  }
`;

export const BodyCompositionInputList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-left: 14px;
  margin-bottom: 64px;
`;
export const BodyCompositionList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  width: 100%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  padding-top: 117px;
`;

export const FixPassword = styled.button`
  font-size: 20px;
  color: ${({ theme }) => theme.Brand600};
  text-decoration: underline;
  font-weight: 700;
`;

export const NonFix = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;

  .nonfix-title {
    font-size: 18px;
    font-weight: 500;
    color: ${({ theme }) => theme.Neutral990};
  }

  .nonfix-content {
    background-color: ${({ theme }) => theme.Neutral200};
    border: 1.5px solid ${({ theme }) => theme.Neutral300};
    display: flex;
    align-items: center;
    height: 56px;
    width: 474px;
    border-radius: 10px;
    padding-left: 14px;
    color: ${({ theme }) => theme.Neutral600};
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 55px;
  }
`;

export const CancelButton = styled.button`
  width: 180px;
  height: 62px;
  padding: 22px 10px;
  background: ${({ theme }) => theme.Neutral0};
  color: ${({ theme }) => theme.Brand600};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  border-radius: 12px;
  font-family: Pretendard;
  font-size: 22px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`;

export const SaveButton = styled.button`
  width: 294px;
  height: 62px;
  padding: 22px 24px;

  background: ${({ theme }) => theme.Brand600};
  color: ${({ theme }) => theme.Neutral0};

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  border-radius: 12px;
  font-family: Pretendard;
  font-size: 22px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
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
        }
      }
    }
  }
`;
