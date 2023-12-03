import { CardContainer } from "./StyledSupplementType";

// 보조제 Card
const SupplementType = ({ children, flavor, source, imageURL, price, description, onClick }) => {

	function formatNumberToCurrency(number) {
		return number.toLocaleString('en-US');
	}

	const formattedPrice = formatNumberToCurrency(price);

	return (
		<CardContainer onClick={onClick}>
			<div className="imageArea">
				<img src={imageURL} className="supplementImg" alt="보조제 이미지" />
			</div>
			<div className="supplementInfo">
				<span className="supplementTitle">{children}</span>
				<ul className="supplementPartContainer">
					{source && (
						<div className="supplementSource">{source}</div>
					)}
					<div className="supplementFlavor">{flavor}</div>
				</ul>
				<div className="supplementPrice">
					<span onChange={formatNumberToCurrency}>{formattedPrice}</span>
					<p>원</p>
				</div>
			</div>
		</CardContainer>
	);
};

export default SupplementType;
