import { useState, useRef } from "react";
import * as S from "./StyledHomeSearchBar";
import Search_Icon from "../../assets/images/homeSearch.svg";
import keywordSearch from "../../assets/images/keywordSearch.svg";
import { userWorkoutBatchAPI } from "../../apis/API";
import { useRecoilState } from "recoil";
import { machineListRecoilState } from "../../recoil/atom";
import { useNavigate } from "react-router-dom";
// import Close_Icon from "../../assets/images/close.svg";

// 운동명 / 운동 종목 검색
const HomeSearchBar = ({ name }) => {
	const navigate = useNavigate();

	// isClicked를 통해 검색창 클릭 여부에 따라 스타일 다르게 함
	const [isClicked, setIsClicked] = useState(false);

	const [searchvalue, setSearchValue] = useState("");
	const handleChange = (e) => {
		setSearchValue(e.target.value);
	};

	const handlePopularKeywordClick = (keyword) => {
		setSearchValue(keyword);
		// handleSearch(keyword); // 선택한 키워드로 검색 수행
	};

	const [machineListRecoil, setMachineListRecoil] = useRecoilState(machineListRecoilState);

	const handleSearch = async (searchValue) => {
		try {
			if (searchValue === "") {
				const request = {
					searchKeyword: "",
				};
				const workoutResponse = await userWorkoutBatchAPI.post(
					`1`,
					request
				);
				setMachineListRecoil(workoutResponse.data);
				navigate("search/1");
			} else {
				const request = {
					searchKeyword: searchValue,
				};
				const workoutResponse = await userWorkoutBatchAPI.post(
					`1`,
					request
				);
				setMachineListRecoil(workoutResponse.data);
				navigate("search/1");
			}
		} catch (err) {
			setMachineListRecoil([]);
			navigate("search/1");
		}
	};


	const handleEnter = (e) => {
		if (e.key === "Enter") {
			handleSearch(searchvalue);
		}
	};

	const clickSearch = () => {
		handleSearch(searchvalue);
	};

	const inputRef = useRef(null); // ref 생성

	const handleCloseClick = () => {
		setSearchValue("");
		inputRef.current.focus(); // ref를 통해 입력 창에 포커스 주기
	};

	return (
		<S.SearchContainer>
			<S.SearchBarContainer isClicked={isClicked}>
				<>
					{name === "workout" && (
						<S.SearchInputContent
							ref={inputRef} // ref를 입력 창에 연결
							name={name}
							value={searchvalue}
							isClicked={isClicked}
							onChange={handleChange}
							onKeyDown={handleEnter}
							placeholder={
								isClicked === true ? "" : "어떤 운동이 좋을까요?"
							}
							onFocus={() => {
								setIsClicked(true);
							}}
							onBlur={() => {
								setIsClicked(false);
							}}
						/>
					)}
					{name === "supplement" && (
						<S.SearchInputContent
							ref={inputRef} // ref를 입력 창에 연결
							name={name}
							value={searchvalue}
							isClicked={isClicked}
							onChange={handleChange}
							onKeyDown={handleEnter}
							placeholder={
								isClicked === true ? "" : "보조제 이름을 검색해보세요"
							}
							onFocus={() => {
								setIsClicked(true);
							}}
							onBlur={() => {
								setIsClicked(false);
							}}
						/>
					)}
				</>
				<div className="iconArea">
					{/* <img
					className="closeIcon"
					src={Close_Icon}
					alt="검색 취소 아이콘"
					onClick={handleCloseClick}
				/> */}
					<img
						className="searchIcon"
						src={Search_Icon}
						alt="검색 아이콘"
						onClick={clickSearch} />
				</div>

			</S.SearchBarContainer>
			<S.SearchBottomContainer>
				<span className="searchBottomTitle">인기 검색 키워드</span>
				<div className="searchBottomContent">
					<div className="popularKeyword" onClick={() => handlePopularKeywordClick("데드리프트")}>
						<p>데드리프트</p>
						<img src={keywordSearch} alt="데드리프트 검색하기" />
					</div>
					<div className="popularKeyword" onClick={() => handlePopularKeywordClick("풀업")}>
						<p>풀업</p>
						<img src={keywordSearch} alt="풀업 검색하기" />
					</div>
					<div className="popularKeyword" onClick={() => handlePopularKeywordClick("스쿼트")}>
						<p>스쿼트</p>
						<img src={keywordSearch} alt="스쿼트 검색하기" />
					</div>
					<div className="popularKeyword" onClick={() => handlePopularKeywordClick("인클라인 덤벨 프레스")}>
						<p>인클라인 덤벨 프레스</p>
						<img src={keywordSearch} alt="인클라인 덤벨 프레스 검색하기" />
					</div>
				</div>
			</S.SearchBottomContainer>
		</S.SearchContainer>

	);
};

export default HomeSearchBar;
