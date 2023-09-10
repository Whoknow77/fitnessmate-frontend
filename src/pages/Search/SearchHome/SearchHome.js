import * as S from "./StyledSearchHome";
import ToggleSwitch from "../../MyPage/My/toggle";
import { useEffect, useState, useRef } from "react";
import OutSideClick from "../../../components/Navbar/OutSideClick";
import { FitnessType, SupplementType } from "../../../components";
import { userWorkoutBatchAPI, userSupplementSearchAPI, userSupplementSingleAPI } from "../../../apis/API";
import plusCircle from "../../../assets/images/plus-circle.svg"
import plusSimbol from "../../../assets/images/plus-sm.svg"
import FilterClose from "../../../assets/images/x-close.svg"
import SearchBar from "../../../components/SearchBar/SearchBar";
import rightarrow from "../../../assets/images/rightarrow.svg";
import leftarrow from "../../../assets/images/leftarrow.svg";
import { useNavigate, useParams } from "react-router-dom";
import NoSearch from "../../../components/NoSearch/NoSearch";

const SearchHome = () => {
	let { pageNum } = useParams();
	const navigate = useNavigate();

	// Toggle

	const [visible, setVisible] = useState(false);

	const labels = {
		left: {
			title: "운동 검색",
			value: "workout",
		},
		right: {
			title: "보조제 검색",
			value: "supplement",
		},
	};

	const onChange = () => {
		setVisible(!visible);
	};

	// modal

	const modalRef = useRef(null);
	const handleClose = () => {
		setIsSearchSupFilterModal(false);
		setIsSearchFitFilterModal(false);
	};
	OutSideClick(modalRef, handleClose);




	// 운동 섹션

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
				`${pageNum}`,
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

	// 각 운동 카드 클릭 시 단건조회 호출
	const handleFitnessTypeClick = async (id) => {
		navigate(`/search/${pageNum}/workoutdetail`, { state: { workoutId: id } });
	};

	// 운동 필터 토글 모달
	const [isSearchFitFilterModal, setIsSearchFitFilterModal] = useState(false);

	// 필터 목록
	const [searchFilterValue, setSearchFilterValue] = useState({
		운동명: true,
		"운동 부위": false,
	});

	// 다음 페이지
	const handleNextPage = () => {
		const nextPageNum = parseInt(pageNum, 10) + 1;
		navigate(`/search/${nextPageNum}`);
	};

	const handleBackPage = () => {
		if (Number(pageNum) > 1) {
			const backPageNum = parseInt(pageNum, 10) - 1;
			navigate(`/search/${backPageNum}`);
		}
	};

	// 운동 검색
	const handleSearch = async (searchValue) => {
		try {
			if (searchValue === "") {
				const request = {
					searchKeyword: "",
					bodyPartKoreanName: activeFitFilters, // 선택된 운동 부위 필터를 활용
				};
				const workoutResponse = await userWorkoutBatchAPI.post(
					`${pageNum}`,
					request
				);
				setMachineList(workoutResponse.data);
			} else {
				const request = {
					searchKeyword: searchValue,
					bodyPartKoreanName: activeFitFilters, // 선택된 운동 부위 필터를 활용
				};
				console.log(activeFitFilters)
				const workoutResponse = await userWorkoutBatchAPI.post(
					`${pageNum}`,
					request
				);
				setMachineList(workoutResponse.data);
				console.log(workoutResponse)
			}
		} catch (err) {
			setMachineList([]);
		}
	};
	
	
	// 필터 선택
	const handleToggleValue = (filtervalue) => {
		// 모든 키의 값을 false로 설정
		const updatedObject = Object.keys(searchFilterValue).reduce((acc, key) => {
			acc[key] = false;
			return acc;
		}, {});

		// 대상 키의 값을 true로 설정
		updatedObject[filtervalue] = true;

		// 상태 업데이트
		setSearchFilterValue(updatedObject);
	};

	// 부위 선택 토글

	// 보조제 종류 데이터
	const [bodyparts, setBodyparts] = useState({
		가슴: [false, "가슴"],
		등: [false, "등"],
		엉덩이: [false, "엉덩이"],
		어깨: [false, "어깨"],
		복부: [false, "복부"],
		종아리: [false, "종아리"],
		허벅지앞: [false, "허벅지앞"],
		허벅지뒤: [false, "허벅지뒤"],
		삼두: [false, "삼두"],
		이두: [false, "이두"],
	});

	const [activeFitFilters, setActiveFitFilters] = useState([]);

	// 운동 종류 모달 필터 선택
	const [selectedFitFilterKeys, setSelectedFitFilterKeys] = useState([]);

	// 운동 종류 활성화 여부
	const handleAddFitFilter = (clickedKey) => {
		setSelectedFitFilterKeys((prevSelectedFitFilterKeys) => {
			if (prevSelectedFitFilterKeys.includes(clickedKey)) {
				// 이미 선택된 경우, 해당 필터를 제거하여 비활성 상태로 변경
				const updatedFilterKeys = prevSelectedFitFilterKeys.filter((key) => key !== clickedKey);
				setActiveFitFilters(updatedFilterKeys.map((key) => bodyparts[key][1]));
				return updatedFilterKeys;
			} else {
				// 비활성 상태인 경우, 해당 필터를 추가하여 활성 상태로 변경
				const updatedFilterKeys = [...prevSelectedFitFilterKeys, clickedKey];
				setActiveFitFilters(updatedFilterKeys.map((key) => bodyparts[key][1]));
				return updatedFilterKeys;
			}
		});
	};





	// 보조제 섹션

	// 보여질 보조제 리스트
	const [supplementList, setSupplementList] = useState([]);

	const fetchDataSupplement = async () => {
		const request = {
			searchKeyword: "",
		};
		// 보조제 기구 batch 조회(12개)

		try {
			const supplementResponse = await userSupplementSearchAPI.post(
				`${pageNum}`,
				request
			);
			if (supplementResponse.data.length) {
				setNoSearch(false);
				setSupplementList(supplementResponse.data);
			} else {
				setNoSearch(true);
			}
		} catch (err) {
			// 페이지넘버가 이상한 경우 오류페이지
			setNoSearch(true);
		}
	};

	// 각 보조제 카드 클릭 시 단건조회 호출
	const handleSupplementTypeClick = async (id) => {
		navigate(`/search/${pageNum}/supplementdetail`, { state: { supplementId: id } });
	};

	// 운동 필터 토글 모달
	const [isSearchSupFilterModal, setIsSearchSupFilterModal] = useState(false);

	// 보조제 종류 데이터
	const [categories, setCategories] = useState({
		프로틴: [false, "Protein"],
		아미노산: [false, "AminoAicd"],
		게이너: [false, "Gainer"],
		기타: [false, "Other"],
	});

	const [activeFilters, setActiveFilters] = useState([]);

	// 보조제 종류 모달 필터 선택
	const [selectedFilterKeys, setSelectedFilterKeys] = useState([]);

	// 보조제 종류 활성화 여부
	const handleAddFilter = (clickedKey) => {
		setSelectedFilterKeys((prevSelectedFilterKeys) => {
			if (prevSelectedFilterKeys.includes(clickedKey)) {
				// 이미 선택된 경우, 해당 필터를 제거하여 비활성 상태로 변경
				const updatedFilterKeys = prevSelectedFilterKeys.filter((key) => key !== clickedKey);
				setActiveFilters(updatedFilterKeys.map((key) => categories[key][1]));
				return updatedFilterKeys;
			} else {
				// 비활성 상태인 경우, 해당 필터를 추가하여 활성 상태로 변경
				const updatedFilterKeys = [...prevSelectedFilterKeys, clickedKey];
				setActiveFilters(updatedFilterKeys.map((key) => categories[key][1]));
				return updatedFilterKeys;
			}
		});
	};

	// 보조제 검색
	const handleSearchSupplement = async (searchValue) => {
		try {
			if (searchValue === "") {
				const request = {
					searchKeyword: "",
					supplementType: selectedFilterKeys.map((key) => categories[key][1]), // 선택된 보조제 종류 필터를 활용
				};
				const supplementResponse = await userSupplementSearchAPI.post(
					`${pageNum}`,
					request
				);
				setSupplementList(supplementResponse.data);
			} else {
				const request = {
					searchKeyword: searchValue,
					supplementType: selectedFilterKeys.map((key) => categories[key][1]), // 선택된 보조제 종류 필터를 활용
				};
				const supplementResponse = await userSupplementSearchAPI.post(
					`${pageNum}`,
					request
				);
				setSupplementList(supplementResponse.data);
			}
		} catch (err) {
			setSupplementList([]);
		}
	};
	




	useEffect(() => {
		fetchData();
		fetchDataSupplement();
	}, [pageNum]);

	return (
		<S.SearchContainer>
			{/* 타이틀(문구 + 토글) */}
			<section className="searchTopWrapper">
				<div className="searchTitleWrapper">
					<div className="searchTitleTextWrapper">
						<p className="searchTitle1">나에게 핏한 </p>
						<p className="searchTitle2">운동과 보조제 정보를 찾아 보세요.</p>
					</div>
					<div className="toggleMenu">
						<S.Toggle>
							<div class="toggleSwitch_wrap">
								<div class="toggleSwitch">
									<ToggleSwitch labels={labels} onChange={onChange} />
								</div>
							</div>
						</S.Toggle>
					</div>
				</div>
			</section>

			{visible ? (

				// 보조제 섹션
				<S.SectionContainer>

					{/* 보조제 검색창 */}
					<div className="searchBarWrapper">
						<SearchBar handleSearch={handleSearchSupplement} name="supplement" />
						<S.Filter>
							<div ref={modalRef}>
								<div className="searchBarFilter">
									<span className="searchBarFilterText">보조제 종류</span>
									<div className="addFilter">
										{Object.entries(categories).map(([key, _], index) => {
											const categoryName = categories[key][1];
											const isActive = activeFilters.includes(categoryName);
											const isButtonVisible = selectedFilterKeys.includes(key); // 해당 버튼이 선택된 경우만 flex로 표시

											return (
												<button
													key={key}
													isSelected={isActive}
													elementidx={index}
													className={`searchFilterContent ${isActive ? 'active' : ''}`}
													style={{ display: isButtonVisible ? 'flex' : 'none' }}
													onClick={() => handleAddFilter(key)} // 클릭 이벤트 추가
												>
													{key}
													<img src={FilterClose} alt="보조제 검색 필터" />
												</button>
											);
										})}
									</div>
									<img
										src={plusCircle}
										alt="보조제 검색 필터 토글 버튼"
										className={`searchBarFilterToggleBtn ${isSearchSupFilterModal ? 'rotate-right' : 'rotate-left'}`}
										onClick={() => {
											setIsSearchSupFilterModal(!isSearchSupFilterModal);
										}}
									/>
								</div>
								{isSearchSupFilterModal && (
									<div className="searchFilterModalWrapper">
										{Object.entries(categories).map(([key, _], index) => {
											const categoryName = categories[key][1];
											const isActive = activeFilters.includes(categoryName);

											return (
												<button
													key={key}
													isSelected={isActive}
													elementidx={index}
													className={`searchFilterModalContent ${isActive ? 'active' : ''}`}
													onClick={() => handleAddFilter(key)}
												>
													{key}
													<img
														src={plusSimbol}
														alt="보조제 검색 필터 모달 버튼"
													/>
												</button>
											);
										})}
									</div>
								)}
							</div>

						</S.Filter>
					</div>

					{/* 보조제 내용 */}

					{nosearch ? (
						<NoSearch />
					) : (
						<>
							<section className="searchContentWrapper" onChange={onChange}>
								{supplementList.map((supplement, idx) => {
									return (
										<SupplementType
											flavor={supplement.flavor}
											source={supplement.source}
											imageURL={supplement.imageURL} // 원래는 description인데 그게 없음
											description={supplement.description}
											price={supplement.price}
											onClick={() => handleSupplementTypeClick(supplement.id)}
										>
											{supplement.koreanName}
										</SupplementType>
									);
								})}
								<section className="serachButtonWrapper">
									<button className="BtnWrapper">
										<img src={leftarrow} alt="이전 버튼" className="backBtnImg" />
										<span className="backBtnText" onClick={handleBackPage}>
											이전
										</span>
									</button>
									<button className="BtnWrapper">
										<span className="nextBtnText" onClick={handleNextPage}>
											다음
										</span>
										<img src={rightarrow} alt="다음 버튼" className="nextBtnImg" />
									</button>
								</section>
							</section>
						</>
					)}

				</S.SectionContainer>

			) : (

				// 운동 섹션
				<S.SectionContainer>

					{/* 운동 검색창 */}
					< div className="searchBarWrapper">
						<SearchBar handleSearch={handleSearch} name="workout" />
							<S.Filter>
								<div ref={modalRef}>
									<div className="searchBarFilter">
										<span className="searchBarFilterText">운동부위</span>
										<div className="addFilter">
											{Object.entries(bodyparts).map(([key, _], index) => {
												const bodypartName = bodyparts[key][1];
												const isActive = activeFitFilters.includes(bodypartName);
												const isButtonVisible = selectedFitFilterKeys.includes(key); // 해당 버튼이 선택된 경우만 flex로 표시

												return (
													<button
														key={key}
														isSelected={isActive}
														elementidx={index}
														className={`searchFilterContent ${isActive ? 'active' : ''}`}
														style={{ display: isButtonVisible ? 'flex' : 'none' }}
														onClick={() => handleAddFitFilter(key)} // 클릭 이벤트 추가
													>
														{key}
														<img src={FilterClose} alt="운동 검색 필터" />
													</button>
												);
											})}
										</div>
										<img
											src={plusCircle}
											alt="운동 검색 필터 토글 버튼"
											className={`searchBarFilterToggleBtn ${isSearchFitFilterModal ? 'rotate-right' : 'rotate-left'}`}
											onClick={() => {
												setIsSearchFitFilterModal(!isSearchFitFilterModal);
											}}
										/>
									</div>
									{isSearchFitFilterModal && (
										<div className="searchFilterModalWrapper fitness">
											{Object.entries(bodyparts).map(([key, _], index) => {
												const bodypartName = bodyparts[key][1];
												const isActive = activeFitFilters.includes(bodypartName);

												return (
													<button
														key={key}
														isSelected={isActive}
														elementidx={index}
														className={`searchFilterModalContent ${isActive ? 'active' : ''}`}
														onClick={() => handleAddFitFilter(key)}
													>
														{key}
														<img
															src={plusSimbol}
															alt="운동 검색 필터 모달 버튼"
														/>
													</button>
												);
											})}
										</div>
									)}
								</div>
							</S.Filter>
					</div >

					{/* 운동 내용 */}
					{nosearch ? (
						<NoSearch />
					) : (
						<>
							<section className="searchContentWrapper" onChange={onChange}>
								{machineList.map((machine, idx) => {
									return (
										// 부위 map으로 처리해야함
										<FitnessType
											key={idx}
											parts={machine.bodyPartKoreanName}
											description={machine.description}
											imgPath={machine.imgPath}
											onClick={() => handleFitnessTypeClick(machine.id)}
										>
											{machine.koreanName}
										</FitnessType>
									);
								})}
								<section className="serachButtonWrapper">
									<button className="BtnWrapper">
										<img src={leftarrow} alt="이전 버튼" className="backBtnImg" />
										<span className="backBtnText" onClick={handleBackPage}>
											이전
										</span>
									</button>
									<button className="BtnWrapper">
										<span className="nextBtnText" onClick={handleNextPage}>
											다음
										</span>
										<img src={rightarrow} alt="다음 버튼" className="nextBtnImg" />
									</button>
								</section>
							</section>
						</>
					)}

				</S.SectionContainer>

			)}

		</S.SearchContainer >
	);
};

export default SearchHome;