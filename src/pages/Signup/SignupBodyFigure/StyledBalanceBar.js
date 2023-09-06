import theme from "./../../../styles/theme";
import { styled } from "styled-components";

export const FilterPriceSlide = styled.div`
  position: relative;
  height: 4px;
  width: 295px;
  border-radius: 3px;
  background: ${theme.Gray80};
`;

export const FilterPriceSlideInner = styled.div`
  position: absolute;
  left: 30%;
  right: 30%;
  width: 97px;
  height: 4px;
  border-radius: 3px;
  background: ${theme.BrandDark};
`;
