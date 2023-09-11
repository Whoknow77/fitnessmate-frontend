import { AfterArrowButtonWrapper } from "./StyledButton";
import rightarrow from "../../assets/images/rightarrow3.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const AfterArrowButton = ({ handleClick, children, isReady }) => {
  return (
    <AfterArrowButtonWrapper onClick={handleClick} isReady={isReady}>
      <span className="afterArrowBtnText">{children}</span>
      <img
        src={rightarrow}
        alt="다음 버튼 이미지"
        className="afterArrowBtnImg"
      />
    </AfterArrowButtonWrapper>
  );
};

export default AfterArrowButton;
