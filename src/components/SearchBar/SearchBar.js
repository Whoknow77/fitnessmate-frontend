import { useState, useRef } from "react";
import * as S from "./StyledSearchBar";
import Search_Icon from "../../assets/images/search.svg";
import Close_Icon from "../../assets/images/close.svg";

// 운동명 / 운동 종목 검색
const SearchBar = ({ handleSearch, name }) => {

	// isClicked를 통해 검색창 클릭 여부에 따라 스타일 다르게 함
	const [isClicked, setIsClicked] = useState(false);

	const [searchvalue, setSearchValue] = useState("");
	const handleChange = (e) => {
		setSearchValue(e.target.value);
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
		<S.SearchContainer isClicked={isClicked}>
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
				<img
					className="closeIcon"
					src={Close_Icon}
					alt="검색 취소 아이콘"
					onClick={handleCloseClick}
				/>
				<img
					className="searchIcon"
					src={Search_Icon}
					alt="검색 아이콘"
					onClick={clickSearch} />
			</div>

		</S.SearchContainer>
	);
};

export default SearchBar;
