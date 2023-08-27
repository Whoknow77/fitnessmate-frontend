import axios from "axios";
import { getAccessAPI } from "./API";

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
    console.log(response);
    // 응답이 성공적으로 왔을 때의 처리
    return response;
  },
  // 에러가 발생했을 때의 처리(4xx,5xx 에러 => 토큰 만료)
  async (error) => {
    console.log(error);
    // 토큰 만료
    if (error.response.data.status === "EXPIRED_ACCESS_TOKEN_EXCEPTION") {
      console.log("Access Token 만료");
      // 기존 refreshToken
      const refreshToken = localStorage.getItem("refreshToken");
      try {
        const originalRequest = error.config;
        // 새로운 accessToken 요청
        const response = await getAccessAPI.get("", {
          headers: {
            Authorization: "Bearer " + refreshToken,
          },
        });
        const newAccessToken = response.data.accessToken;
        // 토큰 재 저장
        localStorage.setItem("accessToken", newAccessToken);
        // 새로운 accessToken으로 헤더 변경
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        // 새로운 accessToken으로 재 요청
        return await axios(originalRequest);
      } catch (err) {
        // refresh token 만료
        if (err.response.data.status === "EXPIRED_REFRESH_TOKEN_EXCEPTION") {
          console.log("Refresh Token 만료 재 로그인 해주세요");
        }
      }
    }
  }
);
export default TokenApi;
