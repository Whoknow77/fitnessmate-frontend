import * as S from "./StyledLoginModal";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginModal = ({ setIsLoginModal }) => {
  const navigate = useNavigate();

  // 모달 띄워져 있을 때는 바깥쪽 스크롤 안되도록
  useEffect(() => {
    const $body = document.querySelector("body");
    const overflow = $body.style.overflow;
    $body.style.overflow = "hidden";
    return () => {
      $body.style.overflow = overflow;
    };
  }, []);

  const handleCancle = () => {
    setIsLoginModal(false);
  };

  const handleLogin = () => {
    setIsLoginModal(false);
    navigate("login");
  };
  return (
    <S.ModalBox>
      <S.LoginModalWrapper>
        <span className="loginModalTitle">
          로그인해야 이용 가능한 서비스입니다.
          <br />
          로그인 하시겠습니까?
        </span>
        <div className="loginModalButtonWrapper">
          <button className="cancleBtn" onClick={handleCancle}>
            돌아갈래요
          </button>
          <button className="loginBtn" onClick={handleLogin}>
            로그인 하러 갈래요
          </button>
        </div>
      </S.LoginModalWrapper>
    </S.ModalBox>
  );
};

export default LoginModal;
