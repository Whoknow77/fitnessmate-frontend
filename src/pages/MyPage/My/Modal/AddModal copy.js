// 편집 모달

import React, { useEffect, useRef, useState } from "react";
import * as S from "./StyledAddModal";
import { TextCheckbox, BigButton, SearchBar } from "../../../../components/index";
import x from "../../../../assets/images/X_Icon.svg";
import OutSideClick from "../../../../components/Navbar/OutSideClick";
import { userWorkoutBatchAPI } from "../../../../apis/API";
import NoSearch from "../../../../components/NoSearch/NoSearch";
import { useNavigate, useParams } from "react-router-dom";
import TokenApi from "../../../../apis/TokenApi";


function AddModal({ onClose, routineId }) {

	// 보여질 운동 리스트
	const [machineList, setMachineList] = useState([]);

	// 검색결과가 없을 때 페이지
	const [nosearch, setNoSearch] = useState(false);

	const fetchData = async () => {
		const request = {
			searchKeyword: "",
			bodyPartKoreanName: [],
		};
		// 운동 기구 batch 조회(12개)

		try {
			const workoutResponse = await userWorkoutBatchAPI.post(
				`1`,
				request
			);
			if (workoutResponse.data.length) {
				setNoSearch(false);
				setMachineList(workoutResponse.data);
			} else {
				setNoSearch(true);
			}
		} catch (err) {
			// 페이지넘버가 이상한 경우 오류페이지
			setNoSearch(true);
		}
	};

	// 운동 검색
	const handleSearch = async (searchValue) => {
		try {
			if (searchValue === "") {
				const request = {
					searchKeyword: "",
				};
				const workoutResponse = await userWorkoutBatchAPI.post(
					`1`,
					request
				);
				setMachineList(workoutResponse.data);
			} else {
				const searchKeyword = searchValue;
				console.log(searchKeyword)
				const workoutResponse = await TokenApi.post(`/myfit/routines/workout/search/${routineId}`, searchKeyword);
				console.log(workoutResponse);
				setMachineList(workoutResponse.data);
				console.log(machineList)
			}
		} catch (err) {
			setMachineList([]);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	// 운동 선택
	const handleSelect = (idx) => {
		setMachineList(prevMachineList => {
			const updatedList = [...prevMachineList];
			updatedList[idx].isSelected = !updatedList[idx].isSelected;
			return updatedList;
		});
	};

	// 선택완료
	const handleSubmit = async () => {
		console.log(routineId)
	}

	//modal

	const handleClose = () => {
		onClose?.();
	};
	const modalRef = useRef(null);
	OutSideClick(modalRef, handleClose);

	return (
		<S.AppWrap>
			<S.Overlay>
				<S.ModalContainer ref={modalRef}>
					<S.ModalWrap>
						<S.Header>
							<S.ModalTitle>
								<h1>이 목록에 운동 추가하기</h1>
								<S.CloseButton onClick={handleClose}>
									<img src={x} alt="닫기 버튼" />
								</S.CloseButton>
							</S.ModalTitle>
						</S.Header>
						<S.SerchArea className="search">
							<SearchBar handleSearch={handleSearch} name="workout" />
						</S.SerchArea>
						{nosearch ? (
							<S.Contents>
								<NoSearch />
							</S.Contents>
						) : (
							<S.Contents>
								<S.CheckboxArea className="ScrollArea">
									{machineList.map((machine, idx) => {
										return (
											<TextCheckbox
												key={machine.koreanName}
												handleClick={handleSelect}
												isSelected={machine.isSelected}
												elementidx={idx}
											>
												{machine.koreanName}
											</TextCheckbox>
										);
									})}
								</S.CheckboxArea>
							</S.Contents>
						)}
						{/* BigButton이랑 크기가 안 맞아서 새로 제작 */}
						<S.SaveButton onClick={handleSubmit} type="submit">선택한 운동 추가하기</S.SaveButton>
					</S.ModalWrap>
				</S.ModalContainer>
			</S.Overlay>
		</S.AppWrap>
	);
};

export default AddModal;