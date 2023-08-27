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
const FixPassword = () => {
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
        <S.TitleEmphasis>비밀번호 변경</S.TitleEmphasis>
      </S.SignupTitle>
      <S.ProfileInputcontainer>
			<ProfileInput
          placeholder="현재 비밀번호 8자리를 입력해주세요"
          name="password"
        >
          현재 비밀번호
        </ProfileInput>
				<ProfileInput
          placeholder="신규 비밀번호 8자리를 입력해주세요 "
          name="password"
        >
          신규비밀번호
        </ProfileInput>
				<ProfileInput
          placeholder="신규 비밀번호 8자리를 입력해주세요 "
          name="password"
        />
      </S.ProfileInputcontainer>
      <S.ButtonContainer>
        <BeforeButton handleSubmit={handleBackPage} />
        <MiddleButton handleSubmit={handleSubmit}>비밀번호 변경하기</MiddleButton>
      </S.ButtonContainer>
    </S.SignupContainer>
  );
};

export default FixPassword;
