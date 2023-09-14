import styled from "styled-components";
import theme from "./../../../styles/theme";

export const SignupContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 70px;
  width: 474px;

  .recommendText {
    color: ${theme.Gray80};
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
      color: ${theme.Gray80};
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
      background: ${theme.Gray10};
      text-align: left;
      .signupCompleteNavItemText {
        color: #333d4b;
        font-size: 20px;
        letter-spacing: -0.4px;
        font-weight: 600;
      }
      .signupCompleteNavItemText2 {
        color: #333d4b;
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
  color: #333d4b;
  font-size: 30px;
  font-weight: 600;
  letter-spacing: -0.6px;
  .warningNoWrite {
    display: inline-block;
    color: ${theme.Gray80};
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
      background: ${theme.Brand};
    }
  }
  .signupCompleteTitle {
    color: ${theme.Gray80};
    font-size: 22px;
    font-weight: 600;
    letter-spacing: -0.44px;
  }
`;

export const TitleEmphasis = styled.span`
  color: ${({ theme }) => theme.Black};
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
  color: ${({ sex, theme }) => (sex ? theme.BrandDark : theme.Gray50)};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.32px;
`;

export const SexItem = styled.button`
  transition: all 0.3s ease-out;
  border-radius: 16px;
  background: ${({ sex, theme }) => (sex ? theme.Gray10 : theme.White)};
  border: ${({ sex, theme }) =>
		sex ? `2px solid ${theme.Brand}` : `2px solid transparent`};
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
    background: ${({ theme }) => theme.Gray10};
    border: 2px solid
      ${({ sex, theme }) => (sex ? `2px solid ${theme.Brand}` : theme.Gray30)};
  }
  &:hover ${SexName} {
    color: ${({ sex, theme }) => (sex ? theme.BrandDark : theme.Black)};
  }
`;

export const SignupTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  .bodyfigureText {
    padding-bottom: 10px;
    color: ${theme.Gray80};
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.4px;
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
      color: ${theme.Brand};
      font-size: 20px;
      font-weight: 600;
      .rightArrow {
        width: 24px;
        height: 24px;
      }
    }
  }
`;


export const BodyCompositionInputList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  padding-top: 117px;
`;

export const FixPassword = styled.button`
	font-size: 20px;
	color: ${({ theme }) => theme.Brand};
	text-decoration: underline;
	font-weight: 700;
`

export const NonFix = styled.div`
	display: flex;
	gap: 8px;
	flex-direction: column;

	.nonfix-title {
		font-size: 18px;
		font-weight: 500;
		color: ${({ theme }) => theme.Black};
	}

	.nonfix-content {
		background-color: ${({ theme }) => theme.Gray10};
		border: 1.5px solid ${({ theme }) => theme.Gray20};
		display: flex;
		align-items: center;
		height: 56px;
		width: 474px;
		border-radius: 10px;
		padding-left: 14px;
		color: ${({ theme }) => theme.Gray50};
		font-size: 18px;
		font-weight: 500;
		margin-bottom: 55px;
	}
	
`

export const CancelButton = styled.button`
  width: 180px;
  height: 62px;
  padding: 22px 10px;
  background: ${({ theme }) => theme.White};
  color: ${({ theme }) => theme.Brand};
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

  background: ${({ theme }) => theme.Brand};
  color: ${({ theme }) => theme.White};

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
      color: ${theme.Gray80};
      font-size: 20px;
      font-weight: 600;
      letter-spacing: -0.4px;
    }
    .updownBalanceBar {
      display: flex;
      flex-direction: column;
      gap: 4px;
      .updownBalanceBarTitle {
        color: ${theme.Gray80};
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
            color: ${theme.Gray80};
            font-size: 18px;
          }
          .balanceRatioPercent {
            color: ${theme.Gray80};
            font-size: 18px;
            font-weight: 700;
          }
        }
      }
    }
  }
`;
