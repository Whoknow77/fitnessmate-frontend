import React, { useCallback, useEffect, useState } from "react";
import * as S from "./StyledFix";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { validationState } from "./../../../recoil/atom";
import { userPutAPI } from "../../../apis/API";
import ProfileInput from "./ProfileInput/ProfileInput";
import TokenApi from "../../../apis/TokenApi";
import ValidateTest from "../../../utils/exp";
import { useRecoilState } from "recoil";

// 회원가입 페이지에 대한 정보를 모두 담는 컴포넌트
// 우선 이메일은
const FixProfile = (props) => {

	const navigate = useNavigate();

	const [name, setuserName] = useState("");
	const [birth, setbirthDate] = useState("");
	const [email, setloginEmail] = useState("");

	const handleBackPage = (e) => {
		e.preventDefault();
		navigate(-1);
	};

	// input onchange

	// 유효성 검사
	const [isValidState, setIsValidState] = useRecoilState(validationState);
	// 포커스 검사
	const [isFocused, setIsFocused] = useState(false);

	// 입력했는지 체크(한 번 입력한 순간 쭉 true)
	const [valueHistory, setValueHistory] = useState(false);


	const handleChange = (e) => {
		const name = e.target.name;

		if (name === "userName") {
			setuserName(e.target.value);
		} else if (name === "birthDate") {
			setbirthDate(e.target.value);
		}
		if (!valueHistory) {
			setValueHistory(true);
		}
	};

	// 제출
	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = {
			userName: name,
			birthDate: birth,
		};
		console.log("정보:", formData);

		try {
			// API 호출 및 form 데이터 전송
			const res = await TokenApi.post("user/private", formData);
			console.log("수정:", res.status);
			window.location.replace("fixprofile")
		} catch (error) {
			console.log(error);
			alert("수정 실패. 형식을 준수해주세요.");
		}
	};


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
	}, []); // 빈 의존성 배열을 추가하여 이 효과가 한 번만 실행되도록

	return (
		<S.SignupContainer>
			<S.SignupTitle>
				<S.TitleEmphasis>{name}님의 회원정보</S.TitleEmphasis>
			</S.SignupTitle>
			<S.ProfileInputcontainer>
				<ProfileInput
					placeholder="2자리 이상"
					name="userName"
					value={name}
					handleChange={handleChange}
				>
					이름
				</ProfileInput>
				<ProfileInput
					placeholder="YYYY-MM-DD"
					name="birthDate"
					value={birth}
					handleChange={handleChange}
				>
					생년월일
				</ProfileInput>
				<S.NonFix>
					<p className="nonfix-title">이메일</p>
					<div className="nonfix-content">{email}</div>
				</S.NonFix>
			</S.ProfileInputcontainer>
			<S.FixPassword onClick={() => { navigate("../fixpassword"); }}>비밀번호 변경하기</S.FixPassword>
			<S.ButtonContainer>
				<S.CancelButton onClick={handleBackPage}>취소</S.CancelButton>
				<S.SaveButton onClick={handleSubmit} type="submit">변경 사항 저장하기</S.SaveButton>
			</S.ButtonContainer>
		</S.SignupContainer>
	);
};

export default FixProfile;
