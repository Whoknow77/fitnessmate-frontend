// < 가로길이가 중간인 버튼 >

import React from "react";
import * as S from "./StyledButton";
import "./StyledButtons.css";

function SemiMiddleButton({ children, handleSubmit, isReady, selectedCount }) {
	return (
		<S.SemiMiddleButtonWrapper
			className="Button"
			onClick={handleSubmit}
			isReady={isReady}
		>
			{/* 선택된 TextCheckbox의 갯수를 표시 */}
			{isReady && (
				<span className="selectedCount">
					{selectedCount}
				</span>
			)}

			{children}
		</S.SemiMiddleButtonWrapper>
	);
}

export default SemiMiddleButton;
