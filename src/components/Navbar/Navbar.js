// < 네브바 포함 레이아웃 >

import React, { useEffect, useState } from "react";
import * as S from "./StyledNavbar";
import { useNavigate, useLocation } from "react-router-dom";
import NavModal from "./NavModal";
import TokenApi from "../../apis/TokenApi";
import LoginModal from "../Modal/LoginModal";
import CancleModal from "../Modal/CancleModal";
import logoimg from "../../assets/images/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setuserName] = useState(null);
  const [isLoginModal, setIsLoginModal] = useState(false);
  const [isCancleModal, setIsCancleModal] = useState(false);
  const [isRecommend, setIsRecommend] = useState(false);

  // home에서만 nav 스크롤 애니메이션 제어
  const isHomePage = window.location.pathname === "/";

  // 스크롤 애니메이션
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 70) {
        setIsScrolled(true);
        // console.log(isScrolled);
        // console.log(window.scrollY);
      } else {
        setIsScrolled(false);
        // console.log(isScrolled);
        // console.log(window.scrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const handleSearch = () => {
    navigate("searchworkout/1");
    // 페이지 새로고침
    window.location.reload();
  };
  const handleMyPage = () => {
    navigate("mypage");
  };
  // const handleMyPage = () => {
  // 	if (window.location.href.includes("signup")) {
  // 		setIsCancleModal(true);
  // 	} else {
  // 		if (userName) {
  // 			navigate("mypage");
  // 		} else {
  // 			setIsLoginModal(true);
  // 		}
  // 	}
  // };

  const handleRecommend = () => {
    navigate("recommend");
    // if (window.location.href.includes("signup")) {
    //   setIsCancleModal(true);
    // } else {
    //   if (userName) {
    //     navigate("recommend");
    //   } else {
    //     setIsLoginModal(true);
    //   }
    // }
  };

  // 토큰이 만료되고 새로고침을 누르면 로그인이 풀린다.
  const handleLocalStorage = () => {
    return localStorage.length;
  };

  const fetchData = async () => {
    try {
      // if 안하고 그냥 바로 받아오면 로그인 안한 상태일 때 accessToken alert 창이 계속 뜸
      if (localStorage.getItem("accessToken")) {
        const response = await TokenApi.get("user/private");
        setuserName(response.data.userName);
      }
    } catch (error) {}
  };

  // 추천 중간 이탈 모달창 시도
  // useEffect(() => {
  //   fetchData();
  //   if (window.location.href.includes("recommend")) {
  //     setIsRecommend(true);
  //   }
  // }, [window.location.href]);

  // ------------ 회원가입 중간 이탈 모달창 시도 ------------
  // useEffect(() => {
  //   if (location.pathname.includes("signup")) {
  //     setIsCancleModal(true);
  //   }
  // }, [location.pathname]);

  // 브라우저의 새로고침 감지
  // useEffect(() => {
  //   // 브라우저의 새로고침 감지
  //   const handleBeforeUnload = (e) => {
  //     e.preventDefault();
  //     if (window.location.href.includes("signup")) {
  //       setIsCancleModal(true);
  //       e.returnValue = ""; // 경고창 표시 방지
  //     }
  //   };

  //   return () => {
  //     if (window.location.href.includes("signup")) {
  //       window.removeEventListener("beforeunload", handleBeforeUnload);
  //     }
  //   };
  // }, [navigate, setIsCancleModal]);

  return (
    <S.NavSection isHomePage={isHomePage}>
      <div
        id="navbar"
        className={isScrolled ? "fixed" : ""}
        isHomePage={isHomePage}
        isLoginModal={isLoginModal}
        isCancleModal={isCancleModal}
        isRecommend={isRecommend}
      >
        <img
          src={logoimg}
          className="nav-logo"
          onClick={() => {
            navigate("/");
          }}
          alt="fitmate 로고"
        />
        <S.NavLink>
          <S.NavTextContainer>
            <i className="fa-solid fa-bars"></i>
            <S.NavButton onClick={handleSearch}>검색하기</S.NavButton>
            <S.NavButton onClick={handleRecommend}>추천받기</S.NavButton>
            <S.NavButton onClick={handleMyPage}>내 운동</S.NavButton>
          </S.NavTextContainer>
          {!userName ? (
            <S.NavLoginButton
              className="login"
              onClick={() => {
                navigate("login");
              }}
              isScrolled={isScrolled}
            >
              로그인
            </S.NavLoginButton>
          ) : (
            <NavModal userName={userName} setuserName={setuserName}>
              {userName} 님
            </NavModal>
          )}
        </S.NavLink>
        {isLoginModal && <LoginModal setIsLoginModal={setIsLoginModal} />}
        {isCancleModal && <CancleModal setIsCancleModal={setIsCancleModal} />}
      </div>
    </S.NavSection>
  );
};

export default Navbar;
