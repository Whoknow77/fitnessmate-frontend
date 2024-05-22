import * as S from "./StyledRecommend";
import theme from "../../../styles/theme";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { supplementRecommendState } from "../../../recoil/atom";
import TokenApi from "../../../apis/TokenApi";
import { userSupplementSingleAPI } from "../../../apis/API";
import toggle from "../../../assets/images/toggle_triangle.svg";

const RecommendSupplementResult = () => {
  const [recommendState, setRecommendState] = useRecoilState(
    supplementRecommendState
  );
  const [userName, setuserName] = useState(null);
  const [currentIdx, setCureentIdx] = useState(0);
  const [recommendAddModal, setRecommendAddModal] = useState(false);

  const handlecSupplementClick = (idx) => {
    setCureentIdx(idx);

    // 각 보충제를 클릭할 때 마다 servings 정보 업데이트
    setToggleServingValue(
      recommendState.recommendedSupplementList[idx].otherFlavors[0].units[0]
    );
  };

  const [showShadow, setShowShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 스크롤 위치가 첫 번째 내비게이션바 높이만큼 이동했는지 확인
      if (window.scrollY >= 230) {
        setShowShadow(true);
      } else {
        setShowShadow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 원료
  const [source, setSource] = useState("");

  // 맛
  const [otherFlavors, setOtherFlavors] = useState([]);
  const [toggleValue, setToggleValue] = useState(null);

  // 맛 필터 토글
  const [isFlavorFilterModal, setIsFlavorFilterModal] = useState(false);

  const handleFlavorButtonClick = (selectedFlavor) => {
    console.log(toggleValue);
    // 선택된 맛에 따른 회분과 가격 units
    setToggleValue(selectedFlavor);
    handleServingButtonClick(selectedFlavor.units[0]);
    setIsFlavorFilterModal(false); // 모달 닫기
  };

  // 회분 필터 토글
  const [isServingFilterModal, setIsServingFilterModal] = useState(false);
  const [toggleServingValue, setToggleServingValue] = useState(null);

  const handleServingButtonClick = (selectedServing) => {
    // 선택된 회분
    setToggleServingValue(selectedServing);
    setIsServingFilterModal(false); // 모달 닫기
  };

  // 함량

  const [protein, setProtein] = useState("");
  const [fat, setFat] = useState("");
  const [carbohydrate, setCarbohydrate] = useState("");
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

  const fetchData = async () => {
    try {
      const response2 = await TokenApi.get("user/private");
      setuserName(response2.data.userName);
      console.log(supplementRecommendState);
    } catch (error) {
      // localStorage.clear();
    }

    if (
      recommendState.recommendedSupplementList &&
      recommendState.recommendedSupplementList.length > 0
    ) {
      const response = await userSupplementSingleAPI.get(
        `${recommendState.recommendedSupplementList[currentIdx].id}`
      );
      console.log(response);

      //  null값이 출력될 수 있음
      setSource(recommendState.recommendedSupplementList[currentIdx].source);
      setOtherFlavors(
        recommendState.recommendedSupplementList[currentIdx]?.otherFlavors || []
      );
      setProtein(
        recommendState.recommendedSupplementList[currentIdx]
          ?.proteinPerServing || ""
      );
      setFat(
        recommendState.recommendedSupplementList[currentIdx]?.fatPerServing ||
          ""
      );
      setCarbohydrate(
        recommendState.recommendedSupplementList[currentIdx]
          ?.carbohydratePerServing || ""
      );
      setLeucine(
        recommendState.recommendedSupplementList[currentIdx]?.leucine || ""
      );
      setIsoLeucine(
        recommendState.recommendedSupplementList[currentIdx]?.isoLeucine || ""
      );
      setValine(
        recommendState.recommendedSupplementList[currentIdx]?.valine || ""
      );
      setMethionine(
        recommendState.recommendedSupplementList[currentIdx]?.methionine || ""
      );
      setPhenylalanine(
        recommendState.recommendedSupplementList[currentIdx]?.phenylalanine ||
          ""
      );
      setThreonine(
        recommendState.recommendedSupplementList[currentIdx]?.threonine || ""
      );
      setLCarnitine(
        recommendState.recommendedSupplementList[currentIdx]?.l_Carnitine || ""
      );
      setLGlutamine(
        recommendState.recommendedSupplementList[currentIdx]?.l_Glutamine || ""
      );
      setLAlanine(
        recommendState.recommendedSupplementList[currentIdx]?.l_Alanine || ""
      );
      setLLysine(
        recommendState.recommendedSupplementList[currentIdx]?.l_Lysine || ""
      );

      // fetchData가 완료된 후에 toggleValue 설정
      setToggleValue(
        recommendState.recommendedSupplementList[currentIdx]?.otherFlavors[0] ||
          []
      );
    }
  };

  // 가격
  function formatNumberToCurrency(number) {
    if (number && number.price) {
      return number.price.toLocaleString("en-US");
    }
    return "";
  }
  const formattedPrice = formatNumberToCurrency(
    toggleServingValue && toggleServingValue
      ? toggleServingValue
      : recommendState.recommendedSupplementList[currentIdx] &&
          recommendState.recommendedSupplementList[currentIdx]
        ? recommendState.recommendedSupplementList[currentIdx]
        : null
  );

  // 회분 클릭 여부
  const [isServingValue, setIsServingValue] = useState(false);

  // 내 보조제에 추가
  const handleAdd = () => {
    console.log("이거", toggleServingValue);
    if (isServingValue === true) {
      const res = toggleServingValue.supplementId;
      console.log(res);
      TokenApi.post(`/myfit/routines/supplement/${res}`)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
      alert("추가되었습니다!");
    } else {
      const res = toggleValue.units[0].supplementId;
      console.log(res);
      TokenApi.post(`/myfit/routines/supplement`, { supplementIds: [res] })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
      alert("추가되었습니다!");
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentIdx]);

  return (
    <S.RecommendMachineResultContainer>
      <S.RecommendTitleContainer>
        <S.RecommendTitle
          ftsize="32px"
          ftcolor={theme.Neutral990}
          ftweight="700"
        >
          {userName}님의 보조제 추천결과
          <br />
          <S.RecommendTitle ftsize="24px" ftcolor={theme.Neutral900}>
            {userName}님의 신체 정보를 모두 고려했어요.
          </S.RecommendTitle>
        </S.RecommendTitle>
      </S.RecommendTitleContainer>
      <S.RecommendMain>
        <S.RecommendMainTopWrapper showShadow={showShadow}>
          <S.RecommendMainTopTitleWrapper>
            <div className="recommendNavbarWrapper">
              {recommendState.recommendedSupplementList &&
                recommendState.recommendedSupplementList.map(
                  (supplement, idx) => {
                    return (
                      <S.RecommendNavbarItem
                        isSelected={currentIdx === idx}
                        onClick={() => {
                          handlecSupplementClick(idx);
                          setIsServingValue(false);
                        }}
                      >
                        {supplement.koreanName.replace(/\s*\([^)]*\)/g, "")}
                      </S.RecommendNavbarItem>
                    );
                  }
                )}
            </div>
            <S.RecommendMainMachine>
              {recommendState.recommendedSupplementList &&
                recommendState.recommendedSupplementList[currentIdx].koreanName}
            </S.RecommendMainMachine>
          </S.RecommendMainTopTitleWrapper>
          <S.RecommendMainBtn onClick={handleAdd}>
            내 보조제에 추가
          </S.RecommendMainBtn>
        </S.RecommendMainTopWrapper>
        <S.MiddleContainer>
          <img
            src={
              recommendState.recommendedSupplementList &&
              recommendState.recommendedSupplementList[currentIdx].imageURL
            }
            className="supplementImg"
            alt={`${recommendState.recommendedSupplementList && recommendState.recommendedSupplementList[currentIdx].koreanName} 보조제 이미지`}
          />
          <S.InformationContainer>
            <S.SpplementInformationTop>
              {source && (
                <>
                  <span className="smallTitle">원료</span>
                  <p>{source}</p>
                </>
              )}
              <span className="smallTitle">맛</span>
              <S.InformationToggle>
                <button
                  className="toggleButton"
                  onClick={() => {
                    setIsFlavorFilterModal(!isFlavorFilterModal);
                  }}
                >
                  <div className="toggleValue">
                    {toggleValue && toggleValue.flavorName}
                  </div>
                  <img src={toggle} alt="toggle-triangle" />
                </button>
                {isFlavorFilterModal && (
                  <S.ToggleModal>
                    {otherFlavors &&
                      otherFlavors.map((filtervalue, idx) => (
                        <button
                          key={idx}
                          className="toggleModalContent"
                          onClick={(e) => {
                            handleFlavorButtonClick(filtervalue);
                          }}
                        >
                          {filtervalue.flavorName}
                        </button>
                      ))}
                  </S.ToggleModal>
                )}
              </S.InformationToggle>
              <button className="smallTitle">회분</button>
              <S.InformationToggle>
                <button
                  className="toggleButton"
                  onClick={() => {
                    setIsServingFilterModal(!isServingFilterModal);
                  }}
                >
                  <div className="toggleValue">
                    {toggleServingValue
                      ? toggleServingValue.servings
                      : recommendState.recommendedSupplementList[currentIdx]
                          .servings}
                    회분
                  </div>
                  <img src={toggle} alt="toggle-triangle" />
                </button>
                {isServingFilterModal && (
                  <S.ToggleModal>
                    {toggleValue.units &&
                      toggleValue.units.map((filtervalue, idx) => (
                        <button
                          key={idx}
                          className="toggleModalContent"
                          onClick={(e) => {
                            handleServingButtonClick(filtervalue);
                            setIsServingValue(true);
                          }}
                        >
                          {filtervalue.servings}회분
                        </button>
                      ))}
                  </S.ToggleModal>
                )}
              </S.InformationToggle>
            </S.SpplementInformationTop>
            <S.SpplementInformationMiddle>
              <span className="total">
                {toggleValue && toggleValue.flavorName},{" "}
                {toggleServingValue ? toggleServingValue.servings : null}회분
              </span>
            </S.SpplementInformationMiddle>
            <S.SpplementInformationBottom>
              <span onChange={formatNumberToCurrency}>가격</span>
              <p>{formattedPrice}원</p>
            </S.SpplementInformationBottom>
            <button
              className="goToBuy"
              onClick={() =>
                window.open(
                  recommendState.recommendedSupplementList &&
                    recommendState.recommendedSupplementList[currentIdx]
                      .marketURL,
                  "_blank"
                )
              }
            >
              구매하러 가기
            </button>
          </S.InformationContainer>
        </S.MiddleContainer>
        <S.RecommendMainBottom>
          <span className="bottomTitle">추천 이유</span>
          <div className="bottomDescription">
            {recommendState.recommendedSupplementList[currentIdx].description}
          </div>
        </S.RecommendMainBottom>
        <S.RecommendMainBottom>
          {nutrientData.some(
            (nutrient) =>
              nutrient.value !== null &&
              nutrient.value !== undefined &&
              nutrient.value !== ""
          ) && (
            <>
              <span className="bottomTitle">보충제 함량</span>
              <div className="bottomDescription">
                <div className="PerServing">
                  {nutrientData
                    .filter(
                      (nutrient) =>
                        nutrient.value !== null &&
                        nutrient.value !== undefined &&
                        nutrient.value !== ""
                    )
                    .map((nutrient, index) => (
                      <S.PerServing key={index}>
                        <span className="TitleSpan">{nutrient.label}</span>
                        <p className="ContentP">{nutrient.value}g</p>
                      </S.PerServing>
                    ))}
                </div>
              </div>
            </>
          )}
        </S.RecommendMainBottom>
      </S.RecommendMain>
    </S.RecommendMachineResultContainer>
  );
};

export default RecommendSupplementResult;
