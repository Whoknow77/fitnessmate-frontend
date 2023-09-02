import { styled } from "styled-components";
import theme from "./../../styles/theme";

export const SearchContainer = styled.div`
  max-width: 1392px;
  margin: 0 auto;
  width: 100%;
  .searchTopWrapper {
    display: flex;
    flex-direction: column;
    gap: 26px;
    .searchTitleWrapper {
      display: flex;
      flex-direction: column;
      gap: 24px;
      .searchTitleTextWrapper {
        display: flex;
        flex-direction: column;
        gap: 8px;
        .searchTitle1 {
          text-align: center;
          color: ${theme.Gray50};
          font-size: 24px;
          font-weight: 700;
        }
        .searchTitle2 {
          text-align: center;
          color: ${theme.Black};
          font-size: 38px;
          font-weight: 700;
        }
      }
    }
  }

  .searchContentWrapper {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 20px;
  }
`;

export const Toggle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .toggleSwitch_wrap {
    display: flex;
    gap: 20px;
    align-items: center;
  }

  .toggleSwitch {
    position: relative;
    display: inline-block;
    width: 201px;
    height: 50px;
  }
`;
