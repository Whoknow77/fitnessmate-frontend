import React, { useState, useRef } from "react";
import * as S from "./StyledNavModal";
import OutSideClick from "./OutSideClick";
import { useNavigate } from "react-router-dom";
import TokenApi from "../../apis/TokenApi";
import { logoutPutAPI } from "../../apis/API";

function NavModal({ children, userName, setuserName }) {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const modalRef = useRef(null);
  const handleClose = () => {
    setIsOpen(false);
  };
  OutSideClick(modalRef, handleClose);

  // 로그아웃
  const handleLogout = async () => {
    try {
      const res = await logoutPutAPI.get("", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("refreshToken"),
        },
      });
      console.log(res);
      setuserName(null);
      localStorage.clear();
      // 로그아웃하면 홈으로 돌아가도록
      navigate("/");
      // 로그아웃하면서 새로고침을 할 이유가 생기면 주석 풀기
      window.location.reload();
    } catch (err) {
      // 로그아웃이 잘 안됐던 이유가 오류시에도 로컬 스토리지를 없애는 코드를 넣어야 해서였을까?
      localStorage.clear();
      navigate("/");
      // window.location.reload();
      console.log(err);
    }
  };

  const handleFixProfile = async () => {
    navigate("/mypage/fixprofile");
    setIsOpen(false);
  };

  const handleFixBodyInfo = async () => {
    navigate("/mypage/fixbodyinfo");
    setIsOpen(false);
  };

  return (
    <S.AppWrap ref={modalRef}>
      <S.NavButton
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {children}
      </S.NavButton>
      {isOpen && (
        <S.ModalWrap>
          <S.Contents>
            <div>
              <p>안녕하세요.</p>
              <p>{userName}님!</p>
            </div>
            <div className="modalButton">
              <S.Button onClick={handleLogout}>로그아웃</S.Button>
              <S.Button onClick={handleFixProfile}>계정 정보 수정</S.Button>
              <S.Button onClick={handleFixBodyInfo}>신체 정보 수정</S.Button>
            </div>
          </S.Contents>
        </S.ModalWrap>
      )}
    </S.AppWrap>
  );
}

export default NavModal;
