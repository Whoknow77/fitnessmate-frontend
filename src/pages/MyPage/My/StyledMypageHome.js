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

		.supplementModal {
			width: 252px;
		}
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
	gap: 24px;
  align-items: center;
  justify-content: center;
	flex-direction: column;

	.contents {
		padding: 10px 0;
		display: flex;
		gap: 42px;
		flex-direction: column;
	}

	.supplementContents {
		margin-top: 39px;
		padding: 10px 0;
		display: flex;
		gap: 42px;
		flex-direction: column;
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
	top: 63px;

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

export const WorkoutContent = styled.div`
  width: 820px;
  height: 190px;
	padding: 24px;
	display: flex;
	gap: 42px;
	border-radius: 16px;
	align-items: center;

	&:hover {
		box-shadow: 0px 2px 12px #0000001a;
	}

	&:hover .item_workoutName {
		color: ${theme.Brand};
	}

	&:hover .deleteContent {
		display: flex;
	}


	img {
		border-radius: 12px;
		height: 142px;
		width: 142px;
	}

	.contentItem {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
	}

	.contentTopItem {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.itemsBodyPart {
		display: flex;
		gap: 13px;
	}

	.item_BodyPart {
		font-size: 16px;
		font-weight: 500;
		letter-spacing: -0.32px;
		line-height: 24px;
		margin-top: -1px;
		color: ${theme.Black};
	}

	.item_workoutName {
		font-size: 30px;
		font-weight: 600;
		color: ${theme.Black};
		letter-spacing: -0.6px;
		line-height: 45px;
	}

	.contentBottomItem {
		display: flex;
		gap: 30px;
	}

	.bottomTitle {
		border: 1px solid ${theme.Gray80};
		border-radius: 35px;
		padding: 10px;
		font-size: 14px;
		font-weight: 500;
		letter-spacing: -0.28px;
		color: ${theme.Gray80};
		margin-top: -1px;
	}

	.workrate {
		display: flex;
		gap: 24px;
		align-items: center;
	}

	.workrateItem {
		display: flex;
		gap: 12px;
		align-items: center;
	}

	.workrateTitle {
		font-size: 18px;
		font-weight: 500;
		color: ${theme.Gray30};
		letter-spacing: -0.36px;
	}

	.workrateContent {
		font-size: 20px;
		font-weight: 500;
		color: ${theme.Gray80};
		letter-spacing: -0.4px;
	}

	.noWorkrate {
		background: ${theme.Gray10};
		border-radius: 8px;
		display: flex;
		justify-content: space-between;
		padding: 16px;
		width: 470px;
		align-items: center;
	}

	.noWorkrateContent {
		color: ${theme.Gray80};
		font-size: 14px;
		font-weight: 500;
		letter-spacing: -0.28px;
	}

	.writeWorkrate {
		display: flex;
		gap: 4px;
		align-items: center;
		cursor: pointer;
	}

	.recommendWorkrate {
		font-size: 14px;
		font-weight: 500;
		color: ${theme.Brand};
		letter-spacing: -0.28px;
	}

	.recommendImg {
		width: 16px;
		height: 16px;
	}

	.deleteContent {
		border-radius: 36px;
		padding: 14px 24px;
		background: ${theme.ErrorLight};
		cursor: pointer;
		color: ${theme.Error};
		font-size: 16px;
		font-weight: 500;
		letter-spacing: -0.32px;
		margin-top: -1px;
		height: fit-content;
		display: none;
	}
`;


export const SupplementContent = styled.div`
  width: 820px;
	padding: 24px;
	display: flex;
	gap: 42px;
	border-radius: 16px;
	align-items: center;

	&:hover {
		box-shadow: 0px 2px 12px #0000001a;
	}

	&:hover .item_workoutName {
		color: ${theme.Brand};
	}

	&:hover .deleteContent {
		display: flex;
	}

	img {
		align-self: start;
		border-radius: 12px;
		height: 187px;
		width: 146px;
	}

	.contentItem {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
	}

	.contentMainItem {
		display: flex;
		flex-direction: column;
	}

	.topItems {
		display: flex;
		gap: 13px;
		margin-bottom: 8px;
	}

	.item_flavor-source {
		font-size: 16px;
		font-weight: 500;
		letter-spacing: -0.32px;
		line-height: 24px;
		margin-top: -1px;
		color: ${theme.Gray80};
	}

	.item_workoutName {
		font-size: 30px;
		font-weight: 600;
		color: ${theme.Black};
		letter-spacing: -0.6px;
		line-height: 45px;
	}

	.contentMiddleItem{
		padding: 15px 24px 15px 0;
		margin: 24px 0;
		display: flex;
		gap: 12px;
	}

	.PerServing {
		display: flex;
		gap: 8px;
		align-items: center;
	}

	.TitleSpan {
		font-size: 16px;
		font-weight: 500;
		color: ${theme.Gray50};
		letter-spacing: -0.32px;
	}

	.ContentSpan {
		font-size: 18px;
		font-weight: 600;
		letter-spacing: -0.32px;
		color: ${theme.Gray80};
	}

	.contentBottomItem {
		display: flex;
		justify-content: space-between;
		width: 466px;
	}

	.bottomTitle {
		font-size: 16px;
		font-weight: 500;
		color: ${theme.Gray30};
		letter-spacing: -0.32px;
	}

	.price {
		font-size: 24px;
		font-weight: 400;
		color: ${theme.Black};
		letter-spacing: -0.48px;
		align-items: center;
		display: flex;
	}

	.bottomPrice {
		font-size: 24px;
		font-weight: 600;
		color: ${theme.Black};
		letter-spacing: -0.48px;
	}

	.deleteContent {
		border-radius: 36px;
		padding: 14px 24px;
		background: ${theme.ErrorLight};
		cursor: pointer;
		color: ${theme.Error};
		font-size: 16px;
		font-weight: 500;
		letter-spacing: -0.32px;
		margin-top: -1px;
		height: fit-content;
		display: none;
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

	.supplementModal {
		width: 252px;
	}

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

export const Footer = styled.div`
	margin-top: 100px;
  width: 100%;
	height: 589px;
	bottom: 0;
	background: ${theme.Gray20};

	.frame {
		position: relative;
		width: 1920px;
		height: 589px;
		background-color: var(--text-color-gray10);
		}
		.frame .div {
		display: inline-flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 18px;
		position: absolute;
		top: 161px;
		left: 637px;
		}
		.frame .text-wrapper {
		position: relative;
		width: fit-content;
		margin-top: -1px;
		font-weight: 600;
		color: ${theme.Black};
		font-size: 15px;
		letter-spacing: -0.3px;
		line-height: 19.5px;
		white-space: nowrap;
		}
		.frame .div-2 {
		display: inline-flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 12px;
		position: relative;
		flex: 0 0 auto;
		}
		.frame .text-wrapper-2 {
		position: relative;
		width: fit-content;
		margin-top: -1px;
		font-weight: 400;
		color: v${theme.Gray70};
		font-size: 14px;
		letter-spacing: -0.28px;
		line-height: 18.2px;
		white-space: nowrap;
		}
		.frame .text-wrapper-3 {
		width: fit-content;
		font-weight: 400;
		color: ${theme.Gray70};
		white-space: nowrap;
		position: relative;
		font-size: 14px;
		letter-spacing: -0.28px;
		line-height: 18.2px;
		}
		.frame .div-3 {
		display: inline-flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 18px;
		position: absolute;
		top: 161px;
		left: 818px;
		}
		.frame .div-4 {
		display: inline-flex;
		flex-wrap: wrap;
		align-items: flex-start;
		gap: 8px 8px;
		position: relative;
		flex: 0 0 auto;
		}
		.frame .div-wrapper {
		display: inline-flex;
		align-items: flex-start;
		gap: 26px;
		position: relative;
		flex: 0 0 auto;
		}
		.frame .text-wrapper-4 {
		width: 36px;
		margin-top: -1px;
		font-weight: 400;
		color: ${theme.Gray40};
		position: relative;
		font-size: 14px;
		letter-spacing: -0.28px;
		line-height: 18.2px;
		}
		.frame .text-wrapper-5 {
		width: fit-content;
		margin-top: -1px;
		font-weight: 400;
		color: ${theme.Gray40};
		white-space: nowrap;
		position: relative;
		font-size: 14px;
		letter-spacing: -0.28px;
		line-height: 18.2px;
		}
		.frame .div-5 {
		display: inline-flex;
		align-items: flex-start;
		gap: 32px;
		position: absolute;
		top: 161px;
		left: 400px;
		}
		.frame .div-6 {
		display: inline-flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 18px;
		position: relative;
		flex: 0 0 auto;
		}
		.frame .text-wrapper-6 {
		width: fit-content;
		margin-top: -1px;
		font-weight: 600;
		color:${theme.Black};
		white-space: nowrap;
		position: relative;
		font-size: 14px;
		letter-spacing: -0.28px;
		line-height: 18.2px;
		}
		.frame .group {
		top: 112px;
		left: 400px;
		position: absolute;
		width: 60px;
		height: 13px;
		}
		.frame .overlap {
		position: relative;
		height: 13px;
		}
		.frame .group-2 {
		top: 0;
		left: 0;
		background-size: 100% 100%;
		position: absolute;
		width: 60px;
		height: 13px;
		}
		.frame .overlap-group {
		position: absolute;
		width: 5px;
		height: 13px;
		top: 0;
		left: 11px;
		}
		.frame .rectangle {
		position: absolute;
		width: 2px;
		height: 13px;
		top: 0;
		left: 1px;
		background-color: ${theme.Gray80};
		border-radius: 0px 0.52px 0px 0px;
		}
		.frame .rectangle-2 {
		position: absolute;
		width: 5px;
		height: 2px;
		top: 3px;
		left: 0;
		background-color: ${theme.Gray80};
		}
		.frame .overlap-2 {
		position: absolute;
		width: 5px;
		height: 13px;
		top: 0;
		left: 45px;
		}
		.frame .div-7 {
		display: flex;
		flex-direction: column;
		width: 5px;
		height: 13px;
		align-items: center;
		justify-content: space-between;
		position: absolute;
		top: 0;
		left: 6px;
		}
		.frame .rectangle-3 {
		position: relative;
		width: 6.23px;
		height: 2.08px;
		margin-left: -0.5px;
		margin-right: -0.5px;
		background-color: #0a98ff;
		border-radius: 0.52px 0.52px 0px 0px;
		}
		.frame .vector {
		position: relative;
		width: 2.62px;
		height: 8.31px;
		}
		
`;