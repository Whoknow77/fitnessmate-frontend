import { Route, Routes } from "react-router-dom";
import {
	SearchWorkoutHome,
	SearchWorkoutDetail,
} from ".";

// search 페이지에 대한 정보를 모두 담는 컴포넌트

const Search = () => {
	return (
		<Routes>
			<Route path="/" element={<SearchWorkoutHome />} />
			<Route path="workoutdetail" element={<SearchWorkoutDetail />} />
		</Routes>
	);
};

export default Search;
