import styled from "styled-components";
export const CardContainer = styled.div`
  display: inline-block;
  width: 312px;
  text-align: center;
  position: relative;
	cursor: pointer;

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
		border: 1px solid ${({ theme }) => theme.Gray20};
    border-radius: 12px;
    width: 100%;
		height: 250px;
  }

  .fitnessInfo {
    padding: 24px 8px;
    display: flex;
    flex-direction: column;
    gap: 18px;
    align-items: flex-start;

    .fitnessTitle {
      color: ${({ theme }) => theme.Black};
      font-size: 24px;
      font-weight: 600;
      letter-spacing: -0.48px;
    }

		.fitnessPartContainer {
			display: flex;
			gap: 4px;
			flex-wrap: wrap;
		}
	
		.fitnessPart {
      border-radius: 4px;
      background: ${({ theme }) => theme.Gray20};
      display: flex;
      padding: 6px 13px;
      justify-content: center;
      align-items: center;
      color: ${({ theme }) => theme.Black};
      font-size: 14px;
      font-weight: 500;
      letter-spacing: -0.28px;
    }
		
  }

	&:hover {
		.fitnessImg {
			box-shadow: 0px 4px 28px #00000026;
		}
		.fitnessTitle {
      color: ${({ theme }) => theme.Brand};
    }
	}
`;
