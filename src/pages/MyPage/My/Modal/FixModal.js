// 편집 모달

import React, { useState, useEffect, useRef } from "react";
import * as S from "./StyledFixModal";
import x from "../../../../assets/images/X_Icon.svg";
import trash from "../../../../assets/images/Trash_Icon.svg";
import plus from "../../../../assets/images/Plus_Icon.svg";
import { BigButton } from "../../../../components/index";
import { DUMMY_DATA } from "../MypageHome";
import OutSideClick from "../../../../components/Navbar/OutSideClick";
import { update } from "react-spring";
import TokenApi from "../../../../apis/TokenApi";

function FixModal({ data, onUpdateData, onClose, onDeleteItem }) {
  const [routinesData, setRoutinesData] = useState([]);

  useEffect(() => {
    handleAddInput();
    // const fetchDataAndWorkoutData = async () => {
    //   try {
    //     // 루틴 목록 조회
    //     const routinesResponse = await TokenApi.get("/myfit/routines/workout");
    //     console.log(routinesResponse);
    //     if (routinesResponse.data && routinesResponse.data.length > 0) {
    //       // 루틴 목록 저장
    //       setRoutinesData(routinesResponse);
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

    // fetchDataAndWorkoutData();
  }, []);

  // data가 변경될 때마다 items가 업데이트
  useEffect(() => {
    setItems([...data]);
  }, [data]);

  const [items, setItems] = useState([...DUMMY_DATA]); // DUMMY_DATA를 복사하여 초기화

  const [text, setText] = useState("");
  const [editableItemIdx, setEditableItemIdx] = useState(null); // 수정 중인 항목의 ID를 관리

  const [inputStates, setInputStates] = useState([]); // 입력 필드 상태 목록
  const [deletedIds, setDeletedIds] = useState([]);
  const nextInputId = useRef(Math.max(...items.map((item) => item.id)) + 1); // 다음 입력 필드의 고유 ID를 관리하는 변수

  // AddButton을 보이거나 숨기는 상태를 추가
  const [addButtonVisible, setAddButtonVisible] = useState(
    items.length === 5 ? false : true
  );

  useEffect(() => {
    setAddButtonVisible(items.length < 5);
  }, [items]);

  const handleClick = (id) => {
    setEditableItemIdx(id);
    // 모달이 열릴 때 text 상태 초기화
    setText("");
  };

  const handleChange = (e) => {
    // text 상태 업데이트
    const newText = e.target.value;
    setText(newText);

    const idx = parseInt(e.target.id);

    // routinesData를 업데이트하는 새로운 배열 생성
    const updatedRoutinesData = routinesData.data.map((item) => {
      if (item.routineIndex === idx) {
        item.routineName = newText;
      }
      return item;
    });

    const updatedData = {
      ...routinesData,
      data: updatedRoutinesData,
    };

    setRoutinesData(updatedData);
  };

  const handleAddInput = () => {
    // if (routinesData.data.length + 1 === 5) {
    //   setAddButtonVisible(false);
    // }

    // if (routinesData.data.length + 1 <= 5) {
    const routineIndices = routinesData.data.map((item) => item.routineIndex);
    routineIndices.sort((a, b) => a - b);

    let newIndex = 1; // 초기값을 1로 설정

    for (let i = 0; i < routineIndices.length + 1; i++) {
      // 조건을 수정
      if (routineIndices[i] !== i + 1) {
        // 여기도 수정하여 i+1과 비교
        newIndex = i + 1;
        break;
      }
    }

    const newRoutine = {
      routineId: -1,
      routineIndex: parseInt(newIndex),
      routineName: "새 루틴",
    };

    setRoutinesData((prevData) => ({
      ...prevData,
      data: [...prevData.data, newRoutine],
    }));
    // }
  };

  const handleRemoveInput = (routineIndex) => {
    const updatedRoutinesData = routinesData.data.filter(
      (item) => item.routineIndex !== routineIndex
    );
    console.log(updatedRoutinesData);
    setRoutinesData((prevData) => ({
      ...prevData,
      data: updatedRoutinesData,
    }));

    if (routinesData.data.length + 1 !== 5) {
      setAddButtonVisible(true);
    }
  };

  useEffect(() => {
    const $body = document.querySelector("body");
    const overflow = $body.style.overflow;
    $body.style.overflow = "hidden";
    return () => {
      $body.style.overflow = overflow;
    };
  }, []);

  const handleClose = () => {
    // 모달을 닫기만 함
    onClose?.();
  };
  const modalRef = useRef(null);
  OutSideClick(modalRef, handleClose);

  // 수정완료
  const handleSubmit = async () => {
    console.log(routinesData);

    const routinesForServer = routinesData.data.map((item) => ({
      routineId: item.routineId,
      routineIndex: item.routineIndex,
      routineName: item.routineName,
    }));

    console.log({ routines: routinesForServer });
    try {
      // 루틴 목록 수정
      const newRoutines = await TokenApi.post("/myfit/routines/workout", {
        routines: routinesForServer,
      });
      console.log(newRoutines.status);
    } catch (error) {
      console.error(error);
    }

    onClose?.();
    alert("수정되었습니다!");
    // 페이지 새로고침
    window.location.reload();
  };

  return (
    <S.AppWrap>
      <S.Overlay>
        <S.ModalContainer ref={modalRef}>
          <S.ModalWrap>
            <S.Header>
              <S.ModalTitle>
                <h1>내 운동 목록</h1>
                <S.CloseButton onClick={handleClose}>
                  <img src={x} alt="닫기 버튼" />
                </S.CloseButton>
              </S.ModalTitle>
              <span>이름을 더블클릭하여 변경하세요.</span>
              <S.Contents>
                {routinesData.data &&
                  routinesData.data.map((item) => (
                    <div className="contents-input" key={item.routineIndex}>
                      {editableItemIdx === item.routineIndex ? (
                        <input
                          type="text"
                          id={item.routineIndex}
                          placeholder={item.routineName}
                          value={text !== null ? text : item.routineName} // text가 채워져 있을 때는 text로, 비어있을 때는 item.text로 초기화
                          onChange={handleChange} // text 상태 업데이트
                        />
                      ) : (
                        <p onClick={() => handleClick(item.routineIndex)}>
                          {item.routineName}
                        </p>
                      )}
                      <img
                        src={trash}
                        alt="삭제 버튼"
                        onClick={() => handleRemoveInput(item.routineIndex)}
                      />
                    </div>
                  ))}
              </S.Contents>
              {addButtonVisible && (
                <S.AddButton onClick={handleAddInput}>
                  <img src={plus} alt="목록 추가 버튼" />
                </S.AddButton>
              )}
            </S.Header>
            {/* BigButton이랑 width가 안 맞아서 새로 제작 */}
            <S.SaveButton onClick={handleSubmit} type="submit">
              수정 완료
            </S.SaveButton>
          </S.ModalWrap>
        </S.ModalContainer>
      </S.Overlay>
    </S.AppWrap>
  );
}

export default FixModal;
