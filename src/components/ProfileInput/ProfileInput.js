import * as S from "./StyledProfileInput";
import { userIdVerifyAPI } from "../../apis/API";
import { validationState } from "../../recoil/atom";
import { ProfileInputContentWrapper } from "./StyledProfileInput";
import { useRecoilState } from "recoil";
import { useState } from "react";
import EmailModal from "./../Modal/EmailModal";
import ValidateTest from "./../../utils/exp";

const ProfileInput = ({ placeholder, children, name }) => {
	// 유효성 검사
	const [isValidState, setIsValidState] = useRecoilState(validationState);

	// 포커스 검사
	const [isFocused, setIsFocused] = useState(false);

	// 이메일 모달
	const [isEmailModal, setIsEmailModal] = useState(false);

	// 이메일 중복체크
	const [dupCheck, setdupCheck] = useState(false);

	const [inputvalue, setInputValue] = useState(isValidState[name][0]);

	// 입력했는지 체크(한 번 입력한 순간 쭉 true)
	const [valueHistory, setValueHistory] = useState(false);

	// 비밀번호 재확인 input
	const [password2, setPassword2] = useState(isValidState[name][0]);

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
	let NotAvailable = "";
	if (name === "weight" || name === "height") {
		NotAvailable = (
			<span className="profileInputWarning">
				{children}를 다시 입력해주세요
			</span>
		);
	} else {
		NotAvailable = (
			<span className="profileInputWarning">
				{children}을 다시 입력해주세요
			</span>
		);
	}

	// 이메일 중복검사 + 유효성검사를 입력할때마다 해야함
	const handleChange = (e) => {
		const value = e.currentTarget.value;
		const name = e.target.name;
		if (name !== "password2") {
			setInputValue(value);
		} else {
			setPassword2(value);
		}
		let exp = ValidateTest(name);

		// 매번 서버로부터 중복 체크
		//if (name === "loginEmail") {
		//  handleEmail(value).then((isVerified) => {
		//    setdupCheck(isVerified);
		//    setIsValidState((pre) => ({
		//      ...pre,
		//      [name]: [value, exp && exp.test(value) && isVerified],
		//    }));
		//  });
		//} else {
		if (name === "password") {
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
		} else {
			setIsValidState((pre) => ({
				...pre,
				[name]: [value, exp && exp.test(value)],
			}));
		}
		//}

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
				placeholder={placeholder}
				name={name}
				valueHistory={valueHistory}
				isValidState={isValidState}
				isFocused={isFocused}
				value={inputvalue}
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
					placeholder="비밀번호를 재입력해주세요"
					name="password2"
					valueHistory={valueHistory}
					isValidState={isValidState}
					isFocused={isFocused}
					value={password2}
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
