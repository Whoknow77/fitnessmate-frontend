// < 홈 페이지 >
import * as S from "./StyledHome";
import HomeSecondImg1 from "../../assets/images/HomeSecondImg1.png";
import { useNavigate } from "react-router-dom";
import arrow from "../../assets/images/arrow.svg";
import { useState, useRef, useEffect, useCallback } from "react";
import LoginModal from "../../components/Modal/LoginModal";
import homebackground from "../../assets/images/main-background.png"
import homebanner from "../../assets/images/homebanner.png";
import logo from "../../assets/images/logo.png"
import experience from "../../assets/images/expand_more_Blue.svg"
import firstSlide from "../../assets/images/firstSlideImg.png"
import secondSlide from "../../assets/images/secondSlideImg.png"
import thirdSlide from "../../assets/images/thirdSlideImg.png"
import { getAccessAPI } from "../../apis/API";
import { useScrollFadeIn } from "../../hooks/useScrollFadeIn";
import TripleToggleSwitch from "./TripleToggle";
import SearchBar from "../../components/SearchBar/SearchBar";
import { userWorkoutBatchAPI } from "../../apis/API";
import "./StyledTripleToggle.css"

export const Home = () => {
	const navigate = useNavigate();

	const loginState = localStorage.length;
	const [isLoginModal, setIsLoginModal] = useState(false);

	const handleMyPage = () => {
		if (loginState) {
			navigate("mypage");
		} else {
			setIsLoginModal(true);
		}
	};

	const handleRecommend = () => {
		if (loginState) {
			navigate("recommend");
		} else {
			setIsLoginModal(true);
		}
	};

	// 스크롤 유도 아이콘 누르면 이동
	const handleScrollToStart = () => {
		const startElement = document.getElementById("start");
		startElement.scrollIntoView({ behavior: 'smooth' });
	};

	// 스크롤 애니메이션 훅 가져오기
	const animatedItem1 = useScrollFadeIn();
	const animatedItem2 = useScrollFadeIn();
	const animatedItem3 = useScrollFadeIn();
	const animatedItem4 = useScrollFadeIn();
	const animatedItem5 = useScrollFadeIn();

	// slide toggle

	const [currentSlide, setCurrentSlide] = useState(0);
	const [transformPosition, setTransformPosition] = useState(0);

	const onChange = (value) => {
		let targetPosition;

		switch (value) {
			case "left":
				targetPosition = 0;
				break;
			case "center":
				targetPosition = 1;
				break;
			case "right":
				targetPosition = 2;
				break;
			default:
				break;
		}

		// 목표 위치로 이동
		setCurrentSlide(targetPosition);

		// 목표 위치로부터 100px 이동

		if (targetPosition < currentSlide) {
			const newPosition = targetPosition * 1130 - 100;
			setTransformPosition(newPosition);
		} else {
			const newPosition = targetPosition * 1130 + 100;
			setTransformPosition(newPosition);
		}

		// 적절한 시간(예: 300ms)을 설정하여 원하는 시간이 지난 후에 이동하도록 조절
		setTimeout(() => {
			// 목표 위치로부터 100px 이동한 상태에서 원래 위치로 돌아오기
			setTransformPosition(targetPosition * 1130);

			// 큰 수에서 작은 수로 이동할 때만 추가로 100px 더 이동하도록 설정
			if (targetPosition < currentSlide) {
				setTransformPosition(targetPosition * 1130 + 100);
			}
		}, 300);
	};



	const labels = {
		left: {
			title: "추천 받고,",
			value: "left"
		},
		right: {
			title: "루틴까지 .",
			value: "right"
		},
		center: {
			title: "결과 보고,",
			value: "center"
		}
	};

	// 운동 검색
	const handleSearch = async (searchValue) => {
		try {
			if (searchValue === "") {
				const request = {
					searchKeyword: "",
				};
				const workoutResponse = await userWorkoutBatchAPI.post(
					`1`,
					request
				);
				console.log(workoutResponse);
				navigate("SearchResults", { keyword: "" });
			} else {
				const request = {
					searchKeyword: searchValue,
				};
				const workoutResponse = await userWorkoutBatchAPI.post(
					`1`,
					request
				);
				console.log(workoutResponse);
				navigate("SearchResults", { keyword: searchValue });
			}
		} catch (err) {
			console.error(err);
		}
	};


	return (
		<S.HomeContainer>
			<section className="firstContent">
				<img className="firstContentBack" src={homebackground} alt="홈 배경" />
				<div className="firstArea">
					<div className="firstCotntentItem">
						<span className="firstTitle1">
							AI 기반의
						</span>
						<span className="firstTitle2">
							정확하고 빠른
							<br />
							개인맞춤 추천
						</span>
						<button className="recommendBtn" onClick={handleRecommend}>
							바로 추천받기
						</button>
					</div>
					<img className="homebanner" src={homebanner} alt="홈 배너" />
				</div>
			</section>
			<S.HomeContent>
				<section className="secondContent">
					<p>이제껏 경험하지 못했던 운동 코칭 경험</p>
					<div className="secondItems">
						<img src={logo} alt="핏메이트 로고" />
						<p>에서 경험해 보세요</p>
					</div>
					<div className="mouse" onClick={handleScrollToStart}>
						<span>경험하기</span>
						<img src={experience} alt="더 경험하기" />
					</div>
				</section>
			</S.HomeContent>
			<S.HomeContent id="start">
				<section className="thirdContent">
					<S.Slide currentSlide={currentSlide} transformPosition={transformPosition}>
						<img id="slideItem" src={firstSlide} alt="추천을 위한 예리한 질문들" />
						<img id="slideItem" src={secondSlide} alt="AI가 제공하는 운동 추천 보고서" />
						<img id="slideItem" src={thirdSlide} alt="루틴도 한 번에 관리하세요" />
						{/* <div id="slideItem" className="firstSlide">1</div>
						<div id="slideItem" className="secondSlide">2</div>
						<div id="slideItem" className="thirdSlide">3</div> */}
					</S.Slide>
					<div className="slideButton">
						<TripleToggleSwitch labels={labels} onChange={onChange} />
					</div>
				</section>
			</S.HomeContent>
			<S.HomeContent>
				<section className="fourthContent">
					<div className="fourthTitle">
						<p className="firstTitleText">
							핏메이트가 다 알려줄게요
						</p>
						<span className="secondTitleText">
							궁금한 운동을 검색해 보세요!
						</span>
					</div>
					<div className="fourthBody">
						<SearchBar handleSearch={handleSearch} name="workout" />
					</div>
				</section>
			</S.HomeContent>
			{isLoginModal && <LoginModal setIsLoginModal={setIsLoginModal} />}
		</S.HomeContainer>
	);
};

export default Home;
