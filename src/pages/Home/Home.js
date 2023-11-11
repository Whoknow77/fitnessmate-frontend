// < 홈 페이지 >
import * as S from "./StyledHome";
import HomeSecondImg1 from "../../assets/images/HomeSecondImg1.png";
import { useNavigate } from "react-router-dom";
import arrow from "../../assets/images/arrow.svg";
import { useState, useRef, useEffect, useCallback } from "react";
import LoginModal from "../../components/Modal/LoginModal";
import homebackground from "../../assets/images/main-background.png"
import homebanner from "../../assets/images/homebanner.png";
import thirdFirstImg from "../../assets/images/thirdFirstImg.png"
import thirdSecondImg from "../../assets/images/thirdSecondImg.png"
import thirdThirdImg from "../../assets/images/thirdThirdImg.png"
import fourthFirstImg from "../../assets/images/fourthFirstImg.png"
import fourthSecondImg from "../../assets/images/fourthSecondImg.png"
import fourthThirdImg from "../../assets/images/fourthThirdImg.png"
import { getAccessAPI } from "../../apis/API";
import { useScrollFadeIn } from "../../hooks/useScrollFadeIn";

export const Home = () => {
	const navigate = useNavigate();

	const loginState = localStorage.length;
	const [isLoginModal, setIsLoginModal] = useState(false);

	const handleSearch = () => {
		navigate("search/1");
	};

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
				<div className="mouse" onClick={handleScrollToStart}>
					<span></span>
				</div>
			</section>
			<S.HomeContent id="start">
				<section className="secondContent">
					이제껏 경험하지 못했던
					<br />
					운동 코칭 경험, 핏메이트에서 경험해보세요.
				</section>
			</S.HomeContent>
			<S.HomeContent>
				<section className="thirdContent">
					<div className="thirdHeader" ref={animatedItem1.ref} style={animatedItem1.style}>
						<div className="thirdTitle">
							<span className="thirdTitleText">
								3단계면 끝나는
								<br />
								내 운동 루틴 관리
							</span>
							<button className="myFitnessBtn" onClick={handleMyPage}>
								<span className="myFitnessBtnText">내 운동 바로 가기</span>
								<img
									className="myFitnessBtnImg"
									src={arrow}
									alt="보조제 추천 바로 받기 버튼"
								/>
							</button>
						</div>
					</div>
					<div className="thirdBody">
						<div className="thirdFirstContent" ref={animatedItem2.ref} style={animatedItem2.style}>
							<S.ThirdContentTitle>
								<div className="thirdContentTitleNum">
									1
								</div>
								<div className="thirdContentTitleText">
									골격근량, 체지방량을 입력하면
								</div>
							</S.ThirdContentTitle>
							<img className="thirdFirstImg" src={thirdFirstImg} />
						</div>
						<div className="thirdSecondContent" ref={animatedItem3.ref} style={animatedItem3.style}>
							<img src={thirdSecondImg} />
							<S.ThirdContentTitle>
								<div className="thirdContentTitleNum">
									2
								</div>
								<div className="thirdContentTitleText">
									AI가 나에게 딱 맞는 운동과
									<br />
									최적화된 가이드를 제공해요.
								</div>
							</S.ThirdContentTitle>
						</div>
						<div className="thirdThirdContent" ref={animatedItem4.ref} style={animatedItem4.style}>
							<S.ThirdContentTitle>
								<div className="thirdContentTitleNum">
									3
								</div>
								<div className="thirdContentTitleText">
									추천 운동을
									<br />
									내 운동 목록에 추가하여
									<br />
									루틴을 관리해보세요.
								</div>
							</S.ThirdContentTitle>
							<img src={thirdThirdImg} />
						</div>
					</div>
				</section>
			</S.HomeContent>
			<S.HomeContent>
				<section className="fourthContent">
					<div className="fourthTitle">
						<span className="fourthTitleText">
							핏메이트,
						</span>
						<span className="fourthTitleText">
							이런 서비스도 있어요.
						</span>
					</div>
					<div className="fourthBody" ref={animatedItem5.ref} style={animatedItem5.style}>
						<S.FourthBodyItem>
							<div className="itemLogo">
								<img src={fourthFirstImg} />
							</div>
							<div className="itemText">
								<span className="itemTextTitle">운동 가이드 영상</span>
								<p className="itemTextContent">
									정확한 운동 자세, 방법 등
									<br />
									운동 강의 영상을 제공해요.
								</p>
							</div>
						</S.FourthBodyItem>
						<S.FourthBodyItem>
							<div className="itemLogo">
								<img src={fourthSecondImg} />
							</div>
							<div className="itemText">
								<span className="itemTextTitle">보조제 구매 링크</span>
								<p className="itemTextContent">
									추천/ 검색 보조제의
									<br />
									구매 링크를 제공해요.
								</p>
							</div>
						</S.FourthBodyItem>
						<S.FourthBodyItem>
							<div className="itemLogo">
								<img src={fourthThirdImg} />
							</div>
							<div className="itemText">
								<span className="itemTextTitle">개인 맞춤형 가이드</span>
								<p className="itemTextContent">
									개인 맞춤형
									<br />
									운동량 수정이 가능해요.
								</p>
							</div>
						</S.FourthBodyItem>
					</div>
				</section>
			</S.HomeContent>
			<S.HomeContent>
				<section className="fifthContent">
					<div className="fifthTitle">
						<p className="fifthFirstText">모든 정보가 한 눈에</p>
						<span className="fifthSecondText">
							운동, 보조제 정보 검색
						</span>
					</div>
					<button className="searchBtn" onClick={handleSearch}>
						<span className="searchBtnText">검색 바로 가기</span>
						<img
							className="searchBtnImg"
							src={arrow}
							alt="검색 바로 가기 버튼"
						/>
					</button>
				</section>
			</S.HomeContent>
			{isLoginModal && <LoginModal setIsLoginModal={setIsLoginModal} />}
		</S.HomeContainer>
	);
};

export default Home;
