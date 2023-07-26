import styled from "styled-components";
export const InputContainer = styled.span`
  width: 433px;
  height: 89px;
  gap: 8px;
  display: flex;
  flex-direction: column;

  .InputName {
    color: #000;
    font-size: 20px;
    .essentialSymbol {
      color: #eb444c;
      font-size: 18px;
    }
  }
`;

export const InputContent = styled.input`
  border: ${({ isChecked }) => (isChecked ? "none" : "1.5px solid #EB444C")};
  &::-webkit-input-placeholder {
    color: #9a9798;
  }
  border-radius: 10px;
  padding: 14px;
  background: #f5f6f7;
  width: 100%;
  color: #9a9798;
  font-size: 18px;
`;

export const InputWarning = styled.span`
  color: #eb444c;
  font-size: 16px;
`;
