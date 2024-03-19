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
// 루틴 더보기 모달
import OutSideClick from "../../../components/Navbar/OutSideClick";
import pulsImg from "../../../assets/images/routineAdd.svg";
import penIcon from "../../../assets/images/penIcon.svg";
import changeIdx from "../../../assets/images/change_circle.svg";
import deleteIcon from "../../../assets/images/delete.svg";

import ToggleSwitch from "./toggle";
import TokenApi from "../../../apis/TokenApi";
import { userWorkoutAPI } from "../../../apis/API";
import RecommendWorkrateModal from "../../../components/Modal/RecommendWorkrateModal";
import SupplementAddModal from "./Modal/supplementAddModal";
import { flatMap } from "async";

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
  // 루틴 목록
  const [routinesData, setRoutinesData] = useState([]);
  // 루틴 목록 여부
  const [isRoutine, setIsRoutine] = useState(false);
  // 선택된 루틴
  const [btnActive, setBtnActive] = useState("");

  // 기본 상태 세팅
  const fetchData = async () => {
    try {
      // 이름
      const response = await TokenApi.get("user/private");
      setuserName(response.data.userName);
      // 신체 정보
      const response_body = await TokenApi.get("bodyData/recent");
      setBodyFat(response_body.data.bodyFat);
      setMuscleMass(response_body.data.muscleMass);
      // 루틴 목록
      const routinesResponse = await TokenApi.get("/myfit/routines/workout");
      setRoutinesData(routinesResponse);
      console.log(routinesResponse);
      if (routinesData.data.length !== 0) {
        setIsRoutine(true);
        console.log(routinesResponse.data);
        // 가장 첫 번째 루틴 목록을 active 시킴
        setBtnActive(routinesResponse.data[0].routineIndex);
      } else {
        setIsRoutine(false);
      }
    } catch (error) {
      localStorage.clear();
    }
  };

  useEffect(() => {
    fetchData();
  }, [routinesData.data]);

  // 루틴 조작 및 재조회

  const fixRoutines = async (routinesArray) => {
    console.log(isRoutine);
    try {
      // 루틴 조작
      const newRoutines = await TokenApi.post("/myfit/routines/workout", {
        routines: routinesArray,
      });
      console.log(newRoutines);

      // 루틴 목록 재조회
      const routinesResponse = await TokenApi.get("/myfit/routines/workout");
      setRoutinesData(routinesResponse);
      if (routinesData.data.length !== 0) {
        setIsRoutine(true);
        console.log(routinesData);
        console.log(isRoutine);
      } else {
        setIsRoutine(false);
        console.log(isRoutine);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 첫 루틴 만들기

  const firstRoutine = () => {
    const firstRoutines = [
      {
        routineId: -1,
        routineIndex: 0,
        routineName: "첫 번째 루틴",
      },
      {
        routineId: -1,
        routineIndex: 1,
        routineName: "두 번째 루틴",
      },
    ];

    fixRoutines(firstRoutines);
  };

  // 루틴 active 변화시키기

  const onClickChangeBtnActive = (idx) => {
    setBtnActive(idx);
  };

  // 루틴 삭제하기

  const deleteThisRoutine = (item) => {
    // 클릭된 div가 속한 루틴의 정보 추출
    const { routineId } = item;
    console.log(item);

    // 클릭된 루틴의 ID와 다른 루틴들로 새로운 배열 생성
    const newRoutineData = routinesData.data.filter(
      (routine) => routine.routineId !== routineId
    );

    fixRoutines(newRoutineData);

    // 모달 닫히기
    setIsRoutineFixOpen("");
  };

  const howabout = () => {
    console.log(routinesData.data);
    console.log(isRoutine);
  };

  // Routine Modal

  const [isRoutineFixOpen, setIsRoutineFixOpen] = useState("");

  const onClickFixRoutine = (routineId) => {
    setIsRoutineFixOpen(routineId);
  };

  const modalRef = useRef(null);
  const handleClose = () => {
    setIsRoutineFixOpen("");
  };
  OutSideClick(modalRef, handleClose);

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
              <S.RoutinesContainer>
                {isRoutine ? (
                  <div className="lengthRoutineContainer">
                    <button className="addRoutineButton">
                      <img
                        src={addRoutine}
                        alt="루틴 추가 더하기 아이콘"
                        onClick={howabout}
                      />
                    </button>
                    {/* 루틴 목록을 map으로 불러오되, .data 붙여가며 더 들어가지 말고 딱 이 정도에서 혹시 map이 없을 경우만 앞에 작성하여 대비하기 */}
                    {routinesData.data?.map((item) => (
                      <button
                        key={item.routineId} // 모달을 각각 열 수 있도록 각 루틴에 대한 고유한 키 부여
                        name={item.routineName}
                        id={item.routineId}
                        value={item.routineIndex}
                        className={`routineArea ${item.routineIndex === btnActive ? "active" : ""}`}
                        onClick={() =>
                          onClickChangeBtnActive(item.routineIndex)
                        }
                      >
                        <p className="routineName">{item.routineName}</p>
                        {/* 각 루틴별 더보기 이미지 fill 제어를 위해 svg 데리고옴 */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="fixThisRoutine"
                          onClick={() => onClickFixRoutine(item.routineId)} // 루틴 ID 전달
                        >
                          <mask
                            id="mask0_7614_13918"
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="24"
                            height="24"
                          >
                            <rect width="24" height="24" fill="#D9D9D9" />
                          </mask>
                          <g mask="url(#mask0_7614_13918)">
                            <path
                              className="svgFill"
                              d="M11.9978 18.469C11.6388 18.469 11.3333 18.3412 11.0813 18.0856C10.8292 17.8299 10.7031 17.5227 10.7031 17.1637C10.7031 16.8048 10.8309 16.4993 11.0866 16.2472C11.3422 15.9951 11.6495 15.8691 12.0084 15.8691C12.3673 15.8691 12.6729 15.9969 12.925 16.2525C13.177 16.5081 13.3031 16.8154 13.3031 17.1743C13.3031 17.5333 13.1753 17.8388 12.9196 18.0909C12.664 18.343 12.3567 18.469 11.9978 18.469ZM11.9978 13.2998C11.6388 13.2998 11.3333 13.172 11.0813 12.9164C10.8292 12.6607 10.7031 12.3535 10.7031 11.9945C10.7031 11.6356 10.8309 11.33 11.0866 11.078C11.3422 10.8259 11.6495 10.6998 12.0084 10.6998C12.3673 10.6998 12.6729 10.8276 12.925 11.0833C13.177 11.3389 13.3031 11.6462 13.3031 12.0051C13.3031 12.3641 13.1753 12.6696 12.9196 12.9217C12.664 13.1737 12.3567 13.2998 11.9978 13.2998ZM11.9978 8.13057C11.6388 8.13057 11.3333 8.00276 11.0813 7.74714C10.8292 7.49152 10.7031 7.18424 10.7031 6.82529C10.7031 6.46634 10.8309 6.16082 11.0866 5.90874C11.3422 5.65667 11.6495 5.53064 12.0084 5.53064C12.3673 5.53064 12.6729 5.65845 12.925 5.91407C13.177 6.16968 13.3031 6.47696 13.3031 6.83591C13.3031 7.19486 13.1753 7.50037 12.9196 7.75244C12.664 8.00452 12.3567 8.13057 11.9978 8.13057Z"
                              fill="#333D4B"
                            />
                          </g>
                        </svg>
                        {/* 루틴 편집 모달 */}
                        {isRoutineFixOpen === item.routineId && ( // 해당 루틴 ID에 대한 모달 열기
                          <S.RoutineFixModal
                            ref={modalRef}
                            open={isRoutineFixOpen === item.routineId}
                          >
                            <div className="routineFixModalButton">
                              <img
                                className="routineFixModalIcon"
                                src={penIcon}
                                alt="루틴 이름 편집"
                              />
                              <p className="routineFixModalText">
                                이름 편집하기
                              </p>
                            </div>
                            <div className="routineFixModalButton">
                              <img
                                className="routineFixModalIcon"
                                src={changeIdx}
                                alt="루틴 순서 바꾸기"
                              />
                              <p className="routineFixModalText">
                                루틴 순서 바꾸기
                              </p>
                            </div>

                            <div className="routineFixModalLine"></div>

                            <div
                              className="routineFixModalButton"
                              onClick={() => deleteThisRoutine(item)}
                            >
                              <img
                                className="routineFixModalIcon"
                                src={deleteIcon}
                                alt="루틴 삭제하기"
                              />
                              <p className="routineFixModalText">
                                루틴 삭제하기
                              </p>
                            </div>
                          </S.RoutineFixModal>
                        )}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="noneRoutineContainer">
                    <div className="noneRoutineTextArea">
                      <p className="noneRoutineTopText">
                        아직 추가한 루틴이 없어요.
                      </p>
                      <p className="noneRoutineBottomText">
                        나만의 운동 루틴을 만들어보세요!
                      </p>
                    </div>
                    <button
                      className="addFirstRoutineButton"
                      onClick={firstRoutine}
                    >
                      <img
                        className="addFirstRoutineButtonImg"
                        src={pulsImg}
                        alt="루틴 추가"
                      />
                      <p className="addFirstRoutineButtonText">추가하기</p>
                    </button>
                  </div>
                )}
              </S.RoutinesContainer>
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
