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
import { useRecoilState } from "recoil";
import { purposeState } from "../../../recoil/atom";
// 진행바에 필요한듯?
import { SignupTitle } from "../../Signup/StyledSignup";

const RecommendSupplementPurpose = () => {
  const navigate = useNavigate();

  // 목적 객체
  const [purposeList, setPurposeList] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [isover, setIsOver] = useState(false);
  const [selectedPurposeList, setSelectedPurposeList] =
    useRecoilState(purposeState);

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

  // 최초 렌더링 시 목적리스트 받아옴
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
    return purposeList.filter((bodypart) => bodypart.isSelected).length;
  };

  // 클릭 이벤트
  const handleSelect = (idx) => {
    const newArr = [...purposeList];
    newArr[idx].isSelected = !newArr[idx].isSelected;

    // 두 번째와 세 번째 배열 요소가 동시에 선택되지 않도록 처리
    if (idx === 1 && newArr[2].isSelected) {
      newArr[2].isSelected = false;
    } else if (idx === 2 && newArr[1].isSelected) {
      newArr[1].isSelected = false;
    }

    setPurposeList(newArr);
    setIsOver(false);
    setIsReady(true);

    if (handleReady() === 0) {
      setIsReady(false);
    }
  };

  const handleBackPage = () => {
    navigate(-1);
  };

  const handleNextPage = () => {
    // 전역 객체 업데이트
    if (isReady) {
      const SelectedObj = {
        purpose: [],
      };
      purposeList.forEach((item) => {
        if (item.isSelected) {
          SelectedObj.purpose.push(item.name);
        }
      });

      setSelectedPurposeList(SelectedObj);
      navigate("/recommend/supplementbudget");
    }
  };

  return (
    <RecommendContainer>
      <SignupTitle status="2">
        <div className="statusBar">
          <div className="statusBar2"></div>
        </div>
        <div className="recommendTitleArea">
          <RecommendTitle ftsize="32px" ftcolor={theme.Black} ftweight="600">
            보조제 섭취 목적이 무엇인가요?
          </RecommendTitle>
          <RecommendTitleHide>
            근육 발달 정도를 반영하여 정교하게 추천해드려요
          </RecommendTitleHide>
        </div>
      </SignupTitle>
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
      <RecommendButtonContainer isover={isover}>
        <BeforeArrowButton handleClick={handleBackPage} />
        <AfterArrowButton handleClick={handleNextPage} isReady={isReady}>
          다음
        </AfterArrowButton>
      </RecommendButtonContainer>
    </RecommendContainer>
  );
};

export default RecommendSupplementPurpose;
