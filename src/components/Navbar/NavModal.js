import React, { useRef } from "react";
import * as S from "./StyledNavModal";
import useOutSideClick from "./useOutSideClick";
import { useNavigate } from "react-router-dom";

function NavModal({ onClose }) {

	const navigate = useNavigate();

	const modalRef = useRef(null)
	const handleClose = () => {
		onClose?.();
	};

	useOutSideClick(modalRef, handleClose);

	return (
			<S.ModalWrap ref={modalRef}>
				<S.Contents>
					<div>
						<p>안녕하세요.</p>
						{/* username 불러오는 것으로 변경해야함 */}
						<p>김정욱님!</p>
					</div>
					<div>
						<S.Button onClick={() => { localStorage.clear(); navigate("/"); }}>
							로그아웃
						</S.Button>
						<S.Button onClick={() => { navigate("/mypage/fixprofile"); handleClose(); }}>
							계정 정보 수정
						</S.Button>
						<S.Button onClick={() => { navigate("/mypage/fixbodyinfo"); handleClose(); }}>
							신체 정보 수정
						</S.Button>
					</div>
				</S.Contents>
			</S.ModalWrap>
	);
}

export default NavModal;