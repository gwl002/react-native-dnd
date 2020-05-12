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

import SortDemo from "./src/SortDemo";
import Solitaire from "./src/Solitaire";
import TestDemo from "./src/test";

const App = () => {
  return (
    <View style={{flex:1}}>
      {/*<SortDemo />*/}
      <Solitaire />
      {/*<TestDemo />*/}
    </View>
  )
}

export default App;
