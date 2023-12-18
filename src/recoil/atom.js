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

// 보조제 목적 객체
export const purposeState = atom({
	key: "purposeState",
	default: {
		purpose: [],
	},
});

export const isModalState = atom({
	key: "isModalState",
	default: false,
});

// 운동 추천 history
export const RecommendState = atom({
	key: "RecommendState",
	default: {},
});

// 보조제 추천 history
export const supplementRecommendState = atom({
	key: "supplementRecommendState",
	default: {},
});

// Home 운동 객체
export const machineListRecoilState = atom({
	key: "machineListRecoilState",
	default: {},
});
