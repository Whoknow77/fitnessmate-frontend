import styled from "styled-components";
export const CardContainer = styled.div`
  display: inline-block;
  width: 23%;
  margin: 10px 12px;
  text-align: center;
  position: relative;
	border: 1px solid ${({ theme }) => theme.Gray20};
	border-radius: 16px;
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

  .supplementImg {
    border-radius: 16px 16px 0px 0px;
    width: 100%;
  }
  .supplementPartContainer {
    position: absolute;
    left: 5%;
    top: 3%;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    .supplementFlavor {
      border-radius: 4px;
      background: ${({ theme }) => theme.BrandLighter};
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
		.supplementSource {
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
  .supplementInfo {
    height: 169px;
    padding: 24px 16px 20px 16px;
    border-radius: 0px 0px 16px 16px;
    background: ${({ theme }) => theme.Gray10};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .supplementTitle {
      color: ${({ theme }) => theme.Black};
      font-size: 24px;
      font-weight: 600;
      letter-spacing: -0.48px;
			margin-bottom: 7px;
    }
    .supplementExplain {
      color: ${({ theme }) => theme.Black};
      font-size: 16px;
      text-align: left;
      letter-spacing: -0.32px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
			margin-bottom: 14px;
    }
		.supplementPrice {
			color: ${({ theme }) => theme.Black};
      font-size: 24px;
			font-weight: 600;
      text-align: left;
      letter-spacing: -0.32px;
		}
  }
`;
