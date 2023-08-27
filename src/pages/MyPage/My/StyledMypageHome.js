import styled from "styled-components";
import theme from "../../../styles/theme";

export const HomeContainer = styled.ul`
  width: 100%;
  margin: 0 auto;
  display: flex;

  flex-direction: column;
  align-items: center;
	justify-content: center;
  padding-bottom: 300px;
	
	.modalbutton {
		position: fixed;
		bottom: 70px;
	}
`;

export const HomeContent = styled.li`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
	flex-direction: column;

`;

export const FirstContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #f9fbfe;
  width: 100%;
	height: 246px;
	border-bottom: 1px solid ${({ theme }) => theme.Gray20};

	.firstTop {
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${theme.Gray50};
    font-size: 24px;
    font-weight: 600;
		margin-bottom: 8px;
  }

	.firstMiddle {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
		margin-bottom: 24px;
  }

	.firstMiddle p {
    text-align: center;
    color: ${({ theme }) => theme.Black};
    font-size: 38px;
    font-weight: 700;
  }

`

export const Toggle = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;

.toggleSwitch_wrap {
	display: flex;
	gap: 20px;
	align-items: center;
}
.toggleSwitch_wrap span {
	display: block;
	font-size: 20px;
	height: 100%;
}
.toggleSwitch {
	position: relative;
	display: inline-block;
	width: 201px;
	height: 50px;
}
.toggleSwitch input {
	opacity: 0;
	width: 0;
	height: 0;
}
.toggleSwitch_ball {
	position: absolute;
	cursor: pointer;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: ${({ theme }) => theme.Gray10};
	border: 1px solid ${({ theme }) => theme.Gray20};
	transition: .4s;
	border-radius: 50px;
}
.toggleSwitch_ball:before {
	position: absolute;
	box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.05);
	display: flex;
  align-items: center;
  justify-content: center;
	content: "내 운동";
	font-size: 16px;
	font-weight: 600;
	height: 40px;
	width: 94px;
	left: 5px;
	bottom: 4px;
	background: #fff;
	transition: .4s;
	border-radius: 50px;
}
.switchInput:checked + .toggleSwitch_ball {
}
.switchInput:focus + .toggleSwitch_ball {
	box-shadow: 0 0 1px #eee;
}
.switchInput:checked + .toggleSwitch_ball:before {
	transform: translateX(94px);
	content: "내 보조제";
}
.switchInput:checked ~ #second { display: flex; } 
`

export const SecondContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
	margin-bottom: 1000px;
`;

export const ContentsTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
	background: ${({ theme }) => theme.Gray10};
	height: 75px;

	.contents-title {
		font-size: 18px;
		color: ${({ theme }) => theme.Gray80};
		font-weight: 500;
	}
	
`;