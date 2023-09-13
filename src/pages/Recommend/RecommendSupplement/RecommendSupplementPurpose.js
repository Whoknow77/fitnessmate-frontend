import { useNavigate } from "react-router-dom";
import { BeforeButton, SmallButton, TextCheckbox } from "../../../components";
import {
  RecommendButtonContainer,
  RecommendContainer,
  RecommendTitle,
  RecommendTitleHide,
  TextCheckboxContainer,
} from "../StyledRecommend";
import theme from "../../../styles/theme";
import { useEffect, useState } from "react";
import TokenApi from "../../../apis/TokenApi";
import AfterArrowButton from "../../../components/Button/AfterArrowButton";
import BeforeArrowButton from "../../../components/Button/BeforeArrowButton";

const RecommendSupplementPurpose = () => {
  const navigate = useNavigate();

  // 목적 객체
  const [purposeList, setPurposeList] = useState([]);
  const [isReady, setIsReady] = useState(false);
  // 목적리스트 받아옴
  const fetchData = async () => {
    try {
      const response = await TokenApi.get(
        "/recommendation/supplement/purposes"
      );
      const newArr = response.data.map((obj) => ({
        name: obj,
        isSelected: false,
      }));
      setPurposeList(newArr);
    } catch (error) {}
  };
  useEffect(() => {
    fetchData();
  }, []);

  // 클릭 이벤트
  const handleSelect = (idx) => {
    // 배열 업데이트
    const newArr = [...purposeList];
    newArr[idx].isSelected = !newArr[idx].isSelected;
    setPurposeList(newArr);
  };

  const handleBackPage = () => {
    navigate(-1);
  };

  const handleNextPage = () => {
    navigate("/recommend/supplementtype");
  };

  return (
    <RecommendContainer>
      <div>
        <RecommendTitle ftsize="32px" ftcolor={theme.Black} ftweight="700">
          보조제 섭취 목적이 무엇인가요?
          <br />
        </RecommendTitle>
        <RecommendTitleHide>
          {/* 이름 로그인한 사람에게 받아와야 함 */}
          근육 발달 정도를 반영하여 정교하게 추천해드려요
        </RecommendTitleHide>
        <br />
      </div>
      <TextCheckboxContainer>
        {purposeList.map((item, idx) => (
          <TextCheckbox
            key={item.name}
            handleClick={handleSelect}
            elementidx={idx}
            isSelected={item.isSelected}
          >
            {item.name}
          </TextCheckbox>
        ))}
      </TextCheckboxContainer>
      <RecommendButtonContainer>
        <BeforeArrowButton handleClick={handleBackPage} />
        <AfterArrowButton handleClick={handleNextPage} isReady={isReady}>
          다음
        </AfterArrowButton>
      </RecommendButtonContainer>
    </RecommendContainer>
  );
};

export default RecommendSupplementPurpose;
