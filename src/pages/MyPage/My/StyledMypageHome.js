import { styled } from "styled-components";
import theme from "./../../../styles/theme";

export const MypageBackground = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  background: ${theme.Neutral200};
  z-index: -999;
`;

export const MypageContainer = styled.ul`
  margin-top: 83px;
  display: flex;
  justify-content: center;
  margin-bottom: 150px;

  .SupplementArea {
    margin-top: 260px;
    display: flex;
    width: 270px;
    height: fit-content;
    padding: 18px 0px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    border-radius: 18px;
    background: ${theme.Neutral50};
    box-shadow: 0px 4px 8.1px 0px rgba(0, 0, 0, 0.03);

    .supplementTitle {
      padding: 0 26px;
      color: ${theme.Neutral990};
      font-family: Pretendard;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 150%; /* 24px */
      letter-spacing: -0.32px;
    }

    .supplementItem {
      padding-left: 24px;
      display: flex;
      gap: 11px;
      align-items: center;

      .supplementImg {
        width: 52px;
        height: 52px;
        border-radius: 8px;
      }

      .supplementContent {
        display: flex;
        flex-direction: column;

        .item_workoutName {
          color: ${theme.Neutral900};
          font-family: Pretendard;
          font-size: 15px;
          font-style: normal;
          font-weight: 500;
          line-height: 150%; /* 22.5px */
          letter-spacing: -0.3px;
        }
        .item_flavor-source {
          color: ${theme.Neutral600};
          font-family: Pretendard;
          font-size: 12px;
          font-style: normal;
          font-weight: 500;
          line-height: 150%; /* 18px */
          letter-spacing: -0.24px;
        }
      }
    }
  }

  .MypageHomeArea {
    width: 870px;
    display: flex;
    flex-direction: column;
    gap: 48px;
  }
`;

export const MypageTopContainer = styled.div`
  width: 870px;
  display: flex;
  align-items: flex-start;
  text-align: left;
  justify-content: start;
  flex-direction: column;
  gap: 46px;

  .mypageTitle {
    color: ${theme.Gray90};
    font-size: 28px;
    font-weight: 600;
    line-height: 145%;
  }

  .mypageTopContent {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 30px;

    .myInformation {
      display: flex;
      gap: 8px;

      .myName {
        color: ${theme.Neutral900};
        font-size: 22px;
        font-weight: 500;
        line-height: 150%;
        letter-spacing: -0.176px;
      }

      .myWorkout {
        display: flex;
        gap: 10px;
        align-items: center;

        .myWorkoutInformation {
          color: ${theme.Neutral700};
          font-size: 15px;
          font-weight: 500;
          line-height: 145%;
        }
        .line {
          height: 16px;
          border-left: 1px solid ${theme.Neutral700};
        }
      }
    }
  }
`;

export const RoutinesContainer = styled.div`
  .lengthRoutineContainer {
    display: flex;
    gap: 6px;
    align-items: center;

    .addRoutineButton {
      width: 44px;
      height: 44px;
      background: ${theme.Neutral300};
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .routineArea {
      display: flex;
      gap: 12px;
      height: 44px;
      padding: 0 12px 0 18px;
      align-items: center;
      border-radius: 30px;
      background: ${theme.Neutral300};
      position: relative;

      .routineName {
        color: ${theme.Neutral800};
        font-size: 16px;
        font-weight: 500;
        line-height: 150%;
        letter-spacing: -0.192px;
      }
      .fixThisRoutine {
        cursor: pointer;
      }
    }
    .active {
      background: ${theme.Neutral990};
      .routineName {
        color: ${theme.Neutral0};
      }
      .svgFill {
        fill: ${theme.Neutral0};
      }
    }
  }

  .noneRoutineContainer {
    display: flex;
    width: 100%;
    padding: 20px 18px;
    justify-content: space-between;
    align-items: center;
    border-radius: 16px;
    background: ${theme.Neutral0};

    .noneRoutineTextArea {
      display: flex;
      flex-direction: column;
      gap: 2px;

      .noneRoutineTopText {
        color: ${theme.Neutral900};
        font-size: 18px;
        font-weight: 500;
        line-height: 150%;
        letter-spacing: -0.18px;
      }
      .noneRoutineBottomText {
        color: ${theme.Brand600};
        font-size: 15px;
        font-weight: 600;
        line-height: 150%;
        letter-spacing: -0.15px;
      }
    }

    .addFirstRoutineButton {
      display: flex;
      padding: 14px 20px 14px 14px;
      align-items: center;
      gap: 4px;
      border-radius: 28px;
      background: ${theme.Brand600};

      .addFirstRoutineButtonImg {
        width: 24px;
        height: 24px;
      }
      .addFirstRoutineButtonText {
        color: ${theme.Neutral0};
        font-size: 16px;
        font-weight: 500;
        line-height: 150%;
        letter-spacing: -0.32px;
      }
    }
  }
`;

export const inputContent = styled.input`
  &::-webkit-input-placeholder {
    color: ${theme.Neutral0};
    font-weight: 600;
    font-size: 18px;
    letter-spacing: -0.36px;
    line-height: 23.4px;
  }
  border: none;
  width: 100%;
  color: ${theme.Neutral0};
  font-weight: 600;
  font-size: 18px;
  letter-spacing: -0.36px;
  line-height: 23.4px;
`;

export const RoutineFixModal = styled.div`
  position: absolute;
  right: 6px;
  top: 38px;
  z-index: 300;
  display: flex;
  padding: 8px;
  flex-direction: column;
  width: 152px;
  height: 140px;
  border-radius: 14px;
  background: ${theme.Neutral0};
  box-shadow: 0px 1px 8.7px 0px rgba(0, 0, 0, 0.48);

  .routineFixModalButton {
    display: flex;
    padding: 8px 12px 8px 6px;
    align-items: center;
    gap: 8px;
    border-radius: 10px;

    .routineFixModalIcon {
      width: 20px;
      height: 20px;
    }
    .routineFixModalText {
      color: ${theme.Neutral900};
      font-size: 14px;
      font-weight: 500;
      line-height: 150%;
      letter-spacing: -0.28px;
    }

    &:hover {
      background: rgba(51, 61, 75, 0.1);
    }
  }

  .routineFixModalLine {
    opacity: 0.2;
    background: ${theme.Neutral500};
    height: 1px;
    margin: 6px 0 6px 0;
  }
`;

export const MypageMiddleContainer = styled.div`
  .list-container {
    width: 870px;
    display: flex;
    flex-direction: column;

    .item-container {
      display: flex;

      .numArea2 {
        display: flex;
        flex-direction: column;

        .workoutCard {
          display: flex;
          gap: 12px;

          .workoutNum {
            padding: 14px 10px 0 10px;
            display: flex;
            height: 100%;
            flex-direction: column;
            align-items: center;
            justify-content: start;
            gap: 13px;

            .numCircle {
              display: flex;
              width: 28px;
              min-height: 28px;
              align-items: center;
              justify-content: center;
              border-radius: 45px;
              border: 1px solid ${theme.Neutral500};
              background: ${theme.Neutral100};
              color: ${theme.Neutral900};
              text-align: center;
              font-size: 14px;
              font-weight: 600;
              line-height: 150%;
              letter-spacing: -0.28px;
            }
            .line {
              width: 2px;
              height: 100%;
              align-items: stretch;
              border-radius: 1px;
              background: ${theme.Neutral400};
            }
          }
          .last-item .line {
            display: none;
          }

          .recommendCard {
            margin-top: -20px;
            display: flex;
            flex-direction: column;
            width: 716px;
            border-radius: 18px;
            background: ${theme.Neutral0};
            box-shadow: 0px 4px 8.1px 0px rgba(0, 0, 0, 0.03);
            margin-bottom: 32px;
            position: relative;

            .cardHandler {
              position: absolute;
              top: 40%;
              right: -42px;
              width: 28px;
              height: 36px;
            }

            .recommendCardContent {
            }
          }

          .workoutCardContent {
            width: 771px;
            height: 169px;
            background: ${theme.Neutral0};
            border-radius: 16px;
            padding: 30px 22px;

            // 그림자가 안 떠서 임시로
            box-shadow: 0px 7px 15px #00000015;

            .workoutName {
              color: ${theme.Neutral900};
              font-size: 22px;
              font-weight: 600;
              letter-spacing: -0.44px;
            }
          }
        }
      }
    }
  }
`;

export const RecommendMainTopWrapper = styled.div`
  padding: 18px 24px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid
    ${({ isOpenArray, theme }) =>
      isOpenArray ? theme.Neutral300 : theme.Neutral200};
`;

export const RecommendMainTopLeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 6px 0px;
`;

// 이거 없애고 싶음
export const RecommendMainTopTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-left: 4px;
`;

export const RecommendMainWorkout = styled.span`
  color: ${theme.Neutral990};
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.4px;
`;

// 이거 이름 바꾸고 싶음
export const RecommendMainMachine = styled.span`
  color: ${theme.Neutral900};
  font-size: 22px;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.44px;
`;

export const RecommendMainBodyPart = styled.div`
  display: flex;
  .item_BodyPart {
    color: ${theme.Neutral600};
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.32px;
  }
`;

export const RecommendMainTopRightWrapper = styled.button`
  display: flex;
  gap: 10px;
  align-items: center;

  .amountContent {
    display: flex;
    gap: 10px;
    align-items: center;

    .amountItem {
      display: flex;
      flex-direction: column;
      padding: 10px;

      .amountTitle {
        color: ${theme.Neutral600};
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: -0.24px;
        text-align: left;
      }

      .amountText {
        display: flex;
        align-items: flex-end;
        color: ${theme.Neutral900};
        font-family: Pretendard;
        font-size: 26px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        letter-spacing: -0.52px;

        .amountUnit {
          color: ${theme.Neutral600};
          font-family: Pretendard;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          letter-spacing: -0.28px;
          margin-left: 4px;
        }
      }
    }
  }
  .recommendMainBtn {
    display: flex;
    padding: 12px;
    align-items: center;

    .recommendMainBtnImg {
      width: 24px;
      height: 24px;
    }

    .recommendMainBtnText {
      color: ${theme.Neutral0};
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
  background: ${theme.Brand600};
  color: ${theme.Neutral0};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.32px;
`;

export const RecommendMainMiddleWrapper = styled.div`
  width: 100%;
  // 대충 최대치 넣고 그 안에서는 열릴거니까. 높이값을 지정해주지 않으면 transition이 안 먹거든.
  max-height: ${({ isOpenArray }) => (isOpenArray ? "1000px" : 0)};
  opacity: ${({ isOpenArray }) => (isOpenArray ? 1 : 0)};
  transition:
    max-height 0.2s ease-out,
    opacity 0.5s ease-out;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 30px;

  .recommendMainContent {
    padding: 24px 22px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
`;

export const RecommendDescriptionWrapper = styled.div`
  padding: 0 12px;
  color: ${theme.Neutral800};
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 165%; /* 26.4px */
  letter-spacing: -0.16px;
`;

export const RecommendVideoWrapper = styled.div`
  margin-left: 12px;
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
    background: ${theme.Neutral990};
    box-shadow: 0px 4px 6.8px 0px rgba(0, 0, 0, 0.4);

    .videoArrow {
      width: 32px;
      height: 32px;
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
  border-top: 1px solid
    ${({ isOpenArray, theme }) => (isOpenArray ? theme.Neutral300 : `none`)};
  // 글씨 바뀌는 딜레이

  .informationText {
    color: ${theme.Neutral800};
    font-size: 14px;
    font-weight: 500;
    line-height: 140%;
    letter-spacing: -0.28px;
    transition-delay: ${({ isOpenArray }) => (isOpenArray ? "0.5s" : "0.5s")};
  }
`;
