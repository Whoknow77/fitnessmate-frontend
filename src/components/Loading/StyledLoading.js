// Styles.js
import styled from "styled-components";
import theme from "../../styles/theme";

export const Background = styled.div`
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  display: flex;
  img {
    width: 50px;
    height: 50px;
  }
`;

export const LoadingText = styled.div`
  color: ${theme.Brand};
  font-size: 22px;
  font-weight: 600;
  letter-spacing: -0.44px;
`;
