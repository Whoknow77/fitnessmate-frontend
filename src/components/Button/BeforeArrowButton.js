import { BeforeArrowButtonWrapper } from "./StyledButton";
import leftarrow from "../../assets/images/leftarrow2.svg";
export const BeforeArrowButton = ({ handleClick, isLoading }) => {
  return (
    <BeforeArrowButtonWrapper onClick={handleClick} isLoading={isLoading}>
      <img
        src={leftarrow}
        alt="이전 버튼 이미지"
        className="beforeArrowBtnImg"
      />
      <span className="beforeArrowBtnText">이전</span>
    </BeforeArrowButtonWrapper>
  );
};

export default BeforeArrowButton;
