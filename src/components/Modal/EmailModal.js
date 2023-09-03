import * as S from "./StyledEmailModal";
import { useNavigate } from "react-router-dom";
import xbutton from "../../assets/images/xbutton.svg";
import EmailModalInput from "../EmailModalInput/EmailModalInput";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { validationState } from "../../recoil/atom";
import { verifyMailPost } from "../../apis/API";

const EmailModal = ({ setIsEmailModal }) => {
  const navigate = useNavigate();
  const isValidState = useRecoilValue(validationState);
  // 코드 보내기
  const handleTransmit = async () => {
    try {
      const request = { mailAddress: isValidState.loginEmail[0] };
      const response = await verifyMailPost.post("", request);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <S.ModalBox>
      <S.ModalWrapper>
        <div className="emailModalTextWrapper">
          <div1 className="xButton">
            <img
              src={xbutton}
              alt="닫기 버튼"
              onClick={() => {
                setIsEmailModal(false);
              }}
            />
          </div1>
          <span className="emailModalTitle">
            이메일로 전송된
            <br />
            6자리 코드를 입력해 주세요.
          </span>
          <div className="emailModalContentWrapper">
            <span className="emailModalContent">
              이 코드가 전송되는데 최대 1분이 소요될 수 있습니다
            </span>
            <button
              className="retransmitBtn"
              type="button"
              onClick={handleTransmit}
            >
              코드 재전송
            </button>
          </div>
        </div>
        <EmailModalInput setIsEmailModal={setIsEmailModal} />
        {/* {
            // 포커스 안 된 상태(이메일 유효성 검사)
            isValidState.emailModal[1] ? "" : NotEmailCodeChecked
          } */}
      </S.ModalWrapper>
    </S.ModalBox>
  );
};

export default EmailModal;
