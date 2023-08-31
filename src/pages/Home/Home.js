// < 홈 페이지 >
import * as S from "./StyledHome";
import HomeSecondImg1 from "../../assets/images/HomeSecondImg1.png";
import { useNavigate } from "react-router-dom";
import arrow from "../../assets/images/arrow.svg";

export const Home = () => {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("search");
  };

  const handleMyPage = () => {
    navigate("mypage");
  };

  const handleRecommend = () => {
    navigate("recommend");
  };

  return (
    <S.HomeContainer>
      <S.HomeContent>
        <section className="firstContent">
          <div className="firstTitle1">AI 운동 추천 서비스</div>
          <div className="firstTitle2">
            <p>AI의 정확하고 빠른</p>
            <p>운동 추천</p>
          </div>
          <button className="recommendBtn" onClick={handleRecommend}>
            바로 추천받기
          </button>
        </section>
      </S.HomeContent>
      <S.HomeContent>
        <section className="secondContent">
          지금까지는 경험하지 못했던
          <br />
          운동 코칭 경험을 핏메이트에서 경험해보세요
        </section>
      </S.HomeContent>
      <S.HomeContent>
        <section className="thirdContent">
          <div className="thirdTitle">
            <span className="thirdTitleText">
              내 운동 루틴,
              <br />내 몸에 핏하게 플래닝
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
              운동과 보조제 정보
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
    </S.HomeContainer>
  );
};

export default Home;
