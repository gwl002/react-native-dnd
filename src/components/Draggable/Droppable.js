import PropTypes from 'prop-types';
import React from "react";
import { View } from "react-native";
import Manager from "./manager";

export default class Droppable extends React.Component {
	static propTypes = {
		onWillAccept: PropTypes.func,
		onAccept: PropTypes.func.isRequired,
		ID: PropTypes.string.isRequired,
		style: PropTypes.any
	}

	static defaultProps = {
		onWillAccept: () => true,
		onAccept: () => null,
		style: null,
		ID: "0"
	}

	constructor(props) {
		super(props);
	}

	saveLayout(dimensions) {
		Manager.register({
			id: this.props.ID,
			dimensions: dimensions,
			onWillAccept: this.props.onWillAccept,
			onAccept: this.props.onAccept
		})
	}

	componentDidMount() {
		this.viewRef && this.viewRef.measure((x, y, width, height, pageX, pageY) => {
			this.saveLayout({
				x: pageX,
				y: pageY,
				width: width,
				height: height
			})
		})
	}

	componentWillUnmount() {
		Manager.unregister({ id: this.props.ID })
	}

	_onLayout = ({ nativeEvent: { layout: { x, y, width, height } } }) => {
		// Manager.register({id:this.props.ID,dimensions:{x,y,width,height},callback:this.props.onWillAccept});
		this.viewRef && this.viewRef.measure((x, y, width, height, pageX, pageY) => {
			this.saveLayout({
				x: pageX,
				y: pageY,
				width: width,
				height: height
			})
		})
	}

	render() {
		return (
			<View onLayout={this._onLayout} style={this.props.style} ref={ref => this.viewRef = ref}>
				{this.props.children}
			</View>
		)
	}
}