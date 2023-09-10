// 편집 모달

import React, { useState, useEffect, useRef } from "react";
import * as S from "./StyledFixModal";
import x from "../../../../assets/images/X_Icon.svg";
import trash from "../../../../assets/images/Trash_Icon.svg";
import plus from "../../../../assets/images/Plus_Icon.svg";
import { BigButton } from "../../../../components/index";
import { DUMMY_DATA } from '../MypageHome';
import OutSideClick from "../../../../components/Navbar/OutSideClick";
import { update } from "react-spring";

function FixModal({ data, onUpdateData, onClose, onDeleteItem }) {

	// data가 변경될 때마다 items가 업데이트
	useEffect(() => {
		setItems([...data]);
	}, [data]);

	const [items, setItems] = useState([...DUMMY_DATA]); // DUMMY_DATA를 복사하여 초기화

	const [text, setText] = useState();
	const [editableItemId, setEditableItemId] = useState(null); // 수정 중인 항목의 ID를 관리

	const [inputStates, setInputStates] = useState([]); // 입력 필드 상태 목록
	const [deletedIds, setDeletedIds] = useState([]);
	const nextInputId = useRef(Math.max(...items.map((item) => item.id)) + 1); // 다음 입력 필드의 고유 ID를 관리하는 변수


	// AddButton을 보이거나 숨기는 상태를 추가
	const [addButtonVisible, setAddButtonVisible] = useState(items.length === 5 ? false : true);

	useEffect(() => {
		setAddButtonVisible(items.length < 5);
	}, [items]);

	const handleDoubleClick = (id) => {
		setEditableItemId(id);
		// 모달이 열릴 때 text 상태 초기화
		setText("");
	};

	const handleChange = (e, id) => {
		const updatedInputStates = inputStates.map((inputState) => {
			if (inputState.id === id) {
				inputState.text = e.target.value; // 해당 항목의 text 값을 변경
			}
			return inputState;
		});

		// text 상태 업데이트
		const newText = e.target.value;
		setText(newText);

		setInputStates(updatedInputStates);
	};

	const handleKeyPress = (e, id) => {

		// Enter 키가 아닌 경우에만 텍스트 업데이트
		if (e.key !== "Enter") {
			const updatedInputStates = inputStates.map((inputState) => {
				if (inputState.id === id) {
					inputState.text = e.target.value;
				}
				return inputState;
			});
			setInputStates(updatedInputStates);
		}
	};

	const handleAddInput = (e) => {

		if (items.length + inputStates.length + 1 === 5) {
			setAddButtonVisible(false)
		}

		if (items.length < 5) {

			let newInputId;

			if (deletedIds.length > 0) {
				// 삭제된 ID가 있다면 남아있는 ID 중에서 가장 큰 ID를 찾음
				const maxExistingId = Math.max(...items.map((item) => item.id));
				// 가장 큰 ID에 1을 더하여 새로운 ID 생성
				newInputId = maxExistingId + 1;
				deletedIds.pop(); // 삭제된 ID 배열에서 해당 ID 제거
			} else {
				// 삭제된 ID가 없다면 다음 입력 필드의 고유 ID 증가
				newInputId = nextInputId.current;
				nextInputId.current += 1;
			}

			const newInputState = {
				id: newInputId,
				text: "", // 비워진 상태로 초기화
			};

			// 입력 상태 배열 업데이트
			setInputStates((prevInputs) => [...prevInputs, newInputState]);


			// 삭제된 ID 배열 업데이트
			setDeletedIds([...deletedIds]);

			console.log(inputStates)

			setText("")
		}
	};

	const handleRemoveInput = (id) => {
		// 입력 필드를 삭제하고 items 배열에서도 해당 아이템을 제거
		const updatedInputStates = inputStates.filter((input) => input.id !== id);
		setInputStates(updatedInputStates);

		const deletedItemId = id; // 삭제된 항목의 ID 저장
		setDeletedIds((prevDeletedIds) => [...prevDeletedIds, deletedItemId]);

		// 입력 필드를 삭제하고 items 배열에서도 해당 아이템을 제거
		const updatedItems = items.filter((item) => item.id !== id);
		setItems(updatedItems);

		// 삭제된 항목의 ID를 Mypagehome으로 전달
		onDeleteItem?.(deletedItemId);
	};


	useEffect(() => {
		const $body = document.querySelector("body");
		const overflow = $body.style.overflow;
		$body.style.overflow = "hidden";
		return () => {
			$body.style.overflow = overflow
		};
	}, []);

	const handleClose = () => {
		// 모달을 닫기만 함
		onClose?.();
	};
	const modalRef = useRef(null);
	OutSideClick(modalRef, handleClose);

	const handleSubmit = () => {
		// 기존 아이템과 새로운 아이템을 합친 새로운 배열을 제작
		const updatedData = [...data, ...inputStates];
		console.log("updatedData", updatedData)

		// 데이터 상태와 입력 상태를 업데이트
		onUpdateData(updatedData);
		setItems(updatedData);
		setInputStates(updatedData);

		// 입력이 완료된 후에 text 상태를 초기화
		setText("");

		onClose?.(); // 모달 닫기 (입력과 상관없이 항상 모달을 닫도록 이동)
	};
	return (
		<S.AppWrap>
			<S.Overlay>
				<S.ModalContainer ref={modalRef}>
					<S.ModalWrap>
						<S.Header>
							<S.ModalTitle>
								<h1>내 운동 목록</h1>
								<S.CloseButton onClick={handleClose}>
									<img src={x} alt="닫기 버튼" />
								</S.CloseButton>
							</S.ModalTitle>
							<span>이름을 더블클릭하여 변경하세요.</span>
							<S.Contents>
								{data.map((item) => (
									<div className="contents-input" key={item.id}>
										{editableItemId === item.id ? (
											<input
												type="text"
												placeholder={item.text}
												value={text !== null ? text : item.text} // text가 채워져 있을 때는 text로, 비어있을 때는 item.text로 초기화
												onChange={(e) => setText(e.target.value)} // text 상태 업데이트
												onBlur={() => {
													const updatedData = data.map((dataItem) => {
														if (dataItem.id === item.id) {
															dataItem.text = text !== null ? text : item.text; // text가 채워져 있을 때는 text로, 비어있을 때는 item.text로 업데이트
														}
														return dataItem;
													});
													onUpdateData(updatedData);
													setEditableItemId(null);
													setText(null); // text 상태 초기화
												}}
											/>


										) : (
											<p onClick={() => handleDoubleClick(item.id)}>{item.text}</p>
										)}
										<img
											src={trash}
											alt="삭제 버튼"
											onClick={() => handleRemoveInput(item.id)} />
									</div>
								))}
								{inputStates.map((input, index) => (
									<div key={input.id} className="contents-input">
										<input
											type="text"
											value={input.text}
											onChange={(e) => handleChange(e, input.id)}
											onKeyDown={(e) => handleKeyPress(e, input.id)}
											placeholder="새 항목 추가"
										/>
										<img
											src={trash}
											alt="삭제 버튼"
											onClick={() => handleRemoveInput(input.id)}
										/>
									</div>
								))}
							</S.Contents>
							{addButtonVisible && (
								<S.AddButton onClick={handleAddInput}>
									<img src={plus} alt="목록 추가 버튼" />
								</S.AddButton>
							)}
						</S.Header>
						{/* BigButton이랑 width가 안 맞아서 새로 제작 */}
						<S.SaveButton onClick={handleSubmit} type="submit">수정 완료</S.SaveButton>
					</S.ModalWrap>
				</S.ModalContainer>
			</S.Overlay>
		</S.AppWrap>
	);
}

export default FixModal;