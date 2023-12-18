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
			animation: null
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
		const { switchPosition } = this.state;
		let animation = null;
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
	};

	render() {
		const { labels } = this.props;

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
					id="label"
					className={`left-title ${this.state.switchPosition === "left" && "white-font"
						}`}
					htmlFor="left"
				>
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
					id="label"
					className={`center-label ${this.state.switchPosition === "center" && "white-font"
						}`}
					htmlFor="center"
				>
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
					id="label"
					className={`right-title ${this.state.switchPosition === "right" && "white-font"
						}`}
					htmlFor="right"
				>
					<h4 className="title">{labels.right.title}</h4>
				</label>
			</div>
		);
	}
}

TripleToggleSwitch.propTypes = propTypes;
TripleToggleSwitch.defaultProps = defaultProps;

export default TripleToggleSwitch;
