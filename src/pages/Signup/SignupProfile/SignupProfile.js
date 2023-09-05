import * as S from "../StyledSignup";
import { useRecoilValue } from "recoil";
import { BeforeButton, MiddleButton, ProfileInput } from "../../../components";
import { useNavigate } from "react-router-dom";
import { validationState } from "./../../../recoil/atom";

// 회원가입 페이지에 대한 정보를 모두 담는 컴포넌트
const SignupProfile = () => {
  const navigate = useNavigate();
  const isValidState = useRecoilValue(validationState);

  const handleBackPage = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  // 제출
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      Object.entries(isValidState)?.filter(([key, value]) => {
        return value[1] === true;
      }).length >= 6
    ) {
      navigate(`bodyinfo`);
    }
  };

  return (
    <S.SignupContainer>
      <S.SignupTitle status="1">
        <div className="statusBar">
          <div className="statusBar2"></div>
        </div>
        회원 정보를 입력해주세요
      </S.SignupTitle>
      <S.ProfileInputcontainer>
        <ProfileInput placeholder="2자리 이상" name="userName">
          이름
        </ProfileInput>
        <ProfileInput placeholder="YYYY-MM-DD" name="birthDate">
          생년월일
        </ProfileInput>
        <ProfileInput placeholder="이메일을 입력해주세요" name="loginEmail">
          이메일
        </ProfileInput>
        <ProfileInput
          placeholder="8자리 이상의 영문 숫자 조합 "
          name="password"
        >
          비밀번호
        </ProfileInput>
      </S.ProfileInputcontainer>
      <S.ButtonContainer>
        <BeforeButton handleSubmit={handleBackPage} />
        <MiddleButton handleSubmit={handleSubmit}>다음</MiddleButton>
      </S.ButtonContainer>
    </S.SignupContainer>
  );
};

export default SignupProfile;
