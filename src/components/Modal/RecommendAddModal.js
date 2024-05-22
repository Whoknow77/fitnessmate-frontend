import { ModalBox } from "./StyledEmailModal";
import * as S from "./StyledRecommendAddModal";
import xbutton2 from "../../assets/images/xbutton2.svg";
import { useEffect, useState } from "react";
import MiddleButton from "./../Button/MiddleButton";
import SmallFontTextCheckbox from "../TextCheckbox/SmallFontTextCheckbox";
import TokenApi from "./../../apis/TokenApi";
import SemiMiddleButton from "./../Button/SemiMiddleButton";
import { getLastError } from "../../apis/TokenApi";

const RecommendAddModal = ({
  setRecommendAddModal,
  machine,
  routineContainment,
}) => {
  const [myDivision, setMyDivsion] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [modifyMachineOption, setModifyMachineOption] = useState(true);

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

    // 선택된 TextCheckbox의 갯수를 새로운 상태로 설정
    const selectedCount = newArr.filter(
      (division) => division.isSelected
    ).length;
    setIsReady(selectedCount > 0);
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
  const handleAdd = () => {
    const submission = {
      workoutIds: [Number(machine.workoutId)],
      weight: option[0].value,
      rep: option[1].value,
      setCount: option[2].value,
    };

    // Promise 배열을 저장할 변수
    const promises = [];
    const notifications = [];

    myDivision.forEach((division) => {
      console.log();
      if (division.isSelected) {
        const promise = TokenApi.post(
          `/myfit/routines/workout/${division.routineId}`,
          submission
        );

        promises.push(
          promise
            .then((response) => {
              // 성공한 경우
              console.log(response);
              notifications.push(
                `${division.routineName}에 운동이 추가되었습니다!`
              );
            })
            .catch((error) => {
              // 실패한 경우
              const errorMessage = getLastError();
              console.log(errorMessage);
              notifications.push(`${division.routineName}에 ${errorMessage}`);
            })
        );
      }
    });

    // 모든 Promise가 완료되면 실행될 함수
    Promise.allSettled(promises).then(() => {
      // 모든 요청이 완료되었을 때 알림창 띄우기
      alert(notifications.join("\n"));
      setRecommendAddModal(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ModalBox>
      <S.RecommendAddModalWrapper>
        <div className="recommendAddModalTitleWrapper">
          <img
            src={xbutton2}
            className="recommendAddModalQuitBtn"
            onClick={() => setRecommendAddModal(false)}
            alt="운동 추천 모달 나가기 버튼"
          />
        </div>
        {modifyMachineOption ? (
          <div className="recommendAddModalDivsionList">
            <span className="modifyOptionTitle">
              먼저 추천 운동량을 수정해보세요
            </span>
            <p className="modifyOptionComment">
              AI의 추천이 마음에 들면 수정하지 않아도 돼요
            </p>
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
          </div>
        ) : (
          <div className="recommendAddModalDivsionList">
            <span className="recommendAddModalTitle">
              {machine.koreanName}를(을) 추가할 <br />내 루틴을 선택해주세요
            </span>
            <div className="divisionListComment">여러 개 선택할 수 있어요</div>
            <div className="divisionList">
              {myDivision.map((item, index) => {
                return (
                  <SmallFontTextCheckbox
                    key={item.routineName}
                    handleClick={handleSelect}
                    isSelected={item.isSelected}
                    elementidx={index}
                    disabled={routineContainment[index]} // routineContainment에 따라 버튼 비활성화
                  >
                    {item.routineName}
                  </SmallFontTextCheckbox>
                );
              })}
            </div>
          </div>
        )}
        {modifyMachineOption ? (
          <MiddleButton isReady={true} handleSubmit={handleModifyComplete}>
            적용하고 다음
          </MiddleButton>
        ) : (
          <>
            <SemiMiddleButton
              isReady={isReady}
              handleSubmit={handleAdd}
              selectedCount={handleReady()}
            >
              추가하기
            </SemiMiddleButton>
          </>
        )}
      </S.RecommendAddModalWrapper>
    </ModalBox>
  );
};

export default RecommendAddModal;
