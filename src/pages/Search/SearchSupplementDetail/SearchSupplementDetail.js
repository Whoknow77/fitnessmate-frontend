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

	useEffect(() => {
		// 페이지가 로드될 때 호출
		const fetchWorkoutDetail = async () => {
			try {
				const response = await userSupplementSingleAPI.get(`/${supplementId}`);
				setSupplementDetail(response.data);
				console.log(response)
				setSupplementName(response.data.koreanName);
				setImgPath(response.data.imageURL);
				setSource(response.data.source)
				setFlavor(response.data.flavor)
				setServings(response.data.servings)
				setDescription(response.data.description)
				setProtein(response.data.proteinPerServing)
				setFat(response.data.fatPerServing)
				setCarbohydrate(response.data.carbohydratePerServing)
				setMarketURL(response.data.marketURL)
			} catch (error) {
				console.error("Error workout detail:", error);
			}
		};

		fetchWorkoutDetail();
	}, [supplementId]);

	const handleBackPage = (e) => {
		e.preventDefault();
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
						<span>원료</span><p>{source}</p>
						<span>맛</span><p>{flavor}</p>
						<span>회분</span><p>{servings}회분</p>
				</S.SpplementInformationTop>
				<S.SpplementInformationMiddle>
						<span>설명</span><p className="DescriptionP">{description}</p>
						<span>함량</span>
						<div className="PerServing">
							<S.PerServing>
								<span className="TitleSpan">프로틴 함량</span>
								<span className="TitleSpan">지방 함량</span>
								<span className="TitleSpan">탄수화물 함량</span>
								<p className="ContentP">{protein}g</p>
								<p className="ContentP">{fat}g</p>
								<p className="ContentP">{carbohydrate}g</p>
							</S.PerServing>
						</div>
				</S.SpplementInformationMiddle>
					<button onClick={() => window.open(marketURL, "_blank")}>구매하러 가기</button>
				</S.InformationContainer>
			</S.MiddleContainer>
		</S.SearchWorkoutContainer>
	);
};

export default SearchSupplementDetail;