// < 네브바 포함 레이아웃 >

import React, { useEffect, useState } from "react";
import * as S from "./StyledNavbar";
import { useNavigate } from "react-router-dom";
import NavModal from "./NavModal";
import TokenApi from "../../apis/TokenApi";
import LoginModal from "../Modal/LoginModal";

const Navbar = () => {
  const navigate = useNavigate();
  const loginState = localStorage.length;
  const [userName, setuserName] = useState(null);
  const [isLoginModal, setIsLoginModal] = useState(false);
  const handleSearch = () => {
    navigate("search");
  };

  const handleMyPage = () => {
    if (loginState) {
      navigate("mypage");
    } else {
      setIsLoginModal(true);
    }
  };

  const handleRecommend = () => {
    if (loginState) {
      navigate("recommend");
    } else {
      setIsLoginModal(true);
    }
  };

  const fetchData = async () => {
    try {
      const response = await TokenApi.get("user/private");

      setuserName(response.data.userName);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <S.NavbarContainer>
      <div className="stickyContainer">
        <button
          className="nav-logo"
          onClick={() => {
            navigate("/");
          }}
        />

        <S.NavLink>
          <S.NavTextContainer>
            <i className="fa-solid fa-bars"></i>
            <S.NavButton onClick={handleSearch}>검색하기</S.NavButton>
            <S.NavButton onClick={handleRecommend}>추천받기</S.NavButton>
            <S.NavButton onClick={handleMyPage}>내 운동</S.NavButton>
          </S.NavTextContainer>
          {!loginState ? (
            <S.NavLoginButton
              className="login"
              onClick={() => {
                navigate("login");
              }}
            >
              로그인
            </S.NavLoginButton>
          ) : (
            <NavModal userName={userName}>{userName} 님</NavModal>
          )}
        </S.NavLink>
        {isLoginModal && <LoginModal setIsLoginModal={setIsLoginModal} />}
      </div>
      <div className="underline"></div>
    </S.NavbarContainer>
  );
};

export default Navbar;
