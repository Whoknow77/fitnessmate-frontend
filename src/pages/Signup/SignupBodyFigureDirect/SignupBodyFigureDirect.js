import { useNavigate } from "react-router-dom";
import { BodyCompositionInput } from "../../../components";
import * as S from "../StyledSignup";
import { BeforeButton, MiddleButton } from "../../../components/";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { validationState } from "../../../recoil/atom";
import { userPostAPI } from "../../../apis/API";

const SignupBodyFigureDirect = () => {
  // 객체 초기화
  useEffect(() => {
    setIsValidState((pre) => ({
      ...pre,
      bodyFat: ["", false],
      muscleMass: ["", false],
    }));
  }, []);

  const navigate = useNavigate();
  const [isValidState, setIsValidState] = useRecoilState(validationState);

  const handleBackPage = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      Object.entries(isValidState)?.filter(([key, value]) => {
        return value[1] === true;
      }).length >= 12
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
      }
    }
  };

  return (
    <S.SignupContainer>
      <S.SignupTitle status="3">
        <div className="statusBar">
          <div className="statusBar2"></div>
        </div>
        <S.TitleEmphasis>골격근량과 체지방량</S.TitleEmphasis>
        을 입력해주세요
        <br />
        <span className="recommendText">정밀한 추천을 위해 필요해요</span>
      </S.SignupTitle>
      <S.BodyCompositionInputList>
        <BodyCompositionInput name="muscleMass">골격근량</BodyCompositionInput>
        <BodyCompositionInput name="bodyFat">체지방량</BodyCompositionInput>
      </S.BodyCompositionInputList>
      <S.ButtonContainer>
        <BeforeButton handleSubmit={handleBackPage} />
        <MiddleButton handleSubmit={handleSubmit}>회원가입 완료</MiddleButton>
      </S.ButtonContainer>
    </S.SignupContainer>
  );
};

export default SignupBodyFigureDirect;
