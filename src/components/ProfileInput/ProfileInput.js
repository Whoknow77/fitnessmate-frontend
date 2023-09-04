import * as S from "./StyledProfileInput";
import { userIdVerifyAPI, verifyMailPost } from "../../apis/API";
import { EmailState, validationState } from "../../recoil/atom";
import { ProfileInputContentWrapper } from "./StyledProfileInput";
import { useRecoilState, useRecoilValue } from "recoil";
import { useState } from "react";
import EmailModal from "./../Modal/EmailModal";
import ValidateTest from "./../../utils/exp";

// placeholder : Input창 마다 다양해서 Home에서 받아옴
// children : 아이디/비밀번호/이메일 등등..

const ProfileInput = ({ placeholder, children, name, defaultValue, value }) => {
  // 유효성 검사
  const [isValidState, setIsValidState] = useRecoilState(validationState);
  // 포커스 검사
  const [isFocused, setIsFocused] = useState(false);
  // 이메일 중복확인 모달
  const [isEmailModal, setIsEmailModal] = useState(false);

  const [dupCheck, setdupCheck] = useState(false);

  console.log(isValidState);

  // 입력했는지 체크(한 번 입력한 순간 쭉 true)
  const [valueHistory, setValueHistory] = useState(false);

  // 서버로 부터 매번 이메일 중복 체크
  const handleEmail = async (value) => {
    if (value !== "") {
      const verifyResponse = await userIdVerifyAPI.post(value);
      if (verifyResponse.data === "ok") {
        return true;
      }
      return false;
    }
  };

  // 이메일 인증을 한 경우
  const Available = (
    <span className="profileInputChecking">사용 가능한 이메일입니다</span>
  );

  // 이메일 인증을 하지 않은 경우
  const NotCodeAvailable = (
    <span className="profileInputWarning">이메일 인증을 해주세요</span>
  );

  // 규칙이 맞지 않은 경우
  const NotAvailable = (
    <span className="profileInputWarning">{children}을 다시 입력해주세요</span>
  );

  // 이메일 중복검사 + 유효성검사를 입력할때마다 해야함
  const handleChange = (e) => {
    const value = e.currentTarget.value;
    const name = e.target.name;
    let exp = ValidateTest(name);

    // 매번 서버로부터 중복 체크
    if (name === "loginEmail") {
      handleEmail(value).then((isVerified) => {
        setdupCheck(isVerified);
        setIsValidState((pre) => ({
          ...pre,
          [name]: [value, exp && exp.test(value) && isVerified],
        }));
      });
    } else {
      setIsValidState((pre) => ({
        ...pre,
        [name]: [value, exp && exp.test(value)],
      }));

      // 비밀번호 재확인
      // const passwordSame =
      //   updatedValidationState.password[0] ===
      //   updatedValidationState.password2[0];
      // // 비밀번호 재확인(value는 그대로, 재확인만 함)
      // if (name.includes("password")) {
      //   setIsValidState((pre) => ({
      //     ...pre,
      //     password2: [updatedValidationState.password2[0], passwordSame],
      //   }));
      // }
    }

    if (!valueHistory) {
      setValueHistory(true);
    }
  };

  return (
    <S.ProfileInputContainer isValidState={isValidState.loginEmail[1]}>
      <S.InputName>
        {children}
        <span className="essentialSymbol"> *</span>
      </S.InputName>
      {/* 체크가 되지 않았을때만 Warning 문구 */}
      <ProfileInputContentWrapper
        placeholder={isFocused ? "" : placeholder}
        name={name}
        defaultValue={defaultValue}
        value={value}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
        onChange={handleChange}
      />
      {name === "loginEmail" && (
        <button
          className="duplicateButton"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            if (dupCheck) {
              setIsEmailModal(true);
            }
          }}
        >
          인증메일 발송
        </button>
      )}

      {/* 비밀번호 입력창에만 재확인 입력창을 하나 더 추가 */}
      {children === "비밀번호" && (
        <ProfileInputContentWrapper
          placeholder={isFocused ? "" : "비밀번호를 재입력해주세요"}
          name="password2"
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          onChange={handleChange}
        />
      )}

      {!isFocused && valueHistory
        ? isValidState[name][1]
          ? name === "loginEmail"
            ? isValidState.emailModal[1]
              ? Available
              : NotCodeAvailable
            : ""
          : ""
          ? ""
          : NotAvailable
        : ""}
      {isEmailModal && <EmailModal setIsEmailModal={setIsEmailModal} />}
    </S.ProfileInputContainer>
  );
};

export default ProfileInput;
