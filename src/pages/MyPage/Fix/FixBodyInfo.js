import { useEffect, useState } from "react";
import * as S from "./StyledFix";
import { useNavigate } from "react-router-dom";
import {
  MiddleButton,
  BeforeButton,
  TextCheckbox,
} from "./../../../components/";
import ProfileInput from "./ProfileInput/ProfileInput";
import { useRecoilState } from "recoil";
import { validationState } from "../../../recoil/atom";
import TokenApi from "../../../apis/TokenApi";
import rightarrow from "../../../assets/images/rightarrow.svg";

const FixBodyInfo = () => {
  const navigate = useNavigate();

  const [isValidState, setIsValidState] = useRecoilState(validationState);
  const handleBackPage = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      Object.entries(isValidState).filter(([key, value]) => {
        return value[1] === true;
      }).length === 8
    ) {
			// 경로 이동 안됨
      navigate("/mypage/fixbodyfigure", { replace: false }); // 절대 경로로 이동
    }
  };

	const [userName, setuserName] = useState(null);
	const [height, setHeight] = useState(null);
	const [weight, setWeight] = useState(null);

	const fetchData = async () => {
		try {
			const response_private = await TokenApi.get("user/private");
			setuserName(response_private.data.userName);
			const response_body = await TokenApi.get("/bodyData", response_private);
			console.log(response_body)
			setuserName(response_body.data.height);
			setuserName(response_body.data.weight);
		} catch (error) {
			console.log(error);
		}
	};

	// bodyinfo

	const currenturl = window.location.pathname;
	const [isCategorySelect, setIsCategorySelect] = useState(false);

  const categorylist = [
    ["마른 편이에요", [1, 1, 1, 1]],
    ["보통이에요", [2, 2, 2, 2]],
    ["조금 통통한 편이에요", [3, 3, 3, 3]],
    ["뚱뚱해요", [4, 4, 4, 4]],
  ];

  const handleClick = (idx) => {
    const newArr = Array(categorylist.length).fill(false);
    newArr[idx] = true;
    setIsCategorySelect(newArr);
    setIsValidState((pre) => ({
      ...pre,
      upperBodyFat: [categorylist[idx][1][0], true, false],
      lowerBodyFat: [categorylist[idx][1][1], true, false],
      upperMuscleMass: [categorylist[idx][1][2], true, false],
      lowerMuscleMass: [categorylist[idx][1][3], true, false],
    }));
  };

	useEffect(() => {
		fetchData();
	});

  return (
    <S.SignupContainer>
      <S.SignupTitle>
        <S.TitleEmphasis>{userName}님의 신체정보</S.TitleEmphasis>
      </S.SignupTitle>
      <S.BodyInfoContainer>
        <ProfileInput
          value={height}
          name="height"
        >
          키
        </ProfileInput>
        <ProfileInput
					value={weight}
					name="weight"
				>
          몸무게
        </ProfileInput>
      </S.BodyInfoContainer>
			<S.SignupTitle>
        <S.TitleEmphasis>{userName}님의 체형정보</S.TitleEmphasis>
      </S.SignupTitle>
			<S.SignupTextContainer>
        {categorylist?.map((item, index) => {
          return (
            <TextCheckbox
              key={index}
              handleClick={handleClick}
              isSelected={isCategorySelect[index]}
              elementidx={index}
            >
              {item[0]}
            </TextCheckbox>
          );
        })}
        <div className="directButtonContainer">
          <button
            className="directbutton"
            onClick={(e) => {
              e.preventDefault();
              navigate(`${currenturl}/direct`);
            }}
          >
            직접 입력하기
            <img
              src={rightarrow}
              className="rightArrow"
              alt="직접 입력하기 버튼 이미지"
            />
          </button>
        </div>
				<S.ButtonContainer>
        <BeforeButton handleSubmit={handleBackPage} />
        <MiddleButton handleSubmit={handleSubmit}>변경사항 저장하기</MiddleButton>
      </S.ButtonContainer>
      </S.SignupTextContainer>
    </S.SignupContainer>
  );
};

export default FixBodyInfo;
