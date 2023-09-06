import * as S from "./StyledBodyCompositionInput";
import { useRecoilState } from "recoil";
import { validationState } from "../../recoil/atom";
import { useState } from "react";
import ValidateTest from "../../utils/exp";

// 체성분 input
const BodyCompositionInput = ({ children, name }) => {
  // children : 골격근량 or 체지방량
  const [isFocused, setIsFocused] = useState(false);
  const [isValidState, setIsValidState] = useRecoilState(validationState);
  const [valueHistory, setValueHistory] = useState(false);

  const handleChange = (e) => {
    const value = e.currentTarget.value;
    const name = e.target.name;
    let exp = ValidateTest(name);

    const updatedState = {
      ...isValidState,
      [name]: [parseFloat(value), exp && exp.test(value)],
    };
    setIsValidState(updatedState);

    if (!valueHistory) {
      setValueHistory(true);
    }
  };

  const NotAvailable = (
    <span className="profileInputWarning">{children}을 다시 입력해주세요</span>
  );

  return (
    <S.BodyCompositionInputContainer
      isFocused={isFocused}
      valueHistory={valueHistory}
      isValidState={isValidState}
      name={name}
    >
      <span className="inputName">{children}</span>
      <div className="bodyCompositionInputContent">
        <input
          className="inputContent"
          name={name}
          placeholder={
            isFocused
              ? ""
              : name === "muscleMass"
              ? "숫자만 입력 ex) 37"
              : "숫자만 입력 ex) 8"
          }
          onChange={handleChange}
          // 클릭했을 때
          onFocus={() => {
            setIsFocused(true);
          }}
          // focus를 벗어났을 때
          onBlur={() => {
            setIsFocused(false);
          }}
        />
      </div>
      {!isFocused && valueHistory
        ? isValidState[name][1]
          ? ""
          : NotAvailable
        : ""}
    </S.BodyCompositionInputContainer>
  );
};

export default BodyCompositionInput;
