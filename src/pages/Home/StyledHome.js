// < 홈 스타일 >

import styled from "styled-components";
import theme from "./../../styles/theme";

// 화면 가리기

// 홈
export const HomeContainer = styled.ul`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;
  margin-bottom: 300px;

  // 1
  .firstContent {
    height: 800px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 12px;
    width: 100%;

    .firstTitle1 {
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${theme.BrandDark};
      font-size: 32px;
      font-weight: 600;
      letter-spacing: -0.64px;
    }

    .firstTitle2 {
      p {
        color: ${theme.Black};
        text-align: center;
        font-size: 86px;
        font-weight: 700;
        line-height: 120%; /* 103.2px */
        letter-spacing: -1.72px;
      }
    }
    .recommendBtn {
      margin-top: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      font-size: 24px;
      font-weight: 600;
      padding: 24px 28px;
      background: ${({ theme }) => theme.Brand};
      color: ${({ theme }) => theme.White};

      &:hover {
        opacity: 0.5;
      }
    }
  }

  // 2
  .secondContent {
    height: 700px;
    color: ${theme.Black};
    display: flex;
    align-items: center;
    text-align: center;
    font-size: 44px;
    font-weight: 600;
    line-height: 130%; /* 57.2px */
    letter-spacing: -0.88px;
  }

  // 3
  .thirdContent {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 83%;
    height: 662px;
    .thirdTitle {
      display: flex;
      flex-direction: column;
      gap: 24px;
      @media screen and (max-width: 900px) {
        width: 100%;
      }
      .thirdTitleText {
        color: ${theme.Black};
        text-align: center;
        font-size: 64px;
        font-weight: 700;
        line-height: 130%; /* 83.2px */
        letter-spacing: -1.28px;
      }
      .myFitnessBtn {
        padding: 10px;
        gap: 10px;
        display: flex;
        align-items: center;
        margin: 0 auto;
        color: ${theme.Brand};
        .myFitnessBtnText {
          font-size: 32px;
          font-weight: 700;
          letter-spacing: -0.64px;
        }
        .myFitnessBtnImg {
          width: 29px;
          height: 29px;
        }
      }
    }
    .thirdImg {
      width: 429px;
      height: 662px;
      @media screen and (max-width: 900px) {
        display: none;
      }
    }
  }

  //4
  .fourthContent {
    display: flex;
    gap: 24px;
    align-items: center;
    justify-content: space-between;
    width: 79%;
    height: 493px;

    .fourthTitle {
      display: flex;
      flex-direction: column;
      gap: 24px;
      @media screen and (max-width: 900px) {
        width: 100%;
      }
      .fourthTitleText {
        color: ${theme.Black};
        text-align: center;
        font-size: 64px;
        font-weight: 700;
        line-height: 130%; /* 83.2px */
        letter-spacing: -1.28px;
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
        font-size: 32px;
        font-weight: 700;
        letter-spacing: -0.64px;
      }
      .searchBtnImg {
        width: 29px;
        height: 29px;
      }
    }
    .fourthImg {
      width: 429px;
      height: 493px;
      @media screen and (max-width: 900px) {
        display: none;
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
