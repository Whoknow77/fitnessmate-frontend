import * as S from "./StyledFix";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { validationState } from "./../../../recoil/atom";
import {
  MiddleButton,
  BeforeButton,
  ProfileInput,
} from "./../../../components/";

// 회원가입 페이지에 대한 정보를 모두 담는 컴포넌트
// 우선 이메일은
const FixProfile = () => {
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
      }).length === 5
    ) {
      navigate(`/`);
    }

    // 모든 유효성 검사 + 이메일 중복 확인을 만족해야 다음 페이지로 넘어감
  };

  return (
    <S.SignupContainer>
      <S.SignupTitle>
        <S.TitleEmphasis>김정욱님의 회원정보</S.TitleEmphasis>
      </S.SignupTitle>
      <S.ProfileInputcontainer>
        <ProfileInput
          placeholder="{username}"
          name="userName"
        >
          이름
        </ProfileInput>
        <ProfileInput
          placeholder="생년월일을 입력해주세요 ex) 1998-06-16"
          name="birthDate"
        >
          생년월일
        </ProfileInput>
        <ProfileInput placeholder="이메일을 입력해주세요" name="loginEmail">
          이메일
        </ProfileInput>
      </S.ProfileInputcontainer>
			<S.FixPassword onClick={() => {navigate("../fixpassword");}}>비밀번호 변경하기</S.FixPassword>
      <S.ButtonContainer>
        <BeforeButton handleSubmit={handleBackPage} />
        <MiddleButton handleSubmit={handleSubmit}>변경사항 저장하기</MiddleButton>
      </S.ButtonContainer>
    </S.SignupContainer>
  );
};

export default FixProfile;
