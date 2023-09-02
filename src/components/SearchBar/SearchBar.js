import { useState } from "react";
import { SearchContainer } from "./StyledSearchBar";
import { SearchInput } from "./SearchInput";
import Search_Icon from "../../assets/images/Search_Icon.svg";

// 운동명 / 운동 종목 검색
const SearchBar = ({ handleSearch }) => {
  // isClicked를 통해 검색창 클릭 여부에 따라 스타일 다르게 함
  const [isClicked, setIsClicked] = useState(false);
  return (
    <SearchContainer isClicked={isClicked}>
      <SearchInput
        isClicked={isClicked}
        setIsClicked={setIsClicked}
        handleSearch={handleSearch}
      />
      <img className="searchIcon" src={Search_Icon} alt="검색 아이콘" />
    </SearchContainer>
  );
};

export default SearchBar;
