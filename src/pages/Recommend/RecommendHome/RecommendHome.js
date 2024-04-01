import { useState } from "react";
import { RecommendHomeContainer, RecommendTitle } from "../StyledRecommend";
import theme from "../../../styles/theme";
import rightarrow from "../../../assets/images/rightarrow3.svg";
import GuideModal from "../../../components/Modal/GuideModal";

// 버튼과 이미지의 간격을 어떻게 줄지 고민해 봐야함.
const RecommendHome = () => {
  const [guideModal, setGuideModal] = useState(false);

  return (
    <>
      <RecommendHomeContainer>
        <RecommendTitle ftsize="68px" ftcolor={theme.Neutral990} ftweight="700">
          AI의
          <br />
          정확하고 빠른 <br />
          운동추천
        </RecommendTitle>

        <button
          className="recommendBtnWrapper"
          onClick={() => {
            setGuideModal(true);
          }}
        >
          <span className="recommendBtnText">추천 시작</span>
          <img
            src={rightarrow}
            alt="추천 시작 버튼"
            className="recommendBtnImg"
          />
        </button>
      </RecommendHomeContainer>
      {guideModal && <GuideModal />}
    </>
  );
};

export default RecommendHome;
