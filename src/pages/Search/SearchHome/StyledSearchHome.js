import { styled } from "styled-components";
import theme from "../../../styles/theme";

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  .searchTopWrapper {
    max-width: 812px;
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    .searchTitleWrapper {
      display: flex;
      flex-direction: column;
      gap: 24px;
      padding: 20px 0;
      .searchTitleTextWrapper {
        display: flex;
        flex-direction: column;
        gap: 8px;

        .searchTitle1 {
          text-align: center;
          color: ${theme.Gray50};
          font-size: 24px;
          font-weight: 700;
        }
        .searchTitle2 {
          text-align: center;
          color: ${theme.Black};
          font-size: 38px;
          font-weight: 700;
        }
      }
    }
  }

  .searchContentWrapper {
		display: flex;
		max-width: 1032px;
		margin: 0 auto;
		flex-wrap: wrap;
    gap: 48px;
    text-align: left;
    @media screen and (max-width: 825px) {
      text-align: center;
    }
  }

  .serachButtonWrapper {
		margin-top: 100px;
		margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 58px;
    .BtnWrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 48px;
      padding: 10px;
      .backBtnText {
        color: ${theme.BrandNon};
        font-size: 24px;
      }
      .nextBtnText {
        color: ${theme.Brand};
        font-size: 24px;
      }
    }
  }
`;

export const Toggle = styled.div`
  display: flex;
  justify-content: center;
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

export const SectionContainer = styled.div`
	display: flex;
	gap: 20px;
	flex-direction: column;
	width: 100%;

	.searchBarWrapper {
		display: flex;
		flex-direction: column;
    gap: 46px;
		max-width: 1032px;
		width: 90%;
		margin: 0 auto;
	}
`

export const Filter = styled.div`

	max-width: 812px;
	display: flex;
	position: relative;

	.searchBarFilter {
      display: flex;
			gap: 4px;
			max-width: 100%;
			min-height: 50px;
      padding: 10px;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
			border: 1px solid 
				${({ theme, isClicked }) => (isClicked ? theme.Brand : theme.Gray30)};
			background: ${theme.Gray20};
			cursor: pointer;

      .searchBarFilterText {
        color: ${({ theme, isClicked }) => (isClicked ? theme.Brand : theme.Black)};
        text-align: center;
        font-size: 18px;
				font-weight: 500;
				letter-spacing: -0.36px;
				user-select: none; // 요소가 드래그 되는 걸 방지
      }

			.searchBarFilterToggleBtn {
				cursor: pointer;
				z-index: 800;
				user-select: none; // 요소가 드래그 되는 걸 방지
			}

			.searchBarFilterToggleBtn g path {
				fill: ${({ theme, isClicked }) => (isClicked ? '#0B98FF' : '#6B7684')};
			}

			// 돌아가는 경우
			// .rotate-right {
			// 	transform: rotate(180deg);
			// 	transition: transform 0.1s ease;
			// }

			// .rotate-left {
			// 	transform: rotate(-0deg);
			// 	transition: transform 0.1s ease;
			// }

			// 뒤집히는 경우
			.rotate-right {
				transform: scaleY(-1);
				transition: transform 0.1s ease;
			}

			.rotate-left {
				transform: scaleY(1);
				transition: transform 0.1s ease;
			}

			.addFilter {
				display: flex;
				flex-wrap: wrap;
				gap: 4px;

				.searchFilterContent {
					border-radius: 4px;
					background: ${theme.Gray20};
					color: ${({ theme, isClicked }) => (isClicked ? theme.Brand : theme.Gray80)};
					font-size: 18px;
					font-weight: 500;
				}
			}
	}

	.searchFilterModalWrapper {
		position: absolute;
		top: 55px;
		height: fit-content;
		display: flex;
		flex-direction: column;
		padding: 20px;
		gap: 12px;
		border-radius: 12px;
		border: 1px solid ${theme.Gray20};
		background: ${theme.White};
		box-shadow: 0px 3px 11.6px #00000033;
		z-index: 900;

		.selectOptionArea {
			display: flex;
			flex-direction: column;
			gap: 4px;

			.selectOptionTitle {
				font-weight: 500;
				color: ${theme.Gray50};
				font-size: 14px;
				letter-spacing: -0.28px;
			}

			.selectOption {
				display: flex;
				flex-wrap: wrap;
				gap: 5px;
				padding: 12px;
				background-color: ${theme.Gray10};
				border-radius: 10px;
				border: 1px solid ${theme.Gray20};

				p {
					font-weight: 600;
					color: ${theme.Gray40};
					font-size: 16px;
					letter-spacing: -0.32px;
					line-height: 24px;
				}

				button {
					display: flex;
					gap: 8px;
					align-items: center;
					padding: 4px 8px;
					border-radius: 4px;
					background: ${theme.BrandLight};
					color: ${theme.Brand};
					font-size: 16px;
					font-weight: 500;
				}
			}
		}
		
		.bodypartsOption {
			display: flex;
			gap: 55px;

			#opperbody {
				padding-left: 4px;
			}

			.body {
				display: flex;
				flex-direction: column;
				gap: 8px;

				.bodyTitle {
					font-weight: 500;
					color: ${theme.Gray50};
					font-size: 14px;
				}

				.bodyOption {
					display: flex;
					flex-direction: column;
					gap: 8px;
				}
			}
		}
	}
	.searchFilterModalWrapper.fitness {
		width: 316px;
		bottom: -340px;
	}
	}

	.searchFilterModalContent {
		display: flex;
		align-items: center;
		gap: 8px;
		color: ${theme.Gray70};
		font-size: 18px;
		font-weight: 500;
		padding: 0px;
	}

	.searchFilterModalContent .checkSimbol {
		.bodypartCheck {
			display: none;
		}
		.bodypartNoneCheck {
			display: flex;
		}
	}

	.searchFilterModalContent.active {
		color: ${theme.Brand};
	}

	.searchFilterModalContent.active .checkSimbol {
		.bodypartCheck {
			display: flex;
		}
		.bodypartNoneCheck {
			display: none;
		}
	}

`