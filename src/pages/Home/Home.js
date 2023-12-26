// < 홈 페이지 >
import * as S from "./StyledHome";
import { useNavigate } from "react-router-dom";
import arrow from "../../assets/images/button-arrow.svg";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import LoginModal from "../../components/Modal/LoginModal";
import homebackground from "../../assets/images/main-background.png"
import homebanner from "../../assets/images/homebanner.png";
import logo from "../../assets/images/logo.png"
import experience from "../../assets/images/expand_more_Blue.svg"
import recommend1 from "../../assets/images/Recommend-1.png"
import recommend2 from "../../assets/images/Recommend-2.png"
import recommend3 from "../../assets/images/Recommend-result.png"
import mypage from "../../assets/images/My-page.png"
import { useScrollFadeIn } from "../../hooks/useScrollFadeIn";
import TripleToggleSwitch from "./TripleToggle";
import HomeSearchBar from "../../components/HomeSearchBar/HomeSearchBar";
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

		setNextSlide(0); // 항상 첫 번째 슬라이드로 이동
		const newSlideLabel = Object.values(labels)[0];
		setToggleState(newSlideLabel.value);
	};

	// 스크롤 애니메이션 훅 가져오기
	const animatedItem1 = useScrollFadeIn();
	const animatedItem2 = useScrollFadeIn();
	const animatedItem3 = useScrollFadeIn();
	const animatedItem4 = useScrollFadeIn();
	const animatedItem5 = useScrollFadeIn();


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

	// slide toggle

	const [currentSlide, setCurrentSlide] = useState(0);
	const [nextSlide, setNextSlide] = useState(0);
	const [transformPosition, setTransformPosition] = useState(0);
	const [toggleState, setToggleState] = useState("left");

	const labels = useMemo(() => {
		return {
			left: {
				title: "추천 받고",
				value: "left"
			},
			center: {
				title: "결과 보고",
				value: "center"
			},
			right: {
				title: "루틴까지 .",
				value: "right"
			}
		};
	}, []); // 빈 배열은 의존성 배열이 없음을 나타냅니다.

	const onChange = useCallback((value) => {
		let targetPosition;
		let nextToggleState;

		switch (value) {
			case "left":
				targetPosition = 0;
				nextToggleState = "left";
				break;
			case "center":
				targetPosition = 1;
				nextToggleState = "center";
				break;
			case "right":
				targetPosition = 2;
				nextToggleState = "right";
				break;
			default:
				break;
		}
		setToggleState(nextToggleState);

		setCurrentSlide(targetPosition);
		// 적절한 시간(예: 300ms)을 설정하여 원하는 시간이 지난 후에 이동하도록 조절
		setTimeout(() => {
			// 목표 위치로부터 30px 이동한 상태에서 원래 위치로 돌아오기
			if (targetPosition > currentSlide) {
				setTransformPosition(targetPosition * 1130 + 40);
			} else {
				setTransformPosition(targetPosition * 1130 - 40);
			}
			// 왜 아래의 if경우만 이렇게 해줘야 저 튕기는 효과가 발생하는지 모르겠음
			if (targetPosition < currentSlide) {
				// 더 많은 시간이 지난 후에 원래 위치로 돌아오기
				setTimeout(() => {
					setTransformPosition(targetPosition * 1130 + 40);
				}, 0);
				// 왜 얘는 0이고 아래 useEffect의 똑같은 애는 300이어야 잘 되는지 모르겠음
			}
		}, 300);


		setNextSlide(targetPosition);
	}, [currentSlide, setCurrentSlide, setTransformPosition]);

	// 슬라이드 넘어가는 속도
	const intervalDuration = 5000;

	const handleToggleEffect = useCallback(() => {
		let newSlide;
		if (currentSlide === Object.keys(labels).length - 1) {
			newSlide = 0; // 마지막 슬라이드일 경우 첫 번째 슬라이드로 이동
		} else {
			newSlide = currentSlide + 1; // 그 외에는 다음 슬라이드로 이동
		}

		setNextSlide(newSlide);
		const newSlideLabel = Object.values(labels)[newSlide];
		setToggleState(newSlideLabel.value);
	}, [currentSlide, labels, setNextSlide, setToggleState]);

	useEffect(() => {
		const interval = setInterval(() => {
			handleToggleEffect();
		}, intervalDuration);
		return () => clearInterval(interval);
	}, [handleToggleEffect, intervalDuration]);

	// onChange를 트리거할 때만 호출되는 useEffect 즉, 실제 슬라이드를 움직이는 useEffect
	useEffect(() => {
		const updatePosition = () => {
			if (nextSlide > currentSlide) {
				setTransformPosition(nextSlide * 1130 + 40);
			} else {
				setTransformPosition(nextSlide * 1130 - 40);
			}
			if (nextSlide < currentSlide) {
				// 더 많은 시간이 지난 후에 원래 위치로 돌아오기
				setTimeout(() => {
					setTransformPosition(nextSlide * 1130 + 40);
					// 현재 슬라이드 업데이트
					setCurrentSlide(nextSlide);

				}, 300);
			}
			setCurrentSlide(nextSlide);
		};
		const timeoutId = setTimeout(updatePosition, 300);

		return () => {
			// cleanup 함수에서 updatePosition을 호출하여
			// setTransformPosition이 완료된 이후에 setCurrentSlide를 호출
			updatePosition();
			clearTimeout(timeoutId);
		};
	}, [currentSlide, nextSlide, setTransformPosition]);




	return (
		<S.HomeContainer>
			<section className="firstContent">
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
						<div id="slideItem" className={`firstSlide ${currentSlide === 0 ? '' : 'opacity'}`}>
							<div className={`firstSlideTitle ${currentSlide === 0 ? '' : 'opacity'}`}>
								추천을 위한<br />예리한 질문들
							</div>
							<div className={`slideButton ${currentSlide === 0 ? '' : 'opacity'}`} onClick={handleRecommend}>
								<p className={`slideButtonText ${currentSlide === 0 ? '' : 'opacity'}`}>추천받기</p>
								<img className={`slideButtonIcon ${currentSlide === 0 ? '' : 'opacity'}`} src={arrow} alt="추천받기로 이동하기" />
							</div>
							<img className={`firstSlideImg1 ${currentSlide === 0 ? 'active' : 'opacity'}`} src={recommend1} alt="무엇을 추천해 드릴까요?" />
							<img className={`firstSlideImg2 ${currentSlide === 0 ? 'active' : 'opacity'}`} src={recommend2} alt="운동 & 보조제" />
						</div>
						<div id="slideItem" className={`secondSlide ${currentSlide === 1 ? '' : 'opacity'}`}>
							<div className={`secondSlideTitle ${currentSlide === 1 ? '' : 'opacity'}`}>
								<span className={`secondSlideTitleTop ${currentSlide === 1 ? '' : 'opacity'}`}>AI가 제공하는<br />운동 추천 보고서</span>
								<p className={`secondSlideTitleBottom ${currentSlide === 1 ? '' : 'opacity'}`}>운동량까지 추천해주는 센스.</p>
							</div>
							<div className={`slideButton ${currentSlide === 1 ? '' : 'opacity'}`} onClick={handleRecommend}>
								<p className={`slideButtonText ${currentSlide === 1 ? '' : 'opacity'}`}>추천받기</p>
								<img className={`slideButtonIcon ${currentSlide === 1 ? '' : 'opacity'}`} src={arrow} alt="추천받기로 이동하기" />
							</div>
							<img className={`secondSlideImg ${currentSlide === 1 ? 'active' : 'opacity'}`} src={recommend3} alt="추천결과" />
						</div>
						<div id="slideItem" className={`thirdSlide ${currentSlide === 2 ? '' : 'opacity'}`}>
							<div className={`thirdSlideTitle ${currentSlide === 2 ? '' : 'opacity'}`}>
								루틴도<br />한 번에 관리하세요
							</div>
							<div className={`slideButton ${currentSlide === 2 ? '' : 'opacity'}`} onClick={handleMyPage}>
								<p className={`slideButtonText ${currentSlide === 2 ? '' : 'opacity'}`}>내 운동</p>
								<img className={`slideButtonIcon ${currentSlide === 2 ? '' : 'opacity'}`} src={arrow} alt="내운동으로 이동하기" />
							</div>
							<img className={`thirdSlideImg ${currentSlide === 2 ? 'active' : 'opacity'}`} src={mypage} alt="마이루틴" />
						</div>
					</S.Slide>
					<div className="slideButton">
						<TripleToggleSwitch labels={labels} onChange={onChange} value={toggleState} />
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
						<HomeSearchBar handleSearch={handleSearch} name="workout" />
					</div>
				</section>
			</S.HomeContent>
			{isLoginModal && <LoginModal setIsLoginModal={setIsLoginModal} />}
			<S.Footer>
				<div class="frame">
					<div class="div">
						<div class="text-wrapper">서비스</div>
						<div class="div-2">
							<div class="text-wrapper-2">검색하기</div>
							<div class="text-wrapper-3">추천받기</div>
							<div class="text-wrapper-3">내 운동</div>
						</div>
					</div>
					<div class="div-3">
						<div class="text-wrapper">문의</div>
						<div class="div-2">
							<div class="div-4">
								<div class="div-wrapper"><div class="text-wrapper-4">전화</div></div>
								<div class="div-wrapper"><div class="text-wrapper-2">010-8544-1013</div></div>
							</div>
							<div class="div-4">
								<div class="div-wrapper"><div class="text-wrapper-5">이메일</div></div>
								<div class="div-wrapper"><div class="text-wrapper-2">jeuk1013@naver.com</div></div>
							</div>
						</div>
					</div>
					<div class="div-5">
						<div class="div-6">
							<div class="text-wrapper-6">개발</div>
							<div class="div-2">
								<div class="text-wrapper-2">이찬하</div>
								<div class="text-wrapper-3">정지성</div>
								<div class="text-wrapper-3">강민정</div>
								<div class="text-wrapper-3">최훈오</div>
							</div>
						</div>
						<div class="div-6">
							<div class="text-wrapper-6">디자인</div>
							<div class="div-2">
								<div class="text-wrapper-2">김정욱</div>
								<div class="text-wrapper-3">최시현</div>
							</div>
						</div>
					</div>
					<div class="group">
						<img src={logo} alt="핏메이트 로고" />
					</div>
				</div>
			</S.Footer>
		</S.HomeContainer >
	);
};

export default Home;
