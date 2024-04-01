import { styled } from "styled-components";
import theme from "./../../styles/theme";

export const ModalBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const ModalWrapper = styled.div`
  display: flex;
  width: 470px;
  padding: 24px;
  flex-direction: column;
  justify-content: flex-end;
  gap: 24px;
  border: 1px solid ${theme.Gray30};
  border-radius: 16px;
  background: ${theme.Neutral0};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: relative;

  .emailModalTextWrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;
    .xButton {
      display: flex;
      justify-content: flex-end;
      img {
        width: 24px;
        height: 24px;
        padding: 0;
        cursor: pointer;
      }
    }
    .emailModalTitle {
      color: ${theme.Neutral990};
      font-size: 24px;
      font-weight: 600;
      line-height: 130%; /* 31.2px */
      letter-spacing: -0.48px;
    }
    .emailModalContentWrapper {
      display: flex;
      gap: 12px;
      .emailModalContent {
        color: var(--Gray80, #4e5968);
        font-size: 16px;
        font-weight: 600;
        letter-spacing: -0.32px;
      }
      .retransmitBtn {
        color: ${theme.Brand600};
        font-size: 16px;
        font-weight: 600;
        letter-spacing: -0.32px;
      }
    }
  }
`;
