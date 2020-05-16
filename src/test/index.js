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

import Node from "./Node";

import { RootSiblingPortal } from 'react-native-root-siblings';

export default class App extends React.Component{
	constructor(props) {
		super(props);
	}

	render(){
		return (
			<View style={{flex:1,backgroundColor:"yellow",paddingTop:100}}>
				<Node array={[1,2,3,4,5,6]} />
			</View>
		)
	}
}