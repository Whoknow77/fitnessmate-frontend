import { styled } from "styled-components";
import theme from "../styles/theme";
// 페이지를 공통적으로 감싸는 Wrapper
export const MainLayoutWrapper = styled.div`
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
	z-index: 0;
`;