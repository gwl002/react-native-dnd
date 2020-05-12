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


const App = (props) => {
  const [list1,setList1] = useState(originalList1);
  const [list2,setList2] = useState(originalList2);
  const [list3,setList3] = useState(originalList3);


  const refresh = () => {
    setList1(originalList1);
    setList2(originalList2);
    setList3(originalList3);
  }

  const acceptAdded1 = (value) => {
    setList1(list1 => list1.concat(value));
    setList3(list3 => list3.filter(item => item!== value));
  }

  const acceptAdded2 = (value) => {
    setList2(list2 => list2.concat(value));
    setList3(list3 => list3.filter(item => item!== value));
  }

  return (
    <View style={{flex:1,paddingTop:200}}>
      <View style={{flexDirection:"row"}}>
        <Droppable
          style={{flex:1,backgroundColor:"blue"}}
          onAccept = {acceptAdded1}
          ID="column1"
        >
          {
            list1.map((item,index) => {
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
          onAccept = {acceptAdded2}
          ID="column2"
        >
          {
            list2.map((item,index) => {
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
        list3.map((item,index) => {
          return (
            <Draggable key={item} value={item} >
              <View style={{padding:10,marginBottom:5,backgroundColor:"#eec"}}>
                <Text>{item}</Text>
              </View>
            </Draggable>
          )
        })
      }
      <Text>{list3.length}</Text>
      <TouchableOpacity onPress={refresh}>
        <Text>refresh</Text>
      </TouchableOpacity>
    </View>
  )
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
