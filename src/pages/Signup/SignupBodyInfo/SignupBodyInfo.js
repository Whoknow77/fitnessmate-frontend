import { useEffect, useState } from "react";
import * as S from "./../StyledSignup";
import { InputName } from "../../../components/ProfileInput/StyledProfileInput";
import female from "../../../assets/images/female.png";
import male from "../../../assets/images/male.png";
import { useNavigate } from "react-router-dom";
import {
  MiddleButton,
  BeforeButton,
  ProfileInput,
} from "./../../../components/";
import { useRecoilState } from "recoil";
import { validationState } from "../../../recoil/atom";

const SignupBodyInfo = () => {
  const navigate = useNavigate();
  const [isValidState, setIsValidState] = useRecoilState(validationState);
  // 성별 선택
  const [sex, setSex] = useState([
    isValidState.sex[0] === "남성" ? 1 : 0,
    isValidState.sex[0] === "여성" ? 1 : 0,
  ]);
  const [isReady, setIsReady] = useState(false);

  const handleBackPage = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  // 모든 검사를 통과했는지를 반환하는 함수
  // 이전 페이지와 성별 키 몸무게 통과해야함
  const handleValidate = () => {
    return (
      Object.entries(isValidState)?.filter(([key, value]) => {
        return value[1];
      }).length >= 8
    );
  };

  useEffect(() => {
    if (handleValidate()) {
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  }, [isValidState]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidate()) {
      navigate("/signup/bodyfigure", { replace: false }); // 절대 경로로 이동
    }
  };

  // 성별 선택
  const handleSexState = () => {
    // 남성
    if (sex[0]) {
      setIsValidState((pre) => ({
        ...pre,
        sex: ["남성", true],
      }));
    }
    // 여성
    else if (sex[1]) {
      setIsValidState((pre) => ({
        ...pre,
        sex: ["여성", true],
      }));
    }
  };

  // 남성
  const handleMale = (e) => {
    e.preventDefault();
    setSex([1, 0]);
  };

  // 여성
  const handleFemale = (e) => {
    e.preventDefault();
    setSex([0, 1]);
  };

  useEffect(() => {
    handleSexState();
  }, [sex]);

  return (
    <S.SignupContainer>
      <S.SignupTitle status="2">
        <div className="statusBar">
          <div className="statusBar2"></div>
        </div>
        신체 정보를 입력해주세요
      </S.SignupTitle>
      <S.BodyInfoContainer>
        <div className="sexSelect">
          <InputName>
            성별
            <span className="essentialSymbol"> *</span>
          </InputName>
          <ul className="sexList">
            <S.SexItem onClick={handleMale} sex={sex[0]}>
              <img className="sexImg" src={male} alt="성별 이미지(남성)" />
              <S.SexName sex={sex[0]}>남성</S.SexName>
            </S.SexItem>
            <S.SexItem onClick={handleFemale} sex={sex[1]}>
              <img className="sexImg" src={female} alt="성별 이미지(여성)" />
              <S.SexName sex={sex[1]}>여성</S.SexName>
            </S.SexItem>
          </ul>
          {isValidState.sex[1] ? (
            ""
          ) : (
            <span className="bodyInfoWarning">성별을 선택해 주세요.</span>
          )}
        </div>
        <ProfileInput placeholder="숫자만 입력" name="height">
          키
        </ProfileInput>
        <ProfileInput placeholder="숫자만 입력" name="weight">
          몸무게
        </ProfileInput>
      </S.BodyInfoContainer>
      <S.ButtonContainer>
        <BeforeButton handleSubmit={handleBackPage} />
        <MiddleButton handleSubmit={handleSubmit} isReady={isReady}>
          다음
        </MiddleButton>
      </S.ButtonContainer>
    </S.SignupContainer>
  );
};

export default SignupBodyInfo;
