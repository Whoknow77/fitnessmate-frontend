// 편집 모달

import React, { useEffect } from "react";
import * as S from "./StyledAddModal";
import { TextCheckbox, BigButton, SearchBar } from "../../../../components/index";
import x from "../../../../assets/images/X_Icon.svg";

function AddModal({ onClose }) {

	const handleClose = () => {
		onClose?.();
	};

	useEffect(() => {
		const $body = document.querySelector("body");
		const overflow = $body.style.overflow;
		$body.style.overflow = "hidden";
		return () => {
			$body.style.overflow = overflow
		};
	}, []);


	return (
		<S.AppWrap>
			<S.Overlay>
				<S.ModalContainer>
					<S.ModalWrap>
						<S.Header>
							<S.ModalTitle>
								<h1>이 목록에 운동 추가하기</h1>
								<S.CloseButton onClick={handleClose}>
									<img src={x} alt="닫기 버튼" />
								</S.CloseButton>
							</S.ModalTitle>
						</S.Header>
						<S.SerchArea>
							<SearchBar />
						</S.SerchArea>
						<S.Contents>
							<S.CheckboxArea>
								<TextCheckbox>데드리프트</TextCheckbox>
							</S.CheckboxArea>
							<S.CheckboxArea>
								<TextCheckbox>데드리프트</TextCheckbox>
							</S.CheckboxArea>
							<S.CheckboxArea>
								<TextCheckbox>데드리프트</TextCheckbox>
							</S.CheckboxArea>
							<S.CheckboxArea>
								<TextCheckbox>데드리프트</TextCheckbox>
							</S.CheckboxArea>
							<S.CheckboxArea>
								<TextCheckbox>데드리프트</TextCheckbox>
							</S.CheckboxArea>
						</S.Contents>
						<BigButton>선택한 2개의 운동 추가하기</BigButton>
					</S.ModalWrap>
				</S.ModalContainer>
			</S.Overlay>
		</S.AppWrap>
	);
}

export default AddModal;