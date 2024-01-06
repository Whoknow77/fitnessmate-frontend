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
import searchOpenIcon from "../../../assets/images/searchOpen.svg"
import logo from "../../../assets/images/logo.png"
import { useNavigate, useParams } from "react-router-dom";
import NoSearch from "../../../components/NoSearch/NoSearch";
import { useRecoilState } from "recoil";
import { machineListRecoilState } from "./../../../recoil/atom";
import HomeSearchBar from "../../../components/HomeSearchBar/HomeSearchBar";

const SearchHome = () => {
	let { pageNum } = useParams();
	const navigate = useNavigate();

	const [machineListRecoil, setMachineListRecoil] = useRecoilState(machineListRecoilState);

	// Toggle

	const [visible, setVisible] = useState(false);
	const [isSwitchFit, setIsSwitchFit] = useState(false);
	const [isSwitchSup, setIsSwitchSup] = useState(true);

	const onChangeFitness = () => {
		setVisible(false);
		setIsSwitchFit(false);
		setIsSwitchSup(true);
	};

	const onChangeSupplement = () => {
		setVisible(true);
		setIsSwitchFit(true);
		setIsSwitchSup(false);
	};

	useEffect(() => {
		console.log("fit: ", isSwitchFit, "sup: ", isSwitchSup);
	}, [isSwitchFit, isSwitchSup]);

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
		console.log("이거 :", machineListRecoil)
		if (machineListRecoil.length) {
			const request = {
				searchKeyword: machineListRecoil,
			};
			const workoutResponse = await userWorkoutBatchAPI.post(
				`${pageNum}`,
				request
			);
			setMachineList(workoutResponse.data);
		} else {
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

	// 부위 종류 데이터
	const [bodyparts, setBodyparts] = useState({
		전체: [true, "전체"],
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
	const [searchValue, setSearchValue] = useState("");

	useEffect(() => {
		handleSearch(searchValue);
	}, [activeFitFilters, searchValue]);


	const handleBodypartClick = (key) => {
		setBodyparts((prevBodyparts) => {
			const updatedBodyparts = { ...prevBodyparts };

			if (key === "전체") {
				Object.keys(updatedBodyparts).forEach((bodypartKey) => {
					updatedBodyparts[bodypartKey][0] = bodypartKey === "전체";
				});
				setActiveFitFilters([]);
			} else {
				Object.keys(updatedBodyparts).forEach((bodypartKey) => {
					updatedBodyparts[bodypartKey][0] = false;
				});
				updatedBodyparts[key][0] = true;
				setActiveFitFilters([key]);
			}

			return updatedBodyparts;
		});
	};



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
						<p className="searchTitle2">운동과 보조제를 검색해보세요</p>
					</div>
				</div>
			</section>
			<S.SwitchMenu>
				<span
					className={`menuCategory1 ${isSwitchFit ? '' : 'active'}`}
					onClick={onChangeFitness}
				>
					운동
				</span>
				<span
					className={`menuCategory2 ${isSwitchSup ? '' : 'active'}`}
					onClick={onChangeSupplement}
				>
					보조제
				</span>
			</S.SwitchMenu>

			{visible ? (

				// 보조제 섹션
				<S.SectionContainer>
					<S.SwitchMenuCategory>

					</S.SwitchMenuCategory>

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
							<section className="searchContentWrapper">
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
					<S.SwitchMenuCategory>
						<div className="bodypartsCategory">
							<div className="bodypartsContainer">
								{Object.entries(bodyparts).map(([key, value]) => (
									<div
										key={key}
										className={`bodypartButton ${value[0] ? 'active' : ''}`}
										onClick={() => handleBodypartClick(key)}
									>
										<p className={`bodypartButtonText ${value[0] ? 'active' : ''}`}>
											{key}
										</p>
									</div>
								))}
							</div>
							<div className="searchOpenButton">
								<img className="searchOpenIcon" src={searchOpenIcon} alt="이름으로 검색 열기" />
								<p className="searchOpenText">운동 이름으로 검색</p>
							</div>
						</div>
					</S.SwitchMenuCategory>
					<S.SearchArea>
						<HomeSearchBar />
					</S.SearchArea>

					{/* 운동 내용 */}
					{
						nosearch ? (
							<NoSearch />
						) : (
							<>
								<section className="searchContentWrapper">
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
		</S.SearchContainer >
	);
};

export default SearchHome;