import theme from "./../../../styles/theme";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SmallTextCheckbox } from "./../../../components/";
import { useRecoilState } from "recoil";
import { bodyPartState } from "./../../../recoil/atom";
import { userBodyPartAPI } from "./../../../apis/API";

import { AfterArrowButton } from "./../../../components/Button/AfterArrowButton";

import { BeforeArrowButton } from "./../../../components/Button/BeforeArrowButton";
import {
  RecommendButtonContainer,
  RecommendContainer,
  RecommendTitle,
  TextCheckboxContainer,
} from "./../StyledRecommend";
import { SignupTitle } from "../../Signup/StyledSignup";

const RecommendWorkoutPart = () => {
  const navigate = useNavigate();
  // 운동 부위 객체
  const [selectedBodyPart, setSelectedBodyPart] = useRecoilState(bodyPartState);
  // 운동 부위 배열
  const [isBodyPartSelected, setIsBodyPartSelected] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [isover, setIsOver] = useState(false);

  // 운동부위 요청
  const fetchData = async () => {
    const response = await userBodyPartAPI.get("", {
      // 나중에 토큰 제거
    });
    const newArr = response.data.bodyPartKoreanName.map((obj) => ({
      ...obj,
      isSelected: false,
    }));
    setIsBodyPartSelected(newArr);
  };

  // 최초 렌더링 시 부위 목록 받아옴
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (isover) {
      const timerId = setTimeout(() => {
        setIsOver(false);
      }, 1000);

      // 컴포넌트가 unmount되거나 isActive가 변경될 때 setTimeout을 클리어
      return () => clearTimeout(timerId);
    }
  }, [isover]);

  const handleReady = () => {
    return isBodyPartSelected.filter((bodypart) => bodypart.isSelected).length;
  };

  // 부위 선택
  const handleSelect = (idx) => {
    // 배열 업데이트

    if (handleReady() < 4) {
      const newArr = [...isBodyPartSelected];
      newArr[idx].isSelected = !newArr[idx].isSelected;
      setIsBodyPartSelected(newArr);
      setIsOver(false);
      setIsReady(true);
      if (handleReady() === 0) {
        setIsReady(false);
      }
    } else {
      // 해제
      if (isBodyPartSelected[idx].isSelected) {
        const newArr = [...isBodyPartSelected];
        newArr[idx].isSelected = !newArr[idx].isSelected;
        setIsBodyPartSelected(newArr);
        setIsOver(false);
      }
      // 선택
      else {
        setIsOver(true);
      }
    }
  };

  const handleBackPage = () => {
    navigate(-1);
  };

  const handleNextPage = () => {
    // 전역 객체 업데이트
    if (isReady) {
      const SelectedObj = {
        bodyPartKoreanName: [],
      };
      isBodyPartSelected.forEach((item) => {
        if (item.isSelected) {
          SelectedObj.bodyPartKoreanName.push(item.koreanName);
        }
      });

      setSelectedBodyPart(SelectedObj);
      navigate("/recommend/machine");
    }
  };

  return (
    <RecommendContainer>
      <SignupTitle status="2">
        <div className="statusBar">
          <div className="statusBar2"></div>
        </div>
        <RecommendTitle ftsize="32px" ftcolor="#333D4B" ftweight="700">
          운동할 부위를 선택해주세요
        </RecommendTitle>
        <br />
        <RecommendTitle ftsize="24px" ftcolor={theme.Gray80} ftweight="600">
          운동 부위에 맞는 운동기구를 보여드려요.
        </RecommendTitle>
      </SignupTitle>
      <TextCheckboxContainer>
        {isBodyPartSelected.map((item, index) => {
          return (
            <SmallTextCheckbox
              key={item.koreanName}
              handleClick={handleSelect}
              isSelected={item.isSelected}
              elementidx={index}
            >
              {item.koreanName}
            </SmallTextCheckbox>
          );
        })}
      </TextCheckboxContainer>
      <RecommendButtonContainer isover={isover}>
        <BeforeArrowButton handleClick={handleBackPage} />
        <span className="readyWarning">5개 이상 선택할 수 없습니다</span>
        <AfterArrowButton handleClick={handleNextPage} isReady={isReady}>
          다음
        </AfterArrowButton>
      </RecommendButtonContainer>
    </RecommendContainer>
  );
};

export default RecommendWorkoutPart;
