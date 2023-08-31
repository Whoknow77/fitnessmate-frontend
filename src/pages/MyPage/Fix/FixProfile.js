import React, { useCallback, useEffect, useState } from "react";
import * as S from "./StyledFix";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { validationState } from "./../../../recoil/atom";
import { userPutAPI } from "../../../apis/API";
import {
	MiddleButton,
	BeforeButton,
	ProfileInput,
} from "./../../../components/";
import TokenApi from "../../../apis/TokenApi";

// 회원가입 페이지에 대한 정보를 모두 담는 컴포넌트
// 우선 이메일은
const FixProfile = (props) => {
	const navigate = useNavigate();

	const isValidState = useRecoilValue(validationState);

	const handleBackPage = (e) => {
		e.preventDefault();
		navigate(-1);
	};

	const [name, setName] = useState("");

	
	// 제출
	const handleSubmit = async (e) => {
		e.preventDefault();
			const submission = {
				userName: name,
				loginEmail: loginEmail,
				birthDate: birthDate,
			};

			console.log(submission.userName);

			console.log("여기로 못 넘어오니?");
			const res = await userPutAPI.put("", submission);
			if (res.data.accessToken) {
				const accessToken = res.data.accessToken;
				const refreshToken = res.data.refreshToken;
				// 토큰 저장
				localStorage.setItem("accessToken", accessToken);
				localStorage.setItem("refreshToken", refreshToken);
				navigate("/");
			} else {
				alert("수정 실패");
			}

		// 모든 유효성 검사 + 이메일 중복 확인을 만족해야 제출
	};


	const [userName, setuserName] = useState(null);
	const [birthDate, setbirthDate] = useState(null);
	const [loginEmail, setloginEmail] = useState(null);

	const fetchData = async () => {
		try {
			const response = await TokenApi.get("user/private");
			setuserName(response.data.userName);
			setbirthDate(response.data.birthDate);
			setloginEmail(response.data.loginEmail);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	});

	return (
		<S.SignupContainer>
			<S.SignupTitle>
				<S.TitleEmphasis>{userName}님의 회원정보</S.TitleEmphasis>
			</S.SignupTitle>
			<form onSubmit={handleSubmit}>
			<S.ProfileInputcontainer>
				<ProfileInput
					name="userName"
					defaultValue={userName}
				>
					이름
				</ProfileInput>
				<ProfileInput
					placeholder="생년월일을 입력해주세요 ex) 1998-06-16"
					name="birthDate"
					defaultValue={birthDate}
				>
					생년월일
				</ProfileInput>
				<ProfileInput
					placeholder="이메일을 입력해주세요"
					name="loginEmail"
					defaultValue={loginEmail}
				>
					이메일
				</ProfileInput>
			</S.ProfileInputcontainer>
			<S.FixPassword onClick={() => { navigate("../fixpassword"); }}>비밀번호 변경하기</S.FixPassword>
			<S.ButtonContainer>
				<BeforeButton handleSubmit={handleBackPage} />
				<MiddleButton handleSubmit={handleSubmit} type="submit" >변경사항 저장하기</MiddleButton>
			</S.ButtonContainer>
			</form>
		</S.SignupContainer>
	);
};

export default FixProfile;

// const isValidState = useRecoilValue(validationState);

// 	const handleBackPage = (e) => {
// 		e.preventDefault();
// 		navigate(-1);
// 	};

// 	const [submission, setSubmission] = useState({
//     userName: '',
// 		birthDate: '',
// 		loginEmail: '',
//   });

// 	const { userName, birthDate, loginEmail } = submission; //비구조화 할당

//   const onChange = (event) => {
//     const { value, name } = event.target; //event.target에서 name과 value만 가져오기
//     setSubmission({
//       ...submission,
//       [name]: value,
//     });
//   };

// 	const fetchData = async () => {
// 		try {
// 			const response = await TokenApi.get("user/private");
// 			setSubmission(response.data);
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	};