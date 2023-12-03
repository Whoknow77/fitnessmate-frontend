// TokenApi.js

import axios from "axios";
import { getAccessAPI } from "./API";
import { useNavigate } from "react-router-dom";

let lastError = null; // 에러 문구를 저장할 변수

export const getLastError = () => {
	console.log(lastError);
	return lastError;
};

const TokenApi = axios.create({
	baseURL: "/api",
	withCredentials: true,
});

TokenApi.interceptors.request.use((config) => {
	const token = localStorage.getItem("accessToken");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

TokenApi.interceptors.response.use(
	(response) => {
		// 응답이 성공적으로 왔을 때의 처리
		return response;
	},
	async (error) => {
		if (error.response && error.response.data && error.response.data.status) {
			switch (error.response.data.status) {
				case "ROUTINE_NOT_FOUND_EXCEPTION":
					lastError = "routineId와 일치하는 routine이 없습니다";
					break;
				case "ALREADY_EXIST_MY_WORKOUT_EXCEPTION":
					lastError = `이미 존재하는 운동입니다`;
					getLastError();
					break;
				case "MY_WORKOUT_SIZE_OVER_EXCEPTION":
					lastError = "등록할 수 있는 운동의 갯수(7개)를 초과하였습니다.";
					getLastError();
					break;
				case "EXPIRED_ACCESS_TOKEN_EXCEPTION":
					lastError = "Access Token 만료";
					await handleExpiredAccessToken();
					break;
				default:
					lastError = "에러가 발생했습니다";
					break;
			}
			const navigate = useNavigate();
			if (error.response.data.status === "EXPIRED_ACCESS_TOKEN_EXCEPTION") {
				console.log("Access Token 만료");
				const isKeepLogin = localStorage.getItem("rememberMe");
				if (isKeepLogin === "true") {
					alert("토큰이 만료되었습니다. refresh token을 받아볼게요.");

					try {
						const originalRequest = error.config;
						// 새로운 accessToken 요청
						const response = await getAccessAPI.get("", {
							headers: {
								Authorization: "Bearer " + localStorage.getItem("refreshToken"),
							},
						});
						console.log(response);
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
						if (
							err.response &&
							err.response.data &&
							err.response.data.status === "EXPIRED_REFRESH_TOKEN_EXCEPTION"
						) {
							console.log("Refresh Token 만료 재 로그인 해주세요");
							alert("토큰이 만료되었습니다. 다시 로그인해주세요.");
							// navigate("/login");
							// setIsLoginModal(true);
							// <>
							// 	{isLoginModal && <LoginModal setIsLoginModal={setIsLoginModal} />}
							// </>
						}
					}
				} else {
					console.log("Access Token 만료 재 로그인 해주세요");
					alert("토큰이 만료되었습니다. 다시 로그인해주세요.");
				}
			}
		} else {
			lastError = "에러가 발생했습니다";
		}

		return Promise.reject(error);
	}
);

const handleExpiredAccessToken = async (error) => {
	// 함수 내에서 'error'를 사용할 수 있도록 매개변수로 추가합니다.
	const isKeepLogin = localStorage.getItem("rememberMe");

	if (isKeepLogin === "true") {
		alert("토큰이 만료되었습니다. refresh token을 받아볼게요.");

		try {
			const originalRequest = error.config;
			const response = await getAccessAPI.get("", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("refreshToken"),
				},
			});

			const newAccessToken = response.data.accessToken;
			localStorage.setItem("accessToken", newAccessToken);
			originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
			console.log("get refresh token");
			return await axios(originalRequest);
		} catch (err) {
			console.log(err);

			if (
				err.response &&
				err.response.data &&
				err.response.data.status === "EXPIRED_REFRESH_TOKEN_EXCEPTION"
			) {
				console.log("Refresh Token 만료 재 로그인 해주세요");
				// alert("토큰이 만료되었습니다. 다시 로그인해주세요.");
				// navigate("/login");
				// setIsLoginModal(true);
				// {isLoginModal && <LoginModal setIsLoginModal={setIsLoginModal} />}
			}
		}
	} else {
		console.log("Access Token 만료 재 로그인 해주세요");
	}
};

export default TokenApi;