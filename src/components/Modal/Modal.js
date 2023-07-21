import { React, useRef, useState } from "react";
import * as S from "./ModalStyledComponents";
import { supplementPostAPI } from "../../apis/API";

export const Modal = ({ setModal }) => {
  // useRef 쓰는 이유?
  const eNameRef = useRef("");
  const kNameRef = useRef("");
  const descriptionRef = useRef("");
  const marketURLRef = useRef("");
  const flavorRef = useRef("");
  const priceRef = useRef(0);
  const servingsRef = useRef(0.1);
  const sourceRef = useRef("");
  const carbohydratePerServingRef = useRef(0.1);
  const proteinPerServingRef = useRef(0.1);
  const fatPerServingRef = useRef(0.1);

  const inputFields = [
    {
      id: "englishName",
      placeholder: "englishName",
      ref: eNameRef,
      type: "text",
    },
    {
      id: "koreanName",
      placeholder: "koreanName",
      ref: kNameRef,
      type: "text",
    },
    {
      id: "servings",
      placeholder: "servings",
      ref: servingsRef,
      type: "number",
      step: "0.01",
    },
    {
      id: "price",
      placeholder: "price",
      ref: priceRef,
      type: "number",
      step: "0.01",
    },
    {
      id: "marketURL",
      placeholder: "https://123",
      ref: marketURLRef,
      type: "url",
    },
    {
      id: "description",
      placeholder: "description",
      ref: descriptionRef,
      type: "text",
    },
    { id: "flavor", placeholder: "flavor", ref: flavorRef, type: "text" },
    { id: "source", placeholder: "source", ref: sourceRef, type: "text" },
    {
      id: "carbohydratePerServing",
      placeholder: "0.01",
      ref: carbohydratePerServingRef,
      type: "text",
    },
    {
      id: "proteinPerServing",
      placeholder: "0.01",
      ref: proteinPerServingRef,
      type: "text",
    },
    {
      id: "fatPerServing",
      placeholder: "fatPerServing",
      ref: fatPerServingRef,
      type: "text",
    },
    {
      id: "fatPerServing",
      placeholder: "fatPerServing",
      ref: fatPerServingRef,
      type: "file",
    },
  ];

  const [imageFile, setImageFile] = useState(new File([""], ""));

  // 보충제 타입(기본 프로틴)
  const [submitSupplementType, setSubmitSupplementType] = useState("Protein");

  // 정보 초기화
  const initAllInputRefs = () => {
    eNameRef.current.value = "";
    kNameRef.current.value = "";
    descriptionRef.current.value = "";
    marketURLRef.current.value = "";
    flavorRef.current.value = "";
    priceRef.current.value = 1;
    servingsRef.current.value = 1.0;
    if (carbohydratePerServingRef.current !== null)
      carbohydratePerServingRef.current.value = 1.0;
    if (proteinPerServingRef.current !== null)
      proteinPerServingRef.current.value = 1.0;
    if (fatPerServingRef.current !== null) fatPerServingRef.current.value = 1.0;
    if (sourceRef.current !== null) sourceRef.current.value = "";
    if (carbohydratePerServingRef.current !== null)
      carbohydratePerServingRef.current.value = 1.0;
    if (proteinPerServingRef.current !== null)
      proteinPerServingRef.current.value = 1.0;
    if (fatPerServingRef.current !== null) fatPerServingRef.current.value = 1.0;
    if (sourceRef.current !== null) sourceRef.current.value = "";
  };

  // 전체 데이터에 보충제 데이터 추가
  const appendFormData = (formData, supplementObj) => {
    Object.entries(supplementObj).forEach(([key, value]) => {
      formData.append(key, value);
    });
  };

  // 보충제 타입 선택
  const onSelect = (e) => {
    setSubmitSupplementType(e.target.value);
  };

  // 파일 업로드
  const handleSupplementFile = (event) => {
    setImageFile(event.target.files[0]);
  };

  // 제출
  const handleSupplementSubmit = async (event) => {
    event.preventDefault();

    const sup = {
      englishName: eNameRef.current.value,
      koreanName: kNameRef.current.value,
      description: descriptionRef.current.value,
      marketURL: marketURLRef.current.value,
      supplementType: submitSupplementType,
      flavor: flavorRef.current.value,
      price: (priceRef.current.value *= 1),
      servings: (servingsRef.current.value *= 1),
      source: sourceRef.current !== null ? sourceRef.current.value : "",
      carbohydratePerServing:
        carbohydratePerServingRef.current !== null
          ? (carbohydratePerServingRef.current.value *= 1.0)
          : 1.0,
      proteinPerServing:
        proteinPerServingRef.current != null
          ? (proteinPerServingRef.current.value *= 1.0)
          : 1.0,
      fatPerServing:
        fatPerServingRef.current != null
          ? (fatPerServingRef.current.value *= 1.0)
          : 1.0,
    };

    // https://velog.io/@shin6403/React-Form-Data-%EC%A0%84%EC%86%A1
    // 새로운 데이터를 추가 후 반환
    const formData = new FormData();
    formData.append("image", imageFile);
    appendFormData(formData, sup);
    // 서버에 데이터 수정 요청
    const response = await supplementPostAPI.post("", formData);
    //정보 초기화
    initAllInputRefs();
    setImageFile(new File([""]), "");
  };

  return (
    <S.ModalWrapper>
      <img
        src={require("../../assets/images/xbutton.png")}
        alt="모달 창 닫기 버튼"
        onClick={() => {
          setModal(false);
        }}
      />
      <S.FormList onSubmit={handleSupplementSubmit}>
        <span>Select Supplement Type</span>
        <select value={submitSupplementType} onChange={onSelect}>
          <option value="Protein">Protein</option>
          <option value="Gainer">Gainer</option>
          <option value="BCAA">BCAA</option>
        </select>
        {inputFields.map((field, index) => {
          let InputComponent;
          if (field.type !== "file") {
            InputComponent = (
              <input
                type={field.type}
                id={field.id}
                placeholder={field.placeholder}
                ref={field.ref}
              ></input>
            );
          } else {
            InputComponent = (
              <input
                type="file"
                multiple="multiple"
                onChange={handleSupplementFile}
              ></input>
            );
          }
          return (
            <>
              <span className="FormName">{field.id}</span>
              <InputComponent />
            </>
          );
        })}
        <S.SubmitButton type="submit">등록</S.SubmitButton>
      </S.FormList>
    </S.ModalWrapper>
  );
};
