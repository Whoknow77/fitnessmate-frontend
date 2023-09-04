// 내 운동 페이지

import * as S from "./StyledMypageHome";
import "./style.css";
import { useState } from "react";
import AddModal from "./Modal/AddModal";
import FixModal from "./Modal/FixModal";
import fix from "../../../assets/images/Fix_Icon.svg";
import add from "../../../assets/images/Add_Icon.svg";
import ToggleSwitch from "./toggle";

// 루틴 목록용 더미데이터

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

const Mypagehome = () => {
  // Modal

  const [isFixOpen, setIsFixOpen] = useState(false);

  const onClickFixButton = () => {
    setIsFixOpen(true);
  };

  const [isAddOpen, setIsAddOpen] = useState(false);

  const onClickAddButton = () => {
    setIsAddOpen(true);
  };

  // 루틴 목록

  const [content, setContent] = useState("first");
  const [btnActive, setBtnActive] = useState(0);

  const handleClickButton = (e) => {
    const { name, value } = e.target;
    setContent(name);
    setBtnActive(value);
  };

  const selectComponent = {
    first: <div>분할1 내용</div>,
    second: <div>분할2 내용</div>,
  };

  // Toggle

  const [visible, setVisible] = useState(false);

  const labels = {
    left: {
      title: "내 운동",
      value: "workout",
    },
    right: {
      title: "내 보조제",
      value: "supplement",
    },
  };

  const onChange = () => {
    setVisible(!visible);
  };

  return (
    <S.HomeContainer>
      <S.HomeContent>
        <S.FirstContent>
          <S.FirstContent>
            <div className="firstTop">나에게 핏한</div>
            <div className="firstMiddle">
              <p>내 운동 정보를 모아보세요.</p>
            </div>
            <S.Toggle>
              <div class="toggleSwitch_wrap">
                <div class="toggleSwitch">
                  <ToggleSwitch labels={labels} onChange={onChange} />
                </div>
              </div>
            </S.Toggle>
          </S.FirstContent>
        </S.FirstContent>
      </S.HomeContent>
      <S.HomeContent class="content">
        {visible ? (
          <S.SecondContent onChange={onChange}>
            <S.ContentsTitle>
              <div className="contents-title">내 보조제</div>
            </S.ContentsTitle>
          </S.SecondContent>
        ) : (
          <S.SecondContent onChange={onChange}>
            <S.ContentsTitle>
              <div className="contents-title">내 운동 루틴</div>
              <S.ButtonContainer>
                {/* 루틴 목록을 map으로 불러옴 */}
                {DUMMY_DATA.map((data, idx) => {
                  return (
                    <button
                      name={data.name}
                      key={data.id}
                      value={idx}
                      className={"btn" + (idx == btnActive ? " active" : "")}
                      onClick={handleClickButton}
                    >
                      {data.text}
                    </button>
                  );
                })}
                <S.FixModalButton onClick={onClickFixButton}>
                  <img src={fix} alt="편집하기 버튼" />
                  <p>편집</p>
                </S.FixModalButton>
              </S.ButtonContainer>
            </S.ContentsTitle>
            <div className="height">
              {/* 각 루틴 목록에 대한 내용은 아직 디자인이 덜 된 관계로 분별만 가능하도록 제작 */}
              {content && <S.Content>{selectComponent[content]}</S.Content>}
            </div>
          </S.SecondContent>
        )}
      </S.HomeContent>

      <div className="modalbutton">
        <S.AddModalButton onClick={onClickAddButton}>
          <img src={add} alt="추가하기 버튼" />
          <p>이 목록에 운동 추가하기</p>
        </S.AddModalButton>
      </div>

      {/* 편집 버튼 */}
      {isFixOpen && (
        <FixModal
          open={isFixOpen}
          onClose={() => {
            setIsFixOpen(false);
          }}
        />
      )}

      {/* 이 목록에 운동 추가하기 버튼 */}
      {isAddOpen && (
        <AddModal
          open={isAddOpen}
          onClose={() => {
            setIsAddOpen(false);
          }}
        />
      )}
    </S.HomeContainer>
  );
};

export default Mypagehome;
