// 토글 구현

import React from "react";
import PropTypes from "prop-types";
import "./myToggle.css";

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
		right: {
			title: "right",
			value: "right"
		}
	},
};

class ToggleSwitch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			switchPosition: "left",
			animation: null
		};
	}

	getSwitchAnimation = (value) => {
		const { switchPosition } = this.state;
		let animation = null;
		if (value === "right" && switchPosition === "left") {
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
			<div className="main-container">
				<div
					className={`switch ${this.state.animation} ${this.state.switchPosition}-position`}
				></div>
				<input
					defaultChecked
					onChange={(e) => this.getSwitchAnimation(e.target.value)}
					name="map-switch"
					id="left"
					type="radio"
					value="left"
				/>
				<label
					className={`left-label ${this.state.switchPosition === "left" && "black-font"
						}`}
					htmlFor="left"
					id="left-label"
				>
					<h4>{labels.left.title}</h4>
				</label>

				<input
					onChange={(e) => this.getSwitchAnimation(e.target.value)}
					name="map-switch"
					id="right"
					type="radio"
					value="right"
				/>
				<label
					className={`right-label ${this.state.switchPosition === "right" && "black-font"
						}`}
					htmlFor="right"
					id="right-label"
				>
					<h4>{labels.right.title}</h4>
				</label>
			</div>
		);
	}
}

ToggleSwitch.propTypes = propTypes;
ToggleSwitch.defaultProps = defaultProps;

export default ToggleSwitch;
