import { CardContainer } from "./StyledFitnessType";

// 운동 종목 Card
const FitnessType = ({ children, part, description, imgPath }) => {
  // children : 운동종류
  // part : 부위
  return (
    <CardContainer>
      <div className="fitnessPart">{part}</div>
      <img src={imgPath} className="fitnessImg" alt="운동종류 이미지"></img>
      <div className="fitnessInfo">
        <span className="fitnessTitle">{children}</span>
        <span className="fitnessExplain">{description}</span>
      </div>
    </CardContainer>
  );
};

export default FitnessType;
