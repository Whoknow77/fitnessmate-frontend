import { Route, Routes } from "react-router-dom";
import {
	SearchSupplementHome,
	SearchSupplementDetail
} from ".";

// search 페이지에 대한 정보를 모두 담는 컴포넌트

const Search = () => {
	return (
		<Routes>
			<Route path="/" element={<SearchSupplementHome />} />
			<Route path="supplementDetail" element={<SearchSupplementDetail />} />
		</Routes>
	);
};

export default Search;
