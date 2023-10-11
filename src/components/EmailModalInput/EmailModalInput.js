import * as S from "./StyledEmailModalInput";
import { validationState } from "../../recoil/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { verifyMailCheck } from "../../apis/API";

const EmailModalInput = ({ setIsEmailModal }) => {
	// 유효성 검사
	const [isValidState, setIsValidState] = useRecoilState(validationState);
	// 포커스 검사
	const [isFocused, setIsFocused] = useState(false);
	const [modalValue, setModalValue] = useState("");
	const [isEmailCodeChecked, setIsEmailCodeChecked] = useState(false);

	//
	const handleChange = (e) => {
		setModalValue(e.target.value);
	};

	// 이메일 인증 확인
	const handleCodeCheck = async () => {
		const request = {
			mailAddress: isValidState.loginEmail[0],
			verificationCode: modalValue,
		};
		try {
			const response = await verifyMailCheck.post("", request);
			if (response.data.status === "ok") {
				setIsEmailCodeChecked(true);
				setIsEmailModal(false);
				const updatedValidationState = {
					...isValidState,
					emailModal: ["", true],
				};
				setIsValidState(updatedValidationState);
			} else {
				console.log(response.data.status);
			}
		} catch (err) {
			console.log(err);
		}
	};

	// 인증 코드가 틀린 경우
	const NotEmailCodeChecked = (
		<span className="profileInputWarning">
			코드가 올바르지 않습니다. 다시 시도해보세요
		</span>
	);

	return (
		<S.EmailModalContainer isValidState={isValidState.emailModal[1]}>
			<input
				className="emailModalContent"
				placeholder={isFocused ? "" : "6자리 인증 코드 입력"}
				name="emailModal"
				isFocused={isFocused}
				onChange={handleChange}
				value={modalValue}
				onFocus={() => {
					setIsFocused(true);
				}}
				onBlur={() => {
					setIsFocused(false);
				}}
			/>
			<button className="checkBtn" type="button" onClick={handleCodeCheck}>
				인증 확인
			</button>
			{!isFocused
				? // 포커스 안 된 상태
				isEmailCodeChecked
					? ""
					: // input창에 입력값이 있는 경우
					!modalValue
						? ""
						: NotEmailCodeChecked
				: // 포커스 된 상태(공백)
				""}
		</S.EmailModalContainer>
	);
};

export default EmailModalInput;
