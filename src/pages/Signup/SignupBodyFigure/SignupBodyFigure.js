import * as S from "../StyledSignup";
import { useNavigate } from "react-router-dom";
import rightarrow from "../../../assets/images/rightarrow.svg";
import { MiddleButton, BeforeButton, TextCheckbox } from "../../../components/";
import { useRecoilState } from "recoil";
import { validationState } from "../../../recoil/atom";
import { useState } from "react";
import { userPostAPI } from "../../../apis/API";

const SignupBodyFigure = () => {
  const navigate = useNavigate();
  const currenturl = window.location.pathname;
  const [isValidState, setIsValidState] = useRecoilState(validationState);
  const [isCategorySelect, setIsCategorySelect] = useState(false);

  // bodyFat, muscleMass
  const categorylist = [
    ["마른 편이에요", [12, 30]],
    ["보통이에요", [15, 30]],
    ["조금 통통한 편이에요", [25, 30]],
    ["뚱뚱해요", [35, 30]],
  ];

  const updownBalanceTextList = [
    "하체가 상체보다 더 발달했어요",
    "둘 다 발달했거나 큰 차이 없어요",
    "상체가 하체보다 더 발달했어요",
  ];

  console.log(isValidState);

  const handleClick = (idx) => {
    const newArr = Array(categorylist.length).fill(false);
    newArr[idx] = true;
    setIsCategorySelect(newArr);
    setIsValidState((pre) => ({
      ...pre,
      BodyFat: [categorylist[idx][1][0], true],
      muscleMass: [categorylist[idx][1][1], true],
    }));
  };

  const handleBackPage = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      Object.entries(isValidState)?.filter(([key, value]) => {
        return value[1] === true;
      }).length === 12
    ) {
      // 회원가입 post 요청
      const submission = {};
      for (const key in isValidState) {
        if (key !== "password2") {
          submission[key] = isValidState[key][0];
        }
        if (key === "height" || key === "weight") {
          submission[key] = Number(isValidState[key][0]);
        }
      }
      const res = await userPostAPI.post("", submission);
      if (res.data.accessToken) {
        const accessToken = res.data.accessToken;
        const refreshToken = res.data.refreshToken;
        // 토큰 저장
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("rememberMe", false);

        // 회원가입 객체 초기화
        const updatedState = Object.keys(isValidState).reduce((acc, key) => {
          acc[key] = ["", false];
          return acc;
        }, {});

        setIsValidState(updatedState);

        navigate("/signup/complete", { replace: false }); // 절대 경로로 이동
      } else {
        console.log("회원가입 오류");
        return { error: "Wrong Input" };
      }
    }
  };
  return (
    <S.SignupContainer>
      <S.SignupTitle status="3">
        <div className="statusBar">
          <div className="statusBar2"></div>
        </div>
        체형 정보를 입력해주세요
        <br />
        <span className="recommendText">맞춤 추천을 위해 필요해요</span>
      </S.SignupTitle>
      <S.SignupUpdonwBalanceWrapper>
        <span className="updownBalanceTitle">상/하체 균형을 조절해주세요</span>
        <div className="updownBalanceBox">
          <span className="updownBalanceBoxTitle">가나다</span>
        </div>
        <S.SignupTextContainer>
          <span className="bodyfigureText">어떤 체형인가요?</span>
          {categorylist?.map((item, index) => {
            return (
              <TextCheckbox
                key={index}
                handleClick={handleClick}
                isSelected={isCategorySelect[index]}
                elementidx={index}
              >
                {item[0]}
              </TextCheckbox>
            );
          })}
          <div className="directButtonContainer">
            <button
              className="directbutton"
              onClick={(e) => {
                e.preventDefault();
                navigate(`${currenturl}/direct`);
              }}
            >
              직접 입력하기
              <img
                src={rightarrow}
                className="rightArrow"
                alt="직접 입력하기 버튼 이미지"
              />
            </button>
          </div>
          <S.ButtonContainer>
            <BeforeButton handleSubmit={handleBackPage} />
            <MiddleButton handleSubmit={handleSubmit}>다음</MiddleButton>
          </S.ButtonContainer>
        </S.SignupTextContainer>
      </S.SignupUpdonwBalanceWrapper>
    </S.SignupContainer>
  );
};

export default SignupBodyFigure;
