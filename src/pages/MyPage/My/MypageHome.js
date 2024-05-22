// 내 운동 페이지

import * as S from "./StyledMypageHome";
import "./myToggle.css";
import theme from "./../../../styles/theme";
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
import itemMore from "../../../assets/images/Frame820.svg";
import videoArrow from "../../../assets/images/videoArrow.svg";

import ToggleSwitch from "./toggle";
import TokenApi from "../../../apis/TokenApi";
import { userWorkoutAPI } from "../../../apis/API";
import RecommendWorkrateModal from "../../../components/Modal/RecommendWorkrateModal";
import SupplementAddModal from "./Modal/supplementAddModal";
import { flatMap } from "async";
// Drag & Drop
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
  const [btnActive, setBtnActive] = useState();
  // 선택된 루틴에 속한 운동
  const [routineWorkout, setRoutineWorkout] = useState([]);
  // drag & drop 을 위한 운동 리스트 복사본
  const [itemList, setItemList] = useState([]);
  // 운동 설명 비디오
  const [videoLink, setVideoLink] = useState(null);

  // 내 보조제
  const [mySupplements, setMySupplements] = useState([]);

  // 기본 상태 세팅

  const fetchData = async () => {
    // 내 운동 페이지 들어갈 때마다 로그아웃 되었던 이유
    // 지성님께서 로컬 스토리지 값이 내 운동 페이지 들어갈 때마다 사라진다고 하셨음.
    // localStorage.clear();
    try {
      // 이름
      const response = await TokenApi.get("user/private");
      setuserName(response.data.userName);
      // 신체 정보
      const response_body = await TokenApi.get("bodyData/recent");
      setBodyFat(response_body.data.bodyFat);
      setMuscleMass(response_body.data.muscleMass);
      // 루틴 목록
      const routinesResponse = await TokenApi.get("myfit/routines/workout");
      setRoutinesData(routinesResponse);
      if (routinesData.data.length !== 0) {
        setIsRoutine(true);
        // 가장 첫 번째 루틴 목록을 active 시킴
        setBtnActive(routinesResponse.data[0].routineIndex);
        // 루틴에 속한 운동 리스트 조회
        const routinesWorkoutResult = await TokenApi.get(
          `myfit/routines/workout/${routinesResponse.data[0].routineId}`
        );
        setItemList(routinesWorkoutResult.data);
        setRoutineWorkout(routinesWorkoutResult.data);

        // 내 보조제 리스트 조회
        const mySupplement = await TokenApi.get("/myfit/routines/supplement");
        setMySupplements(mySupplement);
        console.log(mySupplement.data.supplements.length);
        console.log(mySupplement);
      } else {
        setIsRoutine(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [routinesData.length]);

  const getSupplement = async (routinesArray) => {
    const mySupplement = await TokenApi.get("/myfit/routines/supplement");
    setMySupplements(mySupplement);
  };

  useEffect(() => {
    getSupplement();
  }, [mySupplements.length]);

  // 첫 루틴 만들기

  const fixRoutines = async (routinesArray) => {
    try {
      const newRoutines = await TokenApi.post("myfit/routines/workout", {
        routines: routinesArray,
      });
      console.log("이거", newRoutines);

      setRoutinesData(routinesArray);
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
        routineName: "가슴 집중 DAY",
      },
      {
        routineId: -1,
        routineIndex: 1,
        routineName: " 집중 DAY",
      },
      {
        routineId: -1,
        routineIndex: 2,
        routineName: "어깨 집중 DAY",
      },
      {
        routineId: -1,
        routineIndex: 3,
        routineName: "하체 집중 DAY",
      },
    ];

    fixRoutines(firstRoutines);
  };

  // 새로운 루틴 만들기
  const addNewRoutine = async () => {
    // routinesData.data에서 가장 큰 routineIndex 찾기
    const maxRoutineIndex = Math.max(
      ...routinesData.data.map((item) => item.routineIndex)
    );

    // 기존 루틴 데이터와 새로운 루틴 데이터를 하나의 배열로 결합
    const routinesForServer = [
      ...routinesData.data.map((item) => ({
        routineId: item.routineId,
        routineIndex: item.routineIndex,
        routineName: item.routineName,
      })),
      {
        routineId: -1,
        routineIndex: maxRoutineIndex + 1,
        routineName: "새로운 루틴",
      },
    ];

    console.log(routinesData);
    fixRoutines(routinesForServer);
  };

  // 루틴 active 변화시키기

  const onClickChangeBtnActive = async (idx) => {
    setBtnActive(idx);
  };

  const changeWorkout = async () => {
    try {
      const routinesWorkoutResult = await TokenApi.get(
        `myfit/routines/workout/${routinesData.data[btnActive].routineId}`
      );
      setRoutineWorkout(routinesWorkoutResult.data);
      setItemList(routinesWorkoutResult.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    changeWorkout();
  }, [btnActive]);

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

  // 루틴 수정하기

  // 루틴 수정 여부
  const [isRoutineFix, setIsRoutineFix] = useState(false);
  // 특정 루틴 수정
  const [activeItemId, setActiveItemId] = useState(null);

  // isClicked를 통해 검색창 클릭 여부에 따라 스타일 다르게 함
  const [isClicked, setIsClicked] = useState(false);

  const [searchvalue, setSearchValue] = useState("루틴 이름");

  const inputRef = useRef(null); // ref 생성
  const inputButtonRef = useRef(null); // ref 생성
  const handleCloseInput = () => {
    setIsRoutineFix(false);
  };
  OutSideClick(inputButtonRef, handleCloseInput);

  const fixThisRoutineName = (e) => {
    setActiveItemId(e.routineId);
    // 클릭된 div가 속한 루틴의 정보 추출
    const { routineName } = e;
    setSearchValue(routineName);

    // input으로 변경
    setIsRoutineFix(true);

    // 모달 닫히기
    setIsRoutineFixOpen("");
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    // isRoutineFix가 true이고, input 요소가 존재하며, isClicked가 true일 때 포커스를 설정합니다.
    if (isRoutineFix && inputRef.current && isClicked) {
      inputRef.current.focus();
    }
  }, [isRoutineFix, isClicked]);

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      const updatedRoutinesData = routinesData.data.map((item) => {
        if (item.routineId === activeItemId) {
          item.routineName = searchvalue;
        }
        return item;
      });
      fixRoutines(updatedRoutinesData);
      // 모달 닫히기
      setIsRoutineFix(false);
    }
  };

  // Routine Modal

  const [isRoutineFixOpen, setIsRoutineFixOpen] = useState("");

  const onClickFixRoutine = async (routineId) => {
    setIsRoutineFixOpen(routineId);
  };

  const modalRef = useRef(null);
  const handleClose = () => {
    setIsRoutineFixOpen("");
  };
  OutSideClick(modalRef, handleClose);

  // Drag & Drop

  // 2. 여기서 순서를 바꿀 때, 그냥 routineWorkout을 가져왔더니 아래 map의 순서를 유지하려고 해서
  // itemList라는 배열 복사본을 만들어서 실제 사용자가 하는 동안에
  const handleDrop = async (droppedItem) => {
    console.log(droppedItem);
    // Ignore drop outside droppable container
    if (!droppedItem.destination) return;
    var updatedList = [...itemList];
    // Remove dragged item
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    // Add dropped item
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);

    console.log(updatedList);

    const workout = {
      myWorkoutIndex: droppedItem.destination.index + 1,
      weight: updatedList[droppedItem.destination.index].weight,
      rep: updatedList[droppedItem.destination.index].rep,
      setCount: updatedList[droppedItem.destination.index].setCount,
    };

    // 3. 여기서 바뀐 배열을
    try {
      const newRoutines = await TokenApi.post(
        `myfit/routines/workout/update/${updatedList[droppedItem.destination.index].myWorkoutId}`,
        workout
      );
      console.log("이거", newRoutines);
    } catch (error) {
      console.error(error);
    }

    // Update State
    setItemList(updatedList);
  };

  const deleteWorkout = async () => {
    console.log(routineWorkout);
    console.log(itemList);
  };

  const newRoutineWorkout = async () => {
    try {
      const routinesWorkoutResult = await TokenApi.get(
        `myfit/routines/workout/${routinesData.data[btnActive].routineId}`
      );
      setRoutineWorkout(routinesWorkoutResult.data);
    } catch (error) {
      console.error(error);
    }
  };

  // 카드 자세히 보기 상태 배열 : 카드 각각의 열림 상태를 관리하기 위해 배열로
  const [isOpenArray, setIsOpenArray] = useState(
    new Array(itemList.length).fill(false)
  );

  // 카드 자세히 보기 상태 변경
  const handleInformationOpenClick = async (idx) => {
    // 해당 카드의 isOpen 상태를 토글
    const updatedIsOpenArray = [...isOpenArray];
    updatedIsOpenArray[idx] = !updatedIsOpenArray[idx];
    setIsOpenArray(updatedIsOpenArray);

    // 운동 설명 비디오 링크 가져오기
    const response = await userWorkoutAPI.get(`${itemList[idx].workoutId}`);
    const videoId = response.data.videoLink.split("=")[1];
    setVideoLink(`https://www.youtube.com/embed/${videoId}`);
  };

  useEffect(() => {
    newRoutineWorkout();
  }, [itemList]);

  // console.log(workout);

  return (
    <>
      <S.MypageBackground />
      <S.MypageContainer>
        <div className="MypageHomeArea">
          <S.MypageTopContainer>
            <span className="mypageTitle" onClick={deleteWorkout}>
              내 루틴
            </span>
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
                        onClick={addNewRoutine}
                      />
                    </button>
                    {/* 루틴 목록을 map으로 불러오되, .data 붙여가며 더 들어가지 말고 딱 이 정도에서 혹시 map이 없을 경우만 앞에 작성하여 대비하기 */}
                    {routinesData.data?.map((item) => (
                      <button
                        ref={inputButtonRef}
                        key={item.routineId} // 모달을 각각 열 수 있도록 각 루틴에 대한 고유한 키 부여
                        name={item.routineName}
                        id={item.routineId}
                        value={item.routineIndex}
                        className={`routineArea ${item.routineIndex === btnActive ? "active" : ""}`}
                        onClick={() =>
                          onClickChangeBtnActive(item.routineIndex)
                        }
                      >
                        {isRoutineFix && activeItemId === item.routineId ? (
                          <S.inputContent
                            ref={inputRef} // ref를 입력 창에 연결
                            className="routineName"
                            value={searchvalue}
                            isClicked={isClicked}
                            onChange={handleChange}
                            onKeyDown={handleEnter}
                            onFocus={() => {
                              setIsClicked(true);
                            }}
                            onBlur={() => {
                              setIsClicked(false);
                            }}
                            autoFocus
                          />
                        ) : (
                          <p className="routineName">{item.routineName}</p>
                        )}
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
                              fill={theme.Neutral900}
                            />
                          </g>
                        </svg>
                        {/* 루틴 편집 모달 */}
                        {isRoutineFixOpen === item.routineId && ( // 해당 루틴 ID에 대한 모달 열기
                          <S.RoutineFixModal
                            ref={modalRef}
                            open={isRoutineFixOpen === item.routineId}
                          >
                            <div
                              className="routineFixModalButton"
                              onClick={() => fixThisRoutineName(item)}
                            >
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
            <DragDropContext onDragEnd={handleDrop}>
              <Droppable droppableId="list-container">
                {(provided) => (
                  <div
                    className="list-container"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <div className="item-container">
                      <div className="numArea2">
                        {itemList?.map((item, index) => (
                          <Draggable
                            key={item}
                            // 1. 문자열만 가능해서 이렇게 해주되, 식별하기 위함이라 myWorkoutId 등을 사용하려 했으나
                            // 그럼 순서가 바뀌어도 각 요소가 가진 숫자가 그대로인데, dnd는 오름차순이어야만 함. 때문에 index로 설정
                            draggableId={`${index}`}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                className="workoutCard"
                                ref={provided.innerRef}
                                {...provided.dragHandleProps}
                                {...provided.draggableProps}
                                isOpenArray={isOpenArray[index]}
                              >
                                <div
                                  className={`workoutNum ${index === itemList.length - 1 ? "last-item" : ""}`}
                                  key={index}
                                  isOpenArray={isOpenArray[index]}
                                >
                                  <div className="numCircle">{index + 1}</div>
                                  <div className="line"></div>
                                </div>
                                <div
                                  className="recommendCard"
                                  isOpenArray={isOpenArray[index]}
                                  draggable
                                >
                                  <div className="recommendCardContent">
                                    <S.RecommendMainTopWrapper
                                      isOpenArray={isOpenArray[index]}
                                    >
                                      <S.RecommendMainTopLeftWrapper>
                                        <S.RecommendMainWorkout>
                                          {item.workoutName}
                                        </S.RecommendMainWorkout>
                                        <S.RecommendMainBodyPart>
                                          {item.bodyParts.map(
                                            (bodyPart, index) => (
                                              <p
                                                className="item_BodyPart"
                                                key={index}
                                              >
                                                {index ===
                                                item.bodyParts?.length - 1
                                                  ? bodyPart
                                                  : `${bodyPart}, `}
                                              </p>
                                            )
                                          )}
                                        </S.RecommendMainBodyPart>
                                      </S.RecommendMainTopLeftWrapper>
                                      <S.RecommendMainTopRightWrapper>
                                        <div className="amountContent">
                                          <div className="amountItem">
                                            <p className="amountTitle">중량</p>
                                            <span className="amountText">
                                              {item.weight === null
                                                ? 0
                                                : item.weight}
                                              <p className="amountUnit">kg</p>
                                            </span>
                                          </div>
                                          <div className="amountItem">
                                            <p className="amountTitle">횟수</p>
                                            <span className="amountText">
                                              {item.rep === null ? 0 : item.rep}
                                              <p className="amountUnit">회</p>
                                            </span>
                                          </div>
                                          <div className="amountItem">
                                            <p className="amountTitle">
                                              세트 수
                                            </p>
                                            <span className="amountText">
                                              {item.setCount === null
                                                ? 0
                                                : item.setCount}
                                              <p className="amountUnit">세트</p>
                                            </span>
                                          </div>
                                        </div>
                                        <div
                                          className="recommendMainBtn"
                                          onClick={() => {}}
                                        >
                                          <img
                                            className="recommendMainBtnImg"
                                            src={itemMore}
                                            alt="내 운동 더보기"
                                          />
                                        </div>
                                      </S.RecommendMainTopRightWrapper>
                                    </S.RecommendMainTopWrapper>
                                    <S.RecommendMainMiddleWrapper
                                      isOpenArray={isOpenArray[index]}
                                    >
                                      <div className="recommendMainContent">
                                        <S.RecommendDescriptionWrapper>
                                          {item.description}
                                        </S.RecommendDescriptionWrapper>
                                        <S.RecommendVideoWrapper>
                                          <img
                                            src={item.imgPath}
                                            className="fitnessImg"
                                            alt="운동종류 이미지"
                                          ></img>
                                          <div
                                            className="goTopRecommendVideo"
                                            onClick={() => {
                                              window.open(videoLink);
                                            }}
                                          >
                                            <img
                                              src={videoArrow}
                                              className="videoArrow"
                                              alt="영상 재생 화살표 아이콘"
                                            ></img>
                                          </div>
                                        </S.RecommendVideoWrapper>
                                      </div>
                                    </S.RecommendMainMiddleWrapper>
                                  </div>

                                  <S.RecommendMoreButton
                                    isOpenArray={isOpenArray[index]}
                                    onClick={() =>
                                      handleInformationOpenClick(index)
                                    }
                                  >
                                    {isOpenArray[index] ? (
                                      <p className="informationText">접기</p>
                                    ) : (
                                      <p className="informationText">
                                        자세히 보기
                                      </p>
                                    )}
                                  </S.RecommendMoreButton>
                                  <img
                                    className="cardHandler"
                                    src={cardHandler}
                                    alt="운동 움직일 핸들링 버튼"
                                    key={index}
                                    draggable
                                  />
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    </div>
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </S.MypageMiddleContainer>
        </div>
        {mySupplements?.data?.supplements?.length > 0 && (
          <div className="SupplementArea">
            <p className="supplementTitle">내 보조제</p>
            {mySupplements?.data?.supplements?.map((item, index) => (
              <div className="supplementItem" key={item.mySupplementId}>
                <img
                  src={item.imageURL}
                  className="supplementImg"
                  alt="보조제 이미지"
                />
                <div className="supplementContent">
                  <span className="item_workoutName">
                    {item.supplementName.replace(/\s*\([^)]*\)/g, "")}
                  </span>
                  <p className="item_flavor-source">{item.flavor}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </S.MypageContainer>
    </>
  );
};

export default Mypagehome;
