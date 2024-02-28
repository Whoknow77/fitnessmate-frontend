/* eslint-disable jsx-a11y/iframe-has-title */
import * as S from "./../StyledRecommend";
import theme from "./../../../styles/theme";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { RecommendState, CheckedMachineList } from "../../../recoil/atom";
import TokenApi from "../../../apis/TokenApi";
import { userWorkoutAPI } from "../../../apis/API";
import bodypartcircle from "../../../assets/images/bodypartcircle.svg";
import starImg from "../../../assets/images/mdi_stars.svg";
import RecommendAddModal from "../../../components/Modal/RecommendAddModal";

const RecommendMachineResult = () => {
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
    } catch (error) {
      localStorage.clear();
    }
  };
  useEffect(() => {
    fetchData();
    console.log(recommendState);
  }, [currentIdx]);
  return (
    <S.RecommendMachineResultContainer>
      <div className="RecommendMachineResultArea">
        <S.RecommendTitleContainer>
          <img className="starImg" src={starImg} alt="별모양 이모지" />
          <div className="recommendTitleArea">
            <span className="recommendTitle">{userName}님에게 맞는</span>
            <span className="recommendTitle">
              <p className={`recommendTitle ${"workoutNum"}`}>
                {recommendStateNum}가지 운동
              </p>
              을 추천했어요.
            </span>
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
        <S.RecommendMain>
          <S.RecommendMainTopWrapper showShadow={showShadow}>
            <S.RecommendMainTopTitleWrapper>
              <div className="recommendNavbarWrapper">
                {recommendState.recommends.map((machine, idx) => {
                  return (
                    <S.RecommendNavbarItem
                      isSelected={currentIdx === idx}
                      onClick={() => handlecMachineClick(idx)}
                    >
                      {machine.koreanName}
                    </S.RecommendNavbarItem>
                  );
                })}
              </div>
              <S.RecommendMainBodyPart>
                {recommendState.recommends[currentIdx].bodyPartKoreanName.map(
                  (bodypart, idx) => {
                    if (
                      idx !==
                      recommendState.recommends[currentIdx].bodyPartKoreanName
                        .length -
                        1
                    ) {
                      return (
                        <>
                          <span className="recommendbodyPart">{bodypart}</span>
                          <img
                            src={bodypartcircle}
                            alt="운동 부위 구분 이미지"
                          />
                        </>
                      );
                    } else {
                      return (
                        <span className="recommendbodyPart">{bodypart}</span>
                      );
                    }
                  }
                )}
              </S.RecommendMainBodyPart>
              <S.RecommendMainMachine>
                {recommendState.recommends[currentIdx].koreanName}
              </S.RecommendMainMachine>
            </S.RecommendMainTopTitleWrapper>
            <S.RecommendMainBtn
              onClick={() => {
                setRecommendAddModal(true);
              }}
            >
              내 운동에 추가
            </S.RecommendMainBtn>
          </S.RecommendMainTopWrapper>
          <img
            src={recommendState.recommends[currentIdx].imgPath}
            className="fitnessImg"
            alt="운동종류 이미지"
          ></img>
          <S.RecommendAmountWrapper>
            <span className="amountTitle">추천 운동량</span>
            <div className="amountContent">
              <div className="amountBox">
                <span className="amountText1">중량</span>
                <span className="amountText2">
                  {recommendState.recommends[currentIdx].weight}
                </span>
              </div>
              <div className="amountBox">
                <span className="amountText1">횟수</span>
                <span className="amountText2">
                  {recommendState.recommends[currentIdx].repeat}회
                </span>
              </div>
              <div className="amountBox">
                <span className="amountText1">세트 수</span>
                <span className="amountText2">
                  {recommendState.recommends[currentIdx].set}세트
                </span>
              </div>
            </div>
          </S.RecommendAmountWrapper>
          <S.RecommendDescriptionWrapper>
            <span className="descriptionTitle">운동 설명</span>
            <span className="description">
              {recommendState.recommends[currentIdx].description}
            </span>
          </S.RecommendDescriptionWrapper>
          <S.RecommendVideoWrapper>
            <span className="recommendVideoTitle">운동 영상</span>
            <iframe src={videoLink} className="recommendVideo" />
          </S.RecommendVideoWrapper>
        </S.RecommendMain>
      </div>

      {recommendAddModal && (
        <RecommendAddModal
          setRecommendAddModal={setRecommendAddModal}
          machine={recommendState.recommends[currentIdx]}
        />
      )}
    </S.RecommendMachineResultContainer>
  );
};

export default RecommendMachineResult;
