import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { userSupplementSingleAPI } from "../../../apis/API";
import * as S from "./StyledSearchSupplementDetail";
import beforebtn from "../../../assets/images/SmallBefore.svg";


const SearchSupplementDetail = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { supplementId } = location.state;
	const [supplementDetail, setSupplementDetail] = useState(null);


	const [supplementName, setSupplementName] = useState("");
	const [imgPath, setImgPath] = useState("");
	const [source, setSource] = useState("");
	const [flavor, setFlavor] = useState([]);
	const [servings, setServings] = useState("");
	const [description, setDescription] = useState("");
	const [protein, setProtein] = useState("");
	const [fat, setFat] = useState("");
	const [carbohydrate, setCarbohydrate] = useState("");
	const [marketURL, setMarketURL] = useState("");
	const [leucine, setLeucine] = useState("");
	const [isoLeucine, setIsoLeucine] = useState("");
	const [valine, setValine] = useState("");
	const [methionine, setMethionine] = useState("");
	const [phenylalanine, setPhenylalanine] = useState("");
	const [threonine, setThreonine] = useState("");
	const [lCarnitine, setLCarnitine] = useState("");
	const [lGlutamine, setLGlutamine] = useState("");
	const [lAlanine, setLAlanine] = useState("");
	const [lLysine, setLLysine] = useState("");

	const nutrientData = [
		{ label: "프로틴 함량", value: protein },
		{ label: "지방 함량", value: fat },
		{ label: "탄수화물 함량", value: carbohydrate },
		{ label: "류신 함량", value: leucine },
		{ label: "이소류신 함량", value: isoLeucine },
		{ label: "발린 함량", value: valine },
		{ label: "메티오닌 함량", value: methionine },
		{ label: "페닐알라닌 함량", value: phenylalanine },
		{ label: "트레오닌 함량", value: threonine },
		{ label: "L-케라틴 함량", value: lCarnitine },
		{ label: "L-글루타민 함량", value: lGlutamine },
		{ label: "L-알라닌 함량", value: lAlanine },
		{ label: "L-라이신 함량", value: lLysine },
	];

	const [price, setPrice] = useState("");
	function formatNumberToCurrency(number) {
		return number.toLocaleString('en-US');
	}
	const formattedPrice = formatNumberToCurrency(price);


	useEffect(() => {
		// 페이지가 로드될 때 호출
		const fetchWorkoutDetail = async () => {
			try {
				const response = await userSupplementSingleAPI.get(`/${supplementId}`);
				setSupplementDetail(response.data);
				console.log(response)
				setSupplementName(response.data.koreanName);
				setImgPath(response.data.imageURL);
				setFlavor(response.data.flavor)
				setServings(response.data.servings)
				setDescription(response.data.description)

				// null값이 출력될 수 있음
				setSource(response.data.source)
				setProtein(response.data.proteinPerServing)
				setFat(response.data.fatPerServing)
				setCarbohydrate(response.data.carbohydratePerServing)
				setMarketURL(response.data.marketURL)
				setPrice(response.data.price)
				setLeucine(response.data.leucine)
				setIsoLeucine(response.data.isoLeucine)
				setValine(response.data.valine)
				setMethionine(response.data.methionine)
				setPhenylalanine(response.data.phenylalanine)
				setThreonine(response.data.threonine)
				setLCarnitine(response.data.l_Carnitine)
				setLGlutamine(response.data.l_Glutamine)
				setLAlanine(response.data.l_Alanine)
				setLLysine(response.data.l_Lysine)
			} catch (error) {
				console.error("Error workout detail:", error);
			}
		};

		fetchWorkoutDetail();
	}, [supplementId]);

	const handleBackPage = () => {
		navigate(-1);
	};


	return (
		<S.SearchWorkoutContainer>
			<S.BeforeButton onClick={handleBackPage}>
				<img src={beforebtn} alt="이전 버튼" className="backBtnImg" />
				<span className="backBtnText">
					이전
				</span>
			</S.BeforeButton>
			<S.TopContainer>
				<S.TopLeft>
					<S.SpplementName>{supplementName}</S.SpplementName>
				</S.TopLeft>
				<button>내 보조제에 추가</button>
			</S.TopContainer>
			<S.MiddleContainer>
				<img src={imgPath} alt={`${supplementName} 보조제 이미지`} />
				<S.InformationContainer>
					<S.SpplementInformationTop>
						{source && (
							<>
								<span>원료</span>
								<p>{source}</p>
							</>
						)}
						<span>맛</span><p>{flavor}</p>
						<span>회분</span><p>{servings}회분</p>
					</S.SpplementInformationTop>
					<S.SpplementInformationMiddle>
						<span>설명</span><p className="DescriptionP">{description}</p>
						{nutrientData.some((nutrient) => nutrient.value !== null && nutrient.value !== undefined && nutrient.value !== "") && (
							<>
								<span>함량</span>
								<div className="PerServing">
									{nutrientData
										.filter((nutrient) => nutrient.value !== null && nutrient.value !== undefined && nutrient.value !== "")
										.map((nutrient, index) => (
											<S.PerServing key={index}>
												<span className="TitleSpan">{nutrient.label}</span>
												<p className="ContentP">{nutrient.value}g</p>
											</S.PerServing>
										))}
								</div>
							</>
						)}
					</S.SpplementInformationMiddle>
					<S.SpplementInformationBottom>
						<span onChange={formatNumberToCurrency}>가격</span>
						<p>{formattedPrice}원</p>
					</S.SpplementInformationBottom>
					<button onClick={() => window.open(marketURL, "_blank")}>구매하러 가기</button>
				</S.InformationContainer>
			</S.MiddleContainer>
		</S.SearchWorkoutContainer>
	);
};

export default SearchSupplementDetail;