import { useNavigate } from "react-router-dom";
import { SmallButton } from "../../../components/";
import theme from "../../../styles/theme";
import {
  RecommendButtonContainer,
  RecommendContainer,
  RecommendImgContainer,
  RecommendTitle,
} from "../StyledRecommend";
import { ImgCheckbox } from "../../../components";
import { useState } from "react";
import { SignupTitle } from "../../Signup/StyledSignup";
import { BeforeArrowButton } from "./../../../components/Button/BeforeArrowButton";
import { AfterArrowButton } from "./../../../components/Button/AfterArrowButton";

// 버튼과 이미지의 간격을 어떻게 줄지 고민해 봐야함.
const RecommendCategory = () => {
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);

  const [category, setCategory] = useState({
    운동: [false, "fitness"],
    보조제: [false, "protein"],
  });

  const goNextPage = () => {
    if (category.보조제[0]) {
      navigate("/recommend/supplementpurpose");
    } else if (category.운동[0]) {
      navigate("/recommend/workout");
    }
  };

  const goBeforePage = () => {
    navigate(-1);
  };

  // 카테고리 선택
  const handleSelect = (idx) => {
    const entries = Object.entries(category);
    const updatedCategory = Object.fromEntries(
      entries.map(([key, value], index) => [key, [index === idx, value[1]]])
    );
    setCategory(updatedCategory);
    setIsReady(true);
  };

  return (
    <RecommendContainer>
      <SignupTitle status="1">
        <div className="statusBar">
          <div className="statusBar2"></div>
        </div>
        <RecommendTitle ftsize="32px" ftcolor={theme.Black} ftweight="600">
          추천받고싶은 유형을 선택해주세요
        </RecommendTitle>
      </SignupTitle>

      <RecommendImgContainer>
        {Object.entries(category).map(([key, value], index) => {
          return (
            <ImgCheckbox
              key={key}
              handleClick={handleSelect}
              isSelected={value[0]}
              elementidx={index}
              articleimg={value[1]}
            >
              {key} 추천 받을래요
            </ImgCheckbox>
          );
        })}
      </RecommendImgContainer>
      <RecommendButtonContainer>
        <BeforeArrowButton handleClick={goBeforePage} />
        <AfterArrowButton handleClick={goNextPage} isReady={isReady}>
          다음
        </AfterArrowButton>
      </RecommendButtonContainer>
    </RecommendContainer>
  );
};

export default RecommendCategory;
