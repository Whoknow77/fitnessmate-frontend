import { Route, Routes } from "react-router-dom";
import {
	FixPassword,
	FixProfile,
	FixBodyInfo,
	FixBodyFigureDirect,
	MypageHome,
} from "./index";

const Mypage = () => {
	return (
		<Routes>
			<Route path="/" element={<MypageHome />} />
			<Route path="fixprofile" element={<FixProfile />} />
			<Route path="fixpassword" element={<FixPassword />} />
			<Route path="fixbodyinfo" element={<FixBodyInfo />} />
			<Route path="fixbodyinfo/direct" element={<FixBodyFigureDirect />} />
		</Routes>
	);
};

export default Mypage;
