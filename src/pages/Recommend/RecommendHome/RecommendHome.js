import { RecommendHomeContainer, RecommendTitle } from "../StyledRecommend";
import { useNavigate } from "react-router-dom";
import theme from "../../../styles/theme";
import rightarrow from "../../../assets/images/rightarrow3.svg";

// 버튼과 이미지의 간격을 어떻게 줄지 고민해 봐야함.
const RecommendHome = () => {
  const navigate = useNavigate();
  const goNextPage = () => {
    navigate("category");
  };
  return (
    <RecommendHomeContainer>
      <RecommendTitle ftsize="68px" ftcolor={theme.Black} ftweight="700">
        AI의
        <br />
        정확하고 빠른 <br />
        운동추천
      </RecommendTitle>

      <button className="recommendBtnWrapper" onClick={goNextPage}>
        <span className="recommendBtnText">추천 시작</span>
        <img
          src={rightarrow}
          alt="추천 시작 버튼"
          className="recommendBtnImg"
        />
      </button>
    </RecommendHomeContainer>
  );
};

export default RecommendHome;
