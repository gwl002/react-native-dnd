import React, { useState, useRef, useEffect } from 'react';

import {
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Animated,
  StatusBar,
  AppRegistry
} from 'react-native';


import {
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';

import { RootSiblingPortal } from 'react-native-root-siblings';

export default class Node extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
		};

		this._translateX = new Animated.Value(0);
		this._translateY = new Animated.Value(0);

		this._onHandlerStateChange = this._onHandlerStateChange.bind(this);
		this._onGestureEvent = this._onGestureEvent.bind(this);
	}

	_onGestureEvent(event){
		let { nativeEvent: { oldState, translationX, translationY, x, y, absoluteX, absoluteY}} = event;
		this._translateX.setValue(translationX);
		this._translateY.setValue(translationY);
	}

	_onHandlerStateChange(event){
		let { nativeEvent: { state, oldState, translationX, translationY, x, y, absoluteX, absoluteY}} = event;
		if (oldState === State.ACTIVE) {
			this._translateY.setValue(0);
			this._translateX.setValue(0);
		}
	}

	render(){
		let {array} = this.props;
		if(array.length ===0) return null;
		let [value,...rest] = array;
		return (
			<PanGestureHandler
			    onGestureEvent={this._onGestureEvent}
			    onHandlerStateChange={this._onHandlerStateChange}
			>
				<Animated.View 
					style={{
						width:"100%",
						position:"absolute",
						top:50,
						height:200,
						backgroundColor:"lightblue",
						opacity:this.state.isDragging?0.5:1,
						transform:[
							{
								translateX: this._translateX,
							},
							{
								translateY: this._translateY
							}
						]
					}}
				>
					<Text>{value}</Text>
					<Node array={rest} />
				</Animated.View>
			</PanGestureHandler>
		)
	}
}