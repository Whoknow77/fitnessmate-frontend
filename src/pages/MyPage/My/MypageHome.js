// 내 운동 페이지

import * as S from "./StyledMypageHome";
import "./myToggle.css";
import { useState, useEffect } from "react";
import WorkoutAddModal from "./Modal/workoutAddModal";
import FixModal from "./Modal/FixModal";
import fix from "../../../assets/images/Fix_Icon.svg";
import add from "../../../assets/images/Add_Icon.svg";
import noWorkrate from "../../../assets/images/noWorkrate.svg";
import logo from "../../../assets/images/logo.png"
import ToggleSwitch from "./toggle";
import TokenApi from "../../../apis/TokenApi";
import RecommendWorkrateModal from "../../../components/Modal/RecommendWorkrateModal";
import SupplementAddModal from "./Modal/supplementAddModal";


// 루틴 목록용 더미데이터

export const DUMMY_DATA = [
	{
		id: 0,
		text: '분할 1',
		name: 'first',
	},
	{
		id: 1,
		text: '분할 2',
		name: 'second',
	},

];

const Mypagehome = () => {

	// 루틴 목록

	const [data, setData] = useState([...DUMMY_DATA]);
	const [content, setContent] = useState(data[0].name);

	const [routinesData, setRoutinesData] = useState({ data: [] });
	const [routinesId, setRoutinesId] = useState('');
	const [routinesContent, setRoutinesContent] = useState('');
	const [btnActive, setBtnActive] = useState('');
	const [routineWorkout, setRoutineWorkout] = useState([]);

	const [mySupplements, setMySupplements] = useState([]);

	// 내 보조제



	// 함량

	const [protein, setProtein] = useState("");
	const [fat, setFat] = useState("");
	const [carbohydrate, setCarbohydrate] = useState("");
	const [leucine, setLeucine] = useState("");
	const [isoLeucine, setIsoLeucine] = useState("");
	const [valine, setValine] = useState("");
	const [methionine, setMethionine] = useState("");
	const [phenylalanine, setPhenylalanine] = useState("");
	const [threonine, setThreonine] = useState("");
	const [lCarnitine, setLCarnitine] = useState("");
	const [lGlutamine, setLGlutamine] = useState("");
	const [lAlanine, setLAlanine] = useState("");
	const [lLysine, setLLysine] = useState("");

	const nutrientData = [
		{ label: "프로틴 함량", value: "proteinPerServing" },
		{ label: "지방 함량", value: "fatPerServing" },
		{ label: "탄수화물 함량", value: "carbohydratePerServing" },
		{ label: "류신 함량", value: "leucine" },
		{ label: "이소류신 함량", value: "isoLeucine" },
		{ label: "발린 함량", value: "valine" },
		{ label: "메티오닌 함량", value: "methionine" },
		{ label: "페닐알라닌 함량", value: "phenylalanine" },
		{ label: "트레오닌 함량", value: "threonine" },
		{ label: "L-케라틴 함량", value: "l_Carnitine" },
		{ label: "L-글루타민 함량", value: "l_Glutamine" },
		{ label: "L-알라닌 함량", value: "l_Alanine" },
		{ label: "L-라이신 함량", value: "l_Lysine" },
	];

	useEffect(() => {
		const fetchDataAndWorkoutData = async () => {
			try {
				// 루틴 목록 조회
				const routinesResponse = await TokenApi.get("/myfit/routines/workout");
				if (routinesResponse.data && routinesResponse.data.length > 0) {
					// 루틴 목록 저장
					setRoutinesData(routinesResponse);
					// 가장 첫 번째 루틴 목록을 active 시킴
					setBtnActive(routinesResponse.data[0].routineIndex);
					// 첫 번째 루틴의 ID 저장
					setRoutinesId(routinesResponse.data[0].routineId);
				}
				// 루틴에 속한 운동 리스트 조회
				const routinesWorkout = await TokenApi.get(`/myfit/routines/workout/${routinesResponse.data[0].routineId}`);
				setRoutineWorkout(routinesWorkout);

				// 내 보조제 리스트 조회
				const mySupplement = await TokenApi.get("/myfit/routines/supplement");
				setMySupplements(mySupplement);

			} catch (error) {
				console.error(error);
			}
		};

		fetchDataAndWorkoutData();
	}, []);


	// Modal

	const [isFixOpen, setIsFixOpen] = useState(false);

	const onClickFixButton = () => {
		setIsFixOpen(true);
	};

	// 편집 모달에서 수정된 데이터를 반영하는 함수
	const handleUpdateData = (updatedData) => {
		setData(updatedData);
	};

	// 운동 add 모달
	const [isAddOpen, setIsAddOpen] = useState(false);
	const onClickAddButton = () => {
		setIsAddOpen(true);
	};

	// 보조제 add 모달
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const onClickAddModalButton = () => {
		setIsAddModalOpen(true);
	};


	// 루틴 목록

	const handleClickButton = async (e) => {
		const { name, value, id } = e.target;
		setRoutinesContent(name);
		setContent(name);
		setBtnActive(value);
		setRoutinesId(id);

		try {
			// 해당 루틴에 속한 운동 리스트를 가져오기 위해 API 요청
			const routinesWorkout = await TokenApi.get(`/myfit/routines/workout/${id}`);
			setRoutineWorkout(routinesWorkout);
		} catch (error) {
			console.error(error);
		}
	};

	// 루틴에서 운동 삭제

	const deleteClickButton = async (e) => {
		const { id } = e.target;
		const myWorkoutId = parseInt(id);
		try {
			const deleteWorkout = await TokenApi.get(`/myfit/routines/workout/delete/${myWorkoutId}`);
			console.log(deleteWorkout.status);
			alert("삭제되었습니다!")
			// 페이지 새로고침
			window.location.reload();
		} catch (error) {
			console.error(error);
		}
	}


	const hasWorkrate = (item) => {
		return item.rep && item.weight && item.setCount;
	};

	const [recommendWorkrateModal, setRecommendWorkrateModal] = useState(false);

	// 선택된 목표 운동량 없는 운동
	const [selectedMyWorkout, setSelectedMyWorkout] = useState(null);

	const handleRecommendWorkrateButtonClick = (item) => {
		setSelectedMyWorkout(item);
		setRecommendWorkrateModal(true);
	};

	// 보조제 가격
	const formatPriceAndSetToElement = (price) => {
		if (price) {
			return price.toLocaleString('en-US');
		}
		return '';
	};

	// 내 보조제 삭제
	const deleteSupplementClickButton = async (e) => {
		const { id } = e.target;
		const mySupplementId = parseInt(id);
		try {
			const deleteSupplement = await TokenApi.get(`/myfit/routines/supplement/delete/${mySupplementId}`);
			console.log(deleteSupplement.status);
			alert("삭제되었습니다!")
			// 페이지 새로고침
			window.location.reload();
		} catch (error) {
			console.error(error);
		}
	}




	// Toggle

	const [visible, setVisible] = useState(false);

	const labels = {
		left: {
			title: "내 운동",
			value: "workout"
		},
		right: {
			title: "내 보조제",
			value: "supplement"
		},
	};

	const onChange = () => {
		setVisible(!visible);
		console.log(mySupplements);
	};


	return (
		<S.HomeContainer>
			<S.HomeContent>
				<S.FirstContent>
					<S.FirstContent>
						<div className="firstTop">나에게 핏한</div>
						<div className="firstMiddle">
							<p>내 운동 정보를 모아보세요.</p>
						</div>
						<S.Toggle>
							<div class="toggleSwitch_wrap">
								<div class="toggleSwitch">
									<ToggleSwitch labels={labels} onChange={onChange} />
								</div>
							</div>
						</S.Toggle>
					</S.FirstContent>
				</S.FirstContent>
			</S.HomeContent>
			<S.HomeContent>
				{(visible ?
					<S.SecondContent onChange={onChange}>
						<div className="supplementContents">
							{mySupplements.data.supplements.length > 0 && mySupplements.data.supplements.map((item, index) => (
								<S.SupplementContent key={item.mySupplementId}>
									<img src={item.imageURL} alt="보조제 사진" />
									<div className="contentItem">
										<div className="contentMainItem">
											<div className="topItems">
												<p className="item_flavor-source">{item.flavor}</p>
												<p className="item_flavor-source">{item.source}</p>
											</div>
											<span className="item_workoutName">
												{item.supplementName}
											</span>
											<div className="contentMiddleItem">
												{nutrientData
													.filter((nutrient) => item[nutrient.value] !== null && item[nutrient.value] !== undefined && item[nutrient.value] !== "")
													.map((nutrient) => (
														<div className="PerServing">
															<span className="TitleSpan">{item[nutrient.value] && nutrient.label}</span>
															<span className="ContentSpan">{item[nutrient.value] && <>{item[nutrient.value]}g</>}</span>
														</div>
													))}
											</div>
											<div className="contentBottomItem">
												<span className="bottomTitle">가격</span>
												<div className="price">
													<p
														className="bottomPrice"
													>
														{formatPriceAndSetToElement(item.price)}
													</p>
													&nbsp;원
												</div>
											</div>
										</div>
									</div>
									<div
										className="deleteContent"
										id={item.mySupplementId}
										onClick={deleteSupplementClickButton}
									>
										삭제
									</div>
								</S.SupplementContent>
							))}
						</div>
						<div className="modalbutton">
							<S.AddModalButton onClick={onClickAddModalButton} className="supplementModal">
								<img src={add} alt="추가하기 버튼" />
								<p>이 목록에 보조제 추가하기</p>
							</S.AddModalButton>
						</div>
					</S.SecondContent>
					:
					<S.SecondContent onChange={onChange}>
						<S.ContentsTitle>
							<div className="contents-title">내 운동 루틴</div>
							<S.ButtonContainer>
								{/* 루틴 목록을 map으로 불러옴 */}
								{routinesData.data.length > 0 && routinesData.data.map((item) => (
									<button
										name={item.routineName}
										id={item.routineId}
										value={item.routineIndex}
										className={'btn' + (item.routineIndex == btnActive ? ' active' : '')}
										onClick={handleClickButton}
									>
										{item.routineName}
									</button>
								))}
								<S.FixModalButton onClick={onClickFixButton}>
									<img src={fix} alt="편집하기 버튼" />
									<p>편집</p>
								</S.FixModalButton>
							</S.ButtonContainer>
						</S.ContentsTitle>
						<div className="contents">
							{routineWorkout.data && routineWorkout.data.map((item) => (
								<S.WorkoutContent key={item.myWorkoutId}>
									<img src={item.imgPath} alt="운동 사진" />
									<div className="contentItem">
										<div className="contentTopItem">
											<div className="itemsBodyPart">
												{item.bodyParts.map((bodyPart, index) => (
													<p className="item_BodyPart" key={index}>{bodyPart}</p>
												))}
											</div>
											<span className="item_workoutName">
												{item.workoutName}
											</span>
										</div>
										{hasWorkrate(item) ? ( // 목표 운동량이 있는 경우
											<div className="contentBottomItem">
												<span className="bottomTitle">목표 운동량</span>
												<div className="workrate">
													<div className="workrateItem">
														<span className="workrateTitle">중량</span>
														<p className="workrateContent">{item.weight}kg</p>
													</div>
													<div className="workrateItem">
														<span className="workrateTitle">횟수</span>
														<p className="workrateContent">{item.rep}회</p>
													</div>
													<div className="workrateItem">
														<span className="workrateTitle">세트 수</span>
														<p className="workrateContent">{item.setCount}세트</p>
													</div>
												</div>
											</div>
										) : ( // 목표 운동량이 없는 경우
											<div className="noWorkrate">
												<p className="noWorkrateContent">추천 받지 않아 목표 운동량이 없습니다.</p>
												<div
													className="writeWorkrate"
													onClick={() => {
														handleRecommendWorkrateButtonClick(item)
													}}
												>
													<p className="recommendWorkrate">추천받기</p>
													<img className="recommendImg" src={noWorkrate} alt="목표 운동량 추천받기" />
												</div>
											</div>
										)}
									</div>
									<div
										className="deleteContent"
										id={item.myWorkoutId}
										onClick={deleteClickButton}
									>
										삭제
									</div>
								</S.WorkoutContent>
							))}
						</div>
						<div className="modalbutton">
							<S.AddModalButton onClick={onClickAddButton} >
								<img src={add} alt="추가하기 버튼" />
								<p>이 목록에 운동 추가하기</p>
							</S.AddModalButton>
						</div>
					</S.SecondContent>
				)}
			</S.HomeContent>

			<S.Footer>
				<div class="frame">
					<div class="div">
						<div class="text-wrapper">서비스</div>
						<div class="div-2">
							<div class="text-wrapper-2">검색하기</div>
							<div class="text-wrapper-3">추천받기</div>
							<div class="text-wrapper-3">내 운동</div>
						</div>
					</div>
					<div class="div-3">
						<div class="text-wrapper">문의</div>
						<div class="div-2">
							<div class="div-4">
								<div class="div-wrapper"><div class="text-wrapper-4">전화</div></div>
								<div class="div-wrapper"><div class="text-wrapper-2">010-8544-1013</div></div>
							</div>
							<div class="div-4">
								<div class="div-wrapper"><div class="text-wrapper-5">이메일</div></div>
								<div class="div-wrapper"><div class="text-wrapper-2">jeuk1013@naver.com</div></div>
							</div>
						</div>
					</div>
					<div class="div-5">
						<div class="div-6">
							<div class="text-wrapper-6">개발</div>
							<div class="div-2">
								<div class="text-wrapper-2">이찬하</div>
								<div class="text-wrapper-3">정지성</div>
								<div class="text-wrapper-3">강민정</div>
								<div class="text-wrapper-3">최훈오</div>
							</div>
						</div>
						<div class="div-6">
							<div class="text-wrapper-6">디자인</div>
							<div class="div-2">
								<div class="text-wrapper-2">김정욱</div>
								<div class="text-wrapper-3">최시현</div>
							</div>
						</div>
					</div>
					<div class="group">
						<img src={logo} alt="핏메이트 로고" />
					</div>
				</div>
			</S.Footer>

			{/* 편집 버튼 */}
			{
				isFixOpen && (
					<FixModal
						open={isFixOpen}
						data={data} // data를 FixModal로 전달
						onUpdateData={handleUpdateData}
						onDeleteItem={(deletedItemId) => {
							// 삭제된 항목의 ID를 사용하여 데이터 업데이트
							const updatedData = data.filter((item) => item.id !== deletedItemId);
							setData(updatedData);
						}}
						onClose={() => {
							setIsFixOpen(false);
						}}
					/>
				)
			}

			{/* 이 목록에 운동 추가하기 버튼 */}
			{
				isAddOpen && (
					<WorkoutAddModal
						open={isAddOpen}
						routineId={routinesId}
						onClose={() => {
							setIsAddOpen(false);
						}}
					/>
				)
			}

			{/* 목표 운동량 추천받기 모달 */}
			{recommendWorkrateModal && (
				<RecommendWorkrateModal
					setRecommendWorkrateModal={setRecommendWorkrateModal}
					myWorkout={selectedMyWorkout}
				/>
			)}

			{/* 이 목록에 보조제 추가하기 버튼 */}
			{
				isAddModalOpen && (
					<SupplementAddModal
						open={isAddOpen}
						routineId={routinesId}
						onClose={() => {
							setIsAddModalOpen(false);
						}}
					/>
				)
			}
		</S.HomeContainer >
	);
};

export default Mypagehome;


