/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Orientation
} from 'react-native';

import CarMatch from "./src/car"

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      start: false,
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <CarMatch
          isStart={ this.state.start }
          result = { "1, 2, 3, 5, 4, 6, 7, 9, 8, 10" } // 比赛结果
          sporttDitance={ 300 } // 运动距离 一般为屏幕宽度或高度 减去一辆车的长度
          cars={[require("./src/image/01.png"), require("./src/image/01.png"), require("./src/image/02.png"), require("./src/image/03.png"), require("./src/image/04.png"), require("./src/image/05.png"), require("./src/image/06.png"), require("./src/image/07.png"), require("./src/image/08.png"), require("./src/image/09.png"), require("./src/image/10.png")]}
          />
        <TouchableOpacity
          style={{marginTop: 150}}
          onPress={ () => this.setState({start: !this.state.start})}
          >
          <Text>开启</Text>
        </TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    width: "100%"
  }
});
