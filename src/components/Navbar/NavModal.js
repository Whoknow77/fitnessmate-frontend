import React, { useEffect, useRef, useState } from "react";
import * as S from "./StyledNavModal";
import useOutSideClick from "./useOutSideClick";
import { useNavigate } from "react-router-dom";
import TokenApi from "./../../apis/TokenApi";

function NavModal({ onClose, userName }) {
  const navigate = useNavigate();

  const modalRef = useRef(null);
  const handleClose = () => {
    onClose?.();
  };

  useOutSideClick(modalRef, handleClose);

  // 로그아웃
  const handleLogout = async () => {
    await TokenApi.put("auth/logout");
    localStorage.clear();
    navigate("/");
  };

  const handleFixProfile = async () => {
    navigate("/mypage/fixprofile");
    handleClose();
  };

  const handleFixBodyInfo = async () => {
    navigate("/mypage/fixbodyinfo");
    handleClose();
  };

  return (
    <S.ModalWrap ref={modalRef}>
      <S.Contents>
        <div>
          <p>안녕하세요.</p>
          <p>{userName}님!</p>
        </div>
        <div>
          <S.Button onClick={handleLogout}>로그아웃</S.Button>
          <S.Button onClick={handleFixProfile}>계정 정보 수정</S.Button>
          <S.Button onClick={handleFixBodyInfo}>신체 정보 수정</S.Button>
        </div>
      </S.Contents>
    </S.ModalWrap>
  );
}

export default NavModal;
