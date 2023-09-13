import styled from "styled-components";
import theme from "../../styles/theme";

export const RecommendAddModalWrapper = styled.div`
  display: flex;
  width: 395px;
  height: 525px;
  padding: 24px;
  gap: 32px;
  border-radius: 12px;
  border: 1px solid var ${theme.Gray20};
  background: ${theme.White};
  box-shadow: 0px 4px 5px 0px rgba(133, 132, 132, 0.05);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: relative;
  flex-direction: column;
  .recommendAddModalTitleWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    .recommendAddModalTitle {
      color: ${theme.Black};
      font-size: 24px;
      line-height: 150%; /* 36px */
      letter-spacing: -0.48px;
    }
    .recommendAddModalQuitBtn {
      width: 24px;
      height: 24px;
      padding: 4.8px;
      position: absolute;
      cursor: pointer;
      right: 24px;
      top: 28px;
    }
  }
  .recommendAddModalDivsionList {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    .recommendAddModalBtnWrapper {
      display: flex;
      padding: 10px;
      justify-content: flex-end;
      width: 100%;
      align-items: center;
      gap: 10px;
      .recommendAddModalModifyBtn {
        color: ${theme.Brand};
        font-size: 18px;
        font-weight: 700;
        letter-spacing: -0.36px;
      }
    }
  }
`;

export const ModifyOptionWrapper = styled.div`
  display: flex;
  padding: 12px 18px;
  gap: 12px;
  justify-content: center;
`;

export const ModifyOptionButton = styled.button`
  color: ${({ isSelected }) => (isSelected ? theme.White : theme.Brand)};
  font-size: 18px;
  line-height: 150%; /* 27px */
  letter-spacing: -0.36px;
  display: flex;
  padding: 10px 20px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  background: ${({ isSelected }) => (isSelected ? theme.Brand : theme.White)};
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.05);
  &:hover {
    opacity: 0.8;
  }
`;

export const ModifyOptionContent = styled.div`
  margin-bottom: 80px;
  display: flex;
  gap: 8px;
  justify-content: center;
  .modifyInput {
    width: 90px;
    text-align: center;
    color: #000;
    font-size: 48px;
    line-height: 150%; /* 72px */
    letter-spacing: -0.96px;
    border-bottom: 2px solid #000;
  }
  .modifyInputUnit {
    color: #000;
    font-size: 48px;
    line-height: 150%; /* 72px */
    letter-spacing: -0.96px;
  }
`;
