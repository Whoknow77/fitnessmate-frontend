import styled from "styled-components";
import theme from "../../styles/theme";

export const SearchContainer = styled.div`
  width: 627px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const SearchBarContainer = styled.div`
  width: 627px;
  height: 58px;
  padding: 10px 12px 10px 18px;
  background: ${theme.Neutral900};
  border-radius: 16px;
  border: ${({ isClicked, theme }) =>
    isClicked ? `2px solid ${theme.Brand600}` : "1px solid #eaeef1"};
  display: flex;
  align-items: center;
  justify-content: space-between;

  .iconArea {
    display: flex;
    gap: 8px;
    align-items: center;

    .searchIcon {
      cursor: pointer;
      width: 24px;
      height: 24px;
      margin: 10px;
    }

    .closeIcon {
      width: 18px;
      height: 18px;
      margin: 13px;
      cursor: pointer;
    }
  }
`;

export const SearchInputContent = styled.input`
  &::-webkit-input-placeholder {
    color: ${theme.Neutral0};
    font-weight: 600;
    font-size: 18px;
    letter-spacing: -0.36px;
    line-height: 23.4px;
  }
  border: none;
  width: 100%;
  color: ${theme.Neutral0};
  font-weight: 600;
  font-size: 18px;
  letter-spacing: -0.36px;
  line-height: 23.4px;
`;

export const SearchBottomContainer = styled.div`
  margin-left: 6px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  .searchBottomTitle {
    font-weight: 500;
    font-size: 16px;
    letter-spacing: -0.32px;
    color: ${theme.Neutral600};
  }

  .searchBottomContent {
    display: flex;
    gap: 10px;

    .popularKeyword {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 12px;
      background: ${theme.Neutral200};
      border-radius: 8px;
      cursor: pointer;
    }
    .popularKeyword p {
      color: ${theme.Neutral800};
      font-weight: 500;
      font-size: 16px;
      letter-spacing: -0.32px;
    }
  }
`;
