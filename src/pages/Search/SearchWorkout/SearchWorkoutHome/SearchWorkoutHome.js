import * as S from "../../StyledSearchHome";
import { useEffect, useState, useRef } from "react";
import OutSideClick from "../../../../components/Navbar/OutSideClick";
import { FitnessType } from "../../../../components";
import { userWorkoutBatchAPI } from "../../../../apis/API";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import arrowNextPage from "../../../../assets/images/arrow_nextPage.svg";
import arrowBackPage from "../../../../assets/images/arrow_backPage.svg";
import searchOpenIcon from "../../../../assets/images/searchOpen.svg";
import searchCloseIcon from "../../../../assets/images/close_searchBar.svg";
import logo from "../../../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import NoSearch from "../../../../components/NoSearch/NoSearch";
import { useRecoilState } from "recoil";
import { machineListRecoilState } from "../../../../recoil/atom";

const SearchWorkoutHome = () => {
  const navigate = useNavigate();

  const [machineListRecoil, setMachineListRecoil] = useRecoilState(
    machineListRecoilState
  );

  // 운동 & 보조제 섹션 이동

  const handleWorkout = () => {
    navigate("/searchworkout/1");
  };

  const handleSupplement = () => {
    navigate("/searchsupplement/1");
  };

  // --------------------- 운동 섹션 ---------------------

  // 검색어
  const [searchValue, setSearchValue] = useState("");
  // 검색어 유무
  const [isSearchValue, setIsSearchValue] = useState(false);

  // 검색결과가 없을 때 페이지
  const [nosearch, setNoSearch] = useState(false);

  // 보여질 운동 리스트
  const [machineList, setMachineList] = useState([]);

  // 기본세팅 (얘 왜 try/catch 넣는 게 안되냐)
  const fetchData = async () => {
    // Home에서 검색해서 넘어온 경우
    if (machineListRecoil.length) {
      const request = {
        searchKeyword: machineListRecoil,
      };
      const workoutResponse = await userWorkoutBatchAPI.post(
        `${pageNum}`,
        request
      );
      setNoSearch(false);
      setMachineList(workoutResponse.data);

      setIsSearchAreaOpen(true);
      setIsHandleSearch(true);
      setMachineListRecoil("");

      // 초기상태 세팅 + 부위별 결과 나누기
    } else {
      // 초기 페이지네이션
      let currentPage = 1;
      // 전체 검색결과값 개수
      let allMachineNum = 0;

      const request = {
        searchKeyword: "",
        bodyPartKoreanName: activeFitFilters, // 운동부위 필터
      };

      // 페이지네이션 개수 구하기
      if (pageNum === 1) {
        while (true) {
          const workoutResponse = await userWorkoutBatchAPI.post(
            `${currentPage}`,
            request
          );

          if (workoutResponse.data.length > 0) {
            currentPage += 1;
            allMachineNum += workoutResponse.data.length;
          } else {
            // 만약 workoutResponse.data.length가 0이라면 루프 종료
            setCurrentPage(currentPage - 1);
            // 왜 지역변수 currentPage가 0이 되면 안되는지 모르겠음...
            setSearchValueNum(allMachineNum);
            console.log("최대 페이지네이션 :", currentPage);
            console.log("전체 검색결과 개수 : ", allMachineNum);
            break;
          }
        }
      }

      const workoutResponse = await userWorkoutBatchAPI.post(`1`, request);

      setSearchValue(searchValue);
      setIsSearchValue(false);
      navigate(`/searchworkout/1`);
      setPageNum(1);

      if (workoutResponse.data.length) {
        setNoSearch(false);
        setMachineList(workoutResponse.data);
      } else {
        setNoSearch(true);
        setSearchValueNum(0);
        setMachineList([]);
        setIsSearchValue(true);
        setIsHandleSearch(true);
      }
    }
  };

  // ------- 부위 -------

  // 부위 종류 데이터
  const [bodyparts, setBodyparts] = useState({
    전체: [true, "전체"],
    가슴: [false, "가슴"],
    등: [false, "등"],
    엉덩이: [false, "엉덩이"],
    어깨: [false, "어깨"],
    복부: [false, "복부"],
    종아리: [false, "종아리"],
    허벅지앞: [false, "허벅지(앞)"],
    허벅지뒤: [false, "허벅지(뒤)"],
    삼두: [false, "삼두"],
    이두: [false, "이두"],
  });

  // 선택된 부위
  const [activeFitFilters, setActiveFitFilters] = useState([]);

  // 부위 선택
  const handleBodypartClick = (key) => {
    setPageNum(1);
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
        setActiveFitFilters([updatedBodyparts[key][1]]);
      }

      return updatedBodyparts;
    });
    // 위로 이동
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ------- 운동 검색 -------

  // 운동 검색 결과 반투명 레이어 위로 보이게 하기
  const [isHandleSearch, setIsHandleSearch] = useState(false);

  // 운동 검색 영역 유무
  const [isSearchAreaOpen, setIsSearchAreaOpen] = useState(false);

  // SearchBar 내부 검색어 상태전달용
  const [isClearSearchValue, setIsClearSearchValue] = useState(false);

  // 운동 검색 영역 드러내기
  const handleSearchOpenClick = () => {
    // 초기상태 세팅
    fetchData();

    handleBodypartClick("전체");
    navigate(`/searchworkout/1`);

    setIsSearchAreaOpen(true);

    // 혹시 검색한 다음에 그냥 다른 페이지를 눌렀다가 다시 돌아올 경우를 위해
    setIsHandleSearch(false);

    // 아래로 이동
    const startElement = document.getElementById("start");
    startElement.scrollIntoView({ behavior: "smooth" });

    // SearchBar 내부 검색어 상태 변경
    setIsClearSearchValue(false);
  };

  // 운동 검색 영역 숨기기
  const handleSearchCloseClick = () => {
    setPageNum(1);
    setIsSearchAreaOpen(false);
    setIsHandleSearch(false);

    // SearchBar 내부 검색어 초기화
    setIsClearSearchValue(true);
    // 현 페이지 검색어 변수 초기화
    setSearchValue("");
    setIsSearchValue(false);

    navigate(`/searchworkout/1`);

    // 위로 이동
    // (nav 뒤의 영역 때문에 최상단 태그에 id 설정해서 이동하는 방식으로 하면 끝까지 위로 안 올라감)
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 운동 결과 개수
  const [searchValueNum, setSearchValueNum] = useState(0);

  // 운동 검색
  const handleSearch = async (searchValue) => {
    // 아래로 이동
    const startElement = document.getElementById("search");
    startElement.scrollIntoView({ behavior: "smooth" });
    try {
      // 검색어가 없을 경우
      if (searchValue === "") {
        setNoSearch(true);
        setSearchValueNum(0);
        setMachineList([]);
        setIsSearchValue(true);
        setIsHandleSearch(true);

        // 검색어가 있을 경우
      } else {
        // 초기 페이지
        let currentPage = 1;
        // 전체 검색결과값 개수
        let allMachineNum = 0;

        const request = {
          searchKeyword: searchValue,
          bodyPartKoreanName: activeFitFilters, // 선택된 운동 부위 필터를 활용
        };

        // 페이지네이션 개수 구하기
        if (pageNum === 1) {
          while (true) {
            const workoutResponse = await userWorkoutBatchAPI.post(
              `${currentPage}`,
              request
            );

            if (workoutResponse.data.length > 0) {
              currentPage += 1;
              allMachineNum += workoutResponse.data.length;
            } else {
              // 만약 workoutResponse.data.length가 0이라면 루프 종료
              setCurrentPage(currentPage - 1);
              // 왜 지역변수 currentPage가 0이 되면 안되는지 모르겠음...
              setSearchValueNum(allMachineNum);
              console.log("최대 페이지네이션 :", currentPage);
              console.log("전체 검색결과 개수 : ", allMachineNum);
              break;
            }
          }
        }

        const workoutResponse = await userWorkoutBatchAPI.post(`1`, request);

        setSearchValue(searchValue);
        setIsSearchValue(true);
        navigate(`/searchworkout/1`);
        setPageNum(1);

        if (workoutResponse.data.length) {
          setIsHandleSearch(true);
          setNoSearch(false);
          setMachineList(workoutResponse.data);
        } else {
          setMachineList([]);
        }
      }
    } catch (err) {
      setNoSearch(true);
      setSearchValueNum(0);
      setMachineList([]);
      setIsSearchValue(true);
      setIsHandleSearch(true);
    }
  };

  // ------- 결과 -------

  // 각 운동 카드 클릭 시 단건조회 호출
  const handleFitnessTypeClick = async (id) => {
    navigate(`/searchworkout/${pageNum}/workoutdetail`, {
      state: { workoutId: id },
    });
  };

  // ------- 페이지네이션 -------

  // pageNum
  const [pageNum, setPageNum] = useState(1);

  // 전체 페이지 Num
  const [currentPage, setCurrentPage] = useState(1);

  // 다음 페이지 버튼 클릭 시
  const handleNextPage = () => {
    const nextPageNum = pageNum + 1;
    setPageNum(nextPageNum);
    navigate(`/searchworkout/${nextPageNum}`);
    // 위로 이동
    if (isHandleSearch === true) {
      // 이름으로 검색 중이라면 X까지만 위로 이동
      const startElement = document.getElementById("search");
      startElement.scrollIntoView({ behavior: "smooth" });
    } else {
      // 보조제 종류로 검색 중이라면 화면 최상단까지 이동
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // 이전 페이지 버튼 클릭 시
  const handleBackPage = () => {
    if (pageNum > 1) {
      const backPageNum = pageNum - 1;
      setPageNum(backPageNum);
      navigate(`/searchworkout/${backPageNum}`);
    }
    // 위로 이동
    if (isHandleSearch === true) {
      // 이름으로 검색 중이라면 X까지만 위로 이동
      const startElement = document.getElementById("search");
      startElement.scrollIntoView({ behavior: "smooth" });
    } else {
      // 보조제 종류로 검색 중이라면 화면 최상단까지 이동
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // 페이지 번호를 직접 클릭하여 이동 시
  const handlePageClick = (newPageNum) => {
    setPageNum(newPageNum);
    navigate(`/searchworkout/${newPageNum}`);
    // 위로 이동
    if (isHandleSearch === true) {
      // 이름으로 검색 중이라면 X까지만 위로 이동
      const startElement = document.getElementById("search");
      startElement.scrollIntoView({ behavior: "smooth" });
    } else {
      // 보조제 종류로 검색 중이라면 화면 최상단까지 이동
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const pageSearch = async (searchValue) => {
    const request = {
      searchKeyword: searchValue,
      bodyPartKoreanName: activeFitFilters, // 선택된 운동 부위 필터를 활용
    };

    const workoutResponse = await userWorkoutBatchAPI.post(
      `${pageNum}`,
      request
    );

    if (workoutResponse.data.length) {
      setNoSearch(false);
      setMachineList(workoutResponse.data);
    } else {
      setNoSearch(true);
      setSearchValueNum(0);
      setMachineList([]);
      setIsSearchValue(true);
    }
  };

  useEffect(() => {
    pageSearch(searchValue);
  }, [pageNum]);

  useEffect(() => {
    fetchData();
  }, [activeFitFilters]);

  return (
    <S.SearchContainer>
      {/* 검색바 열리면 뒤에 깔리는 반투명 배경 */}
      {isSearchAreaOpen && <div className="searchAreaOverlay"></div>}
      {/* 타이틀(문구 + 토글) */}
      <section className="searchTopWrapper">
        <div className="searchTitleWrapper">
          <div className="searchTitleTextWrapper">
            <p className="searchTitle1">나에게 핏한 </p>
            <p className="searchTitle2" id="start">
              운동과 보조제를 검색해보세요
            </p>
          </div>
        </div>
      </section>
      <S.SwitchMenu>
        <span className="menuCategory active" onClick={handleWorkout}>
          운동
        </span>
        <span className="menuCategory" onClick={handleSupplement}>
          보조제
        </span>
      </S.SwitchMenu>

      <S.SectionContainer>
        {/* 운동 검색창 */}
        <div className={`switchMenuCategory ${isSearchAreaOpen ? "open" : ""}`}>
          <div className="bodypartsCategory">
            <div className="bodypartsContainer">
              {Object.entries(bodyparts).map(([key, value]) => (
                <div
                  key={key}
                  className={`bodypartButton ${value[0] ? "active" : ""}`}
                  onClick={() => {
                    handleBodypartClick(key);
                    handleSearchCloseClick();
                  }}
                >
                  <p
                    className={`bodypartButtonText ${value[0] ? "active" : ""}`}
                  >
                    {key}
                  </p>
                </div>
              ))}
            </div>
            <div
              className={`searchOpenButton ${isSearchAreaOpen ? "open" : ""}`}
              onClick={handleSearchOpenClick}
            >
              <img
                className="searchOpenIcon"
                src={searchOpenIcon}
                alt="이름으로 검색 열기"
              />
              <p className="searchOpenText">운동 이름으로 검색</p>
            </div>
          </div>
        </div>
        <S.SearchArea id="search">
          <div className={`searchArea ${isSearchAreaOpen ? "open" : ""}`}>
            <img
              className="searchCloseIcon"
              src={searchCloseIcon}
              alt="검색 영역 닫기"
              onClick={handleSearchCloseClick}
            />
            {/* 여기에 실제 검색 영역의 내용이 들어갈 부분 */}
            <div className="searchBar">
              <SearchBar
                handleSearch={handleSearch}
                isClearSearchValue={isClearSearchValue}
                name="workout"
              />
            </div>
          </div>
        </S.SearchArea>

        {/* 운동 내용 */}
        <section
          className={`searchContentWrapper ${isHandleSearch ? "opacity" : ""}`}
        >
          <div className={`currentSearching ${isSearchValue ? "visible" : ""}`}>
            <div className="currentSearchValue">‘{searchValue}’</div>
            <p className="currentSearchContent">
              이&#40;가&#41; 포함된 검색 결과 {searchValueNum}개를 찾았어요.
            </p>
          </div>
          <div className="searchContent">
            {machineList &&
              machineList.map((machine, idx) => {
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
          <div className={`serachButtonWrapper ${nosearch ? "opacity" : ""}`}>
            <img
              src={arrowBackPage}
              alt="이전 버튼"
              className={`backBtnImg ${pageNum === 1 ? "nonActivePage" : ""}`}
              onClick={pageNum === 1 ? null : handleBackPage}
            />
            <div className="paginationWrapper">
              {Array.from({ length: currentPage }, (_, i) => (
                <div
                  key={i + 1}
                  className={`pageItem ${pageNum === i + 1 ? "activePage" : ""}`}
                  onClick={() => handlePageClick(i + 1)}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <img
              src={arrowNextPage}
              alt="다음 버튼"
              className={`nextBtnImg ${pageNum === currentPage ? "nonActivePage" : ""}`}
              onClick={pageNum === currentPage ? null : handleNextPage}
            />
          </div>
        </section>
      </S.SectionContainer>

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
                <div class="div-wrapper">
                  <div class="text-wrapper-4">전화</div>
                </div>
                <div class="div-wrapper">
                  <div class="text-wrapper-2">010-8544-1013</div>
                </div>
              </div>
              <div class="div-4">
                <div class="div-wrapper">
                  <div class="text-wrapper-5">이메일</div>
                </div>
                <div class="div-wrapper">
                  <div class="text-wrapper-2">jeuk1013@naver.com</div>
                </div>
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
    </S.SearchContainer>
  );
};

export default SearchWorkoutHome;
