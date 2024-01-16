import { styled } from "styled-components";
import theme from "../../../styles/theme";

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

	.searchAreaOverlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: ${theme.White};
		opacity: 0.6;
		z-index: 101;
	}

  .searchTopWrapper {
		margin-top: 140px;
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
          font-weight: 600;
					font-size: 20px;
        }
        .searchTitle2 {
          text-align: center;
          color: ${theme.Black};
          font-weight: 600;
					font-size: 30px;
        }
      }
    }
  }

	.noSearch {
		z-index: 9;
	}
	.noSearch.opacity {
		z-index: 103;
	}

  .searchContentWrapper {
		display: flex;
		flex-direction: column;
		width: 1032px;
		margin: 62px auto 4px auto;
		gap: 82px;
		
		.searchContent {
			width: 1032px;
			display: flex;
			flex-wrap: wrap;
			gap: 48px;
		}

		.serachButtonWrapper {
			margin-top: 100px;
			margin: 0 auto;
			display: flex;
			align-items: center;
			gap: 18px;
	
				.backBtnImg {
					cursor: pointer;
				}
				.backBtnImg.nonActivePage {
					opacity: 0.3;
					cursor: auto;
				}
				.nextBtnImg {
					cursor: pointer;
				}
				.nextBtnImg.nonActivePage {
					opacity: 0.3;
					cursor: auto;
				}
	
				.paginationWrapper {
					display: flex;
					align-items: center;
					gap: 12px;
	
					.pageItem {
						width: 30px;
						height: 30px;
						display: flex;
						align-items: center;
						justify-content: center;
						border-radius: 16px;
						font-weight: 500;
						color: ${theme.Gray70};
						font-size: 15px;
						letter-spacing: -0.3px;
						cursor: pointer;
					}
					.pageItem.activePage {
						color: ${theme.White};
						background-color: ${theme.Gray80};
					}
				}
		}

  }
	.searchContentWrapper.opacity {
		z-index: 103;
	}

`;

export const SwitchMenu = styled.div`
	margin: 32px auto 0 auto;
	width: 1032px;
	display: flex;
	gap: 12px;

	.menuCategory1 {
		font-weight: 500;
		color: ${({ theme }) => theme.Gray40};
		font-size: 20px;
		letter-spacing: -0.4px;
		cursor: pointer;
		padding: 0 6px 16px 6px;
		border-bottom: 5px solid ${({ theme }) => theme.White};
	}
	.menuCategory2 {
		font-weight: 500;
		color: ${({ theme }) => theme.Gray40};
		font-size: 20px;
		letter-spacing: -0.4px;
		cursor: pointer;
		padding: 0 6px 16px 6px;
		border-bottom: 5px solid ${({ theme }) => theme.White};
	}
	.menuCategory1.active {
		color: ${({ theme }) => theme.Gray80};
		border-bottom: 5px solid ${({ theme }) => theme.Gray80};
	}
	
	.menuCategory2.active {
		color: ${({ theme }) => theme.Gray80};
		border-bottom: 5px solid ${({ theme }) => theme.Gray80};
	}
`;

export const SectionContainer = styled.div`
	display: flex;
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

	.switchMenuCategory {
		top: 64px;
		width: 100%;
		display: flex;
		align-items: center;
		gap: 32px;
		background: ${({ theme }) => theme.Gray10};
		height: 64px;
		position: sticky;
		z-index: 999;

		.bodypartsCategory {
			width: 1032px;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
	
			.bodypartsContainer {
				display: flex;
				gap: 7px;
	
				.bodypartButton {
					display: flex;
					align-items: center;
					justify-content: center;
					padding: 8px 12px;
					cursor: pointer;
					border-radius: 34px;
				}
				.bodypartButtonText {
					font-weight: 500;
					color: ${theme.Gray50};
					font-size: 18px;
					letter-spacing: -0.36px;
				}
				.bodypartButton.active {
					background: ${theme.Brand};
				}
				.bodypartButtonText.active {
					font-weight: 600;
					color: ${theme.White};
				}
			}
	
			.searchOpenButton {
				display: flex;
				gap: 7px;
				padding: 10px 14px;
				background-color: ${theme.Gray20};
				border-radius: 37px;
				border: 1px solid ${theme.Gray30};
				cursor: pointer;
	
				.searchOpenIcon {
					width: 20px;
					height: 20px;
				}
	
				.searchOpenText {
					font-weight: 500;
					color: ${theme.Gray50};
					font-size: 16px;
					letter-spacing: -0.32px;
				}
			}
		}
	}
	.switchMenuCategory.open {
		position: relative;
		top: 0;
		z-index: 999;
	}
`

export const SearchArea = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 103;

	.searchArea {
		width: 909.04px;
		height: 0;
		overflow: hidden;
  	opacity: 0; // 처음에는 투명하게 설정
		transition: height 0.5s ease, opacity 0.5s 0.4s ease; // 펼쳐지는 지속시간 ease, 투명도변하는 지속시간 지연시간
		position: relative;

		.searchBar {
			position: absolute;
			top: 188px;
			left: 50%;
			transform: translate(-50%, 0);
		}

		.searchCloseIcon {
			width: 20px;
			height: 21px;
			position: absolute;
			top: 92.26px;
			right: 0px;
			cursor: pointer;
		}
	}

	.searchArea.open {
		width: 909.04px;
		height: 420px;// 펼쳐진 상태의 높이를 설정
		opacity: 1; // 서서히 나타나도록 투명도를 조절
		position: relative;

		.searchBar {
			position: absolute;
			top: 188px;
			left: 50%;
			transform: translate(-50%, 0);
		}

		.searchCloseIcon {
			width: 20px;
			height: 21px;
			position: absolute;
			top: 92.26px;
			right: 0px;
			cursor: pointer;
		}
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
			.footerLogo {
				width: 60px;
			}
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