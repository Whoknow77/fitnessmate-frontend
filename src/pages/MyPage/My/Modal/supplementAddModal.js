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


function SupplementAddModal({ onClose, routineId }) {

	// 보여질 운동 리스트
	const [supplementList, setSupplementList] = useState([]);

	// 루틴에 추가할 운동
	const [finalSupplement, setFinalSupplement] = useState([]);

	// 검색결과가 없을 때 페이지
	const [nosearch, setNoSearch] = useState(false);

	const fetchData = async () => {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};
			const supplementResponse = await TokenApi.post(`/myfit/routines/supplement/search`, "", config);
			if (supplementResponse.data.length) {
				setNoSearch(false);
				console.log(supplementResponse)
				setSupplementList(supplementResponse.data);
			} else {
				setNoSearch(true);
			}
		} catch (err) {
			// 페이지넘버가 이상한 경우 오류페이지
			setNoSearch(true);
		}
	};

	// 보조제 검색
	const handleSearch = async (searchValue) => {
		try {
			if (searchValue === "") {
				setNoSearch(true);
			} else {
				setNoSearch(false);
				const config = {
					headers: {
						'Content-Type': 'application/json',
					},
				};
				const workoutResponse = await TokenApi.post(`/myfit/routines/supplement/search`, JSON.stringify(searchValue), config);
				console.log(workoutResponse)
				setSupplementList(workoutResponse.data);
				console.log(supplementList)
			}
		} catch (err) {
			setSupplementList([]);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	// 보조제 선택
	const handleSelect = (idx) => {
		setSupplementList(prevSupplementList => {
			const updatedList = [...prevSupplementList];
			updatedList[idx].isSelected = !updatedList[idx].isSelected;
			return updatedList;
		});
		setFinalSupplement(supplementList[idx]);
	};

	// 선택완료
	const handleSubmit = async (supplementList) => {
		console.log(finalSupplement)

		const supplementResponse = await TokenApi.post(`/myfit/routines/supplement/${finalSupplement.supplementId}`);
		console.log(supplementResponse.status)
		setSupplementList(supplementResponse.data);
		alert("추가되었습니다!")
		onClose?.();
		// 페이지 새로고침
		window.location.reload();
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
							<SearchBar handleSearch={handleSearch} name="supplement" />
						</S.SerchArea>
						{nosearch ? (
							<S.Contents>
								<NoSearch />
							</S.Contents>
						) : (
							<S.Contents>
								<S.CheckboxArea className="ScrollArea">
									{supplementList.map((supplement, idx) => {
										return (
											<TextCheckbox
												key={supplement.supplementName}
												handleClick={handleSelect}
												isSelected={supplement.isSelected}
												elementidx={idx}
											>
												{supplement.supplementName}
											</TextCheckbox>
										);
									})}
								</S.CheckboxArea>
							</S.Contents>
						)}
						{/* BigButton이랑 크기가 안 맞아서 새로 제작 */}
						<S.SaveButton onClick={handleSubmit} type="submit">선택한 보조제 추가하기</S.SaveButton>
					</S.ModalWrap>
				</S.ModalContainer>
			</S.Overlay>
		</S.AppWrap>
	);
};

export default SupplementAddModal;