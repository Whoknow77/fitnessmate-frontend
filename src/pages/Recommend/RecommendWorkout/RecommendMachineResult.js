/* eslint-disable jsx-a11y/iframe-has-title */
import * as S from "./../StyledRecommend";
import theme from "./../../../styles/theme";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { RecommendState } from "../../../recoil/atom";
import TokenApi from "../../../apis/TokenApi";
import { userWorkoutAPI } from "../../../apis/API";
import YouTube from "react-youtube";
import bodypartcircle from "../../../assets/images/bodypartcircle.svg";
import RecommendAddModal from "../../../components/Modal/RecommendAddModal";

const RecommendMachineResult = () => {
  const [recommendState, setRecommendState] = useRecoilState(RecommendState);
  const [userName, setuserName] = useState(null);
  const [bodyPart, setBodyPart] = useState([]);
  const [machineList, setMachineList] = useState([]);
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
      if (window.scrollY >= 260) {
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
      console.log(response2);
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
  }, [currentIdx]);
  return (
    <S.RecommendMachineResultContainer>
      <S.RecommendTitleContainer>
        <S.RecommendTitle ftsize="32px" ftcolor={theme.Black} ftweight="700">
          {userName}님의 운동 추천결과
          <br />
          <S.RecommendTitle ftsize="24px" ftcolor={theme.Gray80}>
            {userName}님의 신체 정보를 모두 고려했어요.
          </S.RecommendTitle>
        </S.RecommendTitle>
      </S.RecommendTitleContainer>
      <div className="recommendNavbarWrapper">
        <span className="recommendNavbarTitle">운동 부위</span>
        <div className="recommendNavbarBox">
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
      </div>
      <S.RecommendMain>
        <S.RecommendMainTopWrapper showShadow={showShadow}>
          <S.RecommendMainTopTitleWrapper>
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
                        <img src={bodypartcircle} alt="운동 부위 구분 이미지" />
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
