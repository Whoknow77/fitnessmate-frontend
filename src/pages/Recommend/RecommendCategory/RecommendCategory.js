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

// 버튼과 이미지의 간격을 어떻게 줄지 고민해 봐야함.
const RecommendCategory = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState({
    보조제: [false, "protein"],
    운동: [false, "fitness"],
  });

  const goNextPage = () => {
    if (category.보조제[0]) {
      navigate("/recommend/supplementpurpose");
    } else if (category.운동[0]) {
      navigate("/recommend/workout");
    }
  };

  // 카테고리 선택
  const handleSelect = (idx) => {
    const entries = Object.entries(category);
    const updatedCategory = Object.fromEntries(
      entries.map(([key, value], index) => [key, [index === idx, value[1]]])
    );
    setCategory(updatedCategory);
  };

  return (
    <RecommendContainer>
      <div>
        <RecommendTitle ftsize="32px" ftcolor={theme.Black} ftweight="700">
          어떤 추천을&nbsp;
        </RecommendTitle>
        <RecommendTitle ftsize="32px" ftcolor={theme.Gray80} ftweight="700">
          받으시겠어요?
        </RecommendTitle>
        <br />
        <br />
        <RecommendTitle ftsize="24px" ftcolor={theme.Gray80} ftweight="600">
          AI가 김정욱님에게 최적화된 솔루션을 제공해줘요
        </RecommendTitle>
      </div>
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
        <SmallButton handleSubmit={goNextPage}>다음</SmallButton>
      </RecommendButtonContainer>
    </RecommendContainer>
  );
};

export default RecommendCategory;
