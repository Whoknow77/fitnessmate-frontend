import { styled } from "styled-components";
import theme from "./../../../styles/theme";

export const MypageBackground = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  background: ${theme.Gray10};
  z-index: -999;
`;

export const MypageContainer = styled.ul`
  margin-top: 83px;
  display: flex;
  justify-content: center;
  width: 870px;

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
        color: ${theme.Gray80};
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
          color: ${theme.Gray60};
          font-size: 15px;
          font-weight: 500;
          line-height: 145%;
        }
        .line {
          height: 16px;
          border-left: 1px solid ${theme.Gray60};
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
      background: ${theme.Gray20};
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
      background: #e4eaf0;
      position: relative;

      .routineName {
        color: #4e5968;
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
      background: #191f28;
      .routineName {
        color: #ffffff;
      }
      .svgFill {
        fill: #ffffff;
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
    background: #fff;

    .noneRoutineTextArea {
      display: flex;
      flex-direction: column;
      gap: 2px;

      .noneRoutineTopText {
        color: ${theme.Gray80};
        font-size: 18px;
        font-weight: 500;
        line-height: 150%;
        letter-spacing: -0.18px;
      }
      .noneRoutineBottomText {
        color: ${theme.Brand};
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
      background: ${theme.Brand};

      .addFirstRoutineButtonImg {
        width: 24px;
        height: 24px;
      }
      .addFirstRoutineButtonText {
        color: #fff;
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
  background: #fff;
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
      color: #333d4b;
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
    background: #a2b2c2;
    height: 1px;
    margin: 6px 0 6px 0;
  }
`;

export const MypageMiddleContainer = styled.div`
  width: 870px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  .workoutCard {
    display: flex;
    align-items: center;
    gap: 10px;

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
        background-color: ${theme.Gray70};
        border-radius: 45px;
        color: ${theme.White};
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
        background: ${theme.Gray20};
      }
    }
    .workoutCardContent {
      width: 771px;
      height: 169px;
      background: #ffffff;
      border-radius: 16px;
      padding: 30px 22px;

      // 그림자가 안 떠서 임시로
      box-shadow: 0px 7px 15px #00000015;

      .workoutName {
        color: ${theme.Gray80};
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
`;

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
    color: v ${theme.Gray70};
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
    color: ${theme.Black};
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
    .footerLogo {
      width: 60px;
    }
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
