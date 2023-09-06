// < 홈 페이지 >
import * as S from "./StyledHome";
import HomeSecondImg1 from "../../assets/images/HomeSecondImg1.png";
import { useNavigate } from "react-router-dom";
import arrow from "../../assets/images/arrow.svg";
import { useState } from "react";
import LoginModal from "../../components/Modal/LoginModal";
import homebanner from "../../assets/images/homebanner.png";
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

  return (
    <S.HomeContainer>
      <S.HomeContent>
        <section className="firstContent">
          <div className="firstCotntentItem">
            <span className="firstTitle1">
              전문가 없이도
              <br />
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
        </section>
      </S.HomeContent>
      <S.HomeContent>
        <section className="secondContent">
          이제껏 경험하지 못했던
          <br />
          운동 코칭 경험을 핏메이트에서 경험해보세요
        </section>
      </S.HomeContent>
      <S.HomeContent>
        <section className="thirdContent">
          <div className="thirdTitle">
            <span className="thirdTitleText">
              내 운동 루틴,
              <br />내 몸에 FIT하게!
            </span>
            <button className="myFitnessBtn" onClick={handleMyPage}>
              <span className="myFitnessBtnText">내 운동 바로 가기</span>
              <img
                className="myFitnessBtnImg"
                src={arrow}
                alt="보조제 추천 바로 받기 버튼"
              ></img>
            </button>
          </div>
          <img
            className="thirdImg"
            src={HomeSecondImg1}
            alt="An athletic woman"
          />
        </section>
      </S.HomeContent>
      <S.HomeContent>
        <section className="fourthContent">
          <img
            className="fourthImg"
            src={HomeSecondImg1}
            alt="An athletic woman"
          />
          <div className="fourthTitle">
            <span className="fourthTitleText">
              운동, 보조제 정보
              <br />
              검색 지원
            </span>
            <button className="searchBtn" onClick={handleSearch}>
              <span className="searchBtnText">검색 바로 가기</span>
              <img
                className="searchBtnImg"
                src={arrow}
                alt="검색 바로 가기 버튼"
              ></img>
            </button>
          </div>
        </section>
      </S.HomeContent>
      {isLoginModal && <LoginModal setIsLoginModal={setIsLoginModal} />}
    </S.HomeContainer>
  );
};

export default Home;
