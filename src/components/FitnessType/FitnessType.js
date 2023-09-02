import { CardContainer } from "./StyledFitnessType";

// 운동 종목 Card
const FitnessType = ({ children, parts, description, imgPath }) => {
  // children : 운동종류
  // part : 부위
  return (
    <CardContainer>
      <ul className="fitnessPartContainer">
        {parts.map((part, index) => {
          return <div className="fitnessPart">{part}</div>;
        })}
      </ul>
      <img src={imgPath} className="fitnessImg" alt="운동종류 이미지"></img>
      <div className="fitnessInfo">
        <span className="fitnessTitle">{children}</span>
        <span className="fitnessExplain">{description}</span>
      </div>
    </CardContainer>
  );
};

export default FitnessType;
