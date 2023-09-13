import { atom } from "recoil";

export const EmailState = atom({
  key: "EmailState",
  default: false,
});

// 유효성 검사
export const validationState = atom({
  key: "validationState",
  default: {
    // [value, 유효성검사, 빨/파 테두리 구분]
    userName: ["", false],
    loginEmail: ["", false],
    emailModal: ["", false],
    password: ["", false],
    password2: ["", false],
    sex: ["", false],
    birthDate: ["", false],
    height: ["", false],
    weight: ["", false],
    bodyFat: ["", false],
    muscleMass: ["", false],
    upDownBalance: ["", false],
  },
});

export const bodyPartState = atom({
  key: "bodyPartState",
  default: {
    bodyPartKoreanName: [],
  },
});

export const isModalState = atom({
  key: "isModalState",
  default: false,
});

// 추천 history
export const RecommendState = atom({
  key: "RecommendState",
  default: {},
});
