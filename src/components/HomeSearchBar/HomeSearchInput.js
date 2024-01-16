import { useState } from "react";
import { SearchInputContent } from "./StyledHomeSearchBar";

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
		</>
	);
};
