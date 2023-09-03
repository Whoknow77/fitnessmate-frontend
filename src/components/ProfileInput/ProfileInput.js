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
  // 서버로부터 이메일 중복확인 + 유효식 검사
  const [isEmailState, setIsEmailState] = useRecoilState(EmailState);
  // 이메일 중복확인 모달
  const [isEmailModal, setIsEmailModal] = useState(false);
  // 입력했는지 체크
  const [valueHistory, setValueHistory] = useState(false);

  const emailduplicateCheck = (isVerified) => {
    setIsEmailState(isVerified);
  };
  // 서버로 부터 이메일 중복 체크
  const handleEmail = async () => {
    if (isValidState.loginEmail[0] !== "") {
      const verifyResponse = await userIdVerifyAPI.post(
        isValidState.loginEmail[0]
      );
      if (verifyResponse.data === "ok") {
        return true;
      }
      return false;
    }
  };

  // 중복 체크 한 경우
  const Available = (
    <span className="profileInputChecking">사용 가능한 이메일입니다</span>
  );

  // 중복 체크가 안됐거나 규칙이 맞지 않은 경우
  const NotAvailable = (
    <span className="profileInputWarning">
      이메일 중복확인을 하지 않았거나 중복된 이메일입니다
    </span>
  );

  // 이메일 중복검사 + 유효성검사를 입력할때마다 해야함
  const handleChange = (e) => {
    const value = e.currentTarget.value;
    const name = e.target.name;
    let exp = ValidateTest(name);

    // 유효성 검사
    const updatedValidationState = {
      ...isValidState,
      [name]: [value, exp && exp.test(value)],
    };
    setIsValidState(updatedValidationState);

    const passwordSame =
      updatedValidationState.password[0] ===
      updatedValidationState.password2[0];
    // 비밀번호 재확인(value는 그대로, 재확인만 함)
    if (name.includes("password")) {
      setIsValidState((pre) => ({
        ...pre,
        password2: [updatedValidationState.password2[0], passwordSame],
      }));
    }
    setValueHistory(true);
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
        setValueHistory={setValueHistory}
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
            // 중복 확인(Promise) + 유효성 검사 입력시마다
            // handleEmail().then((isVerified) => {
            //   emailduplicateCheck(isVerified);
            // });
            setIsEmailModal(true);
          }}
        >
          인증메일 발송
        </button>
      )}

      {/* 비밀번호 입력창에만 재확인 입력창을 하나 더 추가 */}
      {children === "비밀번호" && (
        <ProfileInputContentWrapper
          placeholder={isFocused ? "" : "비밀번호 재확인"}
          name="password2"
          setValueHistory={setValueHistory}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          onChange={handleChange}
        />
      )}
      {/* 이메일은 중복체크 까지 해야 함 */}
      {!isFocused ? (
        // 포커스 안 된 상태(이메일 유효성 검사)
        isValidState[name][1] ? (
          name === "loginEmail" ? (
            // 이메일인 경우
            isEmailState ? (
              // 중복체크가 된 경우
              Available
            ) : (
              // 중복 체크가 되지 않은 경우
              NotAvailable
            )
          ) : (
            ""
          )
        ) : (
          // 이메일이 아닌 경우
          <span className="profileInputWarning">
            {children} 생성규칙에 맞지 않습니다
          </span>
        )
      ) : (
        // 포커스 된 상태
        ""
      )}
      {isEmailModal && <EmailModal setIsEmailModal={setIsEmailModal} />}
    </S.ProfileInputContainer>
  );
};

export default ProfileInput;
