import { useState } from "react";
import { SearchInputContent } from "./StyledSearchBar";

export const SearchInput = ({ isClicked, setIsClicked, handleSearch, name }) => {
	const [searchvalue, setSearchValue] = useState("");
	const handleChange = (e) => {
		setSearchValue(e.target.value);
	};

	const handleEnter = (e) => {
		if (e.key === "Enter") {
			handleSearch(searchvalue);
		}
	};
	return (
		<>
			{name === "workout" && (
				<SearchInputContent
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
				<SearchInputContent
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
	);
};
