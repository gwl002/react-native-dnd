/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { Draggable, Droppable } from "../components/Draggable";


let originalList1 = [1,2,3,4];
let originalList2 = [5,6,7,8];

let originalList3 = [9,10,11,12,13,14,15];


class App extends React.Component{
  constructor(props) {
    super(props);
  
    this.state = {
      list1: originalList1,
      list2: originalList2,
      list3: originalList3
    };

    this.refresh = this.refresh.bind(this);
    this.acceptAdded1 = this.acceptAdded1.bind(this);
    this.acceptAdded2 = this.acceptAdded2.bind(this);
  }

  refresh(){
    this.setState({
      list1:originalList1,
      list2:originalList2,
      list3:originalList3
    })
  }

  acceptAdded1(value){
    let { list1, list2, list3 } = this.state; 
    let newList1 = list1.concat(value);
    let newList3 = list3.filter(item => item!==value);
    console.log(list1,list2,list3);
    console.log(newList1,newList3);
    this.setState({
      list1:newList1,
      list3:newList3
    })
  }

  acceptAdded2(value){
    let { list1, list2, list3 } = this.state; 
    let newList2 = list2.concat(value);
    let newList3 = list3.filter(item => item!==value);
    console.log(list1,list2,list3);
    console.log(newList2,newList3);
    this.setState({
      list2:newList2,
      list3:newList3
    })
  }

  render(){
    let state = this.state;
    return (
      <View style={{flex:1,paddingTop:200}}>
        <View style={{flexDirection:"row"}}>
          <Droppable
            style={{flex:1,backgroundColor:"blue"}}
            onWillAccept = {this.acceptAdded1}
            ID="column1"
          >
            {
              state.list1.map((item,index) => {
                return (
                  <View key={item} style={{padding:10,marginBottom:5,backgroundColor:"#fdc",justifyContent:"center",alignItems:"center"}}>
                    <Text>{item}</Text>
                  </View>
                )
              })
            }
          </Droppable>
          <Droppable
            style={{flex:1,backgroundColor:"green"}}
            onWillAccept = {this.acceptAdded2}
            ID="column2"
          >
            {
              state.list2.map((item,index) => {
                return (
                  <View key={item} style={{padding:10,marginBottom:5,backgroundColor:"#f0c",justifyContent:"center",alignItems:"center"}}>
                    <Text>{item}</Text>
                  </View>
                )
              })
            }
          </Droppable>
        </View>
        <View style={{marginVertical:10}}></View>
        {
          state.list3.map((item,index) => {
            return (
              <Draggable key={item} value={item} >
                <View style={{padding:10,marginBottom:5,backgroundColor:"#eec"}}>
                  <Text>{item}</Text>
                </View>
              </Draggable>
            )
          })
        }
        <Text>{state.list3.length}</Text>
        <TouchableOpacity onPress={this.refresh}>
          <Text>refresh</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  refreshBtn:{
    alignItems:"center",
    justifyContent:"center",
    alignSelf:"center",

  },
  refreshBtnTxt:{

  }
});

export default App;
