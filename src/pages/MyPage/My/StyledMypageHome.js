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
  width: 870px;
  margin-bottom: 150px;

  .MypageHomeArea {
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

      .numArea {
        display: flex;
        flex-direction: column;

        .workoutNum {
          padding: 28px 10px 0 10px;
          display: flex;
          height: 100%;
          flex-direction: column;
          align-items: center;
          justify-content: start;
          gap: 3px;

          .numCircle {
            display: flex;
            width: 28px;
            height: 28px;
            align-items: center;
            justify-content: center;
            background-color: ${theme.Neutral800};
            border-radius: 45px;
            color: ${theme.Neutral0};
            text-align: center;
            font-size: 14px;
            font-weight: 600;
            line-height: 150%;
            letter-spacing: -0.28px;
          }
          .line {
            width: 3px;
            height: 15rem;
            align-items: stretch;
            border-radius: 1px;
            background: ${theme.Neutral300};
          }
        }
      }

      .numArea {
        display: flex;
        flex-direction: column;

        .workoutCard {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 50px;

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
          .cardHandler {
            width: 28px;
            height: 36px;
            cursor: move;
          }
        }
      }
    }
  }
`;
