import { styled } from "styled-components";
import theme from "../../styles/theme";

export const NoSearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 60px 0;
  gap: 36px;
  .warningImg {
    margin: 0 auto;
    width: 167px;
    height: 148px;
    border-radius: 12px;
    background: linear-gradient(0deg, #ffd0d0 0%, #ffd0d0 100%),
      url(<path-to-image>),
      lightgray -72.809px -46.148px / 188.979% 160.165% no-repeat;
  }
  .warningText {
    color: ${theme.Gray80};
    text-align: center;
    font-size: 17px;
    font-weight: 700;
    line-height: 150%; /* 25.5px */
    letter-spacing: -0.34px;
  }
`;
