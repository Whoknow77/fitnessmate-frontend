// 편집 모달

import React, { useState, useEffect } from "react";
import * as S from "./StyledAddModal";
import { TextCheckbox, BigButton, SearchBar } from "../../../../components/index";
import add from "../../../../assets/images/Add_Icon.svg";
import x from "../../../../assets/images/X_Icon.svg";

function AddModal() {

	const [isOpen, setIsOpen] = useState(false);

	const handleClose = () => {
		setIsOpen(false);
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
			<S.NavButton onClick={() => { setIsOpen(!isOpen) }} >
				<img src={add} alt="추가하기 버튼" />
				<p>이 목록에 운동 추가하기</p>
			</S.NavButton>
			{isOpen && (
				<S.Overlay>
					<S.ModalContainer>
						<S.ModalWrap>
							<S.Header>
								<h1>이 목록에 운동 추가하기</h1>
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
						<S.CloseButton onClick={handleClose}>
							<img src={x} alt="닫기 버튼" />
						</S.CloseButton>
					</S.ModalContainer>
				</S.Overlay>
			)}
		</S.AppWrap>
	);
}

export default AddModal;