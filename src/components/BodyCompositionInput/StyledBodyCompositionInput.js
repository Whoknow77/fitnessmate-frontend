import styled from "styled-components";
import theme from "../../styles/theme";
export const BodyCompositionInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 474px;
  gap: 8px;
  .inputName {
    color: #000;
    font-size: 20px;
  }
  .bodyCompositionInputContent {
    display: flex;
    height: 60px;
    padding: 14px;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
    border-radius: 10px;
    background: ${({ theme }) => theme.Neutral200};
    border: ${({ isFocused, name, valueHistory, isValidState }) =>
      !isFocused && valueHistory
        ? isValidState[name][1]
          ? `1.5px solid ${theme.Neutral300}`
          : `1.5px solid ${theme.Error}`
        : `1.5px solid ${theme.Neutral300}`};
    .inputContent {
      &::-webkit-input-placeholder {
        color: ${({ theme }) => theme.Neutral600};
      }
      color: ${({ theme }) => theme.Neutral600};
      font-size: 18px;
    }
  }
  .profileInputWarning {
    color: ${theme.Error};
    font-size: 16px;
  }
`;
