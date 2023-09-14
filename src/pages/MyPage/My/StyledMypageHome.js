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

export const HomeContent = styled.div`
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
`;

export const Toggle = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .toggleSwitch_wrap {
    display: flex;
    gap: 20px;
    align-items: center;
  }

  .toggleSwitch {
    position: relative;
    display: inline-block;
    width: 201px;
    height: 50px;
  }
`;

export const SecondContent = styled.div`
  width: 100%;
	min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
	flex-direction: column;

	.dummy-height {
		height: 1000px;
	}
`;

export const ContentsTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
	gap: 32px;
	background: ${({ theme }) => theme.Gray10};
	height: 75px;
	margin-bottom: 24px;
	position: sticky;
	top: 64px;

  .contents-title {
    font-size: 18px;
    color: ${({ theme }) => theme.Gray80};
    font-weight: 500;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  .btn {
    display: flex;
		align-items: center;
		justify-content: center;
    padding: 10px 20px;
		height: 47px;
    color: ${({ theme }) => theme.Brand};
    font-size: 18px;
    letter-spacing: -0.36px;
    background-color: ${({ theme }) => theme.White};
    box-shadow: 0px 4px 8px #0000000d;
    border-radius: 6px;

    &.active {
      color: ${({ theme }) => theme.White};
      background-color: ${({ theme }) => theme.Brand};
    }

    &:hover {
      opacity: 0.5;
    }
  }
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  div {
    font-size: 100px;
  }
`;

// modal button

export const FixModalButton = styled.button`
  width: 109px;
  height: 48px;
  border-radius: 6px;
  background-color: ${theme.BrandLighter};
  box-shadow: 0px 4px 8px #0000000d;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  img {
    width: 28px;
    height: 28px;
  }

  p {
    font-weight: 500;
    color: ${theme.Brand};
    font-size: 18px;
    letter-spacing: -0.36px;
  }
`;

export const AddModalButton = styled.button`
  width: 237px;
  height: 56px;
  border-radius: 35px;
	background-color: ${theme.Brand};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  &:hover {
    background-color: ${theme.BrandDark};
  }

  img {
    width: 24px;
    height: 24px;
  }

  p {
    font-weight: 500;
    color: ${theme.White};
    font-size: 18px;
    letter-spacing: -0.36px;
  }
`;