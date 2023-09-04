import React, { useState } from "react";
import * as S from "./StyledFixModal";
import x from "../../../../assets/images/X_Icon.svg";
import trash from "../../../../assets/images/Trash_Icon.svg";
import plus from "../../../../assets/images/Plus_Icon.svg";
import { BigButton } from "../../../../components/index";

export const DUMMY_DATA = [
  {
    id: 1,
    text: "분할 1",
    name: "first",
  },
  {
    id: 2,
    text: "분할 2",
    name: "second",
  },
];

function FixModal({ onClose }) {
  const handleClose = () => {
    onClose?.();
  };

  const [text, setText] = useState("");
  const [editableItemId, setEditableItemId] = useState(null); // 수정 중인 항목의 ID를 관리

  const [items, setItems] = useState(DUMMY_DATA);

  const handleDoubleClick = (id) => {
    setEditableItemId(id);
    // 모달이 열릴 때 text 상태 초기화
    setText("");
  };

  const handleChange = (e, id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        item.text = e.target.value; // 해당 항목의 text 값을 변경
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleKeyDown = (e, id) => {
    if (e.key === "Enter") {
      const updatedItems = items.map((item) => {
        if (item.id === id) {
          item.text = e.target.value;
        }
        return item;
      });
      setItems(updatedItems);
      setEditableItemId(null);
    } else if (e.key === "Backspace" || e.key === "Delete") {
      e.preventDefault();
      const updatedItems = items.map((item) => {
        if (item.id === id) {
          item.text = e.target.value.slice(0, -1);
        }
        return item;
      });
      setItems(updatedItems);
    } else {
      // 다른 키 이벤트에 대해서는 모달을 닫지 않도록 설정
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleAddItem = () => {
    if (text.trim() !== "") {
      setItems([...items, { id: Date.now(), text: text }]);
      setText(""); // 입력 필드 초기화
    }
  };

  return (
    <S.AppWrap>
      <S.Overlay>
        <S.ModalContainer>
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
                {items.map((data) => {
                  return (
                    <div key={data.id}>
                      {editableItemId === data.id ? (
                        <input
                          type="text"
                          name={data.text}
                          value={data.text}
                          onChange={(e) => handleChange(e, data.id)}
                          onKeyDown={(e) => handleKeyDown(e, data.id)}
                        />
                      ) : (
                        <p onDoubleClick={() => handleDoubleClick(data.id)}>
                          {data.text}
                        </p>
                      )}
                      <img src={trash} alt="삭제 버튼" />
                    </div>
                  );
                })}
                <div>
                  <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="새 항목 추가"
                  />
                </div>
              </S.Contents>
              <S.AddButton onClick={handleAddItem}>
                <img src={plus} alt="목록 추가 버튼" />
              </S.AddButton>
            </S.Header>
            <BigButton>수정 완료</BigButton>
          </S.ModalWrap>
        </S.ModalContainer>
      </S.Overlay>
    </S.AppWrap>
  );
}

export default FixModal;
