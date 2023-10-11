import * as S from "./StyledEmailModal";
import { useNavigate } from "react-router-dom";
import xbutton from "../../assets/images/xbutton.svg";
import EmailModalInput from "../EmailModalInput/EmailModalInput";
import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { validationState } from "../../recoil/atom";
import { verifyMailPost } from "../../apis/API";

const EmailModal = ({ setIsEmailModal }) => {
	const isValidState = useRecoilValue(validationState);
	// 코드 보내기

	const handleTransmit = async () => {
		try {
			console.log(isValidState.loginEmail[0])
			const loginEmail = {
				mailAddress: isValidState.loginEmail[0]
			}
			const res = await verifyMailPost.post("", loginEmail);
			console.log(res)
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		handleTransmit();
	}, []);

	return (
		<S.ModalBox>
			<S.ModalWrapper>
				<div className="emailModalTextWrapper">
					<div className="xButton">
						<img
							src={xbutton}
							alt="닫기 버튼"
							onClick={() => {
								setIsEmailModal(false);
							}}
						/>
					</div>
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
			</S.ModalWrapper>
		</S.ModalBox>
	);
};

export default EmailModal;