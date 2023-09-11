import { BeforeArrowButtonWrapper } from "./StyledButton";
import leftarrow from "../../assets/images/leftarrow2.svg";
export const BeforeArrowButton = ({ handleClick }) => {
  return (
    <BeforeArrowButtonWrapper onClick={handleClick}>
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
