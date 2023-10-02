import axios from "axios";
import { getAccessAPI } from "./API";
import { useNavigate } from "react-router-dom";

// import { useState } from "react";
// import LoginModal from "../components/Modal/LoginModal";


// accessToken을 통해 요청하는 API

// api 생성
const TokenApi = axios.create({
	baseURL: "/api",
	withCredentials: true,
});

//  HTTP 요청을 서버로 보내기 전에 실행
// 주로 전역적인 요청 설정(예: 헤더 추가), 로깅, 로딩 인디케이터 표시 등의 용도
TokenApi.interceptors.request.use((config) => {
	const token = localStorage.getItem("accessToken");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// 버로부터 HTTP 응답을 받은 후 실행
// 응답 데이터의 전처리, 오류 처리, 로깅 등의 용도
TokenApi.interceptors.response.use(
	(response) => {
		// 응답이 성공적으로 왔을 때의 처리
		return response;
	},
	// 에러가 발생했을 때의 처리(4xx,5xx 에러 => 토큰 만료)
	async (error) => {
		if (error.response.data.status === "ROUTINE_NOT_FOUND_EXCEPTION") {
			console.log("routineId와 일치하는 routine이 없습니다");
		}
		if (error.response.data.status === "ALREADY_EXIST_MY_WORKOUT_EXCEPTION") {
			console.log("이미 존재하는 운동입니다");
		}

		// const navigate = useNavigate();
		// // 토큰을 찾을 수 없을 때
		// if (error.response.data.status === "JWT_NOT_FOUND_EXCEPTION") {
		// 	console.log("[토큰을 찾을 수 없음] 접근 권한이 없습니다. 로그인 해주세요.");
		// 	alert("토큰이 만료되었습니다. 다시 로그인해주세요.");
		// 	navigate("/login");
		// }

		// 토큰 만료
		if (error.response.data.status === "EXPIRED_ACCESS_TOKEN_EXCEPTION") {
			console.log("Access Token 만료");
			alert("토큰이 만료되었습니다. refresh token을 받아볼게요.");
			// 기존 refreshToken

			try {
				const originalRequest = error.config;
				// 새로운 accessToken 요청
				const response = await getAccessAPI.get("", {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("refreshToken"),
					},
				});
				const newAccessToken = response.data.accessToken;
				// 토큰 재 저장
				localStorage.setItem("accessToken", newAccessToken);
				// 새로운 accessToken으로 헤더 변경
				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
				console.log("get refresh token");
				// 새로운 accessToken으로 재 요청
				return await axios(originalRequest);
			} catch (err) {
				console.log(err);
				// refresh token 만료
				if (err.response.data.status === "EXPIRED_REFRESH_TOKEN_EXCEPTION") {
					console.log("Refresh Token 만료 재 로그인 해주세요");
					alert("토큰이 만료되었습니다. 다시 로그인해주세요.");
					// navigate("/login");
					// setIsLoginModal(true);
					// <>
					// 	{isLoginModal && <LoginModal setIsLoginModal={setIsLoginModal} />}
					// </>
				}
			}
		}
	}
);
export default TokenApi;
