import { CardContainer } from "./StyledSupplementType";

// 보조제 Card
const SupplementType = ({ children, flavor, source, imageURL, price, description }) => {

  function formatNumberToCurrency(number) {
    return number.toLocaleString('en-US');
  }

  const formattedPrice = formatNumberToCurrency(price);

  return (
    <CardContainer>
      <ul className="supplementPartContainer">
        <div className="supplementFlavor">{flavor}</div>
				<div className="supplementSource">{source}</div>
      </ul>
      <img src={imageURL} className="supplementImg" alt="보조제 이미지"></img>
      <div className="supplementInfo">
        <span className="supplementTitle">{children}</span>
        <span className="supplementExplain">{description}</span>
				<span className="supplementPrice" onChange={formatNumberToCurrency}>{formattedPrice}원</span>
      </div>
    </CardContainer>
  );
};

export default SupplementType;
