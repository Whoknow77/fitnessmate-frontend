import * as S from "./StyledSearchHome";
import ToggleSwitch from "../../MyPage/My/toggle";
import { useEffect, useState, useRef } from "react";
import OutSideClick from "../../../components/Navbar/OutSideClick";
import { FitnessType, SupplementType } from "../../../components";
import { userWorkoutBatchAPI, userSupplementSearchAPI, userSupplementSingleAPI } from "../../../apis/API";
import closeSimbol from "../../../assets/images/close-simbol.svg"
import FilterMore from "../../../assets/images/expand_more.svg"
import SearchBar from "../../../components/SearchBar/SearchBar";
import arrowNextPage from "../../../assets/images/arrow_nextPage.svg";
import arrowBackPage from "../../../assets/images/arrow_backPage.svg";
import check from "../../../assets/images/check_circle_fill.svg"
import noneCheck from "../../../assets/images/check_circle.svg"
import searchOpenIcon from "../../../assets/images/searchOpen.svg"
import searchCloseIcon from "../../../assets/images/close_searchBar.svg"
import logo from "../../../assets/images/logo.png"
import { useNavigate, useParams } from "react-router-dom";
import NoSearch from "../../../components/NoSearch/NoSearch";
import { useRecoilState } from "recoil";
import { machineListRecoilState } from "./../../../recoil/atom";

const SearchHome = () => {

	const navigate = useNavigate();

	const [machineListRecoil, setMachineListRecoil] = useRecoilState(machineListRecoilState);


	// pageNum
	const [pageNum, setPageNum] = useState(1);

	// 전체 페이지 Num
	const [currentPage, setCurrentPage] = useState(1);

	// 다음 페이지 버튼 클릭 시
	const handleNextPage = () => {
		const nextPageNum = pageNum + 1;
		setPageNum(nextPageNum);
		navigate(`/search/${nextPageNum}`);
	};

	// 이전 페이지 버튼 클릭 시
	const handleBackPage = () => {
		if (pageNum > 1) {
			const backPageNum = pageNum - 1;
			setPageNum(backPageNum);
			navigate(`/search/${backPageNum}`);
		}
	};

	// 페이지 번호를 직접 클릭하여 이동 시
	const handlePageClick = (newPageNum) => {
		setPageNum(newPageNum);
		navigate(`/search/${newPageNum}`);
	};


	useEffect(() => {
		console.log(searchValue)
		if (searchValue.length) {
			console.log("이거")
			pageSearch(searchValue);
		} else if (activeFitFilters.length) {
			pageSearch("");
		} else {
			fetchData();
			fetchDataSupplement();
		}
	}, [pageNum]);

	const pageSearch = async (searchValue) => {
		console.log("pageNum", pageNum)
		const request = {
			searchKeyword: searchValue,
			bodyPartKoreanName: activeFitFilters, // 선택된 운동 부위 필터를 활용
		};

		const workoutResponse = await userWorkoutBatchAPI.post(`${pageNum}`, request);

		if (workoutResponse.data.length) {
			setIsHandleSearch(true);
			setNoSearch(false);
			setMachineList(workoutResponse.data);
		} else {
			setNoSearch(true);
		}
	}


	// Toggle

	const [visible, setVisible] = useState(false);
	const [isSwitchFit, setIsSwitchFit] = useState(false);
	const [isSwitchSup, setIsSwitchSup] = useState(true);

	const onChangeFitness = () => {
		setVisible(false);
		setIsSwitchFit(false);
		setIsSwitchSup(true);
		setCurrentPage(1);
		setPageNum(1);
	};

	const onChangeSupplement = () => {
		setVisible(true);
		setIsSwitchFit(true);
		setIsSwitchSup(false);
		setCurrentPage(1);
		setPageNum(1);
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

	const [searchValue, setSearchValue] = useState("");

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
		if (machineListRecoil.length) {
			console.log("홈에서 검색한 내용 :", machineListRecoil)
			const request = {
				searchKeyword: machineListRecoil,
			};
			const workoutResponse = await userWorkoutBatchAPI.post(
				`${pageNum}`,
				request
			);
			setNoSearch(false);
			setMachineList(workoutResponse.data);
		} else {
			let currentPage = 1;
			// 모든 결과값을 모아둔 배열
			// let allMachineList = [];

			try {

				// currentPage = 페이지네이션 개수 구하기
				if (pageNum === 1) {
					while (true) {
						const workoutResponse = await userWorkoutBatchAPI.post(
							`${currentPage}`,
							request
						);

						if (workoutResponse.data.length > 0) {
							// allMachineList = allMachineList.concat(workoutResponse.data);
							currentPage += 1;
						} else {
							// 만약 workoutResponse.data.length가 0이라면 루프 종료
							// console.log(allMachineList)
							setCurrentPage(currentPage - 1);
							// 왜 지역변수 currentPage가 0이 되면 안되는지 모르겠음...
							console.log("최대 페이지네이션 :", currentPage)
							break;
						}
					}
				}

				// 이건 그냥 초기 상태 세팅용
				const workoutResponse = await userWorkoutBatchAPI.post(
					`${pageNum}`,
					request
				);
				if (workoutResponse.data.length > 0) {
					setNoSearch(false);
					setMachineList(workoutResponse.data);
				} else {
					setNoSearch(true);
				}

			} catch (err) {
				// 오류 처리
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

	// 운동 검색 결과 반투명 레이어 위로 보이게 하기

	const [isHandleSearch, setIsHandleSearch] = useState(false);

	// 운동 검색 영역 드러내기

	const [isSearchAreaOpen, setIsSearchAreaOpen] = useState(false);

	const handleSearchOpenClick = () => {

		handleBodypartClick("전체");
		navigate(`/search/1`);

		setIsSearchAreaOpen(true);

		// 혹시 검색한 다음에 그냥 다른 페이지를 눌렀다가 다시 돌아올 경우를 위해 
		setIsHandleSearch(false);
	};

	// 운동 검색 영역 숨기기
	const handleSearchCloseClick = () => {
		setSearchValue("");
		setIsSearchAreaOpen(false);
		setIsHandleSearch(false);
		fetchData();
		navigate(`/search/1`);
	};


	// 운동 검색
	const handleSearch = async (searchValue) => {
		try {
			if (searchValue === "") {
				let currentPage = 1;

				const request = {
					searchKeyword: "",
					bodyPartKoreanName: activeFitFilters, // 선택된 운동 부위 필터를 활용
				};

				// 페이지네이션 개수 구하기
				while (true) {
					const workoutResponse = await userWorkoutBatchAPI.post(
						`${currentPage}`,
						request
					);

					if (workoutResponse.data.length > 0) {
						// allMachineList = allMachineList.concat(workoutResponse.data);
						currentPage += 1;
					} else {
						// 만약 workoutResponse.data.length가 0이라면 루프 종료
						// console.log(allMachineList)
						setCurrentPage(currentPage - 1);
						// 왜 지역변수 currentPage가 0이 되면 안되는지 모르겠음...
						console.log("최대 페이지네이션 :", currentPage)
						break;
					}
				}

				const workoutResponse = await userWorkoutBatchAPI.post(
					`1`,
					request
				);

				setSearchValue(searchValue);
				navigate(`/search/1`);
				setPageNum(1);
				if (workoutResponse.data.length) {
					setNoSearch(false);
					setMachineList(workoutResponse.data);
				} else {
					setNoSearch(true);
				}

			} else {
				let currentPage = 1;

				const request = {
					searchKeyword: searchValue,
					bodyPartKoreanName: activeFitFilters, // 선택된 운동 부위 필터를 활용
				};

				// 페이지네이션 개수 구하기
				while (true) {
					const workoutResponse = await userWorkoutBatchAPI.post(
						`${currentPage}`,
						request
					);

					if (workoutResponse.data.length > 0) {
						// allMachineList = allMachineList.concat(workoutResponse.data);
						currentPage += 1;
					} else {
						// 만약 workoutResponse.data.length가 0이라면 루프 종료
						// console.log(allMachineList)
						setCurrentPage(currentPage - 1);
						// 왜 지역변수 currentPage가 0이 되면 안되는지 모르겠음...
						console.log("최대 페이지네이션 :", currentPage)
						break;
					}
				}

				const workoutResponse = await userWorkoutBatchAPI.post(
					`1`,
					request
				);

				setSearchValue(searchValue);
				navigate(`/search/1`);
				setPageNum(1);

				if (workoutResponse.data.length) {
					setIsHandleSearch(true);
					setNoSearch(false);
					setMachineList(workoutResponse.data);
				} else {
					setNoSearch(true);
				}
			}
		} catch (err) {
			setPageNum(1);
			setMachineList([]);
			setNoSearch(true);
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
			supplementType: null,
		};
		// 보조제 기구 batch 조회(12개)
		let currentPage = 1;
		let allMachineList = [];

		try {
			// currentPage = 페이지네이션 개수 구하기
			if (pageNum === 1) {
				while (true) {
					const supplementResponse = await userSupplementSearchAPI.post(
						`${currentPage}`,
						request
					);

					if (supplementResponse.data.length > 0) {
						allMachineList = allMachineList.concat(supplementResponse.data);
						currentPage += 1;
					} else {
						// 만약 supplementResponse.data.length가 0이라면 루프 종료
						console.log(allMachineList)
						setCurrentPage(currentPage - 1);
						// 왜 지역변수 currentPage가 0이 되면 안되는지 모르겠음...
						console.log("최대 페이지네이션 :", currentPage)
						break;
					}
				}
			}

			const supplementResponse = await userSupplementSearchAPI.post(
				`${pageNum}`,
				request
			);
			console.log(supplementResponse)
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
		전체: [true, "전체"],
		프로틴: [false, "Protein"],
		아미노산: [false, "AminoAicd"],
		게이너: [false, "Gainer"],
		기타: [false, "Other"],
	});

	const [activeFilters, setActiveFilters] = useState();

	useEffect(() => {
		handleSearchSupplement(searchValue);
	}, [activeFilters, searchValue]);

	const handleSupplementClick = (key) => {
		setCategories((prevCategories) => {
			const updatedCategories = { ...prevCategories };

			if (key === "전체") {
				Object.keys(updatedCategories).forEach((categorieKey) => {
					updatedCategories[categorieKey][0] = categorieKey === "전체";
				});
				setActiveFilters([]);
			} else {
				console.log(updatedCategories[key][1])
				Object.keys(updatedCategories).forEach((categorieKey) => {
					updatedCategories[categorieKey][0] = false;
				});
				updatedCategories[key][0] = true;
				setActiveFilters([updatedCategories[key][1]]); // 영어 값으로 업데이트
			}

			return updatedCategories;
		});
	};

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
				let currentPage = 1;

				const request = {
					searchKeyword: "",
					supplementType: activeFilters,
				};

				console.log(activeFilters);

				// currentPage = 페이지네이션 개수 구하기
				if (pageNum === 1) {
					while (true) {
						const supplementResponse = await userSupplementSearchAPI.post(
							`${currentPage}`,
							request
						);

						if (supplementResponse.data.length > 0) {
							currentPage += 1;
						} else {
							// 만약 supplementResponse.data.length가 0이라면 루프 종료
							setCurrentPage(currentPage - 1);
							// 왜 지역변수 currentPage가 0이 되면 안되는지 모르겠음...
							console.log("최대 페이지네이션 :", currentPage)
							break;
						}
					}
				}

				const supplementResponse = await userSupplementSearchAPI.post(
					`1`,
					request
				);
				console.log(supplementResponse)

				setSearchValue(searchValue);
				navigate(`/search/1`);
				setPageNum(1);
				if (supplementResponse.data.length) {
					setNoSearch(false);
					setSupplementList(supplementResponse.data);
				} else {
					setNoSearch(true);
				}

			} else {
				let currentPage = 1;

				const request = {
					searchKeyword: searchValue,
					supplementType: activeFilters, // 선택된 보조제 종류 필터를 활용
				};

				// currentPage = 페이지네이션 개수 구하기
				if (pageNum === 1) {
					while (true) {
						const supplementResponse = await userSupplementSearchAPI.post(
							`${currentPage}`,
							request
						);

						if (supplementResponse.data.length > 0) {
							currentPage += 1;
						} else {
							// 만약 supplementResponse.data.length가 0이라면 루프 종료
							setCurrentPage(currentPage - 1);
							// 왜 지역변수 currentPage가 0이 되면 안되는지 모르겠음...
							console.log("최대 페이지네이션 :", currentPage)
							break;
						}
					}
				}

				const supplementResponse = await userSupplementSearchAPI.post(
					`1`,
					request
				);
				setSearchValue(searchValue);
				navigate(`/search/1`);
				setPageNum(1);
				if (supplementResponse.data.length) {
					setNoSearch(false);
					setSupplementList(supplementResponse.data);
				} else {
					setNoSearch(true);
				}
			}
		} catch (err) {
			setPageNum(1);
			setNoSearch(true);
			setSupplementList([]);
		}
	};

	// useEffect를 사용하여 isSelected 상태 업데이트
	// 0일 때만 문구 보이도록
	useEffect(() => {
		setIsSelected(selectedFitFilterKeys.length === 0);
	}, [selectedFitFilterKeys]);


	return (
		<S.SearchContainer>
			{/* 검색바 열리면 뒤에 깔리는 반투명 배경 */}
			{isSearchAreaOpen && (
				<div className="searchAreaOverlay"></div>
			)}
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

					{/* 보조제 검색창 */}
					<div className={`switchMenuCategory ${isSearchAreaOpen ? 'open' : ''}`}>
						<div className="bodypartsCategory">
							<div className="bodypartsContainer">
								{Object.entries(categories).map(([key, value]) => (
									<div
										key={key}
										className={`bodypartButton ${value[0] ? 'active' : ''}`}
										onClick={() => handleSupplementClick(key)}
									>
										<p className={`bodypartButtonText ${value[0] ? 'active' : ''}`}>
											{key}
										</p>
									</div>
								))}
							</div>
							<div className={`searchOpenButton ${isSearchAreaOpen ? 'open' : ''}`} onClick={handleSearchOpenClick}>
								<img className="searchOpenIcon" src={searchOpenIcon} alt="이름으로 검색 열기" />
								<p className="searchOpenText">보조제 이름으로 검색</p>
							</div>
						</div>
					</div>
					<S.SearchArea>
						<div className={`searchArea ${isSearchAreaOpen ? 'open' : ''}`}>
							<img
								className="searchCloseIcon"
								src={searchCloseIcon}
								alt="검색 영역 닫기"
								onClick={handleSearchCloseClick}
							/>
							{/* 여기에 실제 검색 영역의 내용이 들어갈 부분 */}
							<div className="searchBar">
								<SearchBar handleSearch={handleSearchSupplement} name="supplement" />
							</div>
						</div>
					</S.SearchArea>

					{/* 보조제 내용 */}

					{nosearch ? (
						<div className={`noSearch ${isHandleSearch ? 'opacity' : ''}`}>
							<NoSearch />
						</div>
					) : (
						<>
							<section className={`searchContentWrapper ${isHandleSearch ? 'opacity' : ''}`}>
								<div className="searchContent">
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
								</div>
								<div className="serachButtonWrapper">
									<img
										src={arrowBackPage}
										alt="이전 버튼"
										className={`backBtnImg ${pageNum === 1 ? 'nonActivePage' : ''}`}
										onClick={pageNum === 1 ? null : handleBackPage}
									/>
									<div className="paginationWrapper">
										{Array.from({ length: currentPage }, (_, i) => (
											<div
												key={i + 1}
												className={`pageItem ${pageNum === i + 1 ? 'activePage' : ''}`}
												onClick={() => handlePageClick(i + 1)}
											>
												{i + 1}
											</div>
										))}
									</div>
									<img
										src={arrowNextPage}
										alt="다음 버튼"
										className={`nextBtnImg ${pageNum === currentPage ? 'nonActivePage' : ''}`}
										onClick={pageNum === currentPage ? null : handleNextPage}
									/>
								</div>
							</section>
						</>
					)}

				</S.SectionContainer>

			) : (

				// 운동 섹션
				<S.SectionContainer>
					{/* 운동 검색창 */}
					<div className={`switchMenuCategory ${isSearchAreaOpen ? 'open' : ''}`}>
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
							<div className={`searchOpenButton ${isSearchAreaOpen ? 'open' : ''}`} onClick={handleSearchOpenClick}>
								<img className="searchOpenIcon" src={searchOpenIcon} alt="이름으로 검색 열기" />
								<p className="searchOpenText">운동 이름으로 검색</p>
							</div>
						</div>
					</div>
					<S.SearchArea>
						<div className={`searchArea ${isSearchAreaOpen ? 'open' : ''}`}>
							<img
								className="searchCloseIcon"
								src={searchCloseIcon}
								alt="검색 영역 닫기"
								onClick={handleSearchCloseClick}
							/>
							{/* 여기에 실제 검색 영역의 내용이 들어갈 부분 */}
							<div className="searchBar">
								<SearchBar handleSearch={handleSearch} name="workout" />
							</div>
						</div>
					</S.SearchArea>

					{/* 운동 내용 */}
					{
						nosearch ? (
							<div className={`noSearch ${isHandleSearch ? 'opacity' : ''}`}>
								<NoSearch />
							</div>
						) : (
							<>
								<section className={`searchContentWrapper ${isHandleSearch ? 'opacity' : ''}`}>
									<div className="searchContent">
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
									</div>
									<div className="serachButtonWrapper">
										<img
											src={arrowBackPage}
											alt="이전 버튼"
											className={`backBtnImg ${pageNum === 1 ? 'nonActivePage' : ''}`}
											onClick={pageNum === 1 ? null : handleBackPage}
										/>
										<div className="paginationWrapper">
											{Array.from({ length: currentPage }, (_, i) => (
												<div
													key={i + 1}
													className={`pageItem ${pageNum === i + 1 ? 'activePage' : ''}`}
													onClick={() => handlePageClick(i + 1)}
												>
													{i + 1}
												</div>
											))}
										</div>
										<img
											src={arrowNextPage}
											alt="다음 버튼"
											className={`nextBtnImg ${pageNum === currentPage ? 'nonActivePage' : ''}`}
											onClick={pageNum === currentPage ? null : handleNextPage}
										/>
									</div>
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
						<img className="footerLogo" src={logo} alt="핏메이트 로고" />
					</div>
				</div>
			</S.Footer>
		</S.SearchContainer >
	);
};

export default SearchHome;