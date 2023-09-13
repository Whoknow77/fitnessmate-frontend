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

  // 중량 횟수 세트수
  const [option, setOption] = useState([
    {
      optionname: "중량",
      value: machine.weight,
      isSelected: true,
      unit: "kg",
    },
    {
      optionname: "횟수",
      value: machine.repeat,
      isSelected: false,
      unit: "회",
    },
    {
      optionname: "세트 수",
      value: machine.set,
      isSelected: false,
      unit: "세트",
    },
  ]);

  // option 인덱스
  const [currentIdx, setCurrentIdx] = useState(0);

  const handleReady = () => {
    return myDivision.filter((division) => division.isSelected).length;
  };

  const handleSelect = (idx) => {
    const newArr = [...myDivision];
    newArr[idx].isSelected = !newArr[idx].isSelected;
    setMyDivsion(newArr);
    setIsReady(false);
    if (handleReady()) {
      setIsReady(true);
    }
  };

  const handleOptionValue = (e) => {
    const newArray = [...option];
    newArray[currentIdx].value = e.target.value;
    setOption(newArray);
  };

  const handleModifyComplete = async () => {
    setModifyMachineOption(false);
  };

  // 기존 루틴 받아오기(분할1 ~ 분할4)
  const fetchData = async () => {
    try {
      const response = await TokenApi.get("myfit/routines/workout");
      const newArr = [...response.data].map((obj, index) => ({
        ...obj,
        isSelected: false,
      }));
      setMyDivsion(newArr);
    } catch (err) {}
  };
  // 루틴에 운동 추가하기
  const handleAdd = async () => {
    const submission = {
      workoutId: Number(machine.workoutId),
      weight: option[0].value,
      rep: option[1].value,
      setCount: option[2].value,
    };
    myDivision.forEach((division) => {
      if (division.isSelected) {
        try {
          const response = TokenApi.post(
            `myfit/routines/workout/${division.routineId}`,
            submission
          );
          console.log(response);
        } catch (err) {}
      }
    });
  };

  // 루틴이 잘 수정되었는지 확인
  // const handleRoutine = async () => {
  //   myDivision.forEach((division) => {
  //     if (division.isSelected) {
  //       const response = TokenApi.get(
  //         `myfit/routines/workout/${division.routineIndex}`
  //       );
  //       console.log(response);
  //     }
  //   });
  // };

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
              {option.map((op, idx) => {
                return (
                  <S.ModifyOptionButton
                    isSelected={currentIdx === idx}
                    className="modifyOption"
                    onClick={(e) => setCurrentIdx(idx)}
                  >
                    {op.optionname}
                  </S.ModifyOptionButton>
                );
              })}
            </S.ModifyOptionWrapper>
            <S.ModifyOptionContent>
              <input
                className="modifyInput"
                value={option[currentIdx].value}
                onChange={handleOptionValue}
              />
              <span className="modifyInputUnit">{option[currentIdx].unit}</span>
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
          <>
            <MiddleButton isReady={isReady} handleSubmit={handleAdd}>
              추가하기
            </MiddleButton>

            {/* <MiddleButton isReady={isReady} handleSubmit={handleRoutine}>
              추가하기2
            </MiddleButton> */}
          </>
        )}
      </S.RecommendAddModalWrapper>
    </ModalBox>
  );
};

export default RecommendAddModal;
