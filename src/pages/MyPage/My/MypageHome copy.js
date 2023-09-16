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

	const fetchData = async () => {
		const response = await TokenApi.get("/myfit/routines/workout");
		console.log(response.data);
	};
	// 최초 렌더링 시 운동기구 목록 받아옴
	useEffect(() => {
		fetchData();
	}, []);

	// Modal

	const [isFixOpen, setIsFixOpen] = useState(false);
	const [data, setData] = useState([...DUMMY_DATA]);

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

	const [content, setContent] = useState(data[0].name);
	const [btnActive, setBtnActive] = useState(data[0].id);

	const handleClickButton = (e) => {
		const { name, value } = e.target;
		setContent(name);
		setBtnActive(value);
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
								{data.map((item, idx) => (
									<button
										name={item.name}
										key={item.id}
										value={idx}
										className={'btn' + (idx == btnActive ? ' active' : '')}
										onClick={handleClickButton}
									>
										{item.text}
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
							{content && <S.Content>{selectComponent[content]}</S.Content>}
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
