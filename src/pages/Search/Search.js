import { Route, Routes } from "react-router-dom";
import {
  SearchHome,
	SearchWorkoutDetail,
	SearchSupplementDetail
} from ".";

// search 페이지에 대한 정보를 모두 담는 컴포넌트

const Search = () => {
  return (
    <Routes>
      <Route path="/" element={<SearchHome />} />
      <Route path="workoutdetail" element={<SearchWorkoutDetail />} />
			<Route path="supplementDetail" element={<SearchSupplementDetail />} />
    </Routes>
  );
};

export default Search;
