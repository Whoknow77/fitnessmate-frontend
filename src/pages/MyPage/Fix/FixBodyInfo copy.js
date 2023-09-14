import { useEffect, useState } from "react";
import * as S from "./StyledFix";
import { useNavigate } from "react-router-dom";
import {
	MiddleButton,
	BeforeButton,
	TextCheckbox,
} from "./../../../components/";
import ProfileInput from "./ProfileInput/ProfileInput";
import { useRecoilState } from "recoil";
import { validationState } from "../../../recoil/atom";
import TokenApi from "../../../apis/TokenApi";
import rightarrow from "../../../assets/images/rightarrow.svg";
import {
	FilterPriceSlide,
	FilterPriceRangeWrap,
	FilterPriceRange,
	FilterPriceSlideInner,
} from "../../Signup/SignupBodyFigure/StyledBalanceBar";


const FixBodyInfo = () => {
	const navigate = useNavigate();

	const [isValidState, setIsValidState] = useRecoilState(validationState);

	const handleBackPage = (e) => {
		e.preventDefault();
		navigate(-1);
	};

	const [userName, setuserName] = useState(null);
	const [height, setHeight] = useState(null);
	const [weight, setWeight] = useState(null);
	const [bodyFat, setBodyFat] = useState(null);
	const [muscleMass, setMuscleMass] = useState(null);
	const [upDownBalance, setUpDownBalance] = useState(null);

	const fetchData = async () => {
		try {
			const response_private = await TokenApi.get("user/private");
			setuserName(response_private.data.userName);
			const response_body = await TokenApi.get("bodyData/recent");
			console.log(response_body)
			setHeight(response_body.data.height);
			setWeight(response_body.data.weight);
			setBodyFat(response_body.data.bodyFat);
			setMuscleMass(response_body.data.muscleMass);
			setUpDownBalance(response_body.data.upDownBalance);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	// bodyinfo

	const currenturl = window.location.pathname;
	const [isCategorySelect, setIsCategorySelect] = useState(false);

	const [rangeValue, setRangeValue] = useState(5);
	const [rangeText, setRangeText] = useState("둘 다 발달했거나 큰 차이 없어요");

	const prcieRangeValueHandler = (e) => {
		setRangeValue(parseInt(e.target.value));

		setRangeText(handleBalanceText(e.target.value));
		setIsValidState((pre) => ({
			...pre,
			upDownBalance: [e.target.value / 10, true],
		}));
	};

	useEffect(() => {
		setRangeValue(upDownBalance * 10); // 기본값으로 사용자의 upDownBalance를 사용
		setIsValidState((pre) => ({
			...pre,
			upDownBalance: [upDownBalance || 5 / 10, true],
		}));
	}, [upDownBalance]);

	// bodyFat, muscleMass
	const categorylist = [
		["마른 편이에요", [12, 30]],
		["보통이에요", [15, 30]],
		["조금 통통한 편이에요", [25, 30]],
		["뚱뚱해요", [35, 30]],
	];

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

	// 입력했는지 체크(한 번 입력한 순간 쭉 true)
	const [valueHistory, setValueHistory] = useState(false);

	const handleChange = (e) => {
		const name = e.target.name;

		if (name === "height") {
			setHeight(e.target.value);
			console.log(height)
		} else if (name === "weight") {
			setWeight(e.target.value);
		}
		if (!valueHistory) {
			setValueHistory(true);
		}
	};

	// 제출
	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = {
			date: new Date(),
			height: height,
			weight: weight,
			bodyFat: bodyFat,
			muscleMass: muscleMass,
			upDownBalance: rangeValue / 10,
		};
		console.log("정보:", formData);

		try {
			// API 호출 및 form 데이터 전송
			const res = await TokenApi.post("bodyData", formData);
			console.log("수정:", res.status);
		} catch (error) {
			console.log(error);
			alert("수정 실패. 형식을 준수해주세요.");
		}
	};

	return (
		<S.SignupContainer>
			<S.SignupTitle>
				<S.TitleEmphasis>{userName}님의 신체정보</S.TitleEmphasis>
			</S.SignupTitle>
			<S.BodyInfoContainer>
				<ProfileInput
					placeholder="숫자만 입력"
					value={height}
					name="height"
					handleChange={handleChange}
				>
					키
				</ProfileInput>
				<ProfileInput
					placeholder="숫자만 입력"
					value={weight}
					name="weight"
					handleChange={handleChange}
				>
					몸무게
				</ProfileInput>
			</S.BodyInfoContainer>

			<S.SignupUpdonwBalanceWrapper>
				<div className="updownBalanceBox">
					<span className="updownBalanceTitle">
						상/하체 균형
					</span>
					<div className="updownBalanceBar">
						<span className="updownBalanceBarTitle">{rangeText}</span>
						<div className="updownBalanceBarContent">
							<div className="balanceRatioBox">
								<span className="balanceRatio">하체 비중</span>
								<span className="balanceRatioPercent">{rangeValue * 10}%</span>
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
										name="upDownBalance"
										handleChange={handleChange}
									/>
								</FilterPriceRangeWrap>
							</div>
							<div className="balanceRatioBox">
								<span className="balanceRatio">상체 비중</span>
								<span className="balanceRatioPercent">
									{100 - rangeValue * 10}%
								</span>
							</div>
						</div>
					</div>
				</div>
				<S.SignupTextContainer>
					<span className="bodyfigureText">상/하체 균형</span>
					{categorylist?.map((item, index) => {
						return (
							<TextCheckbox
								key={index}
								handleClick={handleClick}
								isSelected={isCategorySelect[index]}
								elementidx={index}
							>
								{item[0]}
							</TextCheckbox>
						);
					})}
					<div className="directButtonContainer">
						<button
							className="directbutton"
							onClick={(e) => {
								e.preventDefault();
								navigate(`${currenturl}/direct`);
							}}
						>
							직접 입력하기
							<img
								src={rightarrow}
								className="rightArrow"
								alt="직접 입력하기 버튼 이미지"
							/>
						</button>
					</div>
					<S.ButtonContainer>
						<BeforeButton handleSubmit={handleBackPage} />
						<MiddleButton handleSubmit={handleSubmit}>
							수정 완료
						</MiddleButton>
					</S.ButtonContainer>
				</S.SignupTextContainer>
			</S.SignupUpdonwBalanceWrapper>
		</S.SignupContainer>
	);
};

export default FixBodyInfo;
