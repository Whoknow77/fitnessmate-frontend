import { useEffect, useState } from "react";
import * as S from "./StyledFix";
import { useNavigate } from "react-router-dom";
import { MiddleButton, BeforeButton } from "../../../components/";
import ProfileInput from "./ProfileInput/ProfileInput";
import { useRecoilState } from "recoil";
import { validationState } from "../../../recoil/atom";
import TokenApi from "../../../apis/TokenApi";
import rightarrow from "../../../assets/images/rightarrow.svg";
import clickCategory from "../../../assets/images/clickCategory.svg";
import clickNoneCategory from "../../../assets/images/clickNoneCategory.svg";
import {
  FilterPriceSlide,
  FilterPriceRangeWrap,
  FilterPriceRange,
  FilterPriceSlideInner,
} from "../../Signup/SignupBodyFigure/StyledBalanceBar";
import BodyCompositionInput from "./BodyCompositionInput/BodyCompositionInput";
import MiddleTextCheckbox from "../../../components/TextCheckbox/MiddleTextCheckbox";

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
      console.log(response_body);
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

  // 체형 옵션 배열
  const [isCategory, setIsCategory] = useState(true);
  const isCategoryButton = () => {
    setIsCategory(true);
  };
  const isCategoryNoneButton = () => {
    setIsCategory(false);
  };

  const categorylist = [
    ["근육질 체형", [10, 40]],
    ["마른 체형", [15, 30]],
    ["보통 체형", [18, 35]],
    ["통통한 체형", [20, 35]],
    ["뚱뚱한 체형", [25, 35]],
  ];

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
    } else if (name === "weight") {
      setWeight(e.target.value);
    } else if (name === "muscleMass") {
      setMuscleMass(e.target.value);
    } else if (name === "bodyFat") {
      setBodyFat(e.target.value);
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
      window.location.replace("fixbodyinfo");
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
          <span className="updownBalanceTitle">상/하체 균형</span>
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
        {isCategory ? (
          <S.SignupTextContainer>
            <span className="bodyfigureText">체형을 선택해주세요</span>
            <button className="categoryButton">
              <img src={clickCategory} alt="선택된 체형입력 방식" />
              직접 입력하기
            </button>
            <S.BodyCompositionInputList>
              <BodyCompositionInput
                value={muscleMass}
                name="muscleMass"
                handleChange={handleChange}
              >
                골격근량
              </BodyCompositionInput>
              <BodyCompositionInput
                name="bodyFat"
                value={bodyFat}
                handleChange={handleChange}
              >
                체지방량
              </BodyCompositionInput>
            </S.BodyCompositionInputList>
            <div className="informationBodyComposition">
              <p className="titleInformation">어떻게 알 수 있나요?</p>
              <p className="contentInformation">
                골격근량과 체지방량은 In-body 기계를 통해 측정 가능해요
              </p>
            </div>
            <button
              className="categoryNoneButton"
              onClick={isCategoryNoneButton}
            >
              <img src={clickNoneCategory} alt="선택된 체형입력 방식" />
              유형으로 선택하기
            </button>
          </S.SignupTextContainer>
        ) : (
          <S.SignupTextContainer>
            <span className="bodyfigureText">체형을 선택해주세요</span>
            <button className="categoryNoneButton" onClick={isCategoryButton}>
              <img src={clickNoneCategory} alt="선택된 체형입력 방식" />
              직접 입력하기
            </button>
            <button className="categoryButton">
              <img src={clickCategory} alt="선택된 체형입력 방식" />
              유형으로 선택하기
            </button>
            <S.BodyCompositionList>
              {categorylist?.map((item, index) => {
                return (
                  <MiddleTextCheckbox
                    key={index}
                    handleClick={handleClick}
                    isSelected={isCategorySelect[index]}
                    elementidx={index}
                  >
                    {item[0]}
                  </MiddleTextCheckbox>
                );
              })}
            </S.BodyCompositionList>
          </S.SignupTextContainer>
        )}
        <S.ButtonContainer>
          <BeforeButton handleSubmit={handleBackPage} />
          <MiddleButton handleSubmit={handleSubmit}>수정 완료</MiddleButton>
        </S.ButtonContainer>
      </S.SignupUpdonwBalanceWrapper>
    </S.SignupContainer>
  );
};

export default FixBodyInfo;
