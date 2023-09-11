// < 가로길이가 짧은 버튼 >

import React from "react";
import * as S from "./StyledButton";
import "./StyledButtons.css";

function SmallButton({ children, handleSubmit, isReady }) {
  return (
    <S.SmallButtonWrapper
      className="Button"
      onClick={handleSubmit}
      isReady={isReady}
    >
      {children}
    </S.SmallButtonWrapper>
  );
}

export default SmallButton;
