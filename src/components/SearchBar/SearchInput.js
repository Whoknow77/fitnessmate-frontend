import { useState } from "react";
import { SearchInputContent } from "./StyledSearchBar";

export const SearchInput = ({ isClicked, setIsClicked, handleSearch }) => {
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
    <SearchInputContent
      value={searchvalue}
      isClicked={isClicked}
      onChange={handleChange}
      onKeyDown={handleEnter}
      placeholder={
        isClicked === true ? "" : "운동명이나 운동 부위를 검색해보세요"
      }
      onFocus={() => {
        setIsClicked(true);
      }}
      onBlur={() => {
        setIsClicked(false);
      }}
    />
  );
};
