import { ModalBox } from "./StyledEmailModal";
import * as S from "./StyledRecommendAddModal";
import xbutton2 from "../../assets/images/xbutton2.svg";
import { useEffect, useState } from "react";
import MiddleButton from "./../Button/MiddleButton";
import TextCheckbox from "../TextCheckbox/TextCheckbox";
import rightarrow from "../../assets/images/rightarrow.svg";
import TokenApi from "./../../apis/TokenApi";
const RecommendAddModal = ({ setRecommendAddModal, machine }) => {
  // my페이지에서는 저장된 값을 가져옴
  const [myDivision, setMyDivsion] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [modifyMachineOption, setModifyMachineOption] = useState(false);

  const handleReady = () => {
    return myDivision.filter((division) => division.isSelected).length;
  };
  // 부위 선택
  const handleSelect = (idx) => {
    // 배열 업데이트
    const newArr = [...myDivision];
    newArr[idx].isSelected = !newArr[idx].isSelected;
    setMyDivsion(newArr);
    setIsReady(false);
    if (handleReady() !== 0) {
      setIsReady(true);
    }
  };

  const handleModifyComplete = () => {
    setModifyMachineOption(false);
  };

  // 기존 루틴 받아오기 없으면 분할1~4
  const fetchData = async () => {
    try {
      const response = await TokenApi.get("myfit/routines/workout");
      if (response.data.legnth) {
      } else {
        const newArr = [
          { routineId: 1, routineIndex: 1, routineName: "분할 1" },
          { routineId: 2, routineIndex: 2, routineName: "분할 2" },
          { routineId: 3, routineIndex: 3, routineName: "분할 3" },
          { routineId: 4, routineIndex: 4, routineName: "분할 4" },
        ].map((obj, index) => ({
          ...obj,
          isSelected: false,
        }));
        setMyDivsion(newArr);
      }
    } catch {
      const newArr = [
        { routineId: 1, routineIndex: 1, routineName: "분할 1" },
        { routineId: 2, routineIndex: 2, routineName: "분할 2" },
        { routineId: 3, routineIndex: 3, routineName: "분할 3" },
        { routineId: 4, routineIndex: 4, routineName: "분할 4" },
      ].map((obj, index) => ({
        ...obj,
        isSelected: false,
      }));
      setMyDivsion(newArr);
    }
  };

  const handleAdd = async () => {};

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ModalBox>
      <S.RecommendAddModalWrapper>
        <div className="recommendAddModalTitleWrapper">
          <span className="recommendAddModalTitle">내 운동에 추가하기</span>
          <img
            src={xbutton2}
            className="recommendAddModalQuitBtn"
            onClick={() => setRecommendAddModal(false)}
            alt="운동 추천 모달 나가기 버튼"
          />
        </div>
        {modifyMachineOption ? (
          <>
            <S.ModifyOptionWrapper>
              <button className="modifyOption">중량</button>
              <button className="modifyOption">횟수</button>
              <button className="modifyOption">세트수</button>
            </S.ModifyOptionWrapper>
            <S.ModifyOptionContent>
              <input className="modifyInput" value="20 kg" />
              <button className="saveBtn">저장</button>
            </S.ModifyOptionContent>
          </>
        ) : (
          <div className="recommendAddModalDivsionList">
            {myDivision.map((item, index) => {
              return (
                <TextCheckbox
                  key={item.routineName}
                  handleClick={handleSelect}
                  isSelected={item.isSelected}
                  elementidx={index}
                >
                  {item.routineName}
                </TextCheckbox>
              );
            })}
            <button className="recommendAddModalBtnWrapper">
              <span
                className="recommendAddModalModifyBtn"
                onClick={() => setModifyMachineOption(true)}
              >
                추천 운동량 수정
              </span>
              <img src={rightarrow} alt="추천 운동량 수정 버튼 이미지" />
            </button>
          </div>
        )}
        {modifyMachineOption ? (
          <MiddleButton isReady={true} handleSubmit={handleModifyComplete}>
            수정 완료하고 돌아가기
          </MiddleButton>
        ) : (
          <MiddleButton isReady={isReady} onClick={handleAdd}>
            추가하기
          </MiddleButton>
        )}
      </S.RecommendAddModalWrapper>
    </ModalBox>
  );
};

export default RecommendAddModal;
