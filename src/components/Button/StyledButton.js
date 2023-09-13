// < 버튼 스타일 >

import styled from "styled-components";
import theme from "./../../styles/theme";

// < 가로 길이가 긴 버튼 >

export const BigButtonWrapper = styled.button`
  width: 474px;
  height: 62px;
  padding: 22px 24px;
  background: ${(props) => props.backcolor || props.theme.Brand};
  color: ${(props) => props.fontcolor || props.theme.White};
`;

// < 가로 길이가 중간인 버튼 >

export const MiddleButtonWrapper = styled.button`
  width: 354px;
  height: 62px;
  padding: 22px 24px;
  background: ${({ isReady }) =>
    isReady === undefined || isReady === true ? theme.Brand : theme.BrandLight};
  cursor: ${({ isReady }) => (isReady ? "pointer" : "default")};
  color: ${theme.White};
`;

// < 가로 길이가 짧은 버튼 >

export const SmallButtonWrapper = styled.button`
  display: flex;
  height: 62px;
  padding: 18px 39px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: ${({ isReady }) => (isReady ? theme.Brand : theme.BrandNon)};
  cursor: ${({ isReady }) => (isReady ? "pointer" : "default")};
  color: ${theme.White};
  font-size: 22px;
  letter-spacing: -0.44px;
`;

// < 이전 버튼 >

export const BeforeButtonWrapper = styled.button`
  width: 134px;
  height: 62px;
  padding: 22px 10px;
  background: ${theme.White};
  color: ${theme.Brand};
`;

// < 목록 버튼 >

export const ListButtonWrapper = styled.button`
  display: inline-flex;
  width: auto;
  height: 44px;
  padding: 10px 24px;
  gap: 10px;
  border-radius: 16px;
  font-size: 17px;

  background: ${theme.Gray10};
  color: ${theme.Black};
`;

export const BeforeArrowButtonWrapper = styled.button`
  display: flex;
  width: 150px;
  height: 62px;
  padding: 22px 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  background: ${theme.White};
  .beforeArrowBtnImg {
    width: 24px;
    height: 24px;
  }
  .beforeArrowBtnText {
    color: ${theme.Brand};
    font-size: 22px;
    letter-spacing: -0.44px;
  }
`;

export const AfterArrowButtonWrapper = styled.button`
  display: flex;
  width: 150px;
  height: 62px;
  padding: 22px 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  background: ${({ isReady }) => (isReady ? theme.Brand : theme.BrandNon)};
  cursor: ${({ isReady }) => (isReady ? "pointer" : "default")};

  .afterArrowBtnText {
    color: ${theme.White};
    font-size: 22px;
    letter-spacing: -0.44px;
  }

  .afterArrowBtnImg {
    width: 24px;
    height: 24px;
  }
`;
