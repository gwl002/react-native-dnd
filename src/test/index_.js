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

export default class App extends React.Component{
	constructor(props) {
		super(props);

		this.state = {
			isDragging:false
		};

		this._translateX = new Animated.Value(0);
		this._translateY = new Animated.Value(0);

		this._positionX = new Animated.Value(0);
		this._positionY = new Animated.Value(0);
		//开始触摸点在容器内部位置
		this._originalX = new Animated.Value(0);
		this._originalY = new Animated.Value(0);

		this._onHandlerStateChange = this._onHandlerStateChange.bind(this);
		this._onGestureEvent = this._onGestureEvent.bind(this);
	}

	_onGestureEvent(event){
		let { nativeEvent: { oldState, translationX, translationY, x, y, absoluteX, absoluteY}} = event;
		// console.warn(absoluteX,absoluteY,x,y);
		this._positionX.setValue(absoluteX);
		this._positionY.setValue(absoluteY);
		this._translateX.setValue(translationX);
		this._translateY.setValue(translationY);
	}

	_onHandlerStateChange(event){
		let { nativeEvent: { state, oldState, translationX, translationY, x, y, absoluteX, absoluteY}} = event;
		if(state === State.BEGAN){
			this._originalX.setValue(x);
			this._originalY.setValue(y);
		}
		if(state === State.ACTIVE){
			this.setState({
				isDragging: true
			})
		}
		if (oldState === State.ACTIVE) {
			this._originalX.setValue(0);
			this._originalY.setValue(0);
			this._translateY.setValue(0);
			this._translateX.setValue(0);
			this._positionX.setValue(0);
			this._positionY.setValue(0);
			this.setState({
				isDragging:false
			})
		}
	}

	renderMask(){
		if(this.state.isDragging){
			return (
				<Animated.View 
					style={{
						position:"absolute",
						width:100,
						height:100,
						backgroundColor:"blue",
						top:Animated.add(this._positionY , Animated.multiply(-1, this._originalY)),
						left:Animated.add(this._positionX, Animated.multiply(-1, this._originalX))
					}}
				>
					
				</Animated.View>
			)
		}else{
			return null;
		}
		
	}

	render(){
		return (
			<View style={{flex:1}}>
				<RootSiblingPortal>
					{this.renderMask()}
				</RootSiblingPortal>
				<View style={{height:100,backgroundColor:"red"}}/>
				<PanGestureHandler
				    onGestureEvent={this._onGestureEvent}
				    onHandlerStateChange={this._onHandlerStateChange}
				>
					<Animated.View 
						style={{
							marginTop:200,
							height:100,
							width:100,
							backgroundColor:"yellow",
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
					</Animated.View>
				</PanGestureHandler>
			</View>
		)
	}
}