import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { userWorkoutAPI } from "../../../../apis/API";
import * as S from "./StyledSearchWorkoutDetail";
import beforebtn from "../../../../assets/images/SmallBefore.svg";
import AddWorkoutModal from "./AddWorkoutModal";

const SearchWorkoutDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { workoutId } = location.state;
  const [workoutDetail, setWorkoutDetail] = useState(null);
  const [addWorkoutModal, setAddWorkoutModal] = useState(false);

  const [bodyPart, setbodyPart] = useState([]);
  const [workoutName, setWorkoutName] = useState("");
  const [imgPath, setImgPath] = useState("");
  const [description, setDescription] = useState("");

  const [videoSrc, setVideoSrc] = useState("");
  let videoId = videoSrc.split("=")[1];
  const videoLink = `https://www.youtube.com/embed/${videoId}`;

  useEffect(() => {
    // 페이지가 로드될 때 호출
    const fetchWorkoutDetail = async () => {
      try {
        const response = await userWorkoutAPI.get(`/${workoutId}`);
        setWorkoutDetail(response.data);
        console.log(response);
        setbodyPart(response.data.bodyPartKoreanName);
        setWorkoutName(response.data.koreanName);
        setImgPath(response.data.imgPath);
        setDescription(response.data.description);
        setVideoSrc(response.data.videoLink);
      } catch (error) {
        console.error("Error workout detail:", error);
      }
    };

    fetchWorkoutDetail();
  }, [workoutId]);

  const handleBackPage = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <S.SearchWorkoutContainer>
      <S.BeforeButton onClick={handleBackPage}>
        <img src={beforebtn} alt="이전 버튼" className="backBtnImg" />
        <span className="backBtnText">이전</span>
      </S.BeforeButton>
      <S.TopContainer>
        <S.TopLeft>
          <S.WorkoutName>{workoutName}</S.WorkoutName>
        </S.TopLeft>
        <button
          onClick={() => {
            setAddWorkoutModal(true);
          }}
        >
          내 운동에 추가
        </button>
      </S.TopContainer>
      <S.MiddleContainer>
        <img src={imgPath} alt={`${workoutName} 운동 이미지`} />
        <S.InformationContainer>
          <div className="TopInformation">
            <span>운동 설명</span>
            <p className="description">{description}</p>
          </div>
          <div className="TopInformation">
            <S.BodyPartContainer>
              <span>운동 부위</span>
              {bodyPart.map((partName) => (
                <div>
                  <p>{partName}</p>
                </div>
              ))}
            </S.BodyPartContainer>
          </div>
        </S.InformationContainer>
      </S.MiddleContainer>
      <iframe src={videoLink} title={workoutName} />
      {addWorkoutModal && (
        <AddWorkoutModal
          setRecommendAddModal={setAddWorkoutModal}
          workoutId={workoutId}
          workoutName={workoutName}
        />
      )}
    </S.SearchWorkoutContainer>
  );
};

export default SearchWorkoutDetail;
