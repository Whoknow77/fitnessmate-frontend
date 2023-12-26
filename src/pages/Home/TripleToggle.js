import React from "react";
import PropTypes from "prop-types";
import "./StyledTripleToggle.css";

const valueType = PropTypes.oneOfType([
	PropTypes.string,
	PropTypes.number,
	PropTypes.bool
]);

const propTypes = {
	labels: PropTypes.shape({
		left: {
			title: PropTypes.string.isRequired,
			value: valueType
		},
		center: {
			title: PropTypes.string.isRequired,
			value: valueType
		},
		right: {
			title: PropTypes.string.isRequired,
			value: valueType
		}
	}),
	onChange: PropTypes.func.isRequired,
	styles: PropTypes.object
};

const defaultProps = {
	labels: {
		left: {
			title: "left",
			value: "left"
		},
		center: {
			title: "center",
			value: "center"
		},
		right: {
			title: "right",
			value: "right"
		}
	},
	onChange: (value) => console.log("value:", value)
};

class TripleToggleSwitch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			switchPosition: "left",
			animation: null,
			showSpinner: {  // 1. showSpinner 추가
				left: false,
				center: false,
				right: false
			}
		};
	}

	componentDidUpdate(prevProps) {
		// 현재 props와 이전 props의 value 비교
		if (this.props.value !== prevProps.value) {
			// value가 변경되었을 때 getSwitchAnimation 호출
			this.getSwitchAnimation(this.props.value);
		}
	}

	getSwitchAnimation = (value) => {
		const { switchPosition, showSpinner } = this.state;
		let animation = null;

		// 현재 활성화된 라벨에 대한 showSpinner를 false로 설정하여 스피너 감추기
		Object.keys(showSpinner).forEach(label => {
			if (label !== value) {
				showSpinner[label] = false;
			}
		});

		// 해당 라벨의 showSpinner를 true로 설정하여 스피너를 표시
		this.setState({
			showSpinner: {
				...showSpinner,
				[value]: true
			}
		});


		if (value === "center" && switchPosition === "left") {
			animation = "left-to-center";
		} else if (value === "right" && switchPosition === "center") {
			animation = "center-to-right";
		} else if (value === "center" && switchPosition === "right") {
			animation = "right-to-center";
		} else if (value === "left" && switchPosition === "center") {
			animation = "center-to-left";
		} else if (value === "right" && switchPosition === "left") {
			animation = "left-to-right";
		} else if (value === "left" && switchPosition === "right") {
			animation = "right-to-left";
		}

		this.props.onChange(value);
		this.setState({ switchPosition: value, animation });

		// 2. 일정 시간 후에 스피너를 숨기고 showSpinner를 false로 설정
		setTimeout(() => {
			this.setState({
				showSpinner: {
					...showSpinner,
					[value]: false
				}
			});
		}, 5000); // 3초
	};

	render() {
		const { labels } = this.props;
		const { showSpinner } = this.state;

		return (
			<div className="main">
				<div
					className={`switch-label ${this.state.animation} ${this.state.switchPosition}-position`}
				></div>
				<input
					defaultChecked
					checked={this.state.switchPosition === "left"}
					onChange={() => this.getSwitchAnimation("left")}  // 변경된 부분
					name="map-switch"
					id="left"
					type="radio"
					value="left"
				/>
				<label
					id="left-label"
					className={`left-title ${this.state.switchPosition === "left" && "white-font"} ${showSpinner.left && "show-spinner"}`}
					htmlFor="left"
				>
					{showSpinner.left && <div className="spinner"></div>}
					<h4 className="title">{labels.left.title}</h4>
				</label>

				<input
					checked={this.state.switchPosition === "center"}
					onChange={() => this.getSwitchAnimation("center")}
					name="map-switch"
					id="center"
					type="radio"
					value="center"
				/>
				<label
					id="right-label"
					className={`center-label ${this.state.switchPosition === "center" && "white-font"} ${this.state.switchPosition === "left" && "left"} ${showSpinner.center && "show-spinner"}`}
					htmlFor="center"
				>
					{showSpinner.center && <div className="spinner"></div>}
					<h4 className="title">{labels.center.title}</h4>
				</label>

				<input
					checked={this.state.switchPosition === "right"}
					onChange={() => this.getSwitchAnimation("right")}
					name="map-switch"
					id="right"
					type="radio"
					value="right"
				/>
				<label
					id="right-label"
					className={`right-title ${this.state.switchPosition === "right" && "white-font"} ${this.state.switchPosition === "left" && "left"} ${showSpinner.right && "show-spinner"}`}
					htmlFor="right"
				>
					{showSpinner.right && <div className="spinner"></div>}
					<h4 className="title">{labels.right.title}</h4>
				</label>
			</div>
		);
	}
}

TripleToggleSwitch.propTypes = propTypes;
TripleToggleSwitch.defaultProps = defaultProps;

export default TripleToggleSwitch;
