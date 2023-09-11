import * as S from "./StyeldLeaveModal";
import { useNavigate } from "react-router-dom";

const CancleModal = ({ setIsCancleModal }) => {
  const navigate = useNavigate();
  const handleCancle = (e) => {
    setIsCancleModal(false);
    navigate("/");
  };

  const handleLeave = (e) => {
    setIsCancleModal(false);
  };
  return (
    <S.ModalBox>
      <S.ModalWrapper>
        <span className="leaveModalTitle">
          작성 중인 회원가입 내용이 저장되지 않습니다
          <br />
          나가시겠습니까?
        </span>
        <div className="leaveModalButtonWrapper">
          <button className="cancleBtn" onClick={handleCancle}>
            네 나갈래요
          </button>
          <button className="leaveBtn" onClick={handleLeave}>
            아니요
          </button>
        </div>
      </S.ModalWrapper>
    </S.ModalBox>
  );
};

export default CancleModal;
