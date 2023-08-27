import * as S from "./StyledMypageHome";
import { useState } from 'react';
import ModalButton from "../ModalButton";


// 회원가입 페이지에 대한 정보를 모두 담는 컴포넌트
// 우선 이메일은
const Mypagehome = () => {
	
	const [ visible, setVisible ] = useState(false);


	return (
		<S.HomeContainer>
			<S.HomeContent>
				<S.FirstContent>
					<S.FirstContent>
						<div className="firstTop">나에게 핏한</div>
						<div className="firstMiddle">
							<p>내 운동 정보를 모아보세요.</p>
						</div>
						<S.Toggle>
						<div class="toggleSwitch_wrap">
							<label for="switchInput" class="toggleSwitch">
								<input type="checkbox" id="switchInput" class="switchInput" onClick={() => {setVisible(!visible);}} />
									<div class="toggleSwitch_ball"></div>
							</label>
						</div>
					</S.Toggle>
					</S.FirstContent>
				</S.FirstContent>
			</S.HomeContent>
			<S.HomeContent>
			{(visible ?
				<S.SecondContent>
					<S.ContentsTitle>
						<div className="contents-title">내 운동</div>
					</S.ContentsTitle>
				</S.SecondContent>
				:
				<S.SecondContent>
					<S.ContentsTitle>
						<div className="contents-title">내 보조제</div>
					</S.ContentsTitle>
					<div className="height"></div>
				</S.SecondContent>
			)}
			</S.HomeContent>
			<div className="modalbutton">
				<ModalButton>+ 이 목록에 운동 추가하기</ModalButton>
			</div>
		</S.HomeContainer>
	);
};

export default Mypagehome;
