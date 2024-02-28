import { Background, LoadingText } from "./StyledLoading";
import spinner from "../../assets/images/spinner.gif";

const Loading = () => {
	return (
		<Background>
			<div className="spinner">
				<svg width="22" height="22" class="svg">
					<circle r="9.5" cx="11" cy="11" class="border"></circle>
					<circle r="9.5" cx="11" cy="11" class="progress"></circle>
				</svg>
			</div>
			<LoadingText>분석중...</LoadingText>
		</Background>
	);
};

export default Loading;
