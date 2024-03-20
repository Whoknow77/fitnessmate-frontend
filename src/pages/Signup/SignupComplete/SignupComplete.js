import { useNavigate } from "react-router-dom";
import * as S from "../StyledSignup";
import { BigButton } from "./../../../components/";
import rightarrow2 from "../../../assets/images/rightarrow2.svg";

const SignupComplete = () => {
  const navigate = useNavigate();

  // 회원 가입시 자동 로그인
  const GoHome = (e) => {
    e.preventDefault();
    navigate("/");
  };

  // 추천받기
  const GoRecommend = (e) => {
    e.preventDefault();
    navigate("/recommend");
  };

  // 루틴 만들기
  const GoRoutine = (e) => {
    e.preventDefault();
    navigate("/mypage");
  };

  // 검색하기
  const GoSearch = (e) => {
    e.preventDefault();
    navigate("/searchworkout/1");
  };

  return (
    <S.SignupContainer>
      {/* 제목들 중 마지막 페이지만 가운데 정렬 -> 인라인으로 처리 */}
      <S.SignupTitle>회원가입이 완료되었습니다.</S.SignupTitle>
      <div className="signupCompleteNavBox">
        <span className="signupCompleteTitle">바로 이용해보세요.</span>
        <button className="signupCompleteNavItem" onClick={GoRecommend}>
          <span className="signupCompleteNavItemText">
            추천받기
            <br />
            <span className="signupCompleteNavItemText2">
              AI가 신체 정보에 알맞은 운동/보조제를 추천해드려요.
            </span>
          </span>
          <img
            src={rightarrow2}
            alt="추천 받기 버튼"
            className="signupCompleteNavItemBTn"
          />
        </button>
        <button className="signupCompleteNavItem" onClick={GoRoutine}>
          <span className="signupCompleteNavItemText">
            루틴 만들기
            <br />
            <span className="signupCompleteNavItemText2">
              추천 받은 운동으로 루틴을 만들어 보세요.
            </span>
          </span>
          <img
            src={rightarrow2}
            alt="루틴 만들기 버튼"
            className="signupCompleteNavItemBTn"
          />
        </button>
        <button className="signupCompleteNavItem" onClick={GoSearch}>
          <span className="signupCompleteNavItemText">
            검색하기
            <br />
            <span className="signupCompleteNavItemText2">
              다양한 종류의 운동/보조제를 검색해보세요.
            </span>
          </span>
          <img
            src={rightarrow2}
            alt="검색 버튼"
            className="signupCompleteNavItemBTn"
          />
        </button>
      </div>

      <S.ButtonContainer>
        <BigButton handleSubmit={GoHome}>홈으로</BigButton>
      </S.ButtonContainer>
    </S.SignupContainer>
  );
};

export default SignupComplete;
