import * as S from "./StyledSearchHome";
import ToggleSwitch from "../../MyPage/My/toggle";
import { useEffect, useState, useRef } from "react";
import OutSideClick from "../../../components/Navbar/OutSideClick";
import { FitnessType, SupplementType } from "../../../components";
import { userWorkoutBatchAPI, userSupplementSearchAPI, userSupplementSingleAPI } from "../../../apis/API";
import closeSimbol from "../../../assets/images/close-simbol.svg"
import FilterMore from "../../../assets/images/expand_more.svg"
import SearchBar from "../../../components/SearchBar/SearchBar";
import rightarrow from "../../../assets/images/rightarrow.svg";
import leftarrow from "../../../assets/images/leftarrow.svg";
import check from "../../../assets/images/check_circle_fill.svg"
import noneCheck from "../../../assets/images/check_circle.svg"
import { useNavigate, useParams } from "react-router-dom";
import NoSearch from "../../../components/NoSearch/NoSearch";

const SearchHome = () => {
	let { pageNum } = useParams();
	const navigate = useNavigate();

	// Toggle

	const [visible, setVisible] = useState(false);

	const labels = {
		left: {
			title: "운동",
			value: "workout",
		},
		right: {
			title: "보조제",
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
		setIsClicked(false);
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

	// 부위 토글 선택 여부
	const [isClicked, setIsClicked] = useState(false);

	// 부위 선택 없을 때 모달 공간
	const [isSelected, setIsSelected] = useState(false);

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

	// useEffect를 사용하여 isSelected 상태 업데이트
	// 0일 때만 문구 보이도록
	useEffect(() => {
		setIsSelected(selectedFitFilterKeys.length === 0);
	}, [selectedFitFilterKeys]);


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
													<img src={FilterMore} alt="보조제 검색 필터" />
												</button>
											);
										})}
									</div>
									<img
										src={FilterMore}
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
														src={FilterMore}
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
					<div className="searchBarWrapper">
						<SearchBar handleSearch={handleSearch} name="workout" />
						<S.Filter isClicked={isClicked}>
							<div ref={modalRef}>
								<div
									className="searchBarFilter"
									isClicked={isClicked}
									onClick={() => {
										setIsSearchFitFilterModal(!isSearchFitFilterModal);
										setIsClicked(!isClicked);
									}}
									onBlur={() => {
										setIsClicked(false);
									}}
								>
									<span className="searchBarFilterText">
										운동 부위
										{
											isSelected ? (
												<></>
											) : (
												<> :</>
											)}
									</span>
									<div className="addFilter" isClicked={isClicked}>
										{
											Object.entries(bodyparts).map(([key, _], index, array) => {
												const bodypartName = bodyparts[key][1];
												const isActive = activeFitFilters.includes(bodypartName);
												const isButtonVisible = selectedFitFilterKeys.includes(key);

												// 필터 버튼 엘리먼트를 생성
												const filterButton = (
													<p
														isClicked={isClicked}
														key={key}
														isSelected={isActive}
														elementidx={index}
														className={`searchFilterContent ${isActive ? 'active' : ''}`}
														style={{ display: isButtonVisible ? 'flex' : 'none' }}
													>
														{key}
													</p>
												);

												// 마지막 엘리먼트가 아니고 현재 엘리먼트가 표시되는 경우에만 쉼표 엘리먼트를 생성
												const comma = isButtonVisible && index < array.length - 1 && array.slice(index + 1).some(([nextKey]) => selectedFitFilterKeys.includes(nextKey)) ? (
													<span isClicked={isClicked} key={`comma-${index}`} className="searchFilterContent">, </span>
												) : null;

												// 필터 버튼과 쉼표를 반환
												return [filterButton, comma];
											}).flat() // 배열을 평탄화하여 React 컴포넌트 배열로 만듦
										}
									</div>
									<svg
										alt="운동 검색 필터 토글 버튼"
										className={`searchBarFilterToggleBtn ${isSearchFitFilterModal ? 'rotate-right' : 'rotate-left'}`}
										width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<mask id="mask0_5583_6922" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
											<rect width="24" height="24" fill="#D9D9D9" />
										</mask>
										<g mask="url(#mask0_5583_6922)">
											<path d="M11.9998 14.9499C11.8665 14.9499 11.7415 14.9291 11.6248 14.8874C11.5081 14.8457 11.3998 14.7749 11.2998 14.6749L6.6998 10.0749C6.51647 9.89157 6.4248 9.65824 6.4248 9.3749C6.4248 9.09157 6.51647 8.85824 6.6998 8.6749C6.88314 8.49157 7.11647 8.3999 7.3998 8.3999C7.68314 8.3999 7.91647 8.49157 8.0998 8.6749L11.9998 12.5749L15.8998 8.6749C16.0831 8.49157 16.3165 8.3999 16.5998 8.3999C16.8831 8.3999 17.1165 8.49157 17.2998 8.6749C17.4831 8.85824 17.5748 9.09157 17.5748 9.3749C17.5748 9.65824 17.4831 9.89157 17.2998 10.0749L12.6998 14.6749C12.5998 14.7749 12.4915 14.8457 12.3748 14.8874C12.2581 14.9291 12.1331 14.9499 11.9998 14.9499Z" fill="#6B7684" />
										</g>
									</svg>
								</div>
								{isSearchFitFilterModal && (
									<div className="searchFilterModalWrapper fitness">
										<div className="selectOptionArea">
											<span className="selectOptionTitle">검색할 부위</span>
											<div className="selectOption">
												{isSelected ? (
													<p>어떤 부위의 운동이 궁금하세요?</p>
												) : (
													<>
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
																	<img src={closeSimbol} alt="부위 삭제" />
																</button>
															);
														})}
														{/* <div className="deleteAll">안녕</div> */}
													</>
												)}
											</div>
										</div>
										<div className="bodypartsOption">
											<div id="upperbody" className="body">
												<span className="bodyTitle">상체</span>
												<div className="bodyOption">
													<button
														className={`searchFilterModalContent ${activeFitFilters.includes("가슴") ? 'active' : ''}`}
														onClick={() => handleAddFitFilter("가슴")}
													>
														<div className="checkSimbol">
															<img className="bodypartCheck" src={check} alt="가슴 부위 선택" />
															<img className="bodypartNoneCheck" src={noneCheck} alt="가슴 부위" />
														</div>
														가슴
													</button>
													<button
														className={`searchFilterModalContent ${activeFitFilters.includes("어깨") ? 'active' : ''}`}
														onClick={() => handleAddFitFilter("어깨")}
													>
														<div className="checkSimbol">
															<img className="bodypartCheck" src={check} alt="어깨 부위 선택" />
															<img className="bodypartNoneCheck" src={noneCheck} alt="어깨 부위" />
														</div>
														어깨
													</button>
													<button
														className={`searchFilterModalContent ${activeFitFilters.includes("등") ? 'active' : ''}`}
														onClick={() => handleAddFitFilter("등")}
													>
														<div className="checkSimbol">
															<img className="bodypartCheck" src={check} alt="등 부위 선택" />
															<img className="bodypartNoneCheck" src={noneCheck} alt="등 부위" />
														</div>
														등
													</button>
													<button
														className={`searchFilterModalContent ${activeFitFilters.includes("이두") ? 'active' : ''}`}
														onClick={() => handleAddFitFilter("이두")}
													>
														<div className="checkSimbol">
															<img className="bodypartCheck" src={check} alt="이두 부위 선택" />
															<img className="bodypartNoneCheck" src={noneCheck} alt="이두 부위" />
														</div>
														이두
													</button>
													<button
														className={`searchFilterModalContent ${activeFitFilters.includes("등") ? 'active' : ''}`}
														onClick={() => handleAddFitFilter("삼두")}
													>
														<div className="checkSimbol">
															<img className="bodypartCheck" src={check} alt="삼두 부위 선택" />
															<img className="bodypartNoneCheck" src={noneCheck} alt="삼두 부위" />
														</div>
														삼두
													</button>
													<button
														className={`searchFilterModalContent ${activeFitFilters.includes("복부") ? 'active' : ''}`}
														onClick={() => handleAddFitFilter("복부")}
													>
														<div className="checkSimbol">
															<img className="bodypartCheck" src={check} alt="복부 부위 선택" />
															<img className="bodypartNoneCheck" src={noneCheck} alt="복부 부위" />
														</div>
														복부
													</button>
												</div>
											</div>
											<div id="lowerbody" className="body">
												<span className="bodyTitle">하체</span>
												<div className="bodyOption">
													<button
														className={`searchFilterModalContent ${activeFitFilters.includes("엉덩이") ? 'active' : ''}`}
														onClick={() => handleAddFitFilter("엉덩이")}
													>
														<div className="checkSimbol">
															<img className="bodypartCheck" src={check} alt="엉덩이 부위 선택" />
															<img className="bodypartNoneCheck" src={noneCheck} alt="엉덩이 부위" />
														</div>
														엉덩이
													</button>
													<button
														className={`searchFilterModalContent ${activeFitFilters.includes("종아리") ? 'active' : ''}`}
														onClick={() => handleAddFitFilter("종아리")}
													>
														<div className="checkSimbol">
															<img className="bodypartCheck" src={check} alt="종아리 부위 선택" />
															<img className="bodypartNoneCheck" src={noneCheck} alt="종아리 부위" />
														</div>
														종아리
													</button>
													<button
														className={`searchFilterModalContent ${activeFitFilters.includes("허벅지앞") ? 'active' : ''}`}
														onClick={() => handleAddFitFilter("허벅지앞")}
													>
														<div className="checkSimbol">
															<img className="bodypartCheck" src={check} alt="허벅지앞 부위 선택" />
															<img className="bodypartNoneCheck" src={noneCheck} alt="허벅지앞 부위" />
														</div>
														허벅지 앞
													</button>
													<button
														className={`searchFilterModalContent ${activeFitFilters.includes("허벅지뒤") ? 'active' : ''}`}
														onClick={() => handleAddFitFilter("허벅지뒤")}
													>
														<div className="checkSimbol">
															<img className="bodypartCheck" src={check} alt="허벅지뒤 부위 선택" />
															<img className="bodypartNoneCheck" src={noneCheck} alt="허벅지뒤 부위" />
														</div>
														허벅지 뒤
													</button>
												</div>
											</div>
										</div>
									</div>
								)}
							</div>
						</S.Filter>
					</div >

					{/* 운동 내용 */}
					{
						nosearch ? (
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
						)
					}

				</S.SectionContainer >

			)}

		</S.SearchContainer >
	);
};

export default SearchHome;