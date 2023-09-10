import styled from "styled-components";
export const CardContainer = styled.div`
  display: inline-block;
  width: 23%;
  margin: 10px 12px;
  text-align: center;
  position: relative;
	border: 1px solid ${({ theme }) => theme.Gray20};
	border-radius: 17px;
	cursor: pointer;

	&:hover {
		box-shadow: 0px 4px 30px #00000040;
	}


  @media screen and (max-width: 1400px) {
    width: 31%;
  }

  @media screen and (max-width: 1100px) {
    width: 47%;
  }

  @media screen and (max-width: 825px) {
    width: 88%;
  }

  .fitnessImg {
    border-radius: 16px 16px 0px 0px;
    width: 100%;
  }
  .fitnessPartContainer {
    position: absolute;
    left: 5%;
    top: 3%;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    .fitnessPart {
      border-radius: 4px;
      background: ${({ theme }) => theme.BrandLight};
      display: flex;
      padding: 6px 13px;
      justify-content: center;
      align-items: center;
      gap: 10px;
      color: ${({ theme }) => theme.Brand};
      font-size: 12px;
      font-weight: 700;
      letter-spacing: -0.24px;
    }
  }
  .fitnessInfo {
    height: 145px;
    padding: 24px 10px 20px 16px;
    border-radius: 0px 0px 16px 16px;
    background: ${({ theme }) => theme.Gray10};
    display: flex;
    flex-direction: column;
    gap: 7px;
    align-items: flex-start;
    .fitnessTitle {
      color: ${({ theme }) => theme.Black};
      font-size: 24px;
      font-weight: 700;
      letter-spacing: -0.48px;
    }
    .fitnessExplain {
      color: ${({ theme }) => theme.Gray80};
      font-size: 16px;
      text-align: left;
      letter-spacing: -0.32px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;
