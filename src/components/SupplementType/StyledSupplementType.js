import styled from "styled-components";
export const CardContainer = styled.div`
  display: inline-block;
  width: 312px;
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

  .imageArea {
    border: 1px solid ${({ theme }) => theme.Neutral300};
    border-radius: 12px;
    width: 100%;
    height: 250px;
    overflow: hidden;
    position: relative;
  }

  .supplementImg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
  }

  .supplementInfo {
    padding: 24px 8px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    .supplementTitle {
      color: ${({ theme }) => theme.Neutral990};
      font-size: 24px;
      font-weight: 600;
      letter-spacing: -0.48px;
    }
    .supplementPartContainer {
      display: flex;
      gap: 4px;

      .supplementSource {
        border-radius: 4px;
        background: ${({ theme }) => theme.BrandLight};
        display: flex;
        padding: 6px 13px;
        justify-content: center;
        align-items: center;
        gap: 10px;
        color: ${({ theme }) => theme.Brand600};
        font-size: 12px;
        font-weight: 500;
        letter-spacing: -0.24px;
      }
      .supplementFlavor {
        border-radius: 4px;
        background: ${({ theme }) => theme.Neutral300};
        display: flex;
        padding: 6px 13px;
        justify-content: center;
        align-items: center;
        gap: 10px;
        color: ${({ theme }) => theme.Neutral990};
        font-size: 12px;
        font-weight: 500;
        letter-spacing: -0.24px;
      }
    }
    .supplementPrice {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      color: ${({ theme }) => theme.Neutral900};
    }
    .supplementPrice span {
      font-size: 24px;
      font-weight: 600;
      letter-spacing: -0.48px;
    }
    .supplementPrice p {
      font-size: 24px;
      font-weight: 500;
      letter-spacing: -0.48px;
    }
  }

  &:hover {
    .imageArea {
      box-shadow: 0px 4px 28px #00000026;
    }
    .supplementTitle {
      color: ${({ theme }) => theme.Brand600};
    }
  }
`;
