import * as S from "../StyledSignup";
import { useRecoilValue } from "recoil";
import { BeforeButton, MiddleButton, ProfileInput } from "../../../components";
import { useNavigate } from "react-router-dom";
import { validationState } from "./../../../recoil/atom";
import { useEffect, useState } from "react";

// 회원가입 페이지에 대한 정보를 모두 담는 컴포넌트
const SignupProfile = () => {
	const navigate = useNavigate();
	const isValidState = useRecoilValue(validationState);
	const [isReady, setIsReady] = useState(false);

	const handleBackPage = (e) => {
		e.preventDefault();
		navigate(-1);
	};

	// 모든 검사를 통과했는지를 반환하는 함수
	// 이름 생년월일 이메일 이메일인증 패스워드 패스워드2 맞아야 넘어감
	const handleValidate = () => {
		return (
			Object.entries(isValidState)?.filter(([key, value]) => {
				return value[1];
			}).length >= 5
		);
	};

	useEffect(() => {
		if (handleValidate()) {
			setIsReady(true);
		}
	}, [isValidState]);

	// 제출
	const handleSubmit = (e) => {
		e.preventDefault();
		if (handleValidate() && isReady) {
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
				<ProfileInput placeholder="8자리 이상 영문, 숫자 조합" name="password">
					비밀번호
				</ProfileInput>
			</S.ProfileInputcontainer>
			<S.ButtonContainer>
				<BeforeButton handleSubmit={handleBackPage} />
				<MiddleButton handleSubmit={handleSubmit} isReady={isReady}>
					다음
				</MiddleButton>
			</S.ButtonContainer>
		</S.SignupContainer>
	);
};

export default SignupProfile;
