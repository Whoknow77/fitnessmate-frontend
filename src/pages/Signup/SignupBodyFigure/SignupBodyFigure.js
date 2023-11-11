import * as S from "../StyledSignup";
import { useNavigate } from "react-router-dom";
import rightarrow from "../../../assets/images/rightarrow.svg";
import { MiddleButton, BeforeButton } from "../../../components/";
import { useRecoilState } from "recoil";
import { validationState } from "../../../recoil/atom";
import { useEffect, useState } from "react";
import { userPostAPI } from "../../../apis/API";
import {
	FilterPriceSlide,
	FilterPriceRangeWrap,
	FilterPriceRange,
	FilterPriceSlideInner,
} from "./StyledBalanceBar";
import MiddleTextCheckbox from "../../../components/TextCheckbox/MiddleTextCheckbox";

const SignupBodyFigure = () => {
	// balance 문구
	const handleBalanceText = (value) => {
		const rangevalue = Number(value);
		if (rangevalue >= 1 && rangevalue <= 4) {
			return "하체가 상체보다 더 발달했어요";
		} else if (rangevalue === 5) {
			return "둘 다 발달했거나 큰 차이 없어요";
		} else if (rangevalue >= 6 && rangevalue <= 9) {
			return "상체가 하체보다 더 발달했어요";
		}
	};

	const navigate = useNavigate();
	const currenturl = window.location.pathname;
	const [isValidState, setIsValidState] = useRecoilState(validationState);

	// 체형 옵션 배열
	const [isCategorySelect, setIsCategorySelect] = useState(false);

	// balance 바
	const [rangeValue, setRangeValue] = useState(
		parseFloat(isValidState.upDownBalance) * 10 || 5
	);

	// balacne text
	const [rangeText, setRangeText] = useState(handleBalanceText(rangeValue));

	// 버튼 on/off
	const [isReady, setIsReady] = useState(false);

	const prcieRangeValueHandler = (e) => {
		setRangeValue(parseInt(e.target.value));

		setRangeText(handleBalanceText(e.target.value));
		setIsValidState((pre) => ({
			...pre,
			upDownBalance: [e.target.value / 10, true],
		}));
	};

	const handleValidate = () => {
		return (
			Object.entries(isValidState)?.filter(([key, value]) => {
				return value[1];
			}).length >= 11
		);
	};

	useEffect(() => {
		if (handleValidate()) {
			setIsReady(true);
		}
	}, [isValidState]);

	// balanace 50%로 초기화
	useEffect(() => {
		setIsValidState((pre) => ({
			...pre,
			upDownBalance: [5 / 10, true],
		}));
	}, []);

	// [bodyFat, muscleMass]
	const categorylist = [
		["근육질 체형", [10, 40]],
		["마른 체형", [15, 30]],
		["보통 체형", [18, 35]],
		["통통한 체형", [20, 35]],
		["뚱뚱한 체형", [25, 35]],
	];

	const handleClick = (idx) => {
		const newArr = Array(categorylist.length).fill(false);
		newArr[idx] = true;
		setIsCategorySelect(newArr);
		setIsValidState((pre) => ({
			...pre,
			bodyFat: [categorylist[idx][1][0], true],
			muscleMass: [categorylist[idx][1][1], true],
		}));
	};

	const handleBackPage = (e) => {
		e.preventDefault();
		navigate(-1);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (isReady) {
			// 회원가입 요청에 넣을 데이터
			const submission = {};

			for (const key in isValidState) {
				// 비밀번호 재확인과 이메일 인증은 빼고 보냄
				if (key !== "password2" && key !== "emailModal") {
					submission[key] = isValidState[key][0];
				}
				if (key === "height" || key === "weight") {
					submission[key] = parseFloat(isValidState[key][0]);
				}
			}

			const res = await userPostAPI.post("", submission);
			if (res.data.accessToken) {
				const accessToken = res.data.accessToken;
				const refreshToken = res.data.refreshToken;
				// 토큰 저장
				localStorage.setItem("accessToken", accessToken);
				localStorage.setItem("refreshToken", refreshToken);
				localStorage.setItem("rememberMe", true);

				// 회원가입 객체 초기화
				const updatedState = Object.keys(isValidState).reduce((acc, key) => {
					acc[key] = ["", false];
					return acc;
				}, {});

				setIsValidState(updatedState);

				navigate("/signup/complete", { replace: false }); // 절대 경로로 이동
			} else {
				console.log("회원가입 오류");
				return { error: "Wrong Input" };
			}
		}
	};
	return (
		<S.SignupContainer>
			<S.SignupTitle status="3">
				<div className="statusBar">
					<div className="statusBar2"></div>
				</div>
				체형 정보를 입력해주세요
			</S.SignupTitle>
			<S.SignupUpdonwBalanceWrapper>
				<div className="updownBalanceBox">
					<span className="updownBalanceTitle">
						상/하체 균형을 조절해주세요
					</span>
					<div className="updownBalanceBar">
						<span className="updownBalanceBarTitle">{rangeText}</span>
						<div className="updownBalanceBarContent">
							<div className="balanceRatioBox">
								<span className="balanceRatio">상체 비중</span>
								<span className="balanceRatioPercent2">{rangeValue * 10}%</span>
							</div>
							<div className="balnaceBar">
								<FilterPriceSlide>
									<FilterPriceSlideInner
										rangePercent={Number(rangeValue) * 10}
									/>
								</FilterPriceSlide>
								<FilterPriceRangeWrap>
									<FilterPriceRange
										type="range"
										min={1}
										max={9}
										step="1"
										value={rangeValue}
										onChange={(e) => {
											prcieRangeValueHandler(e);
										}}
									/>
								</FilterPriceRangeWrap>
							</div>
							<div className="balanceRatioBox">
								<span className="balanceRatio">하체 비중</span>
								<span className="balanceRatioPercent">
									{100 - rangeValue * 10}%
								</span>
							</div>
						</div>
					</div>
					<span className="bodyfigureText">체형을 선택해주세요</span>
				</div>
				<S.SignupTextContainer>
					{categorylist?.map((item, index) => {
						return (
							<MiddleTextCheckbox
								key={index}
								handleClick={handleClick}
								isSelected={isCategorySelect[index]}
								elementidx={index}
							>
								{item[0]}
							</MiddleTextCheckbox>
						);
					})}
				</S.SignupTextContainer>
				<div className="directButtonContainer">
					<button
						className="directbutton"
						onClick={(e) => {
							e.preventDefault();
							navigate(`${currenturl}/direct`);
						}}
					>
						골격근량, 체지방량 직접 입력
						<img
							src={rightarrow}
							className="rightArrow"
							alt="직접 입력하기 버튼 이미지"
						/>
					</button>
				</div>
				<S.ButtonContainer>
					<BeforeButton handleSubmit={handleBackPage} />
					<MiddleButton handleSubmit={handleSubmit} isReady={isReady}>
						회원가입 완료
					</MiddleButton>
				</S.ButtonContainer>
			</S.SignupUpdonwBalanceWrapper>
		</S.SignupContainer>
	);
};

export default SignupBodyFigure;
