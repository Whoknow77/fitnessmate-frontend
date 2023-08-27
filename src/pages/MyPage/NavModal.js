import React from "react";
import * as S from "./StyledNavModal";
import { BigButton } from "../../components/index";
import { TextCheckbox } from "../../components/index";

function NavModal({ onClose }) {
	const handleClose = () => {
		onClose?.();
	};
	return (
		<S.Overlay>
			<S.ModalWrap>
				<S.Header>
				<S.CloseButton>
					</S.CloseButton>
					<h1>운동</h1>
					<S.CloseButton onClick={handleClose}>
						<i className="fa-solid fa-xmark"></i>
					</S.CloseButton>
				</S.Header>
				<S.Contents>
				<TextCheckbox>데드리프트</TextCheckbox>
				</S.Contents>
				<S.Contents>
				<TextCheckbox>데드리프트</TextCheckbox>
				</S.Contents>
				<S.Contents>
				<TextCheckbox>데드리프트</TextCheckbox>
				</S.Contents>
				<S.Contents>
				<TextCheckbox>데드리프트</TextCheckbox>
				</S.Contents>
				<S.Contents>
				<TextCheckbox>데드리프트</TextCheckbox>
				</S.Contents>
				<BigButton>선택한 2개의 운동 추가하기</BigButton>
			</S.ModalWrap>
		</S.Overlay>
	);
}

export default NavModal;