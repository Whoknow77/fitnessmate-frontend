import React from "react";
import { Outlet } from "react-router-dom";
import { MainLayoutWrapper, Footer } from "./StyledMainLayout";
import Navbar from "../components/Navbar/Navbar";
import logo from "../assets/images/logo.png"


const MainLayout = () => {
	return (
		<>
			<MainLayoutWrapper>
				{/* 고정 Nav 바 */}
				<Navbar />

				{/* 변화하는 부분 */}
				<Outlet />
			</MainLayoutWrapper>
			<Footer>
				<div class="frame">
					<div class="div">
						<div class="text-wrapper">서비스</div>
						<div class="div-2">
							<div class="text-wrapper-2">검색하기</div>
							<div class="text-wrapper-3">추천받기</div>
							<div class="text-wrapper-3">내 운동</div>
						</div>
					</div>
					<div class="div-3">
						<div class="text-wrapper">문의</div>
						<div class="div-2">
							<div class="div-4">
								<div class="div-wrapper"><div class="text-wrapper-4">전화</div></div>
								<div class="div-wrapper"><div class="text-wrapper-2">010-8544-1013</div></div>
							</div>
							<div class="div-4">
								<div class="div-wrapper"><div class="text-wrapper-5">이메일</div></div>
								<div class="div-wrapper"><div class="text-wrapper-2">jeuk1013@naver.com</div></div>
							</div>
						</div>
					</div>
					<div class="div-5">
						<div class="div-6">
							<div class="text-wrapper-6">개발</div>
							<div class="div-2">
								<div class="text-wrapper-2">이찬하</div>
								<div class="text-wrapper-3">정지성</div>
								<div class="text-wrapper-3">강민정</div>
								<div class="text-wrapper-3">최훈오</div>
							</div>
						</div>
						<div class="div-6">
							<div class="text-wrapper-6">디자인</div>
							<div class="div-2">
								<div class="text-wrapper-2">김정욱</div>
								<div class="text-wrapper-3">최시현</div>
							</div>
						</div>
					</div>
					<div class="group">
						<img src={logo} />
					</div>
				</div>
			</Footer >
		</>
	);
};

export default MainLayout;
