// < 홈 스타일 >

import styled from "styled-components";
import theme from "./../../styles/theme";

// 화면 가리기

// 홈
export const HomeContainer = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;

  // 1
  .firstContent {
    max-width: 1920px;
    padding: 0 calc((100% - 1440px) / 2);
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    height: 800px;
    background: #1c1f2c;
    .firstCotntentItem {
      display: flex;
      flex-direction: column;
      gap: 12px;
      .firstTitle1 {
        color: ${theme.White};
        font-size: 32px;
        line-height: 120%; /* 38.4px */
        letter-spacing: -0.64px;
      }

      .firstTitle2 {
        color: ${theme.White};
        font-size: 82px;
        font-weight: 600;
        line-height: 120%; /* 98.4px */
        letter-spacing: -1.64px;
      }
      .recommendBtn {
        margin-top: 48px;
        width: 176px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        font-size: 24px;
        padding: 18px 24px;
        background: ${({ theme }) => theme.Brand};
        color: ${({ theme }) => theme.White};
        letter-spacing: -0.48px;

        &:hover {
          opacity: 0.5;
        }
      }
    }
  }

  // 2
  .secondContent {
    height: 700px;
    display: flex;
    align-items: center;
    text-align: center;
    font-size: 44px;
    font-weight: 600;
    line-height: 130%; /* 57.2px */
    letter-spacing: -0.88px;
    color: #333d4b;
  }

  // 3
  .thirdContent {
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
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
        color: #333d4b;
        text-align: center;
        font-size: 58px;
        font-weight: 600;
        line-height: 130%; /* 75.4px */
        letter-spacing: -1.16px;
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
    justify-content: space-around;
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
        color: #333d4b;
        text-align: center;
        font-size: 58px;
        font-weight: 600;
        line-height: 130%; /* 75.4px */
        letter-spacing: -1.16px;
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
