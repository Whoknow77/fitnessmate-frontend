import * as S from "../../../../components/Modal/StyledRecommendAddModal";
import xbutton from "../../../../assets/images/black-xbutton.svg";
import { useEffect, useState } from "react";
import SemiMiddleButton from "../../../../components/Button/SemiMiddleButton";
import SmallFontTextCheckbox from "../../../../components/TextCheckbox/SmallFontTextCheckbox";
import rightarrow from "../../../../assets/images/rightarrow.svg";
import TokenApi from "../../../../apis/TokenApi";
import { ModalBox } from "../../../../components/Modal/StyledEmailModal";
import { getLastError } from "../../../../apis/TokenApi";


const GuideModal = ({ setRecommendAddModal, workoutId }) => {
	// my페이지에서는 저장된 값을 가져옴
	const [myDivision, setMyDivsion] = useState([]);
	const [isReady, setIsReady] = useState(false);

	const handleReady = () => {
		return myDivision.filter((division) => division.isSelected).length;
	};

	const handleSelect = (idx) => {
		const newArr = [...myDivision];
		newArr[idx].isSelected = !newArr[idx].isSelected;
		setMyDivsion(newArr);
		setIsReady(false);

		// 선택된 TextCheckbox의 갯수를 새로운 상태로 설정
		const selectedCount = newArr.filter((division) => division.isSelected).length;
		setIsReady(selectedCount > 0);
	};

	// 기존 루틴 받아오기(분할1 ~ 분할4)
	const fetchData = async () => {
		try {
			const response = await TokenApi.get("myfit/routines/workout");
			const newArr = [...response.data].map((obj, index) => ({
				...obj,
				isSelected: false,
			}));
			setMyDivsion(newArr);
		} catch (err) { }
	};

	// 루틴에 운동 추가하기
	const handleAdd = async () => {
		const submission = [];
		submission.push(workoutId);

		// Promise 배열을 저장할 변수
		const promises = [];
		const notifications = [];

		myDivision.forEach((division) => {
			if (division.isSelected) {
				const promise = TokenApi.post(`/myfit/routines/workout/${division.routineId}`, { workoutIds: submission });

				promises.push(
					promise
						.then((response) => {
							// 성공한 경우
							console.log(response);
							notifications.push(`${division.routineName}에 운동이 추가되었습니다!`);
						})
						.catch((error) => {
							// 실패한 경우
							const errorMessage = getLastError();
							console.log(errorMessage)
							notifications.push(`${division.routineName}에 ${errorMessage}`);
						})
				);
			}
		});

		// 모든 Promise가 완료되면 실행될 함수
		Promise.allSettled(promises).then(() => {
			// 모든 요청이 완료되었을 때 알림창 띄우기
			alert(notifications.join("\n"));
			setRecommendAddModal(false);
		});
	};





	useEffect(() => {
		fetchData();
	}, []);

	return (
		<ModalBox>
			<S.RecommendAddModalWrapper>
				<div className="recommendAddModalTitleWrapper">
					<div className="quitBtnArea">
						<img
							src={xbutton}
							className="recommendAddModalQuitBtn"
							onClick={() => setRecommendAddModal(false)}
							alt="운동 추천 모달 나가기 버튼"
						/>
					</div>
					<span className="recommendAddModalTitle">
						<p className="firstTitle">데드리프트를 추가할</p>
						<p className="secondTitle">내 운동 목록을 선택해주세요</p>
					</span>
				</div>
				<div className="middleModalArea">
					<span className="middleModalTitle">여러 개 선택할 수 있어요</span>
					<div className="recommendAddModalDivsionList">
						{myDivision.map((item, index) => {
							return (
								<SmallFontTextCheckbox
									key={item.routineName}
									handleClick={handleSelect}
									isSelected={item.isSelected}
									elementidx={index}
								>
									{item.routineName}
								</SmallFontTextCheckbox>
							);
						})}
					</div>
				</div>
				<SemiMiddleButton isReady={isReady} handleSubmit={handleAdd} selectedCount={handleReady()}>
					추가하기
				</SemiMiddleButton>
			</S.RecommendAddModalWrapper>
		</ModalBox>

	);
};

export default GuideModal;
