import React from "react";
import { View, Text, Animated } from "react-native";

import {
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';

import PropTypes from 'prop-types';

import Manager from "./manager";

import { RootSiblingPortal } from 'react-native-root-siblings';

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
			dragging:false
		}
		this.touchPositionX = new Animated.Value(0);
		this.touchPositionY = new Animated.Value(0);
		this.originalX = new Animated.Value(0);
		this.originalY = new Animated.Value(0);

	}

	_onGestureEvent = (event) => {
		let { nativeEvent: { oldState, state, translationX, translationY, x, y, absoluteX, absoluteY}} = event;
		this.touchPositionX.setValue(absoluteX);
		this.touchPositionY.setValue(absoluteY);
	}

	_onHandlerStateChange = (event) => {
		let { nativeEvent: { oldState, state, translationX, translationY, x, y, absoluteX, absoluteY}} = event;
		if(state === State.BEGAN){
			this.originalX.setValue(x);
			this.originalY.setValue(y);
		}
		if(state === State.ACTIVE){
			this.setState({
				dragging:true
			})
		}
		if (oldState === State.ACTIVE) {
			this.setState({
				dragging:false
			})
			
			let dimensionObj = {
				x: absoluteX - this.originalX._value,
				y: absoluteY - this.originalY._value,
				width: this.width,
				height: this.height,
			}
			let result = Manager.checkIntersect(dimensionObj);
			if(result){
				let accepted = Manager.callAcceptFunc(result,this.props.value);
			}
			this.originalX.setValue(0);
			this.originalY.setValue(0);
			this.touchPositionX.setValue(0);
			this.touchPositionY.setValue(0);
		}
	}

	_onLayout = ({nativeEvent: { layout: {x, y, width, height}}}) => {
		// this.getLayout();
		this.width = width;
		this.height = height;
	}

	//show view with gesture
	renderFeedback(){
		if(this.state.dragging){
			return (
				<RootSiblingPortal>
					<Animated.View
						style={[
							{
								width:this.width,
								height:this.height,
							},
							{
								position:"absolute",
								top:Animated.add(this.touchPositionY , Animated.multiply(-1, this.originalY)),
								left:Animated.add(this.touchPositionX, Animated.multiply(-1, this.originalX)),
							}
						]}
					>
						{this.props.feedback?this.props.feedback:this.renderItem()}
					</Animated.View>
				</RootSiblingPortal>
			)
		}else{
			return null
		}
	}

	//show at original position when dragging
	renderWhenDragging(){
		if(this.props.childWhenDragging){
			return this.props.childWhenDragging
		}else{
			return (
				<View style={{width:this.width,height:this.height,backgroundColor:"transparent"}}></View>
			)
		}
	}

	//show when not dragging
	renderItem(){
		return this.props.children
	}

	render(){
		return (
			<PanGestureHandler
			    onGestureEvent={this._onGestureEvent}
			    onHandlerStateChange={this._onHandlerStateChange}
			>
				<View onLayout={this._onLayout} style={this.props.style}>
					{this.state.dragging?this.renderWhenDragging():this.renderItem()}
					{this.renderFeedback()}
				</View>
			</PanGestureHandler>
		)
	}
}