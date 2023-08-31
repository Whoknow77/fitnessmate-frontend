// < 네브바 포함 레이아웃 >

import React, { useEffect, useState } from "react";
import * as S from "./StyledNavbar";
import { useNavigate } from "react-router-dom";
import NavModal from "./NavModal";
import TokenApi from "../../apis/TokenApi";

const Navbar = () => {
  const navigate = useNavigate();
  const loginState = localStorage.length;
  const [userName, setuserName] = useState(null);

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
      <button
        className="nav-logo"
        onClick={() => {
          navigate("/");
        }}
      />

      <S.NavLink>
        <S.NavTextContainer>
          <i className="fa-solid fa-bars"></i>
          <S.NavButton>검색하기</S.NavButton>
          <S.NavButton
            onClick={() => {
              navigate("recommend");
            }}
          >
            추천받기
          </S.NavButton>
          <S.NavButton
            onClick={() => {
              navigate("mypage");
            }}
          >
            내 운동
          </S.NavButton>
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
    </S.NavbarContainer>
  );
};

export default Navbar;
