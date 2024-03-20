import { styled } from "styled-components";
import theme from "./../../styles/theme";

export const ModalBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const ModalWrapper = styled.div`
  display: flex;
  width: 470px;
  padding: 28px;
  flex-direction: column;
  justify-content: flex-end;
  gap: 24px;
  border: 1px solid ${theme.Gray30};
  border-radius: 16px;
  background: ${theme.White};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .leaveModalTitle {
    color: ${theme.Black};
    font-size: 24px;
    font-weight: 600;
    line-height: 130%; /* 31.2px */
    letter-spacing: -0.48px;
  }
  .leaveModalButtonWrapper {
    display: flex;
    gap: 5px;
    justify-content: center;
    button {
      font-size: 20px;
      font-weight: 500;
      letter-spacing: -0.4px;
      border-radius: 12px;
      display: flex;
      height: 62px;
      width: 206px;
      padding: 22px 24px;
      justify-content: center;
      align-items: center;
      gap: 3px;
    }
    .cancleBtn {
      color: var(--Brand, #0b98ff);
      border: 1px solid ${theme.Brand};
    }

    .leaveBtn {
      color: ${theme.White};
      background: ${theme.Brand};
    }
  }
`;
