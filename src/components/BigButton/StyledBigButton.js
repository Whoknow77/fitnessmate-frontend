// < 가로 길이가 긴 버튼 스타일 >

import styled from 'styled-components';

export const BigButton = styled.div`
	display: flex;
	width: 433px;
	height: 62px;
	padding: 22px 24px;
	justify-content: center;
	align-items: center;
	gap: 3px;
	border-radius: 12px;
	font-family: Pretendard;
	font-size: 22px;
	font-weight: 600;
	cursor: pointer;

	background: ${(props) => props.backcolor || props.theme.Brand};
	color: ${(props) => props.fontcolor || props.theme.White};

	&:hover {
    opacity: 0.5;
  }
`;