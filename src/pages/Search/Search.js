import * as S from "./StyledSearch";
import ToggleSwitch from "./../MyPage/My/toggle";
import { useEffect, useState } from "react";
import { FitnessType } from "../../components";
import { userWorkoutBatchAPI } from "../../apis/API";
import toggleBtn from "../../assets/images/toggle.svg";
import SearchBar from "./../../components/SearchBar/SearchBar";
import rightarrow from "../../assets/images/rightarrow.svg";
import leftarrow from "../../assets/images/leftarrow.svg";
import { useNavigate, useParams } from "react-router-dom";
import NoSearch from "../../components/NoSearch/NoSearch";

const Search = () => {
  let { pageNum } = useParams();
  const navigate = useNavigate();

  // 모달
  const [visible, setVisible] = useState(false);

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

  // 필터 토글
  const [isSearchFilterModal, setIsSearchFilterModal] = useState(false);

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
    // 현재 선택한 필터 옵션(운동 부위 / 운동명)
    const currentFilterValue = Object.keys(searchFilterValue).filter((key) => {
      return searchFilterValue[key];
    });
    try {
      if (searchValue === "") {
        const request = {
          searchKeyword: "",
          bodyPartKoreanName: [],
        };
        const workoutResponse = await userWorkoutBatchAPI.post(
          `${pageNum}`,
          request
        );
        setMachineList(workoutResponse.data);
      } else {
        if (currentFilterValue[0] === "운동명") {
          const request = {};
          request.searchKeyword = searchValue;
          request.bodyPartKoreanName = null;

          const workoutResponse = await userWorkoutBatchAPI.post(
            `${pageNum}`,
            request
          );
          setMachineList(workoutResponse.data);
        } else if (currentFilterValue[0] === "운동 부위") {
          const request = {};
          request.searchKeyword = null;
          request.bodyPartKoreanName = [searchValue];
          const workoutResponse = await userWorkoutBatchAPI.post(
            `${pageNum}`,
            request
          );
          setMachineList(workoutResponse.data);
        }
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

  const labels = {
    left: {
      title: "내 운동",
      value: "workout",
    },
    right: {
      title: "내 보조제",
      value: "supplement",
    },
  };

  const onChange = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    fetchData();
  }, [pageNum]);

  return (
    <S.SearchContainer>
      {/* 타이틀(문구 + 토글) */}
      <section className="searchTopWrapper">
        <div className="searchTitleWrapper">
          <div className="searchTitleTextWrapper">
            <p className="searchTitle1">나에게 핏한 </p>
            <p className="searchTitle2">운동 정보를 찾아보세요</p>
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

        {/* 검색 창 */}
        <div className="searchBarWrapper">
          <button
            className="searchBarFilter"
            onClick={() => {
              setIsSearchFilterModal(!isSearchFilterModal);
            }}
          >
            {Object.entries(searchFilterValue).map(
              ([key, value]) =>
                value && <span className="searchBarFilterText">{key}</span>
            )}
            <img
              src={toggleBtn}
              alt="운동 검색 필터 토글 버튼"
              className="searchBarFilterToggleBtn"
            />
          </button>
          {isSearchFilterModal && (
            <div className="searchFilterModalWrapper">
              {Object.keys(searchFilterValue).map((filtervalue) => (
                <button
                  key={filtervalue}
                  className="searchFilterModalContent"
                  onClick={(e) => {
                    setIsSearchFilterModal(!isSearchFilterModal);
                    handleToggleValue(filtervalue);
                  }}
                >
                  {filtervalue}
                </button>
              ))}
            </div>
          )}
          <SearchBar handleSearch={handleSearch} />
        </div>
      </section>
      {nosearch ? (
        <NoSearch />
      ) : (
        <>
          <section className="searchContentWrapper">
            {machineList.map((machine, idx) => {
              return (
                // 부위 map으로 처리해야함
                <FitnessType
                  parts={machine.bodyPartKoreanName}
                  description={machine.description}
                  imgPath={machine.imgPath}
                >
                  {machine.koreanName}
                </FitnessType>
              );
            })}
          </section>
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
        </>
      )}
    </S.SearchContainer>
  );
};

export default Search;
