import { useNavigate } from "react-router-dom";
import { BeforeButton, SmallButton } from "../../../components/";
import { useTransition, animated } from "@react-spring/web";
import theme from "../../../styles/theme";
import {
  BudgetContainer,
  BudgetBox,
  RecommendButtonContainer,
  RecommendContainer,
  RecommendTitle,
  RecommendTitleHide,
} from "../StyledRecommend";
import { useState, useEffect } from "react";
import minus from "../../../assets/images/minus.svg";
import plus from "../../../assets/images/plus.svg";
import TokenApi from "../../../apis/TokenApi";
import Loading from "../../../components/Loading/Loading";
import { useRecoilState } from "recoil";
import { purposeState, supplementRecommendState } from "./../../../recoil/atom";
// 진행바에 필요한듯?
import { SignupTitle } from "../../Signup/StyledSignup";
import { BeforeArrowButton } from "./../../../components/Button/BeforeArrowButton";

// 버튼과 이미지의 간격을 어떻게 줄지 고민해 봐야함.
const RecommendSupplementBudget = () => {
  const navigate = useNavigate();

  // 목적 객체
  const [selectedPurposeList, setSelectedPurposeList] =
    useRecoilState(purposeState);

  // 보조제 추천 history 객체
  const [recommendState, setRecommendState] = useRecoilState(
    supplementRecommendState
  );

  // 가격
  const [budget, setBudget] = useState(70000);
  // 가격 "~만원" 으로 축약
  const formattedBudget = budget.toString().replace(/0000$/, "");
  // 가격 변동 방향
  const [direction, setDirection] = useState(null);
  // 가격 한계점
  const [warnBudget, setWarnBudget] = useState(false);

  // 선택 상태
  const [isReady, setIsReady] = useState(false);

  // 분석중 로딩 상태
  const [isLoading, setIsLoading] = useState(false);

  // 목적 받아와졌는지 확인
  const fetchData = async () => {
    console.log(selectedPurposeList);
    setIsReady(true);
  };
  // 최초 렌더링 시 목적 목록 받아옴
  useEffect(() => {
    fetchData();
  }, []);

  const transitions = useTransition(budget, {
    keys: budget,
    // 처음
    from: {
      position: "absolute",
      opacity: 0,
      transform:
        direction === "increase"
          ? "translate3d(0,-100%,0)"
          : "translate3d(0,100%,0)",
    },
    enter: { opacity: 1, transform: "translate3d(0,0,0)" },
    leave: {
      opacity: 0,
      transform:
        direction === "increase"
          ? "translate3d(0,100%,0)"
          : "translate3d(0,-100%,0)",
    },
    config: { tension: 600, friction: 120 },
  });

  const handleBackPage = () => {
    navigate(-1);
  };

  // 가격 변화
  const handleUp = () => {
    setDirection("increase");
    if (budget >= 10000) {
      setWarnBudget(false);
    }
    setBudget((prev) => prev + 10000);
  };

  const handleDown = () => {
    setDirection("decrease");
    if (budget <= 50000) {
      setWarnBudget(true);
    } else {
      setBudget((prev) => prev - 10000);
    }
  };

  const makeRequest = async (url, maxAttempts = 30) => {
    try {
      const response = await TokenApi.get(url);
      // 성공한 경우 데이터 반환
      setIsLoading(true);
      setIsReady(true);
      return response.data;
    } catch (error) {
      setIsReady(false);
      if (maxAttempts === 0) throw error;

      // 재시도 전에 일정 시간 대기 (예: 1초)
      await new Promise((res) => setTimeout(res, 1000));

      // 재귀적으로 함수 호출
      return makeRequest(url, maxAttempts - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    if (isReady) {
      // 선택된 목적
      const checkedPurposeList = Object.entries(selectedPurposeList).map(
        ([key, value]) => {
          return value;
        }
      )[0];

      // 선택된 가격 + 목적 객체
      const recommendSupplement = {
        monthlyBudget: budget,
        purpose: checkedPurposeList,
      };
      console.log(recommendSupplement);

      const response = await TokenApi.post(
        `/recommendation/supplement`,
        recommendSupplement
      );
      const recommendId = response.data;
      console.log(typeof response.data);

      makeRequest(`/recommendation/supplement/history/${recommendId}`)
        .then((data) => {
          setRecommendState(data);
          console.log(recommendState);
          navigate("/recommend/supplementresult");
        })
        .catch((error) => console.error("요청 실패", error));
    }
  };

  return (
    <RecommendContainer>
      <SignupTitle status="3">
        <div className="statusBar">
          <div className="statusBar2"></div>
        </div>
        <div className="recommendTitleArea">
          <RecommendTitle
            ftsize="32px"
            ftcolor={theme.Neutral990}
            ftweight="600"
          >
            보조제에 사용할 예산을 설정해 주세요
          </RecommendTitle>
          <RecommendTitleHide>
            예산에 맞게 보조제를 추천해드려요
          </RecommendTitleHide>
        </div>
      </SignupTitle>
      <BudgetContainer>
        <BudgetBox warnBudget={warnBudget}>
          <span className="bugetText">{formattedBudget}만원 예산이 있어요</span>
          <div className="bugetContent">
            <img
              src={minus}
              alt="금액 감소 버튼"
              className="minusButton"
              onClick={handleDown}
            />
            <div className="budgetWrapper">
              {transitions((style, item) => (
                <animated.span style={style} className="budget">
                  {item.toLocaleString()}
                </animated.span>
              ))}
            </div>
            <img
              src={plus}
              alt="금액 증가 버튼"
              className="plusButton"
              onClick={handleUp}
            />
          </div>
        </BudgetBox>
        {warnBudget && (
          <span className="warningText">
            더이상 줄일 수 없어요
            <br />
            최저 예산이에요
          </span>
        )}
      </BudgetContainer>

      <RecommendButtonContainer>
        <BeforeArrowButton
          handleClick={handleBackPage}
          isLoading={isLoading}
        ></BeforeArrowButton>
        {isLoading ? (
          <Loading />
        ) : (
          <SmallButton handleSubmit={handleSubmit} isReady={isReady}>
            추천받기
          </SmallButton>
        )}
      </RecommendButtonContainer>
    </RecommendContainer>
  );
};

export default RecommendSupplementBudget;
