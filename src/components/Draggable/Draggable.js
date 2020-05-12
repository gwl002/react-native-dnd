import React from "react";
import { View, Text, Animated } from "react-native";

import {
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';

import PropTypes from 'prop-types';

import Manager from "./manager";

export default class Draggable extends React.Component{
	static propTypes = {
		value: PropTypes.any,
		style: PropTypes.any,
		feedback: PropTypes.node,
		childWhenDragging: PropTypes.node,
	}

	static defaultProps = {
		value: {},
		style: null,
		feedback: null,
		childWhenDragging: null
	}

	constructor(props) {
		super(props);
		this.state={
			isActive:false
		}
		this._translateX = new Animated.Value(0);
		this._translateY = new Animated.Value(0);
		this._lastOffset = { x: 0, y: 0 };
		this._onGestureEvent = Animated.event(
		    [
		      {
		        nativeEvent: {
		          translationX: this._translateX,
		          translationY: this._translateY,
		        },
		      },
		    ],
		    { useNativeDriver: true }
		);
	}

	_onHandlerStateChange = (event) => {
		let { nativeEvent: { oldState, translationX, translationY, x, y, absoluteX, absoluteY}} = event;
		if (oldState === State.ACTIVE) {
			let dimensionObj = {
				x: absoluteX - x,
				y: absoluteY - y,
				width: this.width,
				height: this.height,
			}
			let result = Manager.checkIntersect(dimensionObj);
			if(result){
				let accepted = Manager.callAcceptFunc(result,this.props.value);
				if(!accepted){
					this._translateX.setValue(0);
					this._translateY.setValue(0);
				}
			}else{
				this._translateX.setValue(0);
				this._translateY.setValue(0);
			}
		}
	}

	// componentDidMount(){
	// 	this.getLayout();
	// }

	// getLayout(){
	// 	this.viewRef && this.viewRef.measure((x,y,width,height,pageX,pageY) => {
	// 		this.x = pageX;
	// 		this.y = pageY;
	// 		this.width = width;
	// 		this.height = height;
	// 	})
	// }

	_onLayout = ({nativeEvent: { layout: {x, y, width, height}}}) => {
		// this.getLayout();
		this.width = width;
		this.height = height;
	}

	render(){
		return (
			<PanGestureHandler
			    onGestureEvent={this._onGestureEvent}
			    onHandlerStateChange={this._onHandlerStateChange}
			>
				<Animated.View
					// ref = { ref => this.viewRef = ref}
					onLayout={this._onLayout}
					style={[
						this.props.style,
						{
							transform: [
								{ translateX: this._translateX },
								{ translateY: this._translateY },
							]
						}
					]}
				>
					{this.props.children}
				</Animated.View>
			</PanGestureHandler>
		)
	}
}