// < 가로길이가 중간인 버튼 >

import React from "react";
import * as S from "./StyledButton";
import "./StyledButtons.css";

function MiddleButton({ children, handleSubmit, isReady }) {
  return (
    <S.MiddleButtonWrapper
      className="Button"
      onClick={handleSubmit}
      isReady={isReady}
    >
      {children}
    </S.MiddleButtonWrapper>
  );
}

export default MiddleButton;
