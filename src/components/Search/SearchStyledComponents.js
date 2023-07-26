import styled from "styled-components";

// 테두리(변수), 그림자

export const SearchBox = styled.div`
  width: 686px;
  height: 56px;
  padding: 14px;
  border-radius: 10px;
  border: 1px solid ${({ isClicked }) => (isClicked ? "#F5F6F7" : "#707070")};
  display: flex;
  gap: 14px;
  align-items: center;
  box-shadow: ${({ isClicked }) =>
    isClicked ? "2px 2px 9px 0px rgba(0,0,0,0.1)" : "none"};

  input {
    &::-webkit-input-placeholder {
      color: #9a9798;
    }
    border: none;
    width: 100%;
    color: #9a9798;
    font-size: 18px;
    font-weight: 500;
  }
  img {
    width: 24px;
    height: 24px;
  }
`;
