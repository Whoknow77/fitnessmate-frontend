import { useEffect, useState, useRef } from "react";
import * as S from "./StyledSearchBar"
import Search_Icon from "../../assets/images/searchHome_icon.svg";
import { useNavigate } from "react-router-dom";
import Close from "../../assets/images/close_small.svg";

// 운동명 / 운동 종목 검색
const SearchBar = ({ handleSearch, name, isClearSearchValue }) => {


	const navigate = useNavigate();

	// isClicked를 통해 검색창 클릭 여부에 따라 스타일 다르게 함
	const [isClicked, setIsClicked] = useState(false);

	const [searchvalue, setSearchValue] = useState("");
	const handleChange = (e) => {
		setSearchValue(e.target.value);
	};

	const handlePopularKeywordClick = (keyword) => {
		setSearchValue(keyword);
		inputRef.current.focus(); // ref를 통해 입력 창에 포커스 주기
		// handleSearch(keyword); // 선택한 키워드로 검색 수행이었는데 창에 키워드 뜨고 직접 검색으로 바뀜
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

	// SearchHome으로부터 전달받은 상태를 토대로 SearchValue 지우기
	useEffect(() => {
		console.log("isClearSearchValue : ", isClearSearchValue)
		if (isClearSearchValue === true) {
			setSearchValue("");
		}
	}, [isClearSearchValue]);

	return (
		<S.SearchContainer>
			<S.SearchBarContainer isClicked={isClicked}>
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
							isClicked === true ? "" : "어떤 보조제가 도움될까요?"
						}
						onFocus={() => {
							setIsClicked(true);
						}}
						onBlur={() => {
							setIsClicked(false);
						}}
					/>
				)}

				<div className="iconArea">
					<img
						className="closeIcon"
						src={Close}
						alt="검색 취소 아이콘"
						onClick={handleCloseClick}
					/><img
						className="searchIcon"
						src={Search_Icon}
						alt="검색 아이콘"
						onClick={clickSearch} /></div>

			</S.SearchBarContainer>
			<S.SearchBottomContainer>
				<span className="searchBottomTitle">인기 검색 키워드</span>
				{name === "workout" && (
					<div className="searchBottomContent">
						<div className="popularKeyword" onClick={() => handlePopularKeywordClick("데드리프트")}>
							<p># 데드리프트</p>
						</div>
						<div className="popularKeyword" onClick={() => handlePopularKeywordClick("풀업")}>
							<p># 풀업</p>
						</div>
						<div className="popularKeyword" onClick={() => handlePopularKeywordClick("스쿼트")}>
							<p># 스쿼트</p>
						</div>
						<div className="popularKeyword" onClick={() => handlePopularKeywordClick("인클라인 덤벨 벤치프레스")}>
							<p># 인클라인 덤벨 벤치프레스</p>
						</div>
					</div>
				)}
				{name === "supplement" && (
					<div className="searchBottomContent">
						<div className="popularKeyword" onClick={() => handlePopularKeywordClick("히알루론산")}>
							<p># 히알루론산</p>
						</div>
						<div className="popularKeyword" onClick={() => handlePopularKeywordClick("시리어스")}>
							<p># 시리어스</p>
						</div>
					</div>
				)}
			</S.SearchBottomContainer>
		</S.SearchContainer>

	);
};

export default SearchBar;
