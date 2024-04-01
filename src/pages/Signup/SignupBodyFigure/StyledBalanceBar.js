import theme from "./../../../styles/theme";
import { styled } from "styled-components";

export const FilterPriceSlide = styled.div`
  position: relative;
  height: 4px;
  width: 295px;
  border-radius: 3px;
  background: ${theme.Neutral900};
`;

export const FilterPriceSlideInner = styled.div`
  position: absolute;
  left: 0%;
  right: ${({ rangePercent }) => 99 - rangePercent}%;
  height: 4px;
  border-radius: 10px;
  background-color: ${theme.Brand600};
`;

export const FilterPriceRangeWrap = styled.div`
  position: relative;
`;

export const FilterPriceRange = styled.input`
  position: absolute;
  top: -11px;
  left: -3px;
  width: 102%;
  -webkit-appearance: none;
  background: none;
  &::-webkit-slider-thumb {
    height: 35px;
    width: 35px;
    border-radius: 50%;
    background: ${theme.Neutral300};
    -webkit-appearance: none;
    position: relative;
    top: -10px;
  }
`;
