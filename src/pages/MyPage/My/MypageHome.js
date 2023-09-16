// 내 운동 페이지

import * as S from "./StyledMypageHome";
import "./style.css";
import { useState, useEffect } from "react";
import AddModal from "./Modal/AddModal";
import FixModal from "./Modal/FixModal";
import fix from "../../../assets/images/Fix_Icon.svg";
import add from "../../../assets/images/Add_Icon.svg";
import ToggleSwitch from "./toggle";
import TokenApi from "../../../apis/TokenApi";

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

	useEffect(() => {
		const fetchDataAndWorkoutData = async () => {
			try {
				// 루틴 목록 조회
				const routinesResponse = await TokenApi.get("/myfit/routines/workout");
				console.log(routinesResponse.data);
				if (routinesResponse.data && routinesResponse.data.length > 0) {
					// 루틴 목록 저장
					setRoutinesData(routinesResponse);
					// 가장 첫 번째 루틴 목록을 active 시킴
					setBtnActive(routinesResponse.data[0].routineIndex);
					// 첫 번째 루틴의 ID 저장
					setRoutinesId(routinesResponse.data[0].routineId);
				}
				// 루틴에 속한 운동 리스트 조회
				const routinesWorkout = await TokenApi.get(`/myfit/routines/workout/${routinesId}`);
				console.log(routinesWorkout.data);
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

	const [isAddOpen, setIsAddOpen] = useState(false);

	const onClickAddButton = () => {
		setIsAddOpen(true);
	};

	// 루틴 목록

	const handleClickButton = (e) => {
		const { name, value, key } = e.target;
		setRoutinesContent(name);
		setContent(name);
		setBtnActive(value);
		setRoutinesId(key);
		console.log(routinesId);
	};

	const selectComponent = {
		first: <div>분할1 내용</div>,
		second: <div>분할2 내용</div>,
	};


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
						<S.ContentsTitle>
							<div className="contents-title">내 보조제</div>
						</S.ContentsTitle>
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
										key={item.routineId}
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
						<div className="dummy-height">
							{/* 각 루틴 목록에 대한 내용은 아직 디자인이 덜 된 관계로 분별만 가능하도록 제작 */}
							{/* {content && <S.Content>{selectComponent[content]}</S.Content>} */}
						</div>
					</S.SecondContent>
				)}
			</S.HomeContent>

			<div className="modalbutton">
				<S.AddModalButton onClick={onClickAddButton} >
					<img src={add} alt="추가하기 버튼" />
					<p>이 목록에 운동 추가하기</p>
				</S.AddModalButton>
			</div>

			{/* 편집 버튼 */}
			{isFixOpen && (
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
			)}

			{/* 이 목록에 운동 추가하기 버튼 */}
			{isAddOpen && (
				<AddModal
					open={isAddOpen}
					onClose={() => {
						setIsAddOpen(false);
					}}
				/>
			)}
		</S.HomeContainer>
	);
};

export default Mypagehome;
