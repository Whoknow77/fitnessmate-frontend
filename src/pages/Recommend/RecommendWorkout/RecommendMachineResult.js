/* eslint-disable jsx-a11y/iframe-has-title */
import * as S from "./../StyledRecommend";
import theme from "./../../../styles/theme";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { RecommendState, CheckedMachineList } from "../../../recoil/atom";
import TokenApi from "../../../apis/TokenApi";
import { userWorkoutAPI } from "../../../apis/API";
import bodypartcircle from "../../../assets/images/bodypartcircle.svg";
import starImg from "../../../assets/images/mdi_stars.svg";
import pulsImg from "../../../assets/images/routineAdd.svg";
import goToHomeImg from "../../../assets/images/Frame 1121.svg";
import videoArrow from "../../../assets/images/videoArrow.svg";
import RecommendAddModal from "../../../components/Modal/RecommendAddModal";

const RecommendMachineResult = () => {
  const navigate = useNavigate();

  const [recommendState, setRecommendState] = useRecoilState(RecommendState);
  const [machineList, setMachineList] = useRecoilState(CheckedMachineList);
  const [recommendStateNum, setRecommendStateNum] = useState(0);
  const [userName, setuserName] = useState(null);
  const [bodyPart, setBodyPart] = useState([]);
  const [videoLink, setVideoLink] = useState(null);
  const [currentIdx, setCureentIdx] = useState(0);
  const [recommendAddModal, setRecommendAddModal] = useState(false);

  const handlecMachineClick = (idx) => {
    setCureentIdx(idx);
  };

  const [showShadow, setShowShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 스크롤 위치가 첫 번째 내비게이션바 높이만큼 이동했는지 확인
      if (window.scrollY >= 230) {
        setShowShadow(true);
      } else {
        setShowShadow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 루틴 목록
  // const [routinesData, setRoutinesData] = useState({ data: [] });

  const fetchData = async () => {
    try {
      const response = await TokenApi.get("user/private");
      const response2 = await userWorkoutAPI.get(
        `${recommendState.recommends[currentIdx].workoutId}`
      );
      setRecommendStateNum(recommendState.recommends.length);
      const videoId = response2.data.videoLink.split("=")[1];
      setVideoLink(`https://www.youtube.com/embed/${videoId}`);

      setuserName(response.data.userName);
      setBodyPart(recommendState.requestedBodyParts);

      // 루틴 안에 속해 있는지 확인하기 위해
      // const routinesResponse = await TokenApi.get("/myfit/routines/workout");
      // if (routinesResponse.data && routinesResponse.data.length > 0) {
      //   console.log(routinesResponse);
      // }
    } catch (error) {
      localStorage.clear();
    }
  };

  const goHome = () => {
    navigate("/");
  };

  // 카드 자세히 보기 상태 배열 : 카드 각각의 열림 상태를 관리하기 위해 배열로
  const [isOpenArray, setIsOpenArray] = useState(
    new Array(recommendState.recommends.length).fill(false)
  );

  // 카드 자세히 보기 상태 변경
  const handleInformationOpenClick = (idx) => {
    // 해당 카드의 isOpen 상태를 토글
    const updatedIsOpenArray = [...isOpenArray];
    updatedIsOpenArray[idx] = !updatedIsOpenArray[idx];
    setIsOpenArray(updatedIsOpenArray);
  };

  useEffect(() => {
    fetchData();
    console.log(recommendState);
  }, [currentIdx]);
  return (
    <>
      <S.RecommendResultBackground />
      <S.RecommendMachineResultContainer>
        <div className="RecommendMachineResultArea">
          <S.RecommendTitleContainer>
            <img className="starImg" src={starImg} alt="별모양 이모지" />
            <div className="recommendTopArea">
              <div className="recommendTitleArea">
                <span className="recommendTitle">{userName}님에게 맞는</span>
                <span className="recommendTitle">
                  <p className={`recommendTitle ${"workoutNum"}`}>
                    {recommendStateNum}가지 운동
                  </p>
                  을 추천했어요.
                </span>
              </div>
              <button className="goToHome" onClick={() => goHome()}>
                <p className="goToHomeText">홈으로</p>
                <img
                  className="goToHomeImg"
                  src={goToHomeImg}
                  alt="오른쪽 방향 화살표"
                />
              </button>
            </div>
            <div className="recommendKeywordArea">
              <p className="recommendKeywordTitle">적용된 추천 키워드</p>
              <div className="recommendKeywordContainer">
                <div className="recommendKeyword">운동 추천</div>
                {bodyPart.map((part, index) => {
                  return (
                    <div key={index} className="recommendKeyword">
                      {part}
                    </div>
                  );
                })}
                <div className="recommendKeyword">
                  {machineList}가지의 운동 기구
                </div>
              </div>
            </div>
          </S.RecommendTitleContainer>
          <S.RecommendCardContainer>
            {recommendState.recommends.map((workout, idx) => {
              return (
                <div className="recommendCard" key={idx}>
                  <div className="recommendCardContent">
                    <S.RecommendMainTopWrapper>
                      <S.RecommendMainTopLeftWrapper>
                        <S.RecommendMainWorkout>
                          {workout.koreanName}
                        </S.RecommendMainWorkout>
                        <S.RecommendMainBodyPart>
                          {workout.bodyPartKoreanName.map((bodypart, idx) => {
                            if (idx !== workout.bodyPartKoreanName.length - 1) {
                              return (
                                <span className="recommendbodyPart">
                                  {bodypart},&nbsp;
                                </span>
                              );
                            } else {
                              return (
                                <span className="recommendbodyPart">
                                  {bodypart}
                                </span>
                              );
                            }
                          })}
                        </S.RecommendMainBodyPart>
                      </S.RecommendMainTopLeftWrapper>
                      <S.RecommendMainTopRightWrapper>
                        <div className="alreadyRoutine">
                          개 루틴에 이미 추가됨
                        </div>
                        <div
                          className="recommendMainBtn"
                          onClick={() => {
                            setRecommendAddModal(true);
                          }}
                        >
                          <img
                            className="recommendMainBtnImg"
                            src={pulsImg}
                            alt="더하기 아이콘"
                          />
                          <p className="recommendMainBtnText">루틴에 추가</p>
                        </div>
                      </S.RecommendMainTopRightWrapper>
                    </S.RecommendMainTopWrapper>
                    <S.RecommendMainMiddleWrapper
                      isOpenArray={isOpenArray[idx]}
                    >
                      <div className="recommendMainContent">
                        <S.RecommendVideoWrapper>
                          <img
                            src={workout.imgPath}
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
                        <S.RecommendDescriptionWrapper>
                          {workout.description}
                        </S.RecommendDescriptionWrapper>
                      </div>
                      <S.RecommendAmountWrapper>
                        <div className="recommendAmountContainer">
                          <div className="amountTitleArea">
                            <img
                              className="starImg"
                              src={starImg}
                              alt="별모양 이모지"
                            />
                            <span className="amountTitle">AI 추천 운동량</span>
                          </div>
                          <div className="amountContent">
                            <span className="amountText">
                              {workout.weight}kg
                            </span>
                            <span className="amountText">
                              {workout.set}세트
                            </span>
                            <span className="amountText">
                              {workout.repeat}회
                            </span>
                          </div>
                        </div>
                      </S.RecommendAmountWrapper>
                    </S.RecommendMainMiddleWrapper>
                  </div>

                  <S.RecommendMoreButton
                    isOpenArray={isOpenArray[idx]}
                    onClick={() => handleInformationOpenClick(idx)}
                  >
                    {isOpenArray[idx] ? (
                      <p className="informationText">접기</p>
                    ) : (
                      <p className="informationText">자세히 보기</p>
                    )}
                  </S.RecommendMoreButton>
                </div>
              );
            })}
          </S.RecommendCardContainer>
        </div>

        {recommendAddModal && (
          <RecommendAddModal
            setRecommendAddModal={setRecommendAddModal}
            machine={recommendState.recommends[currentIdx]}
          />
        )}
      </S.RecommendMachineResultContainer>
    </>
  );
};

export default RecommendMachineResult;
