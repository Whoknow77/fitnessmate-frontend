import styled from "styled-components";
import theme from "../../../../styles/theme";

export const RecommendAddModalWrapper = styled.div`
  display: flex;
  width: 388px;
  height: 539px;
  padding: 20px;
  justify-content: space-between;
  border-radius: 16px;
  background: ${theme.Neutral0};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: relative;
  flex-direction: column;
  .recommendAddModalTitleWrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
    .quitBtnArea {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      .recommendAddModalQuitBtn {
        cursor: pointer;
      }
    }
    .recommendAddModalTitle {
      color: ${theme.Neutral990};
    }
    .recommendAddModalTitle .firstTitle {
      font-weight: 500;
      font-size: 22px;
      letter-spacing: -0.44px;
      line-height: 30.8px;
    }
    .recommendAddModalTitle .secondTitle {
      font-weight: 600;
      font-size: 22px;
      letter-spacing: -0.44px;
      line-height: 30.8px;
    }
  }
  .middleModalArea {
    display: flex;
    flex-direction: column;
    gap: 14px;
    .middleModalTitle {
      font-weight: 500;
      color: ${theme.Neutral800};
      font-size: 16px;
      letter-spacing: -0.32px;
      line-height: 22.4px;
    }
    .recommendAddModalDivsionList {
      display: flex;
      flex-direction: column;
      gap: 8px;
      .recommendAddModalBtnWrapper {
        display: flex;
        padding: 10px;
        justify-content: flex-end;
        width: 100%;
        align-items: center;
        gap: 10px;
        .recommendAddModalModifyBtn {
          color: ${theme.Brand600};
          font-size: 18px;
          font-weight: 700;
          letter-spacing: -0.36px;
        }
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
  color: ${({ isSelected }) => (isSelected ? theme.Neutral0 : theme.Brand600)};
  font-size: 18px;
  line-height: 150%; /* 27px */
  letter-spacing: -0.36px;
  display: flex;
  padding: 10px 20px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  background: ${({ isSelected }) =>
    isSelected ? theme.Brand600 : theme.Neutral0};
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
