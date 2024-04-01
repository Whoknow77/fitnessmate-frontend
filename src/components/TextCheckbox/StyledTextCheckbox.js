// < 글만 있는 체크박스 스타일 >

import styled from "styled-components";

// 만들어진 레이아웃 특정 란에 넣으면
// 거기에 맞게 채워지도록 가로 100%로 설정(디자인에 따라 세로는 설정 X)

export const TextCheckboxWrapper = styled.button`
  width: 100%;
  display: flex;
  padding: 10px 24px;
  transition: all 0.1s ease-out;
  background: ${({ theme }) => theme.Neutral200};
  border-radius: 10px;
  justify-content: space-between;
  align-items: center;

  border: 2px solid
    ${({ theme, isSelected }) =>
      isSelected ? theme.Brand600 : theme.Neutral300};

  .choice-article {
    // 텍스트가 새로운 줄로 넘어가지 않게됨
    white-space: nowrap;
    // 텍스트가 요소를 넘어갈 경우 숨기
    overflow: hidden;
    // 글자가 길어질 경우 ...으로 표시
    text-overflow: ellipsis;
    transition: all 0.3s ease-out;
    color: ${({ isSelected, theme }) =>
      isSelected ? theme.Brand600 : theme.Neutral800};
    font-size: 22px;
  }
  .choice-articleinput {
    transition: all 0.3s ease-out;
    color: ${({ isSelected, theme }) =>
      isSelected ? theme.Brand600 : theme.Neutral800};
    font-size: 22px;
  }

  .check-background {
    transition: all 0.3s ease-out;
    fill: ${({ isSelected, theme }) =>
      isSelected ? theme.Brand600 : theme.Neutral200};
  }

  .check-shape {
    transition: all 0.3s ease-out;
    fill: ${({ isSelected, theme }) =>
      isSelected ? theme.Neutral0 : theme.Gray30};
  }
  &:hover {
    border: 2px solid
      ${({ isSelected, theme }) => (isSelected ? theme.Brand600 : theme.Gray30)};

    .check-shape {
      fill: ${({ isSelected, theme }) =>
        isSelected ? theme.Neutral0 : theme.Neutral990};
    }

    .choice-article {
      color: ${({ isSelected, theme }) =>
        isSelected ? theme.Brand600 : theme.Neutral990};
    }
  }
`;

export const MiddleTextCheckboxWrapper = styled(TextCheckboxWrapper)`
  width: 47%;
  @media screen and (max-width: 800px) {
    width: 47%;
  }
  @media screen and (max-width: 660px) {
    width: 100%;
  }
`;

export const SmallTextCheckboxWrapper = styled(TextCheckboxWrapper)`
  width: 30%;
  @media screen and (max-width: 800px) {
    width: 47%;
  }
  @media screen and (max-width: 660px) {
    width: 100%;
  }
`;

export const SmallFontTextCheckboxWrapper = styled.button`
  width: 100%;
  height: 48px;
  display: flex;
  padding: 8px 14px;
  transition: all 0.1s ease-out;
  background: ${({ theme }) => theme.Neutral200};
  border-radius: 10px;
  justify-content: space-between;
  align-items: center;

  border: 2px solid
    ${({ theme, isSelected }) =>
      isSelected ? theme.Brand600 : theme.Neutral300};

  .choice-article {
    // 텍스트가 새로운 줄로 넘어가지 않게됨
    white-space: nowrap;
    // 텍스트가 요소를 넘어갈 경우 숨기
    overflow: hidden;
    // 글자가 길어질 경우 ...으로 표시
    text-overflow: ellipsis;
    transition: all 0.3s ease-out;
    color: ${({ isSelected, theme }) =>
      isSelected ? theme.Brand600 : theme.Neutral800};
    font-size: 16px;
    font-weight: 500;
  }

  .check-background {
    transition: all 0.3s ease-out;
    fill: ${({ isSelected, theme }) =>
      isSelected ? theme.Brand600 : theme.Neutral200};
  }

  .check-shape {
    transition: all 0.3s ease-out;
    fill: ${({ isSelected, theme }) =>
      isSelected ? theme.Neutral0 : theme.Gray30};
  }
  &:hover {
    border: 2px solid
      ${({ isSelected, theme }) => (isSelected ? theme.Brand600 : theme.Gray30)};

    .check-shape {
      fill: ${({ isSelected, theme }) =>
        isSelected ? theme.Neutral0 : theme.Neutral990};
    }

    .choice-article {
      color: ${({ isSelected, theme }) =>
        isSelected ? theme.Brand600 : theme.Neutral990};
    }
  }
`;
