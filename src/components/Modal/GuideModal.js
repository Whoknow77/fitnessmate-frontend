import * as S from "./StyledGuideModal";
import { useEffect, useState } from "react";
import SemiMiddleButton from "../Button/SemiMiddleButton";
import { ModalBox } from "./StyledEmailModal";
import TokenApi from "../../apis/TokenApi";
import { useNavigate } from "react-router-dom";

const GuideModal = () => {
  const navigate = useNavigate();

  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [sex, setSex] = useState(null);

  const [upDownBalanceText, setUpDownBalanceText] = useState("표준형");

  const handleBalanceText = (upDownBalance) => {
    const rangevalue = Number(upDownBalance * 10);
    if (rangevalue >= 1 && rangevalue <= 4) {
      return "하체발달형";
    } else if (rangevalue === 5) {
      return "표준형";
    } else if (rangevalue >= 6 && rangevalue <= 9) {
      return "상체발달형";
    }
  };

  const fetchData = async () => {
    try {
      const response_private = await TokenApi.get("user/private");
      setSex(response_private.data.sex);
      const response_body = await TokenApi.get("bodyData/recent");
      console.log(response_body);
      setHeight(response_body.data.height);
      setWeight(response_body.data.weight);
      setUpDownBalanceText(handleBalanceText(response_body.data.upDownBalance));
    } catch (error) {
      console.log(error);
    }
  };

  const handleFixBodyInfo = () => {
    navigate("/mypage/fixbodyinfo");
  };

  const goNextPage = () => {
    navigate("category");
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ModalBox>
      <S.GuideModalWrapper>
        <span className="guideModalTitle">아래의 신체 정보로 추천할까요?</span>
        <div className="middleModalArea">
          <span className="middleModalTitle">키</span>
          <p className="middleModalContent">{height}</p>

          <span className="middleModalTitle">몸무게</span>
          <p className="middleModalContent">{weight}</p>

          <span className="middleModalTitle">체형</span>
          <p className="middleModalContent">{upDownBalanceText}</p>
        </div>
        <div className="bottomModalArea">
          <button
            className={`bottomModalButton ${"return"}`}
            onClick={() => handleFixBodyInfo()}
          >
            아니요 수정할래요
          </button>
          <button
            className={`bottomModalButton ${"next"}`}
            onClick={() => goNextPage()}
          >
            네 추천해주세요
          </button>
        </div>
      </S.GuideModalWrapper>
    </ModalBox>
  );
};

export default GuideModal;
