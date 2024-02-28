// 내 운동 페이지

import * as S from "./StyledMypageHome";
import "./myToggle.css";
import React, { useState, useEffect, useRef } from "react";
import WorkoutAddModal from "./Modal/workoutAddModal";
import FixModal from "./Modal/FixModal";
import fix from "../../../assets/images/Fix_Icon.svg";
import add from "../../../assets/images/Add_Icon.svg";
import noWorkrate from "../../../assets/images/noWorkrate.svg";
import logo from "../../../assets/images/logo.png";
import dummyCard from "../../../assets/images/Frame 1313.png";
import cardHandler from "../../../assets/images/Frame 912.png";
import addRoutine from "../../../assets/images/add.svg";
import ToggleSwitch from "./toggle";
import TokenApi from "../../../apis/TokenApi";
import { userWorkoutAPI } from "../../../apis/API";
import RecommendWorkrateModal from "../../../components/Modal/RecommendWorkrateModal";
import SupplementAddModal from "./Modal/supplementAddModal";

// 루틴 목록용 더미데이터

export const DUMMY_DATA = [
  {
    id: 0,
    text: "분할 1",
    name: "first",
  },
  {
    id: 1,
    text: "분할 2",
    name: "second",
  },
];

const Mypagehome = () => {
  const [userName, setuserName] = useState(null);
  const [muscleMass, setMuscleMass] = useState(null);
  const [bodyFat, setBodyFat] = useState(null);

  const fetchData = async () => {
    try {
      // 이름
      const response = await TokenApi.get("user/private");
      setuserName(response.data.userName);
      // 신체 정보
      const response_body = await TokenApi.get("bodyData/recent");
      setBodyFat(response_body.data.bodyFat);
      setMuscleMass(response_body.data.muscleMass);
    } catch (error) {
      localStorage.clear();
    }
  };

  useEffect(() => {
    fetchData();
  });

  // Drag & Drop
  const dragItem = useRef(); // 드래그할 아이템의 인덱스
  const dragOverItem = useRef(); // 드랍할 위치의 아이템의 인덱스
  const [list, setList] = useState([
    "시티드 머신 로우",
    "행잉 레그레이즈",
    "머신 풀 오버",
    "케틀벨 로우",
    "힙어브덕션",
    "덤벨 플라이",
  ]);

  // 드래그 시작될 때 실행
  const dragStart = (e, position) => {
    dragItem.current = position;
    console.log(e.target.innerHTML);
  };

  // 드래그중인 대상이 위로 포개졌을 때
  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
  };

  // 드랍 (커서 뗐을 때)
  const drop = (e) => {
    const newList = [...list];
    const dragItemValue = newList[dragItem.current];
    newList.splice(dragItem.current, 1);
    newList.splice(dragOverItem.current, 0, dragItemValue);
    dragItem.current = null;
    dragOverItem.current = null;
    setList(newList);
  };

  return (
    <>
      <S.MypageBackground />
      <S.MypageContainer>
        <div className="MypageHomeArea">
          <S.MypageTopContainer>
            <span className="mypageTitle">루틴 관리</span>
            <div className="mypageTopContent">
              <div className="myInformation">
                <div className="myTopInformation">
                  <p className="myName">{userName}</p>
                  <div className="myWorkout">
                    <span className="myWorkoutInformation">
                      골격근량: {muscleMass}, 체지방량: {bodyFat}
                    </span>
                    <div className="line"></div>
                    <span className="myWorkoutInformation">분할 루틴중</span>
                  </div>
                </div>
              </div>
              <button className="addRoutineButton">
                <img src={addRoutine} alt="루틴 추가 더하기 아이콘" />
              </button>
            </div>
          </S.MypageTopContainer>
          <S.MypageMiddleContainer>
            {list &&
              list.map((item, idx) => (
                <div
                  className="workoutCard"
                  key={idx}
                  onDragStart={(e) => dragStart(e, idx)}
                  onDragEnter={(e) => dragEnter(e, idx)}
                  onDragEnd={drop}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <div className="workoutNum">
                    <div className="numCircle">{idx + 1}</div>
                    <div className="line"></div>
                  </div>
                  <div className="workoutCardContent" draggable>
                    <p className="workoutName">{item}</p>
                  </div>
                  <img
                    className="cardHandler"
                    src={cardHandler}
                    alt="운동 움직일 핸들링 버튼"
                    key={idx}
                    draggable
                  />
                </div>
              ))}
          </S.MypageMiddleContainer>
        </div>
      </S.MypageContainer>
      <S.Footer>
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
                <div class="div-wrapper">
                  <div class="text-wrapper-4">전화</div>
                </div>
                <div class="div-wrapper">
                  <div class="text-wrapper-2">010-8544-1013</div>
                </div>
              </div>
              <div class="div-4">
                <div class="div-wrapper">
                  <div class="text-wrapper-5">이메일</div>
                </div>
                <div class="div-wrapper">
                  <div class="text-wrapper-2">jeuk1013@naver.com</div>
                </div>
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
            <img className="footerLogo" src={logo} alt="핏메이트 로고" />
          </div>
        </div>
      </S.Footer>
    </>
  );
};

export default Mypagehome;
