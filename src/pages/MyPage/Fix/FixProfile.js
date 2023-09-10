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

	const handleNameChange = (e) => {
		setuserName(e.target.value);
		console.log(e.target.value)
	};

	const handleBirthDateChange = (e) => {
		setbirthDate(e.target.value);
	}

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


	// 이메일 중복검사 + 유효성검사를 입력할때마다 해야함
  const handleChange = (e) => {
    const value = e.currentTarget.value;
    const name = e.target.name;
    let exp = ValidateTest(name);

		if (name === "userName") {
			setuserName(e.target.value);
		}  else if (name === "birthDate") {
			setbirthDate(e.target.value);
		} else if (name === "password") {
        // 비밀번호 재확인
        const passwordSame = value === isValidState.password2[0];
        setIsValidState((pre) => ({
          ...pre,
          password2: [
            isValidState.password2[0],
            exp && exp.test(value) && passwordSame,
          ],
          password: [value, exp && exp.test(value) && passwordSame],
        }));
      } else if (name === "password2") {
        const passwordSame = value === isValidState.password[0];
        setIsValidState((pre) => ({
          ...pre,
          password2: [value, exp && exp.test(value) && passwordSame],
          password: [
            isValidState.password[0],
            exp && exp.test(value) && passwordSame,
          ],
        }));
      }
    if (!valueHistory) {
      setValueHistory(true);
    }
  };
	
	// 제출
	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("birthDate", birth);
		formData.append("userName", name);
		formData.append("loginEmail", email);
		console.log("정보:", formData);
	
		try {
			// API 호출 및 form 데이터 전송
			const res = await TokenApi.put("user/private", formData);
			console.log("수정:", res);
	
			if (res.data.accessToken) {
				const accessToken = res.data.accessToken;
				const refreshToken = res.data.refreshToken;
	
				// 토큰 저장
				localStorage.setItem("accessToken", accessToken);
				localStorage.setItem("refreshToken", refreshToken);
				alert("수정 성공");
			} else {
				alert("수정 실패");
			}
		} catch (error) {
			console.error(error);
			alert("수정 실패");
		}
	
		// 모든 유효성 검사 + 이메일 중복 확인을 만족해야 제출
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
			<form onSubmit={handleSubmit}>
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
				<S.SaveButton type="submit">변경 사항 저장하기</S.SaveButton>
			</S.ButtonContainer>
			</form>
		</S.SignupContainer>
	);
};

export default FixProfile;
