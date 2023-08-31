// 이 목록에 추가하기 모달

import React, { useState, useEffect, useRef } from "react";
import * as S from "./StyledFixModal";
import { BigButton } from "../../../../components/index";
import fix from "../../../../assets/images/Fix_Icon.svg";
import x from "../../../../assets/images/X_Icon.svg";
import trash from "../../../../assets/images/Trash_Icon.svg";
import plus from "../../../../assets/images/Plus_Icon.svg";

// 더미데이터
export const DUMMY_DATA = [
	{
		id: 1,
		text: '분할 1',
		name: 'first',
	},
	{
		id: 2,
		text: '분할 2',
		name: 'second',
	},

];

function FixModal() {

	const [isOpen, setIsOpen] = useState(false);

	const handleClose = () => {
		setIsOpen(false);
	};

	// 모달 띄워져 있을 때는 바깥쪽 스크롤 안되도록
	useEffect(() => {
		const $body = document.querySelector("body");
		const overflow = $body.style.overflow;
		$body.style.overflow = "hidden";
		return () => {
			$body.style.overflow = overflow
		};
	}, []);

	// 클릭하면 편집할 수 있도록 시도하였으나 현재 수정하려고 하면 모달창이 닫힘
	const [text, setText] = useState();
	const [isEditable, setIsEditable] = useState(false);

	const handleDoubleClick = () => {
		setIsEditable(true);
	};

	const handleChange = (e) => {
		setText(e.target.defaultValue);
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			setIsEditable(false);
		}
	};

	return (
		<S.AppWrap>
			<S.NavButton onClick={() => { setIsOpen(!isOpen) }} >
				<img src={fix} alt="편집하기 버튼" />
				<p>편집</p>
			</S.NavButton>
			{isOpen && (
				<S.Overlay>
					<S.ModalContainer>
						<S.ModalWrap>
							<S.Header>
								<h1>내 운동 목록</h1>
								<span>이름을 더블클릭하여 변경하세요.</span>
							<S.Contents>
								{isEditable ? (
									DUMMY_DATA.map((data) => {
										return (
											<div>
												<input
													type="text"
													name={data.text}
													defaultValue={data.text}
													onChange={handleChange}
													onKeyDown={handleKeyDown}
													placeholder={data.text} />
													<img src={trash} alt="삭제 버튼" />
											</div>
										);
									}))
									:
									(DUMMY_DATA.map((data) => {
										return (
											<div onDoubleClick={handleDoubleClick} >
												<p>{data.text}</p>
												<img src={trash} alt="삭제 버튼" />
											</div>
										);
									}))
								}
							</S.Contents>
							<S.AddButton>
								<img src={plus} alt="목록 추가 버튼" />
							</S.AddButton>
							</S.Header>
							<BigButton>수정 완료</BigButton>
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

export default FixModal;